import type { IMiddlewareError } from '../types/handler';

export default class MiddlewareError extends Error implements IMiddlewareError {
  redirectUrl: string;

  constructor(redirectUrl: string) {
    super('Middleware Error');
    Object.setPrototypeOf(this, MiddlewareError.prototype);

    this.redirectUrl = redirectUrl;
  }
}
