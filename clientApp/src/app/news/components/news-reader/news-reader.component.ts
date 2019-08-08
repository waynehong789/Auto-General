import { Component, OnInit, Input, SimpleChange, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'app-news-reader',
    templateUrl: './news-reader.component.html',
    styleUrls: ['./news-reader.component.scss']
})
export class NewsReader implements OnInit {

    @Input() newsURL: string;
    @Input() index: string;
    @Input() totalNews: string;

    @Output() URLChanged: EventEmitter<number> = new EventEmitter<number>()

    fetchedHtml: any

    constructor(private sanitizer: DomSanitizer) {

    }
    ngOnInit(){
        if (this.newsURL) {
            this.fetchedHtml = this.sanitizer.bypassSecurityTrustResourceUrl(this.newsURL);
        }
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        //console.log(changes);
        if(changes['newsURL']){
            this.fetchedHtml = this.sanitizer.bypassSecurityTrustResourceUrl(this.newsURL);
        }
    }

    backURL(){
        this.URLChanged.emit(-1);
    }

    nextURL(){
        this.URLChanged.emit(1);
    }
}