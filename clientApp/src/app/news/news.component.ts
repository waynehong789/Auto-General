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

  //displayedColumns: string[] = ['ID', 'Title', 'Author', 'OpenNews'];

  //public dataSource = new MatTableDataSource<News>(this.newsList);

  //@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(newsService: NewsService, injector: Injector, private sanitizer: DomSanitizer) {
    super(newsService, injector)
  }

  ngOnInit() {
   
  }

  async searchNews() {
    if (this.searchQuery) {
      //console.log(this.searchQuery);
      try {
        this.loading = true;
        this.index = 0
        let result: Array<News> = await this.newsService.queryNews(this.searchQuery);
        if (result && result.length > 0) {
          this.loading = false;
          this.newsList = result;
          //this.dataSource = new MatTableDataSource<News>(this.newsList);
          //setTimeout(() => this.dataSource.paginator = this.paginator);
          //this.displayURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.newsList[0].url);
          this.displayURL = this.newsList[this.index].url;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }


  /* openNews(row: News) {
    try {
     let win = window.open(row.url, '_blank');
     win.focus();
    } catch (err) {
      console.log(err);
    }
  } */

  changeURL(changedIndex: number){
    this.index += changedIndex;
    this.displayURL = this.newsList[this.index].url;
  }

}
