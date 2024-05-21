import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from './movie-card/movie-card.component';

import { MatDialogConfig } from '@angular/material/dialog';
import { SynopsisComponent } from './synopsis/synopsis.component';
import { GenreInfoComponent } from './genre-info/genre-info.component';
import { DirectorInfoComponent } from './director-info/director-info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}

// not sure:
// constructor(public dialog: MatDialog) { }



// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'myFlix-Angular-client';

//   constructor(public dialog: MatDialog) { }
//   // This is the function that will open the dialog when the signup button is clicked
//   openUserRegistrationDialog(): void {
//     this.dialog.open(UserRegistrationFormComponent, {
//       // Assigning the dialog a width
//       width: '280px'
//     });
//   }
//   // This is the function that will open the dialog when the login button is clicked
//   openUserLoginDialog(): void {
//     this.dialog.open(UserLoginFormComponent, {
//       // Assigning the dialog a width
//       width: '280px'
//     });
//   }
//   openMoviesDialog(): void {
//     this.dialog.open(MovieCardComponent, {
//       width: '500px'
//     });
//   }
// }