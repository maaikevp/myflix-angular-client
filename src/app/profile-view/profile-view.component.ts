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





}


// getUser(): void {
//   this.fetchApiData.getOneUser().subscribe((response: any) => {
//     console.log(response);
//     this.user = response;
//     this.userData.Username = this.user.Username;
//     this.userData.Email = this.user.Email;
//     this.user.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');

//     console.log(this.userData);

//     this.fetchApiData.getAllMovies().subscribe((response: any) => {
//       console.log(response);
//       this.favoriteMovies = response.filter((m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0)
//     })
//   })
// }

// getUser(): void {
//   this.fetchApiData.getOneUser().subscribe((response: any) => {
//     // const username = JSON.parse(localStorage.getItem('username') || '{}');
//     // const token = localStorage.getItem('token');
//     console.log(response);
//     this.user = response;
//     this.userData.Username = this.user.Username;
//     this.userData.Email = this.user.Email;
//     this.userData.Birthday = this.user.Birthday; // formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
//     console.log(this.userData);
//     return (this.userData.Username, this.userData.Email, this.userData.Birthday);
//   })
// }


// getProfile(): void {

//   this.fetchApiData.getOneUser().subscribe((response: any) => {
//     console.log('response:', response)
//     this.user = response;
//     this.userData.Username = this.user.Username;
//     this.userData.Email = this.user.Email;
//     let birthday = new Date(this.user.BirthDay)
//     this.userData.Birthday = birthday.toISOString().split('T')[0];
//     this.userData.UserId = this.user._id; // Add this line
//     this.formUserData = { ...this.userData }
//     this.favoriteMoviesIDs = this.user.FavoriteMovies;
//   })

//let birthday = new Date(this.user.BirthDay);
// let birthday = new Date(this.user.BirthDay);
//let birthday = this.user.BirthDay.toDateString();
// this.userData.Birthday = birthday.toString();