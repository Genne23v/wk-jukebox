/*********************************************************************************
 *  WEB422 – Assignment 06
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: Wonkeun No  Student ID: 145095196   Date: December 3, 2021
 *
 ********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  title = 'web422-a6';
  searchString: String = '';
  token;

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart)
        this.token = this.authService.readToken();
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  handleSearch(): void {
    console.log('handleSearch() initiated', this.searchString);
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }
}
