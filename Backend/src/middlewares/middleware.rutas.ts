import { NextFunction, Request, Response } from 'express';

export function rutasMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const date = new Date();
  console.log(
    `Esta ejecutando un metodo ${req.method} en la ruta ${req.url}, fecha : ${date}`,
  );
  next();
}
