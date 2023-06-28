import { useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import NewsCard from "./NewsCard";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import { newsCategories, topics } from "../utils/constants";
import { useMediaQuery } from "@mui/material";

const NewsFeed = () => {
    const [newsData,setNewsData] = useState([]);
    const [selectedMenu,setSelectedMenu]= useState("Finance");
    const handleMenuSelect = (menu) => {
        setSelectedMenu(menu);
    };
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        fetchFromAPI(`query?function=NEWS_SENTIMENT&topics=${topics[selectedMenu]}&apikey=${process.env.AV_API_KEY}`)
        .then((data) => setNewsData(data["feed"]));
    },[selectedMenu]);

    return (
        <>
        {!isMobile && <Menu selectedMenu={selectedMenu} onSelectMenu={handleMenuSelect} categories={newsCategories} id="newsfeed" /> }
        {isMobile && <MobileMenu onSelectMenu={handleMenuSelect} /> }
        <br />
        <NewsCard newsData={newsData} />
        </>
    )
}

export default NewsFeed;