import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { Credentials } from '../dtos/credentials.dto';

@Injectable()
export class CreateUserId implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const user = req.body as Credentials;
    user._id = new Types.ObjectId();
    next();
  }
}
