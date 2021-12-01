import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    userName: '',
    password: '',
    _id: ''
  };
  warning = '';
  success = false;
  loading = false;

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const form = this.loginForm;
    this.user.userName = form.value.userName;
    this.user.password = form.value.password;

    if (this.user.userName !== '' && this.user.password !== ''){
      this.loading = true;
      this.auth.login(this.user).subscribe(() => {
        this.loading = false;
        // this.success = true;
        this.router.navigate(['/newReleases'])
        this.warning = '';

      }), (err => {
        this.success = false;
        this.warning = err.error.message;
        this.loading = false;
      })
    }
  }
}
