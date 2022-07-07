import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GenerateSort implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { sort: field = '_id', order = 'asc' } = req.query;
    req.query.sort = { [field as string]: order };
    next();
  }
}
