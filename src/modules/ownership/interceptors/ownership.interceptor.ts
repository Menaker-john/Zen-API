import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Role } from "src/modules/roles";


@Injectable()
export class OwnershipInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    
    if (user != undefined) {
      let filter = {}

      if (!user.roles.includes(Role.Admin)) {
        filter['owner'] = user._id
      }
      request['filter'] = filter;
    }  

    return next
    .handle()
    .pipe()
  }



}