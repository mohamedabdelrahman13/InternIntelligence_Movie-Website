import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit , OnDestroy{
  public pages:number[] = [1 , 2 , 3 , 4 , 5];
  private subscriptions:Subscription[] = [];
  public currentPage:number = 1; //initial page 
  public searchResults:any = [];
  public searchTerm:string | null = '';
  constructor(private activatedRoute:ActivatedRoute,
    private moviesService:MoviesService,
    private router:Router){

  }

  ngOnInit():void{
    this.showPageResults(this.currentPage)
  }


  //shpw the page results when clicking on page button
  showPageResults(page:number){
    this.activatedRoute.paramMap.subscribe((searchQuery)=>{
      this.searchTerm = searchQuery.get('query'); //get the value of the search query from the url
      let subscription = this.moviesService.searchMovieWithPage(this.searchTerm , page).subscribe(
       {
         next:(movies)=>{this.searchResults = movies;},
         error:(err)=>{console.log(err)},
       }
      )
    this.subscriptions.push(subscription);
   })
   this.currentPage = page;
  }

  showMovieDetails(mID:number){
    this.router.navigate(['movie-details' , mID])
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscritpion)=>subscritpion.unsubscribe());
  }
}
