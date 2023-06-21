import NewsCard from "./NewsCard";
import { useState, useEffect, useContext } from "react";
import { tickerContext } from "../contexts";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const StockNews = () => {
    const [newsData, setNewsData] = useState([]);
    const {ticker} = useContext(tickerContext);
    useEffect(() => {
        fetchFromAPI(`query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${process.env.AV_API_KEY}`)
        .then((data) => setNewsData(data["feed"]));
    }, [ticker]);

    return (
    <>
    <NewsCard newsData={newsData} />
    </>
    )
}

export default StockNews;