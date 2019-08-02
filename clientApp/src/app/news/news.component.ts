import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { NewsSuper } from './news.super';
import { NewsService } from './service/news.service';
import { News } from '../shared/dataModels';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-news',
  templateUrl: './view/news.component.html',
  styleUrls: ['./css/news.component.scss']
})

export class NewsComponent extends NewsSuper implements OnInit {

  newsList: Array<News> = [];
  title: string = 'Hacker News Search App';
  searchQuery: string = "";

  displayedColumns: string[] = ['ID', 'Title', 'Author', 'OpenNews'];

  public dataSource = new MatTableDataSource<News>(this.newsList);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(newsService: NewsService, injector: Injector) {
    super(newsService, injector)
  }

  ngOnInit() {
   
  }

  async searchNews() {
    if (this.searchQuery) {
      //console.log(this.searchQuery);
      try {
        this.loading = true;
        let result: Array<News> = await this.newsService.queryNews(this.searchQuery);
        if (result && result.length > 0) {
          this.loading = false;
          this.newsList = result;
          this.dataSource = new MatTableDataSource<News>(this.newsList);
          setTimeout(() => this.dataSource.paginator = this.paginator);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }


  openNews(row: News) {
    try {
     let win = window.open(row.url, '_blank');
     win.focus();
    } catch (err) {
      console.log(err);
    }
  }

}
