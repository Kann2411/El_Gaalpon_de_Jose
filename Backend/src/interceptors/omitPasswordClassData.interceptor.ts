/* eslint-disable @typescript-eslint/no-unused-vars */
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
        if (data && data.class && data.class.coach) {
          const { password, ...coachWithoutPassword } = data.class.coach;
          data.class.coach = coachWithoutPassword;
        }

        if (data?.registrations) {
          data.registrations = data.registrations.map((registration) => {
            const { password, ...userWithoutPassword } =
              registration.user || {};
            return {
              ...registration,
              user: userWithoutPassword || registration.user,
            };
          });
        }

        return data;
      }),
    );
  }
}
