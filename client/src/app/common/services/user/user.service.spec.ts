import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { UserService } from './user.service';
import { User } from '../../types/user';

describe('UserService', () => {
  let service: UserService;
  let http: HttpTestingController;
  let routerMock!: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj(['navigateByUrl']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('POST', () => {
    it('should call the correct endpoint for signing up a user', () => {
      const data = { name: 'Bogus', email: 'bogus@email.com', password: 'bogus'};
      service.signUp(data).subscribe((response: User | HttpErrorResponse) => {
        const res = response as User;
				expect(res.id).toBe(1);
				expect(res.email).toBe('bogus@email.com');
			});
			const req = http.expectOne(`${environment.apiBaseUrl}/createUser`);
			expect(req.request.method).toBe('POST');
			req.flush({ id: 1, email: 'bogus@email.com' });
			http.verify();
    });

    it('should call the correct endpoint for logging in a user, then redirect if user exists', () => {
      const data = {email: 'bogus@email.com', password: 'Bogus'};
      service.login(data).subscribe((response: User | HttpErrorResponse) => {
        const res = response as User;
        expect(res.id).toBe(1);
        expect(res.name).toBe('Bogus');
        expect(res.email).toBe('bogus@email.com');
      });
      const req = http.expectOne(`${environment.apiBaseUrl}/login`);
			expect(req.request.method).toBe('POST');
			req.flush({ id: 1, name: 'Bogus', email: 'bogus@email.com' });
			http.verify();
    });
  });

  describe('log out', () => {
    it('should log out a user', () => {
      service.router.navigateByUrl = jasmine.createSpy();
      service.logout();

      expect(service.user).toEqual(new User());
      expect(service.router.navigateByUrl).toHaveBeenCalledWith('');
    });
  });
});
