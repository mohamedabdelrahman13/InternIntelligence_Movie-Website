import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {
 
  public TMDB_HEADERS = new HttpHeaders({
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjJmZWUxYjNkNjQ0MDIwMDkyMWJjM2IxN2ZmYTQ0MyIsIm5iZiI6MTc0MTYzNzM0NS4zMDIsInN1YiI6IjY3Y2Y0NmUxODU2ZTEzY2IzZDExNDdiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CgY9TiykD8YIRMzadNSke0lH2zzpdKENZTCt-kxK0dY',
    accept: 'application/json'
  });
  constructor(private http:HttpClient) {

  }


  getMovieByID(ID:number){
   return this.http.get(`${environment.apiUrl}/${ID}` , {headers:this.TMDB_HEADERS})
  }
  searchMovieWithPage(query:string | null , page:number){
   return this.http.get(`${environment.apiUrlSearch}?query=${query}&page=${page}` , {headers:this.TMDB_HEADERS})
  }
  searchMovie(query:string | null){
   return this.http.get(`${environment.apiUrlSearch}?query=${query}` , {headers:this.TMDB_HEADERS})
  }

  getSimilerMovies(ID:number){
   return this.http.get(`${environment.apiUrl}/${ID}/similar` , {headers:this.TMDB_HEADERS})
  }
  
  getTopRatedMovies(){
    return this.http.get(`${environment.apiUrl}/top_rated` , {headers:this.TMDB_HEADERS})
  }
  getPopularMovies(){
    return this.http.get(`${environment.apiUrl}/popular`, {headers:this.TMDB_HEADERS} )
  }
  getNowPlayingMovies(){
    return this.http.get(`${environment.apiUrl}/now_playing`, {headers:this.TMDB_HEADERS} )
  }
  getUpComingMovies(){
    return this.http.get(`${environment.apiUrl}/upcoming` , {headers:this.TMDB_HEADERS})
  }
}
