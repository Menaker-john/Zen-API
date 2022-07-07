import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const OwnerFilter = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return { [data]: user._id }
  }
)