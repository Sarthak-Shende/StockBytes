import { useEffect, useRef, useState } from "react";
import { TextField, Autocomplete , Box} from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";


const SearchBar = () => {
    //const [keyword,setKeyword]= useState("");
    const loading= useRef(false);
    const [inputKeyword,setInputKeyword] = useState("");
    const [keywordData,setKeywordData] = useState([]);
    
    useEffect(() => {
    loading.current = true;

    const timer = setTimeout(() => {
    if (inputKeyword !== "") {
        fetchFromAPI(
        `query?function=SYMBOL_SEARCH&keywords=${inputKeyword}&apikey=${process.env.AV_API_KEY}`
        ).then((data) => {
        setKeywordData(data["bestMatches"]);
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

    //console.log(keywordData);
    //console.log(inputKeyword);

    return(
        <Autocomplete 
            options={keywordData}
            isOptionEqualToValue={(option,value) => option["1. symbol"] === value["1. symbol"]}
            loading={loading.current}
            sx={{width:300}}
            filterOptions={(x) => x}
            noOptionsText={"Enter correct stock ticker"}
            getOptionLabel={(option) => `${option["1. symbol"]}`}
            renderOption={(props,keywordData) => (
                <Box component="li" {...props} >
                    {keywordData["2. name"]}  symbol:{keywordData["1. symbol"]} ({keywordData["3. type"]} from {keywordData["4. region"]} )
                </Box>
            )}
            renderInput={(params) => (
                <TextField {...params} label="Search stock..." />
            )}
            onInputChange={(e,newval) => setInputKeyword(newval)}
        />
    )
}

export default SearchBar;