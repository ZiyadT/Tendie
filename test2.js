const stockData = require("./src/sample_data/newssample")

data = []

for (let i = 0; i < stockData.values.length; i++){
    emptyObj = {}
    emptyObj['date'] = stockData.values[i].datetime
    emptyObj['value'] = stockData.values[i].close
    data.push(emptyObj)
}

console.log(data)
