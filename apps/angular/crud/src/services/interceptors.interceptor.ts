import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs';

export function HttpInterceptorFn(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  return next(req).pipe(
    tap((e) => {
      if (e.type === HttpEventType.Response && !e.ok) {
        console.log('error handler ...');
      }
    }),
  );
}
