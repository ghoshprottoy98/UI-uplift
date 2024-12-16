import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {NotificationService} from '../shared/services/notification.service';
import {AppConfigService} from "../app/app.config.service";


const MAX_RETRY = 3;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService, private notify: NotificationService) {
  }

  showMessage(title: string, message?: string): Promise<any> {
    return this.notify.error(title, message);
  }

  isRetryable(status: number, method: string, count: number) {
    return method === 'GET' && count <= (MAX_RETRY - 1) && (status === 503 || status === 401);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let showing = false;
    const ignore = req.headers.has('ignore-global-handler');
    const method = req.method;

    if (!req.headers.has('no-loader')) {
      showing = true;
      this.spinner.show();
    }

    const req1 = req.clone({
      headers: this.cleanupCustomHeaders(req.headers)
    });

    return next.handle(req1).pipe(
      retry({
        delay: (error, count) => {
          if (this.isRetryable(error.status, method, count)) {
            return of(error);
          }
          return throwError(error);
        }
      }),
      map((event: HttpEvent<any>) => {
        if (showing && event instanceof HttpResponse) {
          this.spinner.hide();
        }
        return event;
      }),
      catchError((response: HttpErrorResponse) => {
        if (showing) {
          this.spinner.hide();
        }

        if (ignore) {
          return throwError(() => response);
        }

        switch (response.status) {
          case 409:
            this.showMessage('Error!', response.error.message || 'The requested resource may be moved or deleted');
            break;
          case 401:
            this.showMessage('Session Error!', 'Your logged in session expired! Please login again to continue')
              .then(() => window.location.reload());
            break;
          case 403:
            this.showMessage('Session Error!', 'Your logged in session may have changed!' +
              ' Please reload page to continue or go to Home Page')
              .then(() => window.location.replace('/'));
            break;
          case 404:
            this.showMessage('Error!', response.error.message || 'The requested resource may be moved or deleted');
            break;
          case 412:
            this.showMessage('Precondition Failed!', response.error.message);
            break;
          case 400:
            if (this.isUnknownError(response)) {
              this.handleUnknownError(response.error);
            }
            break;
          case 0:
            // Ignore abort error
            break;
          case 500:
            this.showMessage('Oops! Something Bad Happened!', response.error.message || 'Error in processing!');
            break;
          case 503:
            this.showMessage('Error!', response.error.message || 'Service Unavailable');
            break;
          default:
            this.showMessage('Error!', response.error.message|| response.message || 'Unknown error!!');
        }
        return throwError(() => response);
      })
    );
  }

  private isUnknownError(response: HttpErrorResponse) {
    return response.error.hasOwnProperty('code') && response.error.code !== 1000;
  }

  private handleUnknownError(error: any) {
    switch (error.code) {
      case 2000: // Invalid request
        this.showMessage('Bad request!', 'The request seems to be incorrect!! please try to reload your page');
        break;
      default:
        this.notify.error('Bad request!', error.message);
    }
  }

  private cleanupCustomHeaders(headersIn: HttpHeaders) {
    const headers = {};
    headersIn.keys()
      .filter(key => !['no-loader', 'ignore-global-handler'].includes(key))
      .forEach(i => {
        // @ts-ignore
        headers[i] = headersIn.get(i);
      });
    // @ts-ignore
    headers['X-REALM'] = AppConfigService.getIdpConfig().realm;

    return new HttpHeaders(headers);
  }
}
