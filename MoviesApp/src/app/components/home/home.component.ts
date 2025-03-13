import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy{
  public subscriptions:Subscription[] = [];
  public topRated:any;
  public popular:any;
  public nowPlaying:any;
  public upcoming:any;

 constructor(private moviesService:MoviesService,
  private router:Router){}
 
 
 ngOnInit(): void {

   //retrieve all the movies 
   let subscription1 = this.moviesService.getTopRatedMovies().subscribe({
      next:(movie) => {
        this.topRated = movie;
        this.topRated = this.topRated.results.sort(()=>0.5 - Math.random()).slice(0,4); //shuffles the array and then take the first four elements
      },
    })
    
    let subscription2 = this.moviesService.getPopularMovies().subscribe({
      next:(movie) => {
        this.popular = movie;
        this.popular = this.popular.results.sort(()=>0.5 - Math.random()).slice(0,4);
      },
    })
    let subscription3 = this.moviesService.getNowPlayingMovies().subscribe({
      next:(movie) => {
        this.nowPlaying = movie;
        this.nowPlaying = this.nowPlaying.results.sort(()=>0.5 - Math.random()).slice(0,4);
      },
    })
    let subscription4 = this.moviesService.getUpComingMovies().subscribe({
      next:(movie) => {
        this.upcoming = movie;
        this.upcoming = this.upcoming.results.sort(()=>0.5 - Math.random()).slice(0,4);
      },
    })

    this.subscriptions.push(subscription1 , subscription2 , subscription3 ,subscription4);
  }

  showMovieDetails(mID:number){
    this.router.navigate(['movie-details' , mID])
  }

  showAllMovies(cat:string){
    this.router.navigate(['/movies/'])
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription)=>{
      subscription.unsubscribe();
    });
  }

}
