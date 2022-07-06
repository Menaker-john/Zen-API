import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

@Injectable()
export class GenerateSort implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    let { sort: field = '_id', order = 'asc'} = req.query;
    req.query.sort = { [field as string]: order };
    next();
  }
}