export interface Error {
  message: string;
  status: number;
}

type MulterErrorCode = 'LIMIT_FILE_SIZE' | 'LIMIT_FILE_COUNT' | 'LIMIT_UNEXPECTED_FILE';

export interface MulterError extends Error {
  code: MulterErrorCode;
}
