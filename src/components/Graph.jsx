import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useState,useEffect } from "react";
import { AreaChart, YAxis, XAxis, Area,Tooltip } from "recharts";
import { useContext } from "react";
import { tickerContext } from "../contexts";

const Graph = () => {
    const [stockData,setStockData] = useState(null);
    const {ticker}= useContext(tickerContext);
    const [windowSize,setWindowSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect( () => {
        fetchFromAPI(`query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=${process.env.AV_API_KEY}`)
        .then((data) => setStockData(data));
    },[ticker] );
    
    const stockArray=[];

    if(stockData !== null){
        const timeSeries = stockData["Time Series (Daily)"];
        const dates= Object.keys(timeSeries);

        for (let i= dates.length - 1; i>=0; i--){
            const date= dates[i];
            const dateObject = timeSeries[date];
            const closePrice=parseFloat(dateObject["4. close"]);
            const stockObject = {
                "day":date,
                "Stock Price":closePrice,
            };
            stockArray.push(stockObject);
        }
    }
    
    return (
        <>
        <AreaChart width={windowSize[0]} height={windowSize[1]/3} data={stockArray} margin={{top: 10, right:30, left:0, bottom:0}}>
            <XAxis dataKey="day" tick={false} />
            <YAxis/>
            <Area dataKey="Stock Price" stroke="#000000" fill="#999999" strokeWidth={2}  name="Stock Price" activeDot={true} />
            <Tooltip />
        </AreaChart>
        <br />
        </>
    )
}

export default Graph;