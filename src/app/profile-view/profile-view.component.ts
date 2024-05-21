import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})

export class ProfileViewComponent implements OnInit {


  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [], UserId: '' };

  formUserData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [], UserId: '' };


  user: any = {};
  movies: any[] = [];
  FavoriteMovies: any[] = [];
  favoriteMoviesIDs: any[] = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog


  ) { }

  ngOnInit(): void {
    this.getProfile();
  }
  getProfile(): void {
    console.log(this.userData)
    this.fetchApiData.getOneUser().subscribe((response) => {
      console.log(response)
      this.user = response[0];
      this.userData.Username = this.user.Username;
      console.log(this.userData.Username);
      this.userData.Email = this.user.Email;
      console.log(this.userData.Email);
      // let birthday = new Date(this.user.BirthDay)
      // let birthday = this.user.BirthDay;
      this.user.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
      console.log(this.user.Birthday);
      console.log(typeof this.user.Birthday);
      this.userData.Birthday = this.user.Birthday;
      console.log(this.userData.Birthday);
      this.userData.UserId = this.user._id;
      this.userData.FavoriteMovies = this.user.FavoriteMovies;
      console.log(this.userData);
      console.log(this.formUserData);
    });

  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result));
      // checkups data flow:
      console.log('double-check', this.userData);
      console.log(typeof this.userData);
      this.snackBar.open('User updated successfully!', 'OK', {
        duration: 2000,
      });
      // checkups data flow:
      console.log('after succes msg', this.userData);
      console.log(this.formUserData);
      this.getProfile();
    }, (error) => {
      console.log('Error updating user:', error);
      this.snackBar.open('Failed to update user', 'OK', {
        duration: 2000,
      });
    });
  }

  deleteUser(): void {
    if (confirm('are you sure?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }



}


