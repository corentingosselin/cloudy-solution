import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '@cloudy/client/feature-auth/data-access';
import { LoggedResponse } from '@cloudy/shared/api';
import { GenericValidator } from '@cloudy/shared/utils';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cloudy-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  genericValidator: GenericValidator;
  errorResult: { error: any; errorTitle: string };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(AuthentificationService)
    private authService: AuthentificationService,
    private translateService: TranslateService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group(
      {
        email: [
          null,
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
      },
      {
        validator: mustMatch('password', 'confirmPassword'),
      }
    );

    this.genericValidator = new GenericValidator(translateService);
    this.errorResult = {
      error: {},
      errorTitle: '',
    };
    this.genericValidator.processMessages(this.form).subscribe((error) => {
      this.errorResult = error;
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.form.valid) {
      //force observable to trigger
      this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      return;
    }

    const val = this.form.value;
    this.authService
      .register({
        email: val.email,
        password: val.password,
        confirmPassword: val.confirmPassword,
        firstname: val.firstname,
        lastname: val.lastname,
      })
      .subscribe({
        next: (loggedResponse: LoggedResponse) => {
          this.authService.save(loggedResponse);
          this.toastr.success(this.translateService.instant('auth.registered'));
          //navigate to home page
          this.router.navigate(['/']);
        },
        error: (err) => {

          if(err.status === 500 || err.status === 0 || !err.error.key){
            this.errorResult = {
              error: {},
              errorTitle: 'error.unknown-error',
            };
            return;
          }

          //reset invalid control
          this.form.controls[err.error.field].reset();

          const error = {
            [err.error.field]: this.translateService.instant(err.error.message),
          };
          this.errorResult = {
            error: error,
            errorTitle: 'error.invalid-form',
          };
        },
      });
  }
}

function mustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ match: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
