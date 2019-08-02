# Hacker_News_Search_Client
Coding Challenge -- Hacker News Search Client

This is a practice full stack web application project which is created with Angular8 & Nodejs & Typescript+ Restful API + "Hacker News API".

Hacker News has a large number of complex data and can be collected from API.

The goal of this App is attempt to provide clear information to user and let them obtain the information more convenient.

<b>Technical Principals</b>: SOLID / Microservices / OOD

<b>Front End</b>: Angular 8 with Angular Material, bootstrap, rxjs, Flex-Layout

There is one component package - "news". It allow user to search news and open the news' url in another browser window. So far, only 20 news can be return from Hacker News API each time.

<b>Back End</b>: Nodejs 11 with Express, RESTful API

There is a controller supporting API for "news". It can provide Hacker News data for different services.
And of course, it will keep all the log for any error.

<b>App start command</b>:   
1. pull and run "npm install" one each in "clientApp" and "node-api"
2. run "npm run start" one each in "clientApp" and "node-api"
3. open browser to "localhost:4200"

<b>To Do</b>: user authentication / data base / front end e2e test & unit test/ API testing 

<b>Future</b>: This app can be easily scale up to support more Hacker News information with different UI ( even mobile App, for example Ionic )

<b>Personal Info</b>: https://www.linkedin.com/in/wayne-hong-456131a2/