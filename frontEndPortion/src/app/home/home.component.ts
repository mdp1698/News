import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { INews } from '../Interfaces/news';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myNews : INews[] = [];
  constructor(private serv: NewsService, private router : Router, config: NgbCarouselConfig) { 
    // config.interval = 5000
    config.pauseOnHover = false
  }

  dataEvent: string = ""
  imgIndex : number = 0

  ngOnInit(): void {
    this.serv.getNews()
      .subscribe((res : any) => {
        console.log(res)
        this.myNews = res;
        this.sortByDates()
    })
    
  }

  //onSlide(event) returns the image index of the current image being shown in
  //the carousel.
  onSlide(event : any) {
    this.dataEvent = JSON.stringify(event);
    console.log(event);
    const imageIndex = parseInt(event.current.replace("slideId_", ""), 10);
    console.log("image index", imageIndex);
    this.imgIndex = imageIndex
  }

  //sortByDates() sorts news based on date. Latest news will be first.
  sortByDates(){
    this.myNews.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  }
}