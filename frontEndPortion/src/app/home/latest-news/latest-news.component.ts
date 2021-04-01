import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INews } from 'src/app/Interfaces/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {

  myNews : INews[] = []
  curNews : INews;
  curNewsTitle : string
  constructor( private route : ActivatedRoute, private serv : NewsService) { }

  ngOnInit(): void {
    this.curNews = {
      title : "",
      description : "",
      url : "",
      urlToImage : "",
      publishedAt : "",
      insertTime : 0
    }
    this.curNewsTitle = this.route.snapshot.paramMap.get('title') as string;
    this.serv.getNews()
    .subscribe((res : any) => {
      console.log(res)
      this.myNews = res;
      this.getNewsInfo(this.curNewsTitle)
  })
  }

  getNewsInfo(title : string){
    for(let news of this.myNews){
      if(title == news.title){
        this.curNews = news
      }
    }
  }

}
