import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const NavBar = () => {
    const menuItems = ['Home', 'About', 'Services', 'Contact'];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#333',
                    color: '#fff',
                },
            }}
        >
            <List>
                {menuItems.map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default NavBar;