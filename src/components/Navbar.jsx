import { Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import { categories } from "../utils/constants";
const Navbar = () => {
    const [selectedMenu,setSelectedMenu] = useState("Stocks");
    const navigate=useNavigate();
    const handleMenuSelect = (menu) => {
        setSelectedMenu(menu);
    };

    useEffect(() => {
        if(selectedMenu){
            navigate(`/${selectedMenu}`);
        }
    },[selectedMenu]);
    
    return(
    <>
    <Stack direction="row" alignItems="center" p={2} sx={{position:"sticky",top:0,background:"#E63946",justifyContent:"space-between"}} >
        <Link to="/stocks" style={{display:"flex" ,alignItems:"center" }} >
            <img id="logo" src={logo} alt="logo" />
        </Link>
        <Typography component="h2" color="#ffffff" className="main-heading" textAlign='center' >
            StockBytes
        </Typography>
        <SearchBar/>
    </Stack>

    <Stack direction="row" alignItems="center" p={2} sx={{position:"static", background:"#E63946"}} >
        <Menu selectedMenu={selectedMenu} onSelectMenu={handleMenuSelect} categories={categories} id="navbar" />
    </Stack>
    </>
    )
    }

export default Navbar;