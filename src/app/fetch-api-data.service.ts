import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
//Declaring the api url that will provide data for the client app
const apiUrl = 'https://testingmovie-apionrender.onrender.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(private http: HttpClient) { }


  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  // USER LOGIN -  Making the api call for the user login endpoint

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login?', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  // GET ONE USER

  getOneUser(): Observable<any> {
    //const username = JSON.parse(localStorage.getItem('Username') || '{}');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log(username);
    console.log(token);
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
          key: "Access-Control-Allow-Origin", value: "*"
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // EDIT USER

  editUser(userDetails: any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    // checkups data flow:
    console.log('username', username);
    console.log('token', token);
    console.log('userdetails', userDetails);

    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // DELETE USER

  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token');
    console.log('user', user);
    console.log('username', user.Username);
    return this.http.delete(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // GET ALL MOVIES - Making the api call for the Get All Movies endpoint

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Non-typed response extraction for now
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }
  // Making the api call for the Get One Movie endpoint
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // Making the api call for the Get Director endpoint
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // Making the api call for the Get Genre endpoint
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // Making the api call for the Get User endpoint


 

  // Making the api call for the Get Favourite Movies for a user endpoint
  getFavouriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }
  // Making the api call for the Add a Movie to Favourite Movies endpoint
  addFavouriteMovies(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // Making the api call for the Delete a Movie to Favourite Movies endpoint
  deleteFavouriteMovies(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieID, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}


// getUser(): Observable<any> {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   return user;

// const username = localStorage.getItem('user');
// return this.http.get(apiUrl + 'users/' + username, {
//   headers: new HttpHeaders(
//     {
//       Authorization: 'Bearer ' + token,
//     })
// }).pipe(
//   map(this.extractResponseData),
//   catchError(this.handleError)
// );


 // Making the api call for the Edit User endpoint
  // // Update user info
  // editUser(updatedUser: any): Observable<any> {
  //   const username = localStorage.getItem('username');
  //   const token = localStorage.getItem('token');
  //   //const username = localStorage.getItem('username');
  //   // const user = JSON.parse(localStorage.getItem('username') || '{}');    
  //   return this.http.put(apiUrl + 'users/' + updatedUser.username, updatedUser, {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + token,
  //     })
  //   }).pipe(
  //     map(this.extractResponseData),
  //     catchError(this.handleError),
  //     console.log(result);
  //   );
  // }
