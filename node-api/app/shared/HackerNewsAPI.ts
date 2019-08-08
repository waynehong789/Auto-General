import request = require('request-promise');
import { Logger } from './logger';

export interface News{
    id?: string;
    title?: string;
    url?: string;
    author?: string;
  }

export class HackerNewsAPI {

    defaultURL: string = "http://hn.algolia.com/api/v1/";


    public queryNews(queryString: string): Promise<any> {

        return new Promise((resolve, reject) => {

            let url = this.defaultURL + "search?query=" + queryString;

            let opts: request.Options = {
                uri: url,
                method: 'GET'
            }

            request(opts).then((result) => {
                //console.log("Got response from API: " + result);
                if (result) {
                    let data = JSON.parse(result);
                    if(data.hits.length > 0){
                        let newsData : Array<News> = [];
                        for(let news of data.hits){
                            newsData.push({
                                id: news.objectID,
                                title: news.title,
                                url: news.url,
                                author: news.author
                            })
                        }
                        resolve(newsData);
                    }
                }else{
                    Logger.log("Can not get news info from API");
                    reject("Can not get news info from API");
                }

            }).catch(err => {
                Logger.log("Hacker News API error: ", err);
                reject(err);
            })
        })
    }

    public getNews(id: string): Promise<any> {

        return new Promise((resolve, reject) => {

            let url = this.defaultURL + "items/" + id;

            let opts: request.Options = {
                uri: url,
                method: 'GET'
            }

            request(opts).then((result) => {
                //console.log("Got news response from API: " + result);
                if (result) {
                    let data = JSON.parse(result);
                    //console.log("Got news response from API: ", data);
                    if(data.id){
                        let newsData: News = {
                            id: data.id,
                            title: data.title,
                            url: data.url,
                            author: data.author
                        }
                        resolve(newsData);
                    }else{
                        Logger.log("news data error");
                        reject("news data error");
                    }
                }else{
                    Logger.log("Can not get news info from API");
                    reject("Can not get news info from API");
                }
            }).catch(err => {
                Logger.log("Hacker News API error: ", err);
                reject(err);
            })
        })
    }
}