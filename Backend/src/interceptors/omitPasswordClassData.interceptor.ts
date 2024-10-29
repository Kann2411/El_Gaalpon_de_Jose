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
        if (data && data.coach) {
          // Si existe el coach en la data, eliminamos el campo de password
          const { password, ...coachWithoutPassword } = data.coach;
          data.coach = coachWithoutPassword;
        }

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
