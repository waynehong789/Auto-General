import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { News } from 'src/app/shared/dataModels';


@Injectable({
    providedIn: 'root',
  })

export class NewsService {

    apiUrl = '/api/';

    newsList: Array<News> = [];


    constructor(private http: HttpClient) {}

    public queryNews(queryString: string): Promise<any>{
        return new Promise((resolve, reject)=>{
            let params = new HttpParams();
            params = params.append("queryString", queryString);
            this.http.get(this.apiUrl + "news", {params}).subscribe((resp) => {
                //console.log(resp);
                if(resp['data'] && resp['status'] === "success"){
                    resolve(resp['data'])
                }
            }, (error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    public getNews(id: string): Promise<any>{
        return new Promise((resolve, reject)=>{
            this.http.get(this.apiUrl + "news/" + id ).subscribe((resp) => {
                //console.log(resp);
                if(resp['data'] && resp['status'] === "success"){
                    resolve(resp['data'])
                }
            }, (error) => {
                console.log(error);
                reject(error);
            });
        });
    }

}