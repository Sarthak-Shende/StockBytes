import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Box} from "@mui/material";
import {Navbar,Stock, WorldMap} from "./components";
import { useState } from "react";
import { tickerContext } from "./contexts";

const App = () => {
    
    const [ticker,setTicker] = useState("AAPL");
    return(
    <BrowserRouter>
        <Box sx={{backgroundColor:"#ffffff"}} >
            <tickerContext.Provider value= {{ticker,setTicker}} >
            <Navbar />
            <Routes>
                <Route exact path="/stocks" element={<Stock />} />
                <Route exact path="/global market" element={<WorldMap />} />
            </Routes>
            </tickerContext.Provider>
        </Box>
    </BrowserRouter>
    );
}

export default App;