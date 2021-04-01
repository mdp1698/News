import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutUsComponent } from './about-us/about-us.component';
import { ChatComponent } from './chat/chat.component';
import { ContactUsComponent } from './contact/contact-us/contact-us.component';
import { ThankyouComponent } from './contact/thankyou/thankyou.component';
import { SportsComponent } from './sports/sports.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';
import { LatestNewsComponent } from './home/latest-news/latest-news.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'latest-news/:title', component: LatestNewsComponent },
  { path: 'latest-news', redirectTo : 'sports' },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', children:
  [
    {path: '', component: ContactUsComponent },
    {path: 'thankYou',component: ThankyouComponent },
  ]
},
{ path: 'about' , component: AboutUsComponent },
{ path: 'chat', component: ChatComponent },
{ path: 'sports', component: SportsComponent },
{ path:'weather', component:WeatherComponent },
{ path:'**',component: PageNotFoundComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
