import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Box} from "@mui/material";
import {Navbar,NewsFeed,Stock, WorldMap} from "./components";
import { useState } from "react";
import { tickerContext } from "./contexts";
import { ThemeProvider, useTheme }from "@mui/material/styles";
const App = () => {
    
    const [ticker,setTicker] = useState("AAPL");
    const theme= useTheme();
    return(
    <ThemeProvider theme={theme} >
    <BrowserRouter>
        <Box sx={{backgroundColor:"#ffffff"}} >
            <tickerContext.Provider value= {{ticker,setTicker}} >
            <Navbar />
            <Routes>
                <Route exact path="/stocks" element={<Stock />} />
                <Route exact path="/global market" element={<WorldMap />} />
                <Route exact path="/news" element={<NewsFeed />} />
            </Routes>
            </tickerContext.Provider>
        </Box>
    </BrowserRouter>
    </ThemeProvider>
    );
}

export default App;