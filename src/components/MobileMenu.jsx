import { Typography, Menu, MenuItem, List, ListItem, ListItemText } from '@mui/material';
import { useState, } from 'react';
import { newsCategories } from '../utils/constants';

const MobileMenu = ({onSelectMenu}) => {
    const [anchorEl,setAnchorEl] = useState(null);
    const [selectedIndex,setSelectedIndex] = useState(0);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event,index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
    <>
        <List
        component="nav"
        aria-label='topic'
        sx={{bgcolor:'Background.paper'}}
        >
            <ListItem
                button
                id="basic-button"
                aria-haspopup="listbox"
                aria-controls="basic-menu"
                aria-label="Topic:"
                aria-expanded={open?"true":undefined}
                onClick={handleClick}
            >
                <ListItemText
                >
                    <Typography textAlign="center" fontWeight="bold" className='text'>
                        Topic: {newsCategories[selectedIndex]}
                    </Typography>
                    {onSelectMenu(newsCategories[selectedIndex])}
                </ListItemText>
            </ListItem>
        </List>
        <Menu
        id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{"aria-labelledby":"basic-button", role:'list-box' }}
        >
            {newsCategories.map((category,index) => (
                <MenuItem
                key={category}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event,index)}
                >
                    {category}
                </MenuItem>
            ))}
        </Menu>
    </>
    )
}

export default MobileMenu;