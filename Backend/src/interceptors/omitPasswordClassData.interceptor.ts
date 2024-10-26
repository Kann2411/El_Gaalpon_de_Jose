import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OmitPasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.registrations) {
          data.registrations = data.registrations.map((registration) => {
            const { password, ...userWithoutPassword } = registration.user;
            return {
              ...registration,
              user: userWithoutPassword,
            };
          });
        }
        return data;
      }),
    );
  }
}
