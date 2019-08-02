"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request-promise");
var logger_1 = require("./logger");
var HackerNewsAPI = /** @class */ (function () {
    function HackerNewsAPI() {
        this.defaultURL = "http://hn.algolia.com/api/v1/";
    }
    HackerNewsAPI.prototype.queryNews = function (queryString) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = _this.defaultURL + "search?query=" + queryString;
            var opts = {
                uri: url,
                method: 'GET'
            };
            request(opts).then(function (result) {
                console.log("Got response from API: " + result);
                if (result) {
                    var data = JSON.parse(result);
                    if (data.hits.length > 0) {
                        var newsData = [];
                        for (var _i = 0, _a = data.hits; _i < _a.length; _i++) {
                            var news = _a[_i];
                            newsData.push({
                                id: news.objectID,
                                title: news.title,
                                url: news.url,
                                author: news.author
                            });
                        }
                        resolve(newsData);
                    }
                }
                else {
                    logger_1.Logger.log("Can not get news info from API");
                    reject("Can not get news info from API");
                }
            }).catch(function (err) {
                logger_1.Logger.log("Hacker News API error: ", err);
                reject(err);
            });
        });
    };
    HackerNewsAPI.prototype.getNews = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = _this.defaultURL + "items/" + id;
            var opts = {
                uri: url,
                method: 'GET'
            };
            request(opts).then(function (result) {
                console.log("Got news response from API: " + result);
                if (result) {
                    var data = JSON.parse(result);
                    //console.log("Got news response from API: ", data);
                    if (data.id) {
                        var newsData = {
                            id: data.id,
                            title: data.title,
                            url: data.url,
                            author: data.author
                        };
                        resolve(newsData);
                    }
                    else {
                        logger_1.Logger.log("news data error");
                        reject("news data error");
                    }
                }
                else {
                    logger_1.Logger.log("Can not get news info from API");
                    reject("Can not get news info from API");
                }
            }).catch(function (err) {
                logger_1.Logger.log("Hacker News API error: ", err);
                reject(err);
            });
        });
    };
    return HackerNewsAPI;
}());
exports.HackerNewsAPI = HackerNewsAPI;
//# sourceMappingURL=HackerNewsAPI.js.map