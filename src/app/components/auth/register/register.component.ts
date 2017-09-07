import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DIRTY_WORDS_REGEX, EMAIL_REGEX } from './../../../common/constants';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMsg: string;
  signupForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  forbiddenUserNames = new RegExp(DIRTY_WORDS_REGEX, 'i');
  noWhiteSpaces = new RegExp(/[\r\n\t\f ]/);

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }


  // authentication
  signup() {
    this.authService.signupUser(this.signupForm)
      .then(resolve => this.router.navigate(['/home']))
      .catch(error => this.errorMsg = error.message);
  }

  // validation
  buildForm(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(4), this.forbiddenNameValidator(this.forbiddenUserNames),
      this.forbiddenWhiteSpaces(this.noWhiteSpaces)]),
      'email': new FormControl('', [Validators.required, Validators.email,
        Validators.pattern(EMAIL_REGEX)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6), this.forbiddenWhiteSpaces(this.noWhiteSpaces)])
      // 'passwordCheck': new FormGroup({
      //   'password': new FormControl('', [Validators.required,
      //   Validators.minLength(4),
      //   this.forbiddenWhiteSpaces(this.noWhiteSpaces)]),
      //   'passwordConfirm': new FormControl('', [Validators.required,
      //   Validators.minLength(4),
      //   this.forbiddenWhiteSpaces(this.noWhiteSpaces)])
      // }, this.passwordMatchValidator)
    });
    // this.signupForm.valueChanges.subscribe((value) => console.log(value));
    // this.signupForm.statusChanges.subscribe((value) => console.log(value));
  }


  // passwordMatchValidator(g: FormGroup) {
  //   return g.get('password').value === g.get('passwordConfirm').value
  //     ? null : { 'mismatch': true };
  // }


  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
  }
  forbiddenWhiteSpaces(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { 'forbiddenWhiteSpaces': { value: control.value } } : null;
    };
  }
}
