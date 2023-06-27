import {Stack} from "@mui/material";

const Menu = ({selectedMenu,onSelectMenu,categories,id}) => {
    const handleMenuClick = (category) => {
        onSelectMenu(category);
    };

    return (
    <Stack direction="row" alignItems="flex-start" justifyContent="flex-start" spacing={0.5} sx={{overflow:"auto" }} >
        {categories.map((category) => (
            <button key={category} id={id} onClick={() => handleMenuClick(category)} className="text" >
                <span style={{color: category===selectedMenu ? "#ffffff":"#e6e6e6", opacity: category === selectedMenu ? '1':'0.9' }} >{category}</span>
            </button>
        ))}
    </Stack>
    ) 
}

export default Menu;