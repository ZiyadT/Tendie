require('dotenv').config()
const twelvedata = require('twelvedata')

module.exports = {
    retrieve,
    getStocks
}

async function retrieve(req, res){
    let general = {}
    let timeSeries = []
    let keyMetrics = {}
    let news = []
    let finalResult = {}
    try{
        let response = await fetch(`https://api.twelvedata.com/complex_data?apikey=${process.env.STOCK_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({symbols: ['AAPL'], intervals:["1day", "1week", "1month"], methods: ["time_series"]})
        });
        let json = await response.json()

        for(let i = 0; i < json['data'].length; i++){
            let emptyArr = []
            for (let j = 0; j < json['data'][i].values.length; j++){
                let current = json['data'][i].values[j]
                let emptyObj = {}
                emptyObj.date = current.datetime
                emptyObj.value = current.close
                emptyArr.push(emptyObj)
            }
            timeSeries.push(emptyArr.reverse())
            finalResult['timeSeries'] = timeSeries
        }

        response = await fetch(`https://api.twelvedata.com/price?symbol=${req.body.stock}&apikey=${process.env.STOCK_API_KEY}`)
        json = await response.json();

        general['price'] = json.price

        response = await fetch(`https://api.twelvedata.com/quote?symbol=${req.body.stock}&apikey=${process.env.STOCK_API_KEY}`)
        json = await response.json();

        general['name'] = json.name
        general['ticker'] = json.symbol
        keyMetrics['open'] = json.open
        keyMetrics['low']= json.low
        keyMetrics['high'] = json.high
        keyMetrics['volume'] = json.volume
        keyMetrics['prevClose'] = json.previous_close
        keyMetrics['fiftytwohigh'] = json.fifty_two_week.high
        keyMetrics['fiftytwolow'] = json.fifty_two_week.low
        keyMetrics['change'] = json.change
        finalResult['general'] = general
        finalResult['keyMetrics'] = keyMetrics

        response = await fetch(`https://newsapi.org/v2/everything?q=${json.name}&sortBy=relevancy&apiKey=${process.env.NEWS_API_KEY}`)
        json = await response.json();

        for (let i = 0; i < json.articles.length; i++){
            let emptyObj = {}
            emptyObj['title'] = json.articles[i].title
            emptyObj['description'] = json.articles[i].description
            emptyObj['url'] = json.articles[i].url
            emptyObj['urlToImage'] = json.articles[i].urlToImage
            news.push(emptyObj)
        }
        finalResult['news'] = news

        res.status(200).json(finalResult)

    }
    catch(err){
        res.status(400).json(err)
    }
}

async function getStocks(req, res){
    try{
        let response = await fetch(`https://api.twelvedata.com/stocks`);
        let json = await response.json()
        const exchanges = ['NASDAQ', 'NYSE', 'OTC']
        let finalResult = []
        for (let i = 0; i < json.data.length; i++){
            if (exchanges.includes(json.data[i].exchange)){
                finalResult.push({
                    name: json.data[i].name,
                    symbol: json.data[i].symbol,
                    exchange: json.data[i].exchange
                })
            }
        }
        res.status(200).json(finalResult)
    }
    catch(err){
        res.status(400).json(err)
    }    
}