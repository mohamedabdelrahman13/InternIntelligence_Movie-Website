import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  standalone: false,
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit,OnDestroy{
  public currentMovieID!:number;
  public currentMovie:any=[];
  public Subscriptions:Subscription[] = [];
  constructor(private ActivatedRouter:ActivatedRoute
    ,private moviesService:MoviesService){}
  
  
    
    ngOnInit(): void {
      //fetch the movie id in the url
      this.ActivatedRouter.paramMap.subscribe((movie)=>{
        this.currentMovieID = Number(movie.get('mID'))
        var Subscription = this.moviesService.getMovieByID(this.currentMovieID).subscribe((m)=>{
          this.currentMovie = m;
        }) 
        this.Subscriptions.push(Subscription)
      })
    }

    ngOnDestroy(): void {
     this.Subscriptions.forEach((sub)=>sub.unsubscribe);
     this.currentMovieID = 0;
  }
    
  }
