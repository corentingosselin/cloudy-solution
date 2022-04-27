import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '@cloudy/client/feature-auth/data-access';
import { GenericValidator } from '@cloudy/shared/utils';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { catchError, map, of, throwError } from 'rxjs';

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
    private router: Router
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
          this.router.navigate(['/']);
        },
        error: (err) => {          
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
