import { ComposableMap, Geographies, Geography, Marker, Sphere } from "react-simple-maps";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { location } from "../utils/constants";

const WorldMap = () => {
    const mapData = require("../utils/countries-110m.json");
    const [status,setStatus] = useState([]);

    useEffect(() => {
        fetchFromAPI(`query?function=MARKET_STATUS&apikey=${process.env.AV_API_KEY}`)
        .then((data) => setStatus(data["markets"].filter(obj => obj["market_type"] === "Equity").map((item,index) => ({...item, ...location[index]}))));
    },[] );

    return(
        <>
        <Typography component='h2' textAlign='center' color="#800000" className="sub-heading" >
            Global Market Status
        </Typography>
        <ComposableMap >
            <Sphere strokeWidth={1} />
            <Geographies geography={mapData} >
                {({geographies}) => 
                geographies.map((geo) => (<Geography key={geo.rsmKey} geography={geo} fill="#00b300" stroke="#404040" strokeWidth={0.25} /> ))
                }
            </Geographies>
            {status.map((obj)=> (
                <Marker key={obj["region"]} coordinates={[obj["longitude"],obj["latitude"]]} fill="#e60000" >
                    <text font-size="9px" font-weight="bold" >
                    {obj["region"]}: {obj["current_status"]}
                    </text>
                </Marker>
            ))
            }
        </ComposableMap>
        </>
    )
}

export default WorldMap;