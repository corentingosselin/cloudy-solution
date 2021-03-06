import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '@cloudy/client/feature-auth/data-access';
import { GenericValidator } from '@cloudy/shared/utils';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'cloudy-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  genericValidator: GenericValidator;
  errorResult: { error: any; errorTitle: string };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private translateService: TranslateService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [null, Validators.required],
    });

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
    if (!this.form.valid) return;
    const val = this.form.value;

    this.authService
      .login({
        email: val.email,
        password: val.password,
      })
      .subscribe({
        next: (user) => {
          this.authService.save(user);
          this.router.navigate(['/' + (user.is_admin ? 'dashboard' : '')]);
          this.toastr.success(this.translateService.instant('auth.logged-in'));
        },
        error: (err) => {       
          if(err.status === 500 || err.status === 0) {
            this.errorResult = {
              error: {},
              errorTitle:  this.translateService.instant('error.unknown-error'),
            };
            return;
          } 

          //is user banned
          if(err.status === 403) {
            this.errorResult = {
              error: {},
              errorTitle:  this.translateService.instant(err.error.message),
            };
            return;
          }


          const error = {
            [err.error.field]: this.translateService.instant(err.error.message),
          };
          this.errorResult = {
            error: error,
            errorTitle:  this.translateService.instant('error.invalid-form'),
          };
        },
      });
  }
}
