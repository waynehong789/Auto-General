import { Component, OnInit, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from './service/news.service';
import { News } from '../shared/dataModels';

export class NewsSuper {

    newsCtrl: NewsSuper = this;

    loading = false;

    get news(): Array<News> {
        return this.newsService.newsList;
    }

    set news(value: Array<News>) {
        this.newsService.newsList = value;
    }

    public router: Router 
    protected route: ActivatedRoute

    constructor( public newsService: NewsService, protected injector: Injector) {
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
     }

    navigateHackerNews() {
        this.router.navigateByUrl("");
    }
}