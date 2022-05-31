import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CorrectUser {

  async canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);
    return await this.validateRequest(request);
  }

  private getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest()
  }

  private async validateRequest(request: any) {
    const { params, user } = request;
    if (!params || !user) return false;
    return params.id === user._id
  }
}
