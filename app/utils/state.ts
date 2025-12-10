import { FirebaseAuthError } from "../lib/auth/firebase";

export type SuccessKind<T> = {
  type: "success";
  data: T;
  error?: never;
};

export type ErrorKind<E> = {
  type: "error";
  error: E;
  data?: never;
};

export type LoadingKind = {
  type: "loading";
  error?: never;
  data?: never;
};

export type State<T, E = unknown> = SuccessKind<T> | ErrorKind<E> | LoadingKind;

export const getErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseAuthError) {
    return `Error: [${error.code ?? "Unknown"}] ${error.message ?? "Unknown authentication error occurred"}`;
  } else if (error instanceof Error) {
    return error.message;
  }
  return `Unknown error occurred. ${error}`;
};
