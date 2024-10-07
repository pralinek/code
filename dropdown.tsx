import React from 'react';
import { DropdownList } from 'react-widgets';
import 'react-widgets/styles.css';

const NavBar = () => {
    const menuItems = ['Home', 'About', 'Services', 'Contact'];

    return (
        <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
            <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
                {menuItems.map((item) => (
                    <li key={item} style={{ marginRight: '2rem' }}>
                        <DropdownList
                            data={[item]} 
                            defaultValue={item}
                            style={{
                                backgroundColor: '#333',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            containerClassName="nav-dropdown"
                            inputProps={{ style: { color: 'white' } }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;