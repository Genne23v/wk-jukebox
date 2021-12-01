import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser = {
    userName: '',
    password: '',
    password2: '',
  };
  warning = '';
  success = false;
  loading = false;

  registerForm = new FormGroup({
    userName: new FormControl(this.registerUser.userName, [
      // Validators.minLength(3),
      Validators.pattern('^[A-Za-z0-9]{3,}$'),
      Validators.required,
    ]),
    password: new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
    ]),
    password2: new FormControl(this.registerUser.password2, [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
    ]),
  });

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const form = this.registerForm;
    this.registerUser.userName = form.value.userName;
    this.registerUser.password = form.value.password;
    this.registerUser.password2 = form.value.password2;
    console.log(form.value, form.dirty, form.valid);  //TO BE REMOVED
    if (form.dirty && form.valid && (form.value.password === form.value.password2)) {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(() => {
        console.log('register success')
        this.success = true;
        this.warning = '';
        this.loading = false;
      }, err => {
        console.log('register failed', err.error.message)
        this.success = false;
        this.warning = err.error.message;
        this.loading = false;
      })
    }
  }
}