
import { NewsController } from './app/news/news-controller';
const express = require('express');
const app = express();

app.get('/api/news', async (req: any, res: any) => {
  //console.log(req);
  try {
    let queryString = req.query['queryString'];
    let newsController = new NewsController()
    let newsList = await newsController.queryNews(queryString)
    res.status(200).json({
      status: 'success',
      data: newsList
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err
    })
  }
})

app.get('/api/news/:id', async (req: any, res: any) => {
  //console.log(req);
  try {
    let id = req.params['id'];
    let newsController = new NewsController()
    let news = await newsController.getNews(id)
    res.status(200).json({
      status: 'success',
      data: news
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err
    })
  }
})

app.listen(3000, function () {
  console.log('Node API Server listening on port 3000!')
})