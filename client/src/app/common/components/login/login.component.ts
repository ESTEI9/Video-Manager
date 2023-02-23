import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../types/user';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { tap, filter, shareReplay } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loggingIn: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  signUp() {
    const dialogRef: MatDialogRef<SignUpComponent> = this.dialog.open(SignUpComponent);

    dialogRef.afterClosed().pipe(
      tap((res: User | HttpErrorResponse) => {
        if((res as User)?.email) this.snackBar.open('User created!', undefined, {duration: 4000});
        if((res as HttpErrorResponse)?.message) this.snackBar.open((res as HttpErrorResponse).message, undefined, { duration: 4000 });
      })
    ).subscribe();
  }

  login() {
    const data = {
      email: this.loginForm.get('email')?.value as string,
      password: this.loginForm.get('password')?.value as string
    };
    this.loggingIn = true;
    this.userService.login(data).pipe(
      shareReplay(),
      tap(() => { this.loggingIn = false; }),
      tap((res: User | HttpErrorResponse) => {
        if((res as HttpErrorResponse).message) {
          this.snackBar.open((res as HttpErrorResponse).message, undefined, { duration: 4000 });
        }
      }),
      filter((res: User | HttpErrorResponse): res is User => !!(res as User).email),
      tap((res: User) => {
        this.userService.user = res;
        this.routeToManager();
      })
    ).subscribe();
  }

  routeToManager() {
    this.snackBar.open(`Logged In as ${this.userService.user.name}`, undefined, { duration: 4000 });
    this.router.navigateByUrl('/videos');
  }
}
