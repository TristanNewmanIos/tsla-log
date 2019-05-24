let trades = require('../data/trades')

const readTrades = (req,res) =>{

    if (req.query.date){
        const today = new Date()
        const filterMargin = req.query.date
        const filterDay = today.setDate(filterMargin)

        const filteredTrades = trades.filter((trade, index)=>{
            let tradeDate = Date.parse(trade.date)
            return filterDay < tradeDate
            
        })

        res.json(filteredTrades)
    }else{
        res.json(trades)
    }
}

const addTrade = (req, res) =>{
    let newTrade = req.body
    const tradePrice = req.body.price
    const tradePointMargin = req.body.tradePoint
    const tradePointMultiple = 1+tradePointMargin
    const tradePoint = parseFloat(tradePrice * tradePointMultiple).toFixed(2)
    newTrade.tradePoint = tradePoint
    console.log(tradePoint)
    trades.push(newTrade)
    res.json(trades)
}

const updateTrade = (req, res) =>{
    let updatedTrade = req.body
    trades[req.params.id] = updatedTrade
    res.json(trades)
}

const destroyTrade = (req, res) =>{
    const filteredTrades = trades.filter((trade, index)=>{
        // console.log("ID OF THE DELETED TRADE" + req.params.id)
        if(+req.params.id !== index){
            console.log(true)
            console.log(index)
            console.log(req.params.id)
            return trade
        }
    })

    trades = filteredTrades
    res.json(trades)
}

module.exports = {
    addTrade,
    updateTrade,
    destroyTrade,
    readTrades
}