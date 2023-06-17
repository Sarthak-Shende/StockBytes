import { useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import NewsCard from "./NewsCard";
import Menu from "./Menu";
import { newsCategories, topics } from "../utils/constants";

const NewsFeed = () => {
    const [newsData,setNewsData] = useState([]);
    const [selectedMenu,setSelectedMenu]= useState("Finance");
    const handleMenuSelect = (menu) => {
        setSelectedMenu(menu);
    };

    useEffect(() => {
        fetchFromAPI(`query?function=NEWS_SENTIMENT&topics=${topics[selectedMenu]}&apikey=${process.env.AV_API_KEY}`)
        .then((data) => setNewsData(data["feed"]));
    },[selectedMenu]);

    console.log(topics[selectedMenu]);
    console.log(newsData);

    return (
        <>
        <Menu selectedMenu={selectedMenu} onSelectMenu={handleMenuSelect} categories={newsCategories} />
        <NewsCard newsData={newsData} />
        </>
    )
}

export default NewsFeed;