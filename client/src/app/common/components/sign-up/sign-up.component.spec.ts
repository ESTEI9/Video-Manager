import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { MockUserService } from '../../mocks/user.service.mock';
import { UserService } from '../../services/user/user.service';
import { User } from '../../types/user';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let mockDialog!: jasmine.SpyObj<MatDialogRef<SignUpComponent, any>>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj(['close']);
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: MatDialogRef, useValue: mockDialog }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sign up', () => {
    it('should call the right endpoint for signing up a user', () => {
      const fakeUser = { id: 1, name: 'Bogus', email: 'bogus@email.com' } as User;
      component.formGroup.setValue({
        name: 'Bogus',
        email: 'bogus@email.com',
        password: 'bogus',
        passwordMatch: 'bogus'
      });
      spyOn(component.userService, 'signUp').and.returnValue(of(fakeUser));
      const resetSpy = spyOn(component.formGroup, 'reset');

      component.signUp();

      expect(resetSpy).toHaveBeenCalled();
      expect(mockDialog.close).toHaveBeenCalledWith(fakeUser);
    });
  });

  describe('cancel', () => {
    it('should close the dialog with no data', () => {
      component.cancel();
      expect(mockDialog.close).toHaveBeenCalled();
    });
  });
});
