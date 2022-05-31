import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CorrectUser {

  async canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);
    const params = this.getParams(request);
    const user = this.getUser(request);
    return await this.validateRequest(params, user);
  }

  private getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest()
  }
  
  private getParams(request: any) {
    return request.params;
  }

  private getUser(request: any) {
    return request.user
  }

  private async validateRequest(params: any, user: any) {
    if (!params || !user) return false;
    return params.id === user._id
  }
}
