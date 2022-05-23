import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../dtos/user.dto';
import { UsersService } from '../users.service';

@Injectable()
export class ValidateNewUser implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const user = req.body as User;

    if (await this.userService.userAlreadyExists(user.username))
      throw new ConflictException();

    next();
  }
}
