import { useEffect, useRef, useState } from "react";
import { TextField, Autocomplete , Box} from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useContext } from "react";
import { tickerContext } from "../contexts";

const SearchBar = () => {
    
    const loading= useRef(false);
    const [inputKeyword,setInputKeyword] = useState("");
    const [keywordData,setKeywordData] = useState([]);
    const [keyword,setKeyword]= useState(null);
    const {setTicker} = useContext(tickerContext);
    
    useEffect(() => {
    loading.current = true;

    const timer = setTimeout(() => {
    if (inputKeyword !== "") {
        fetchFromAPI(
        `query?function=SYMBOL_SEARCH&keywords=${inputKeyword}&apikey=${process.env.AV_API_KEY}`
        ).then((data) => {
        setKeywordData(data["bestMatches"].filter(obj => obj["3. type"] === "Equity"));
        loading.current = false;
        });
    } else {
        setKeywordData([]);
        loading.current = false;
    }
    }, 1000);

    return () => {
    clearTimeout(timer);
    };
}, [inputKeyword]);

    keyword?setTicker(keyword["1. symbol"]):null;
    
    return(
        <Autocomplete 
            options={keywordData}
            isOptionEqualToValue={(option,value) => option["1. symbol"] === value["1. symbol"]}
            loading={loading.current}
            sx={{background:'#cccccc'}}
            filterOptions={(x) => x}
            noOptionsText={"Enter correct stock ticker"}
            getOptionLabel={(option) => `${option["1. symbol"]}`}
            renderOption={(props,keywordData) => (
                <Box component="li" {...props} >
                    {keywordData["2. name"]}  symbol:{keywordData["1. symbol"]} ({keywordData["4. region"]} )
                </Box>
            )}
            renderInput={(params) => (
                <TextField {...params} label="Search stock..." size="small" />
            )}
            onInputChange={(e,newval) => setInputKeyword(newval)}
            onChange={(e,newVal) => setKeyword(newVal) }
            id="search-bar"
        />
    )
}

export default SearchBar;