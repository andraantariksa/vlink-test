import { FIREBASE_API_KEY } from "@/app/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";

const MS_IN_A_SECOND = 1000;

export interface StoredAuth {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
  expiresAt: number;
}

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

interface RefreshTokenResponse {
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

const KEY_AUTH = "KEY_AUTH";
const FIREBASE_AUTH_BASE_URL = "https://identitytoolkit.googleapis.com/v1";
const FIREBASE_TOKEN_BASE_URL = "https://securetoken.googleapis.com/v1";

export class FirebaseAuthError extends Error {
  constructor(
    message: string,
    public code?: string,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

function convertError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{
      error: { message: string; code?: string };
    }>;
    const errorData = axiosError.response?.data?.error;

    const errorMessage = errorData?.message || "Authentication failed";
    const errorCode = errorData?.code;
    throw new FirebaseAuthError(errorMessage, errorCode);
  }
  throw new FirebaseAuthError("Unknown error occurred");
}

function getExpiresAtTimestamp(expiresIn: string): number {
  const expiresInSeconds = parseInt(expiresIn, 10);
  return Date.now() + expiresInSeconds * MS_IN_A_SECOND;
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<StoredAuth> {
  try {
    const response = await axios.post<AuthResponse>(
      `${FIREBASE_AUTH_BASE_URL}/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
    );

    const authData: StoredAuth = {
      idToken: response.data.idToken,
      email: response.data.email,
      refreshToken: response.data.refreshToken,
      expiresIn: response.data.expiresIn,
      localId: response.data.localId,
      registered: response.data.registered,
      expiresAt: getExpiresAtTimestamp(response.data.expiresIn),
    };

    await AsyncStorage.setItem(KEY_AUTH, JSON.stringify(authData));

    return authData;
  } catch (error) {
    convertError(error);
  }
}

export async function signOut(): Promise<void> {
  await AsyncStorage.removeItem(KEY_AUTH);
}

export async function getCurrentAuth(): Promise<StoredAuth | null> {
  try {
    const authJson = await AsyncStorage.getItem(KEY_AUTH);
    if (!authJson) {
      return null;
    }
    return JSON.parse(authJson) as StoredAuth;
  } catch (error) {
    return null;
  }
}

export async function refreshAuthToken(): Promise<StoredAuth> {
  const currentAuth = await getCurrentAuth();
  if (!currentAuth) {
    throw new FirebaseAuthError("No authentication data found");
  }

  try {
    const response = await axios.post<RefreshTokenResponse>(
      `${FIREBASE_TOKEN_BASE_URL}/token?key=${FIREBASE_API_KEY}`,
      {
        grant_type: "refresh_token",
        refresh_token: currentAuth.refreshToken,
      },
    );

    const authData: StoredAuth = {
      idToken: response.data.id_token,
      email: currentAuth.email,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in,
      localId: response.data.user_id,
      registered: currentAuth.registered,
      expiresAt: getExpiresAtTimestamp(response.data.expires_in),
    };

    await AsyncStorage.setItem(KEY_AUTH, JSON.stringify(authData));

    return authData;
  } catch (error) {
    await signOut();
    convertError(error);
  }
}

export async function getValidAuth(): Promise<StoredAuth | null> {
  const auth = await getCurrentAuth();
  if (!auth) {
    return null;
  }

  // Check if token is expired or will expire in the next 5 minutes
  const expiresInMs = auth.expiresAt - Date.now();
  const fiveMinutesInMs = 5 * 60 * MS_IN_A_SECOND;

  if (expiresInMs < fiveMinutesInMs) {
    try {
      // Token is expired or expiring soon, refresh it
      return await refreshAuthToken();
    } catch (error) {
      // If refresh fails, return null (user needs to sign in again)
      return null;
    }
  }

  return auth;
}
