import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper , IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const SearchBar = () => {
    const [selectedKeyword,setSelectedKeyword]= useState("");
    const [keywordData,setKeywordData] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(selectedKeyword){
            setSelectedKeyword("");
        }
    }
    
    useEffect( () => {
        fetchFromAPI(`query?function=SYMBOL_SEARCH&keywords=${selectedKeyword}&apikey=${process.env.AV_API_KEY}`)
        .then( (data) => setKeywordData(data));
    },[selectedKeyword] );
    console.log(keywordData);
    return(
        <Paper component="form" onSubmit={handleSubmit} sx={{ borderRadius:20, border:'1px solid #e3e3e3', pl:2, boxShadow:"none", mr:{sm:5} }} >
            <input placeholder="Search..." value={selectedKeyword} onChange={(e) => setSelectedKeyword(e.target.value)} />
            <IconButton type="submit" sx={{p:'10px', color:"black"}} >
                <Search/>
            </IconButton>
        </Paper>
    )
}

export default SearchBar;