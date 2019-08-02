import { HackerNewsAPI } from '../shared/HackerNewsAPI'


export class NewsController {

    private hackerNewsAPI: HackerNewsAPI;

    constructor(){
        this.hackerNewsAPI = new HackerNewsAPI();
    }

    public async queryNews(queryString: string){
        try{
            let newsList = await this.hackerNewsAPI.queryNews(queryString);
            return newsList;
        }catch(err){
            throw new Error(err);
        }
    }
    
    public async getNews(id: string){
        try{
            let news = await this.hackerNewsAPI.getNews(id);
            return news;
        }catch(err){
            throw new Error(err);
        }
    }

}