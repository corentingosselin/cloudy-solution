import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { map, Observable, of, Subject, takeUntil } from "rxjs";
import { ErrorDto } from "./dto/error.dto";

const VALIDATION_MESSAGES = {
  email: {
    required: 'error.required-field',
    pattern: 'error.invalid-email',
    email: 'error.invalid-email'
  },
  password: {
    required: 'error.required-field',
    minlength: 'error.password-must-be-6-characters'
  },
  confirmPassword: {
    required: 'error.required-field',
    match: 'error.password-not-match'
  },
  lastname: {
    required: 'error.required-field',
    pattern: 'error.invalid-name'
  },
  firstname: {
    required: 'error.required-field',
    pattern: 'error.invalid-firstname'
  }
};


export class GenericValidator {
  // By default the defined set of validation messages is pass but a custom message when the class is called can also be passed
  constructor(private translateService: TranslateService, private validationMessages: { [key: string]: { [key: string]: string } } = VALIDATION_MESSAGES) {
  }

  private isActive = new Subject();

  // this will process each formcontrol in the form group
  // and then return the error message to display
  // the return value will be in this format `formControlName: 'error message'`;
  public processMessages(form: FormGroup): Observable<any> {
    if (form.valid) return of({});
    return form.valueChanges
      .pipe(

        map((value: string) => {
          const error: any = {};
          Object.keys(form.controls).forEach(controlName => {
            const control = form.controls[controlName];
            if (control.errors) {
              const errorKey: string = Object.keys(control.errors)[0];
              const message: string = this.validationMessages[controlName][errorKey];
              error[controlName] = this.translateService.instant(message);
            }
          });
          if (form.valid)
            return {error: error, errorTitle: ''};
          else
            return { error: error, errorTitle: "error.invalid-form" };
        }),
        takeUntil(this.isActive));

  }


  public endActive() {
    this.isActive.next(false);
  }
}