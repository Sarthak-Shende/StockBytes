import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useState,useEffect } from "react";
import { AreaChart, YAxis, XAxis, Area,Tooltip } from "recharts";

const Graph = () => {
    const [stockData,setStockData] = useState(null);
    const [selectedStock,setSelectedStock]= useState('AAPL');

    useEffect( () => {
        fetchFromAPI(`query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${selectedStock}&outputsize=full&apikey=${process.env.AV_API_KEY}`)
        .then((data) => setStockData(data));
    },[selectedStock] );
    
    
    const stockArray=[];

    if(stockData !== null){
        const timeSeries = stockData["Time Series (Daily)"];

        for (const date in timeSeries){
            const dateObject = timeSeries[date];
            const closePrice=parseFloat(dateObject["4. close"]);
            const stockObject = {
                "day":date,
                "Stock Price":closePrice,
            };
            stockArray.push(stockObject);
        }
    }
    stockArray.reverse();

    return (
        <>
        <AreaChart width={730} height={250} data={stockArray} margin={{top: 10, right:30, left:0, bottom:0}}>
            <XAxis dataKey="day" />
            <YAxis/>
            <Area dataKey="Stock Price" stroke="#000000" fill="#999999" strokeWidth={2}  name="Stock Price" unit={"$"} />
            <Tooltip />
        </AreaChart>
        </>
    )
}

export default Graph;