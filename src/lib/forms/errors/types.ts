export type ApiErrorResponse = {
  message?: string;
  fieldErrors?: Record<string, string | string[]>;
};
