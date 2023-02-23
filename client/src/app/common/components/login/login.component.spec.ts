import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MockUserService } from '../../mocks/user.service.mock';
import { UserService } from '../../services/user/user.service';
import { User } from '../../types/user';
import { SignUpComponent } from '../sign-up/sign-up.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter!: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj(['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        MatCardModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatToolbarModule
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sign up', () => {
    it('should present the user a sign up form', () => {
      const fakeUser = { id: 1, name: 'Bogus', email: 'bogus@email.com'} as User;
      const snackBarSpy = spyOn(component.snackBar, 'open');
      component.dialog.open = jasmine.createSpy().and.returnValue({
        afterClosed: () => of(fakeUser)
      } as MatDialogRef<SignUpComponent>);

      component.signUp();

      expect(snackBarSpy).toHaveBeenCalledWith('User created!', undefined, { duration: 4000 });
    });
  });

  describe('log in', () => {
    it('should login a user, then route to the manager', () => {
      const fakeUser = { id: 1, name: 'Bogus', email: 'bogus@email.com' } as User;
      component.loginForm.setValue({
        email: 'bogus@email.com',
        password: 'bogus'
      });
      spyOn(component.userService, 'login').and.returnValue(of(fakeUser));
      const routeSpy = spyOn(component, 'routeToManager');

      component.login();

      expect(component.userService.user).toEqual(fakeUser);
      expect(routeSpy).toHaveBeenCalled();
    });
  });
});
