import { NextFunction, Request, Response } from 'express';

export function rutasMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Esta ejecutando un metodo ${req.method}`);
  next();
}
