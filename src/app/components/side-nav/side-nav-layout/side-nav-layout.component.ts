import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authLogin/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-layout',
  templateUrl: './side-nav-layout.component.html',
  styleUrls: ['./side-nav-layout.component.css']
})
export class SideNavLayoutComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;

  list = [
    {
      number: '1',
      name: 'Dashboard',
      icon: 'fa-solid fa-house',
      route: '/dashboard'
    },
    {
      number: '2',
      name: 'Products',
      icon: 'fa-solid fa-shirt',
      route: '/products'
    },
    {
      number: '3',
      name: 'Categories',
      icon: 'fa-solid fa-list',
      route: '/categories'
    },
    {
      number: '4',
      name: 'Users',
      icon: 'fa-solid fa-user',
      route: '/users'
    },
    {
      number: '5',
      name: 'Log out',
      icon: 'fa-solid fa-right-from-bracket',
      action: () => this.logout()
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();

    console.log('Sesión cerrada');

    this.router.navigate(['auth/login']);
  }

}
