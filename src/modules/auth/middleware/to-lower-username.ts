import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Credentials } from '../dtos/credentials.dto';

@Injectable()
export class ToLowerUsername implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const user = req.body as Credentials;
    user.username = (user.username || '').toLowerCase();
    next();
  }
}
