import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserDto } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { selectCurrentUser, selectIsAuthenticated } from '../../store/selectors/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  isCoordinator: boolean = false;
  currentUser$ : Observable<UserDto | null>;
  isAuthenticated$ : Observable<boolean | null>;


  constructor(private authService: AuthService, private router: Router, private store: Store) {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.isCoordinator = this.currentUser?.role === 'COORDINATOR';
  }
  logout(): void {
    this.authService.logout();
    this.currentUser = null;
    this.isCoordinator = false;
    this.router.navigate(['/login']);
  }
}
