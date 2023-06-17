import {Stack} from "@mui/material";

const Menu = ({selectedMenu,onSelectMenu,categories}) => {
    const handleMenuClick = (category) => {
        onSelectMenu(category);
    };

    return (
    <Stack direction="row" alignItems="flex-start" justifyContent="flex-start" spacing={2} sx={{overflow:"auto" }} >
        {categories.map((category) => (
            <button key={category} onClick={() => handleMenuClick(category)} >
                <span style={{color: category===selectedMenu ? "#000000":"#404040", opacity: category === selectedMenu ? '1':'0.8' }} >{category}</span>
            </button>
        ))}
    </Stack>
    ) 
}

export default Menu;