import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

import './header.css'
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
           <Link to="/home"><h1 className="text-light logoCls">Get-Goods</h1></Link> 
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/order">Order</Link>
                <Link to="/admin">Admin </Link>
                <Link to="/login"> Log In</Link>
                <Link className='bg-info'>{loggedInUser.name}</Link>

            </nav>
        </div>
    );
};

export default Header;