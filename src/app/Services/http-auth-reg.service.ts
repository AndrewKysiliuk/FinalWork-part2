import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpAuthRegService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  authorization(user): Observable<{}> {
    return this.http.post(`${this.url}/authorization`, user)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  registration(user): Observable<{}> {
    return this.http.post(`${this.url}/registration`, user)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }

}
