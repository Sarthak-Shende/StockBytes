import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper , IconButton, TextField, Autocomplete , debounce} from "@mui/material";
import { Search } from "@mui/icons-material";
import { fetchFromAPI } from "../utils/fetchFromAPI";


const SearchBar = () => {
    const [keyword,setKeyword]= useState(null);
    //const [inputKeyword,setInputKeyword] = useState("");

    const [keywordData,setKeywordData] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        if(keyword){
            setKeyword(keyword);
            setKeyword("");
        }
    }
    
    useEffect(() => {
    const delayedRequest = debounce(() => {
    if (keyword) {
        fetchFromAPI(
            `query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${process.env.AV_API_KEY}`
        ).then((data) => setKeywordData(data));
    }
    }, 400);

    delayedRequest();

    return delayedRequest.cancel;
}, [keyword]);
    console.log(keywordData);
    return(
        <Paper component="form" onSubmit={handleSubmit} sx={{ borderRadius:20, border:'1px solid #e3e3e3', pl:2, boxShadow:"none", mr:{sm:5} }} >
            <input placeholder="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <IconButton type="submit" sx={{p:'10px', color:"black"}} >
                <Search/>
            </IconButton>
        </Paper>
    )
}

export default SearchBar;

{/*
    <Card key={info} variant="outlined" id="card" sx={{m:0.2,p:0.2 }} >
            <CardContent >
                <Typography className="text" >
                    {info}: {data[info]}
                </Typography>
            </CardContent>
            </Card>
*/}