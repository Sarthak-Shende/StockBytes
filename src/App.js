import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Box} from "@mui/material";
import {Navbar,Stock} from "./components";

const App = () => (
    <BrowserRouter>
        <Box sx={{backgroundColor:"#ffffff"}} >
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Stock/>} />
            </Routes>
        </Box>
    </BrowserRouter>
);

export default App;