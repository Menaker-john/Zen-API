import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';
import { Credentials } from '../dtos/credentials.dto';

@Injectable()
export class ValidateNewUser implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const user = req.body as Credentials;

    if (await this.authService.userAlreadyExists(user.username))
      throw new ConflictException();

    next();
  }
}
