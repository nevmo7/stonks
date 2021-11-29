import requests
import json
from datetime import datetime
from twelvedata import TDClient

from rest_framework import response

API_KEY_ALPHAVANTAGE = "303XYJP142F9XHB5"


def getChartData(symbol, interval, size):
    # Initialize client - apikey parameter is requiered
    td = TDClient(apikey="51692a5557d1472c89a0bde124cadacc")

    # Construct the necessary time series
    ts = td.time_series(
        symbol=symbol,
        interval=interval,
        outputsize=size,
        timezone="America/New_York",
    )

    return formatData(ts.as_json(), interval)

def formatData(ts, interval):
    formattedData={}

    if interval == "15min":
        for t in ts:
            time = t['datetime'][11:]
            formattedData[time] = float(t['close'])
    else:
        for t in ts:
            formattedData[t['datetime']] = float(t['close'])

    return formattedData