import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';


@Component({
  selector: 'profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})

export class ProfileViewComponent implements OnInit {


  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [], UserId: '' };

  formUserData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [], UserId: '' };


  user: any = {};
  genre: any = "";
  director: any = "";
  movies: any[] = [];
  FavoriteMovies: string[] = [];
  favoriteMoviesIDs: any[] = [];
  favoritemovie: any[] = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog


  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.getMovies();
    this.getFavorites();
  }

  // USER

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



  // MOVIES

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      //let movieID = this.movies._id;
      //console.log("movie ID", movieID)      
      console.log("movies from API-profile", this.movies)
    });
  }

  getFavorites(): void {
    this.fetchApiData.getOneUser().subscribe((response) => {
      this.user = response[0];
      this.userData.FavoriteMovies = this.user.FavoriteMovies;
      this.favoritemovie = this.user.FavoriteMovies;
      console.log("fav movies from API-profile", this.favoritemovie);
    });
  }
  /**
      * Checks if a movie is in the user's favorite list.
      * @param movie - The movie to check.
      * @returns True if the movie is in the favorite list, false otherwise.
      */
  isFav(movie: any): boolean {
    return this.favoritemovie.includes(movie._id);
  }

  /**
    * Toggles a movie in the user's favorite list.
    * @param movie - The movie to toggle.
    */
  toggleFav(movie: any): void {
    console.log('toggleFav called with movie:', movie);
    const isFavorite = this.isFav(movie);
    console.log('isFavorite:', isFavorite);
    isFavorite
      ? this.deleteFavMovies(movie)
      : this.addFavMovies(movie)
  }

  /**
     * Adds a movie to the user's favorite list.
     * @param movie - The movie to add to favorites.
     */
  addFavMovies(movie: any): void {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      console.log('user:', parsedUser);
      const token = localStorage.getItem('token');
      console.log('token', token);
      this.userData.UserId = parsedUser._id;
      console.log('userData:', this.userData);
      this.fetchApiData.addFavouriteMovies(parsedUser.Username, movie._id).subscribe((resp) => {
        console.log('server response:', resp);
        localStorage.setItem('user', JSON.stringify(resp));
        // Add the movie ID to the favoritemovie array
        this.favoritemovie.push(movie._id);
        // Show a snack bar message
        this.snackBar.open(`${movie.Title} has been added to your favorites`, 'OK', {
          duration: 3000,
        });
      });
    }
  }

  /**
     * Deletes a movie from the user's favorite list.
     * @param movie - The movie to remove from favorites.
     */
  deleteFavMovies(movie: any): void {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.fetchApiData.deleteFavouriteMovies(parsedUser.Username, movie._id).subscribe((resp) => {
        localStorage.setItem('user', JSON.stringify(resp));
        // Remove the movie ID from the favoritemovie array
        this.favoritemovie = this.favoritemovie.filter((id) => id !== movie._id);
        // Show a snack bar message
        this.snackBar.open(`${movie.Title} has been removed from your favorites`, 'OK', {
          duration: 3000,
        });
      });
    }
  }

  // DIALOGS
  /**
     * Opens a dialog displaying genre details.
     * @param name - The genre of the movie.
     * @param description - The description of the genre.
     */

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
      //console.log(genre)
    });
  }
  /**
     * Opens a dialog displaying director details.
     * @param name - The name of the director.
     * @param bio - The biography of the director.
     * @param birthdate - The birthdate of the director.
     */
  openDirectorDialog(name: string, bio: string, birthdate: string,): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthdate,
      },
      width: '500px',
    });
  }
  /**
    * Opens a dialog displaying movie synopsis.
    * @param title - The name of the movie.
    * @param description - The synopsis of the movie.
    */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px',
    });
  }




}


