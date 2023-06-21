import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { tickerContext } from "../contexts";
import {Card, CardContent, Typography, Grid } from "@mui/material";

const Overview = ({chooseCompany}) => {
    const [stockData,setStockData] = useState([]);
    const {ticker}= useContext(tickerContext);

    useEffect(() => {
        fetchFromAPI(`query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.AV_API_KEY}`)
        .then((data) => setStockData(data) );
    }, [ticker]);
    
    const data= {
        "Asset Type": stockData["AssetType"],
        "Country": stockData["Country"],
        "Exchange": stockData["Exchange"],
        "Currency": stockData["Currency"],
        "Sector": stockData["Sector"],
        "Industry": stockData["Industry"],
        "Profile": stockData["Description"],
        "Address": stockData["Address"],
        "Market Capitalization": parseFloat(stockData["MarketCapitalization"]).toLocaleString(),
        "EBITDA": parseFloat(stockData["EBITDA"]).toLocaleString(),
        "Price / Earnings Ratio": parseFloat(stockData["PERatio"]).toLocaleString(),
        "Price / Earnings To Growth Ratio": parseFloat(stockData["PEGRatio"]).toLocaleString(),
        "Book Value": parseFloat(stockData["PEGRatio"]).toLocaleString(),
        "Dividend Per Share": parseFloat(stockData["DividendPerShare"]).toLocaleString(),
        "Dividend Yield": parseFloat(stockData["DividendYield"]).toLocaleString(),
        "Earnings Per Share": parseFloat(stockData["EPS"]).toLocaleString(),
        "Revenue Per Share (TTM)": parseFloat(stockData["RevenuePerShareTTM"]).toLocaleString(),
        "Profit Margin": parseFloat(stockData["ProfitMargin"]).toLocaleString(),
        "Operating Margin (TTM)": parseFloat(stockData["OperatingMarginTTM"]).toLocaleString(),
        "Retrun On Assets (TTM)": parseFloat(stockData["ReturnOnAssetsTTM"]).toLocaleString(),
        "Return On Equity (TTM)": parseFloat(stockData["ReturnOnEquityTTM"]).toLocaleString(),
        "Revenue (TTM)": parseFloat(stockData["RevenueTTM"]).toLocaleString(),
        "Gross Profit (TTM)": parseFloat(stockData["GrossProfitTTM"]).toLocaleString(),
        "Diluted Earnings Per Share (TTM)": parseFloat(stockData["DilutedEPSTTM"]).toLocaleString(),
        "Quarterly Earnings Growth (YOY)":parseFloat(stockData["QuarterlyEarningsGrowthYOY"]).toLocaleString(),
        "Quarterly Earnings Growth (YOY)": parseFloat(stockData["QuarterlyRevenueGrowthYOY"]).toLocaleString(),
        "Analyst Target Price": parseFloat(stockData["AnalystTargetPrice"]).toLocaleString(),
        "Trailing Price / Earnings Ratio": parseFloat(stockData["TrailingPE"]).toLocaleString(),
        "Forward Price / Earnings Ratio": parseFloat(stockData["ForwardPE"]).toLocaleString(),
        "Price To Sales Ratio (TTM)": parseFloat(stockData["PriceToSalesRatioTTM"]).toLocaleString(),
        "Price To Book Ratio": parseFloat(stockData["PriceToBookRatio"]).toLocaleString(),
        "Enterprise Value To Revenue": parseFloat(stockData["EVToRevenue"]).toLocaleString(),
        "Enterprise Value To EBITDA": parseFloat(stockData["EVToEBITDA"]).toLocaleString(),
        "Beta": parseFloat(stockData["Beta"]).toLocaleString(),
        "52 Week High": parseFloat(stockData["52WeekHigh"]).toLocaleString(),
        "52 Week Low": parseFloat(stockData["52WeekLow"]).toLocaleString(),
        "50 Day Moving Average": parseFloat(stockData["50DayMovingAverage"]).toLocaleString(),
        "200 Day Moving Average": parseFloat(stockData["200DayMovingAverage"]).toLocaleString(),
        "Outstanding Shares": parseFloat(stockData["SharesOutstanding"]).toLocaleString(),
    };

    chooseCompany(stockData["Name"]);

    return (
    <>
        {Object.keys(data).map((info) => (
            <Card key={info} variant="outlined" id="card" sx={{m:1}} >
            <CardContent>
                <Typography>
                    {info}: {data[info]}
                </Typography>
            </CardContent>
            </Card>
            ) )
        }
    </>
    )
}

export default Overview;