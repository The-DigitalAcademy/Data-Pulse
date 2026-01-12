import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent implements OnInit{
  currentUser: User | null = null;
  isCoordinator: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.isCoordinator = this.currentUser?.role === 'coordinator';
  }
  logout(): void {
    this.authService.logout();
    this.currentUser = null;
    this.isCoordinator = false;
    this.router.navigate(['/login']);
  }
}
