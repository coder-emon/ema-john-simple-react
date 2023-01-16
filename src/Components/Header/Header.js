import React from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
const Header = () => {
    return (
        <div className='header'>
            <div className="header-left">
                <img src={logo} alt="" />
            </div>
            <div className="header-right">
                <a href="/">Order</a>
                <a href="/">Order Review</a>
                <a href="/">Manage Inventory</a>
                <a href="/">Login</a>
            </div>
        </div>
    );
};

export default Header;