// Stock Api----------------------------
// const TwelveData = require("twelvedata");
// const config = {
//     key: "31969f3d46534cf58403e8719d03b11e",
//   };
// const client = TwelveData(config)
// let params = {
//     symbol: "AAPL",
//     interval: "1day",
//     outputsize: 5,
//   };
//   client
//     .timeSeries(params)
//     .then((data) => {
//       console.log(data)
//     })
//     .catch((error) => {
//       // handle error
//     });
// Stock Api-----------------------------

// News Api------------------------------
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('c465d1f893084a40851dd541e3f5813d');
newsapi.v2.everything({
  sources: 'bbc-news,the-verge',
  q: 'blackberry',
}).then(response => {
  console.log(response);
});
// News Api------------------------------