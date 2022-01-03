from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import json
from twelvedata import TDClient
from newsapi import NewsApiClient

from .utils import getChartData

API_KEY_TWELVEDATA = "51692a5557d1472c89a0bde124cadacc"
API_KEY_ALPHAVANTAGE = "303XYJP142F9XHB5"
API_KEY_NEWS = "f986a31dedfe43beb2dca1856e1049e4"
API_KEY_FMP = "261e8f8ca7096b94e0daf652d8368e1c"

# Create your views here.
class GetStock(APIView):
    def get(self, request, symbol, format=None):
        url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+symbol+'&apikey='+API_KEY_ALPHAVANTAGE
        r = requests.get(url)
        data = r.json()
        return Response(data["Global Quote"], status=status.HTTP_200_OK)

class SearchResult(APIView):
    def get(self, request, symbol, format=None):
        url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+symbol+'&apikey='+API_KEY_ALPHAVANTAGE
        r = requests.get(url)
        response_list = json.loads(r.text)["bestMatches"]
        clean_response = []
        for result in response_list:
            if result["4. region"] == "United States":
                resultDict = {"name": result["2. name"], "symbol": result["1. symbol"]}
                clean_response.append(resultDict)

        return Response(clean_response, status=status.HTTP_200_OK)

class GetChartData(APIView):
    def get(self, request, symbol, format=None):
        month_data = getChartData(symbol=symbol, interval="1day", size=30)
        daily_data = getChartData(symbol=symbol, interval="15min", size=26)
        week_data_keys = list(month_data.keys())[:7]
        week_data = {}
        for key in week_data_keys:
            week_data[key] = month_data[key]
        if not "Error" in month_data:   
            chart_data = {"Day": daily_data,"Week": week_data, "Month" : month_data}
            return Response(chart_data, status=status.HTTP_200_OK)
        else:
            return Response(month_data, status=status.HTTP_404_NOT_FOUND)

class GetProfile(APIView):
    def get(self, request, symbol, format=None):
        url = "https://api.twelvedata.com/quote?symbol="+symbol+"&apikey="+API_KEY_TWELVEDATA
        r = requests.get(url)
        data = r.json()
        td = TDClient(apikey=API_KEY_TWELVEDATA)
        logoRaw = requests.get("https://api.twelvedata.com/logo?symbol="+symbol+"&apikey="+API_KEY_TWELVEDATA)
        logo = logoRaw.json()
        print(logo)
        data["logo_url"] = logo["url"]
        data["open"] = float(data["open"])
        data["high"] = float(data["high"])
        data["low"] = float(data["low"])
        data["change"] = data["change"][:-3]
        data["percent_change"] = data["percent_change"][:-3]
        data["close"] = float(data["close"])
        data["fifty_two_week"]["high"] = float(data["fifty_two_week"]["high"])
        data["fifty_two_week"]["low"] = float(data["fifty_two_week"]["low"])
        return Response(data, status=status.HTTP_200_OK)

class GetNews(APIView):
    def get(self, request, symbol, format=None):
        newsapi = NewsApiClient(api_key=API_KEY_NEWS)

        ticker_news = newsapi.get_everything(q=symbol, 
                                    language='en',
                                    sort_by='relevancy',)

        return Response(ticker_news, status=status.HTTP_200_OK)

class GetHighlights(APIView):
    def get(self, request, format=None):
        newsapi = NewsApiClient(api_key=API_KEY_NEWS)

        top_headlines = newsapi.get_everything(q="nasdaq",
                                        language='en',)

        return Response(top_headlines['articles'][:10], status=status.HTTP_200_OK)

class GetTopGainers(APIView):
    def get(self, request, format=None):
        url = "https://financialmodelingprep.com/api/v3/gainers?apikey=" + API_KEY_FMP
        r = requests.get(url)
        data = r.json()

        for d in data:
            split_per = d['changesPercentage'].split(".")
            if(len(split_per[1]) > 2):
                d['changesPercentage'] = split_per[0] + "." + split_per[1][:2]

        return Response(data, status=status.HTTP_200_OK)
    
class GetTopLosers(APIView):
    def get(self, request, format=None):
        url = "https://financialmodelingprep.com/api/v3/losers?apikey=" + API_KEY_FMP
        r = requests.get(url)
        data = r.json()

        for d in data:
            print(d["changesPercentage"])
            split_per = d['changesPercentage'].split(".")
            if(len(split_per[1]) > 2):
                d['changesPercentage'] = split_per[0] + "." + split_per[1][:2]

        return Response(data, status=status.HTTP_200_OK)