import { FirebaseAuthError } from "../lib/auth/firebase";

export type SuccessKind<T> = {
  type: "success";
  data: T;
};

export type ErrorKind<E> = {
  type: "error";
  error: E;
};

export type LoadingKind = {
  type: "loading";
};

export type State<T, E = unknown> = SuccessKind<T> | ErrorKind<E> | LoadingKind;

export const getErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseAuthError) {
    return `${error.code ?? "Unknown"}: ${error.message ?? "Unknown authentication error occurred"}`;
  } else if (error instanceof Error) {
    return error.message;
  }
  return `Unknown error occurred. ${error}`;
};
