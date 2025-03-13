import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {path:'home' , component:HomeComponent},
  {path:'about' , component:AboutComponent},
  {path:'contact' , component:ContactComponent},
  {path:'movie-details/:mID' , component:MovieDetailsComponent},
  {path:'search-results/:query',component:SearchResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
