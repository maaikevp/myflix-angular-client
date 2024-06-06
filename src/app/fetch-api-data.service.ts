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
  /**
   * @constructor
   * @param {HttpClient} http - For making HTTP requests.
   */
  constructor(private http: HttpClient) { }


  // USER REGISTRATION
  /**
   * Making the api call for the user registration endpoint.
   * @param {any} userDetails - User details for registration.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // USER LOGIN 
  /**
   * Making the api call for the user login endpoint
   * @param {any} userDetails - User details for login.
   * @returns {Observable<any>} - Observable for the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login?', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  // GET ONE USER
  /**
   * Making the api call for the Get User endpoint.
   * @returns {Observable<any>} - Observable for the API response.
   */
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
  /**
  * Making the api call for the Edit User endpoint.
  * @param {any} userDetails - User details for updating user information.
  * @returns {Observable<any>} - Observable for the API response.
  */
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
  /**
     * Making the api call for the Delete User endpoint
     * @param {string} username - Users username for getting favorite Movies.
     * @returns {Observable<any>} - Observable for the API response.
     */
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

  // GET ALL MOVIES 
  /**
     * Making the api call for the Get All Movies endpoint
     * @returns {Observable<any>} - Observable for the API response.
     */
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

  /**
   * Non-typed response extraction.
   * @param {Object} res - API response.
   * @returns {any} - Extracted response data.
   */
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  // GET ONE MOVIE
  /**
   * Making the api call for the Get One Movie endpoint.
   * @param {string} title - One movie title.
   * @returns {Observable<any>} - Observable for the API response.
   */
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
  // GET DIRECTOR
  /**
  * Making the api call for the Get Director endpoint.
  * @param {string} directorName - One director name
  * @returns {Observable<any>} - Observable for the API response.
  */
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
  // GET GENRE
  /**
  * Making the api call for the Get Genre endpoint.
  * @param {string} genreName - One director name
  * @returns {Observable<any>} - Observable for the API response.
  */
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


  // GET FAVORITES
  /**
   * Making the api call for the Get Favourite Movies for a user endpoint
   * @param {string} username - Users username for getting favorite Movies.
   * @returns {Observable<any>} - Observable for the API response.
   */
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
  // ADD MOVIE- not sure why the {} in the code needs to be added
  /**
   * Making the api call for the Add a Movie to Favourite Movies endpoint.
   * @param {string} username - Users username for getting favorite Movies.
   * @param {any} movieID - Movie for adding to favorite Movies.
   * @returns {Observable<any>} - Observable for the API response.
   */
  addFavouriteMovies(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('token:', token);
    console.log('username:', username);
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID, {}, {
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

  // DELETE MOVIE
  /**
   * Making the api call for the delete movie endpoint.
   * @param {string} username - Users username for getting favorite Movies.
   * @param {any} movieID - Movie for adding to favorite Movies.
   * @returns {Observable<any>} - Observable for the API response.
   */
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


  /**
 * Handling of HTTP errors.
 * @param {HttpErrorResponse} error - HTTP error response.
 * @returns {any} - Error details.
 */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.log(error);
      console.log(error.error);
      console.error('Some error occurred:', error.error.message);
    } else {
      console.log(error);
      console.log(error.error);
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() =>
      new Error('Something bad happened; please try again later.'));
  }

}


