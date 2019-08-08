import { Component, OnInit, Injector} from '@angular/core';
import { NewsSuper } from './news.super';
import { NewsService } from './service/news.service';
import { News } from '../shared/dataModels';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-news',
  templateUrl: './view/news.component.html',
  styleUrls: ['./css/news.component.scss']
})

export class NewsComponent extends NewsSuper implements OnInit {

  newsList: Array<News> = [];
  title: string = 'Hacker News Search App';
  searchQuery: string = "";
  displayURL: any;
  index: number = 0;


  constructor(newsService: NewsService, injector: Injector, private sanitizer: DomSanitizer) {
    super(newsService, injector)
  }

  ngOnInit() {
   
  }

  async searchNews() {
    if (this.searchQuery) {
      try {
        this.loading = true;
        this.index = 0
        let result: Array<News> = await this.newsService.queryNews(this.searchQuery);
        if (result && result.length > 0) {
          this.loading = false;
          this.newsList = result;
          this.displayURL = this.newsList[this.index].url;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  changeURL(changedIndex: number){
    this.index += changedIndex;
    this.displayURL = this.newsList[this.index].url;
  }

}
