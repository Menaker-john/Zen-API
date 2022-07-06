import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

@Injectable()
export class CreateId implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    req.body._id = new Types.ObjectId();
    next();
  }
}