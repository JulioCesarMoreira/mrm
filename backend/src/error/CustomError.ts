import {
  BAD_REQUEST,
  GATEWAY_TIMEOUT,
  INTERNAL_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from './constants';

export interface ErrorMessage {
  field: string;
  message: string;
}

export interface ErrorPayload {
  type: string;
  title: string;
  instance: string;
  errors?: ErrorMessage[];
  detail?: string;
  status: number;
}

export interface ErrorResponse {
  message?: string[];
  error: string;
  statusCode: number;
}

export class CustomError extends Error {
  name: string;

  messages: string[];

  cause?: unknown;

  constructor({
    name,
    messages,
    cause,
  }: {
    name: string | undefined;
    messages: string[];
    cause?: unknown;
  }) {
    super(messages.join(', '));
    this.name = name ?? 'Custom Error';
    this.messages = messages;
    this.cause = cause;
  }
}

/**
 * Defines an HTTP exception for *Bad Request Error* type errors.
 *
 * Status code - `400`
 * */
export class BadRequestException extends CustomError {
  statusCode = BAD_REQUEST;

  constructor(messages: string[], cause?: unknown) {
    super({
      messages,
      name: 'BadRequestException',
      cause,
    });
  }
}

/**
 * Defines an HTTP exception for *Internal Server Error* type errors.
 *
 * Status code - `500`
 * */
export class InternalServerErrorException extends CustomError {
  statusCode = INTERNAL_ERROR;

  constructor(message: string, cause?: unknown) {
    super({
      messages: [message],
      name: 'InternalServerErrorException',
      cause,
    });
  }
}

/**
 * Defines an HTTP exception for *Gateway Timeout Error* type errors.
 *
 * Status code - `504`
 * */
export class GatewayTimeoutErrorException extends CustomError {
  statusCode = GATEWAY_TIMEOUT;

  constructor(message: string, cause?: unknown) {
    super({
      messages: [message],
      name: 'GatewayTimeoutErrorException',
      cause,
    });
  }
}

/**
 * Defines an HTTP exception for *Not Found Error* type errors.
 *
 * Status code - `404`
 * */
export class NotFoundErrorException extends CustomError {
  statusCode = NOT_FOUND;

  constructor(message: string, cause?: unknown) {
    super({
      messages: [message],
      name: 'NotFoundErrorException',
      cause,
    });
  }
}

/**
 * Defines an HTTP exception for *Unauthorized Error* type errors.
 *
 * Status code - `404`
 * */
export class UnauthorizedErrorException extends CustomError {
  statusCode = UNAUTHORIZED;

  constructor(message: string, cause?: unknown) {
    super({
      messages: [message],
      name: 'UnauthorizedErrorException',
      cause,
    });
  }
}
