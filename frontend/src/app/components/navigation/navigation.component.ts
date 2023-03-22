import { Component, DoCheck, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { Store } from '@ngrx/store';
import * as UserSelectors from 'src/app/state/selectors/user.selectors';
import * as UserActions from 'src/app/state/actions/user.actions';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    RouterModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, DoCheck {
  isSignedIn = false;
  username = '';
  isAdmin = false;

  constructor(
    private router: Router,
    private store: Store,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {
    this.store.select(UserSelectors.currentUser).subscribe((user: IUser) => {
      this.username = user.name;
      this.isAdmin = user.isAdmin;
    });
    this.isSignedIn = this.authorizationService.isSignedIn;
  }

  ngDoCheck() {
    this.store.select(UserSelectors.currentUser).subscribe((user: IUser) => {
      this.username = user.name;
      this.isAdmin = user.isAdmin;
    });
    this.isSignedIn = this.authorizationService.isSignedIn;
  }

  signOut() {
    this.router.navigate(['/']);
    this.store.dispatch(UserActions.signOut());
    this.authorizationService.signOut();
  }
}
