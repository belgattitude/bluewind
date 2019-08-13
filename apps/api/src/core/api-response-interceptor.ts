import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type GenericApiResponse<T> = {
    data: T;
}

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, GenericApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<GenericApiResponse<T>> {
        return next.handle().pipe(map(data => ({
            success: true,
            data,
        })));
    }
}
