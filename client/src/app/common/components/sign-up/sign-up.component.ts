import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user/user.service';
import { User } from '../../types/user';
import { tap, filter, shareReplay } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordMatch: new FormControl('', Validators.required)
  });

  signingUp: boolean = false;
  passwordsMatch: boolean = false;

  constructor(
    public dialog: MatDialogRef<SignUpComponent>,
    public userService: UserService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.verifyPWMatch();
  }

  signUp() {
    const data = {
      name: this.formGroup.get('name')?.value as string,
      email: this.formGroup.get('email')?.value as string,
      password: this.formGroup.get('password')?.value as string
    };
    this.signingUp = true;
    this.userService.signUp(data).pipe(
      shareReplay(),
      tap(() => { this.signingUp = false; }),
      tap((res: User | HttpErrorResponse) => {
        if((res as HttpErrorResponse).message) {
          this.snackBar.open((res as HttpErrorResponse).message, undefined, { duration: 4000 });
          this.formGroup.get('email')?.reset();
        }
      }),
      filter((res: User | HttpErrorResponse): res is User => !!(res as User).email)
      ).subscribe((res: User) => {
        this.formGroup.reset();
        this.dialog.close(res);
    });
  }

  cancel() {
    this.dialog.close();
  }

  verifyPWMatch() {
    this.formGroup.valueChanges.subscribe(form => {
      this.passwordsMatch = form.password === form.passwordMatch;
    });
  }
}