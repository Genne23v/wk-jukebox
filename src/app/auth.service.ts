import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

import User from './User';
import RegisterUser from './RegisterUser';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  readToken(): User {
    const user = new User();
    const token = this.getToken();

    if (!token) {
      return null;
    }

    const payload = this.jwtHelper.decodeToken(token);
    return {
      _id: payload.sub,
      userName: payload.name,
      password: payload.password,
    };
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }
    const isExpired = this.jwtHelper.isTokenExpired(token);

    return !isExpired;
  }

  login(user: User): Observable<any> {
    const url = `${environment.userAPIBase}/login`;
    return this.http.post<any>(url, user);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  register(registerUser: RegisterUser): Observable<any> {
    const url = `${environment.userAPIBase}/register`;
    return this.http.post<any>(url, registerUser);
  }
}
