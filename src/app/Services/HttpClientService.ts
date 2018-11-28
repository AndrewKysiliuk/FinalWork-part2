import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError} from 'rxjs/operators';

@Injectable()

export class HttpClientService {

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  private httpUrl = 'http://localhost:3000/home';

  get key() {
    return this.authService.getKey();
  }

  httpGet(category: string = '', id: number = null): Observable<{}> {
    if (category) {
      if (id) {
        return this.http.get<{}>(`${this.httpUrl}/${this.key}/${category}/${id}`)
          .pipe(catchError(err => this.errorHandler(err)));
      } else {
        return this.http.get<{}[]>(`${this.httpUrl}/${this.key}/${category}`)
          .pipe(catchError(err => this.errorHandler(err)));
      }
    } else {
      return this.http.get<{}[]>(`${this.httpUrl}/${this.key}`)
        .pipe(catchError(err => this.errorHandler(err)));
    }
  }

  getUser(): Observable<{}> {
    return this.http.get<{}>(`${this.httpUrl}/${this.key}/user`)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  userUpdate(user): Observable<{}> {
    return this.http.put<{}>(`${this.httpUrl}/${this.key}/user`, user)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  newRecord(category: string, data): Observable<{}> {
    return this.http.post(`${this.httpUrl}/${this.key}/${category}`, data)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  delRecord(category: string, id: number): Observable<{}> {
    return this.http.delete(`${this.httpUrl}/${this.key}/${category}/${id}`)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  update(category: string, id: number, data): Observable<{}> {
    return this.http.put(`${this.httpUrl}/${this.key}/${category}/${id}`, data)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }
}
