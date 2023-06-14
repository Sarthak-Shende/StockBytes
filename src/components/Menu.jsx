import {Stack} from "@mui/material";
import { categories } from "../utils/constants";

const selectedMenu="Stocks";

const Menu = ({selectedMenu,setSelectedMenu}) => {
    return (
    <Stack direction="row" alignItems="flex-start" justifyContent="flex-start" spacing={2} sx={{overflow:"auto" }} >
        {categories.map((category) => (
            <button key={category} onClick={() => setSelectedMenu(category)} >
                <span style={{color: category===selectedMenu ? "#000000":"#404040", opacity: category === selectedMenu ? '1':'0.8' }} >{category}</span>
            </button>
        ))}
    </Stack>
    )
}

export default Menu;