import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const WorldMap = () => {
    const mapData = require("../utils/countries-110m.json");
    const [status,setStatus] = useState([]);
    const location = [
        {"region": "United States", "latitude":39.73915,"longitude": -104.9847 },
        {"region": "Canada", "latitude":53.50172,"longitude": -113.36274 },
        {"region": "United Kingdom", "latitude":56.46913,"longitude": -2.97489 },
        {"region": "Germany", "latitude":50.1109,"longitude":8.6821 },
        {"region": "France", "latitude":46.58333,"longitude":0.33333 },
        {"region": "Spain", "latitude":41.65518,"longitude": -4.72372 },
        {"region": "Portugal", "latitude":38.7223,"longitude": -9.1393 },
        {"region": "Japan", "latitude":35.6762,"longitude":139.6503 },
        {"region": "India", "latitude":19.0760,"longitude":72.8777 },
        {"region": "Mainland China", "latitude": 36.85316,"longitude":101.99169 },
        {"region": "Hong Kong", "latitude":22.3193,"longitude":114.1694 },
        {"region": "Brazil", "latitude": -10.16745,"longitude": -48.32766 },
        {"region": "Mexico", "latitude":24.02032,"longitude": -104.65756 },
        {"region": "South Africa", "latitude": -30.71999,"longitude":25.09718 }
    ];

    useEffect(() => {
        fetchFromAPI(`query?function=MARKET_STATUS&apikey=${process.env.AV_API_KEY}`)
        .then((data) => setStatus(data["markets"]));
    },[] );
    
    let market=status.filter(obj => obj["market_type"] == "Equity");
    let mergedArray= market.map((item,index) => ({...item, ...location[index],}));
    console.log(mergedArray);
    return(
        <>
        <Typography variant="h1" >
            Global Market Status
        </Typography>
        <ComposableMap >
            <Geographies geography={mapData} >
                {({geographies}) => 
                geographies.map((geo) => (<Geography key={geo.rsmKey} geography={geo} fill="#00b300" stroke="#404040" strokeWidth={0.25} /> ))
                }
            </Geographies>
            {mergedArray.map((obj)=> (
                <Marker coordinates={[obj["longitude"],obj["latitude"]]} fill="#e60000" >
                    
                    <text font-size="7px" font-weight="bold" >
                    {obj["region"]}:{obj["current_status"]}
                    </text>
                </Marker>
            ))
            }
        </ComposableMap>
        </>
    )
}

export default WorldMap;