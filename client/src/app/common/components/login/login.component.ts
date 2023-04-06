import { HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../types/user';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { tap, filter, shareReplay } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule
  ]
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
  ) { }

  signUp() {
    const dialogRef: MatDialogRef<SignUpComponent> = this.dialog.open(SignUpComponent);

    dialogRef.afterClosed().pipe(
      tap((res: User | HttpErrorResponse) => {
        if ((res as User)?.email) this.snackBar.open('User created!', undefined, { duration: 4000 });
        if ((res as HttpErrorResponse)?.message) this.snackBar.open((res as HttpErrorResponse).message, undefined, { duration: 4000 });
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
      tap((res: (User | HttpResponse<HttpErrorResponse>)) => {
        const error = (res as HttpResponse<HttpErrorResponse>);
        if (error.status === 401) {
          this.snackBar.open(error.statusText, undefined, { duration: 4000 });
          return;
        }
      }),
      filter((res: User | HttpResponse<HttpErrorResponse>): res is User => !!(res as User).id),
      tap((user: User) => {
        this.setUser(user);
        this.navigateUser(user);
      })
    ).subscribe();
  }

  setUser(user: User) {
    this.userService.setUser(user);
  }

  navigateUser(user: User) {
    this.snackBar.open(`Logged In as ${user.name}`, undefined, { duration: 4000 });
    this.router.navigateByUrl('/videos');
  }
}
