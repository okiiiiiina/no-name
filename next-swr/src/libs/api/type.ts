export interface CustomError extends Error {
  code: number;
  status: string;
  message: string;
}
