from rest_framework.response import Response
from twelvedata import TDClient
import requests
from .models import TradingHistory

API_KEY_TWELVEDATA = "51692a5557d1472c89a0bde124cadacc"

def getWatchlistPrice(watchlist):
    watchlistPrice = []
    
    for stock in watchlist:
        url = "https://api.twelvedata.com/quote?symbol="+ stock["stock_ticker"] + "&apikey=" + API_KEY_TWELVEDATA
        r = requests.get(url)
        data = r.json()

        watchlistDict = {
            "ticker": stock["stock_ticker"],
            "change": data["change"],
            "changePercent": data["percent_change"],
            "price": data["close"],
            "name": data["name"]
        }

        watchlistPrice.append(watchlistDict)

    return watchlistPrice

def getPortfolioPrice(positions):
    portfolioDetails = {}
    positionsQuotes = []
    portfolioValue = 0
    portfolioReturn = 0
    print(positions)
    for position in positions:
        print(position)

        url = "https://api.twelvedata.com/quote?symbol="+ position["stock_ticker"] + "&apikey=" + API_KEY_TWELVEDATA
        r = requests.get(url)
        data = r.json()

        returnAmt =  (float(data["close"]) - position["buy_price"]) * position["units"]
        portfolioReturn += returnAmt
        totalValue = float(data["close"]) * position["units"]
        portfolioValue += totalValue

        positionDict = {
            "ticker": position["stock_ticker"],
            "avgPrice": position["buy_price"],
            "units": position["units"],
            "change": data["change"],
            "changePercent": data["percent_change"],
            "price": data["close"],
            "totalValue": round(totalValue, 2),
            "return": round(returnAmt, 2),
            "name": data["name"]
        }

        positionsQuotes.append(positionDict)

    portfolioDetails["portfolioValue"] = round(portfolioValue, 2)
    portfolioDetails["portfolioReturn"] = round(portfolioReturn, 2)
    portfolioDetails["positions"] = positionsQuotes


    return portfolioDetails

def addTradingHistory(user, transaction, name, ticker, units, price):
    value = units * price
    print("Adding to trading history")
    th = TradingHistory(user=user, transaction=transaction, name=name, ticker=ticker, units=units, price=price, value=value)
    th.save()
