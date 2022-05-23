import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { User } from '../dtos/user.dto';

@Injectable()
export class CreateUserId implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const user = req.body as User;
    user._id = new Types.ObjectId();
    next();
  }
}
