import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../types/user';
import { Router } from '@angular/router';
import { UserState } from '../../states/user.state';
import { UserActions } from '../../actions/user.actions';
import { Computations } from '../../computations/computations';
import { sizes } from '../../enums/size.enum';
import { Store } from '@ngxs/store';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @SelectSnapshot(UserState) user: User;

  constructor(
    private http: HttpClient,
    public router: Router,
    public store: Store) {
  }

  signUp(data: {name: string, email: string, password: string }): Observable<User | HttpErrorResponse> {
    const body = new HttpParams()
      .set('name', data.name)
      .set('email', data.email)
      .set('password', data.password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Accept', 'application/json');

    return this.http.post<User | HttpErrorResponse>(`${environment.apiBaseUrl}/createUser`, body.toString(), { headers });
  }

  login(data: {email: string, password: string}): Observable<User | HttpResponse<HttpErrorResponse>> {
    const body = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Accept', 'application/json');
    
    return this.http.post<User | HttpResponse<HttpErrorResponse>>(`${environment.apiBaseUrl}/login`, body.toString(), { headers });
  }

  setUser(user: User) {
    this.store.dispatch(new UserActions.Set(user));
  }

  isValidSession(): boolean {
    const userLoginDate = new Date(this.user?.date!);
    const sessionLength = Computations.secondsElapsed(userLoginDate);
    return sessionLength < sizes.maxSessionTime;
  }

  isUserLoggedIn(): boolean {
    return this.user.id !== 0;
  }

  logout() {
    this.store.reset(UserState);
    window.localStorage.clear();
    this.router.navigateByUrl('');
  }
}
