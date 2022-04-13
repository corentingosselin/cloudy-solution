import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '@cloudy/client/feature-auth/data-access';
import { GenericValidator } from '@cloudy/shared/utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cloudy-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  genericValidator: GenericValidator;
  errorResult : {error : any, errorTitle: string};


  constructor(
    private formBuilder: FormBuilder,
    @Inject(AuthentificationService) private authService: AuthentificationService,
    private translateService: TranslateService

  ) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
    });

    this.genericValidator = new GenericValidator(translateService);
    this.errorResult = {
      error: {},
      errorTitle: ''
    };
    this.genericValidator.processMessages(this.form).subscribe(error => {
      this.errorResult = error;
    });
  }

  ngOnInit(): void {}


  onSubmit(): void {

    if (!this.form.valid) return;
    
    const val = this.form.value;
    this.authService.login(val.email, val.password).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        const error = {
          [err.error.field]: this.translateService.instant(err.error.message)
        }
        this.errorResult = {
          error: error,
          errorTitle: 'error.invalid-form'
        }
      }
    });

  }
}
