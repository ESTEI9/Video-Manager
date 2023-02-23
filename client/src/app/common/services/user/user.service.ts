import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../types/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User = new User();

  constructor(private http: HttpClient, public router: Router) {}

  signUp(data: {name: string, email: string, password: string }): Observable<User | HttpErrorResponse> {
    const body = new HttpParams()
      .set('name', data.name)
      .set('email', data.email)
      .set('password', data.password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Accept', 'application/json');

    return this.http.post<User | HttpErrorResponse>(`${environment.apiBaseUrl}/createUser`, body.toString(), { headers });
  }

  login(data: {email: string, password: string}): Observable<User | HttpErrorResponse> {
    const body = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Accept', 'application/json');

    return this.http.post<User | any>(`${environment.apiBaseUrl}/login`, body.toString(), { headers });
  }

  logout() {
    this.user = new User();
    this.router.navigateByUrl('');
  }
}
