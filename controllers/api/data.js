require('dotenv').config()

module.exports = {
    retrieve
}

async function retrieve(req, res){
    let general = {}
    let timeSeries = []
    let keyMetrics = {}
    let news = []
    let finalResult = {}
    
    let response = await fetch(`https://api.twelvedata.com/time_series?symbol=${req.body.stock}&interval=1day&apikey=${process.env.STOCK_API_KEY}`)
    let json = await response.json();

    for(let i = 0; i < json.values.length; i++){
            let emptyObj = {}
            emptyObj.date = json.values[i].datetime.split(" ")[0]
            emptyObj.value = json.values[i].close
            timeSeries.push(emptyObj)
    }
    finalResult['timeSeries'] = timeSeries.reverse()

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

    response = await fetch(`https://newsapi.org/v2/everything?q=${json.name}&pageSize=10&sortBy=relevancy&apiKey=${process.env.NEWS_API_KEY}`)
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