import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  public filteredMovies:any;
  public searchQuery = new BehaviorSubject<string>('');
  constructor(private moviesService:MoviesService
    ,private router:Router){}

  ngOnInit():void{
    //increase debounceTime to reduce number of requests
    this.searchQuery.pipe(debounceTime(1000) , distinctUntilChanged()).subscribe((query)=>{
      if(query != ''){
        this.getSearchResults(query);
      }
      else{
        this.filteredMovies =[];
      }
    })
  }
  getSearchResults(query:string){
    return this.moviesService.searchMovie(query).subscribe((movies)=>{
      this.filteredMovies = movies;
      this.filteredMovies = this.filteredMovies.results.slice(0,6);
    })
  }

 
  onSearchChange(event:Event){
    let input = event.target as HTMLInputElement;
    if(input.value == null){
      this.searchQuery.next('')
    }
    let query = input.value;
    this.searchQuery.next(query);
  }


  showMovieDetails(mID:number){
     this.router.navigate(['/movie-details' , mID]);
     this.filteredMovies= [];
  }

  showAllSearchResults(query:string){
     this.router.navigate(['/search-results' , query]);
  }
}
