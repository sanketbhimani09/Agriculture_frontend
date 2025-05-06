import React, { useState, useEffect } from 'react';
import './Header.css';  // External CSS for styling
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cart from '../Cart/Cart'; // Import the Cart component
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
import { Slide } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const HideOnScroll = (props) => {
    const { children, window } = props; // Accept the window prop for scroll container

    // Pass the correct container to useScrollTrigger
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};


const Header = () => {
    const [activeLink, setActiveLink] = useState('');
    const [isResponsive, setIsResponsive] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false); // State for the Cart drawer
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem('adminID')) || Boolean(sessionStorage.getItem('userID'));

    useEffect(() => {
        const path = location.pathname;
        // Update the active link based on the current pathname
        if (path === "/Technology") {
            setActiveLink('technology');
        } else if (path === "/") {
            setActiveLink('home');
        } else if (path === "/Products") {
            setActiveLink('products');
        } else if (path === "/cart") {
            setActiveLink('cart');
        } else if (path === "/contact") {
            setActiveLink('contact');
        }
    }, [location.pathname]); // Only dependency is location.pathname to reflect page changes immediately

    const handleLinkClick = (link) => {
        // Check if the user is logged in by checking sessionStorage for userID
        const isUserLoggedIn = Boolean(sessionStorage.getItem('userID'));

        // If it's the 'cart' link
        if (link === 'cart') {
            if (isUserLoggedIn) {
                setIsCartOpen(true);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please do login first!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Login', { state: { loginType: 'user' } });
                    }
                });
            }
        }
        if (link === 'contact') {
            if (isUserLoggedIn) {
                window.location.href = '/ContactUs';
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please do login first!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Login', { state: { loginType: 'user' } });
                    }
                });
            }
        }
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleMenu = () => {
        setIsResponsive(!isResponsive);
    };
    const toggleCartDrawer = (open) => {
        setIsCartOpen(open);
    };
    const handleAdminLoginClick = () => {
        navigate('/Login', { state: { loginType: 'admin' } }); // Pass the admin login type using state
        setAnchorEl(null);
    };
    const handleUserLoginClick = () => {
        navigate('/Login', { state: { loginType: 'user' } });
        setAnchorEl(null);
        // Optionally pass 'user' if you want to distinguish
    };
    const handleLogout = () => {
        setAnchorEl(null);
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout"
        }).then((result) => {
            if (result.isConfirmed) {
                // Clear admin ID from localStorage
                localStorage.removeItem('AdminName');
                localStorage.removeItem('adminID');
                sessionStorage.removeItem('userID');
                sessionStorage.removeItem('UserName');
                
                // Navigate to the homepage
                navigate('/');

                Swal.fire({
                    title: "Logged Out!",
                    text: "You have been logged out.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <HideOnScroll window={undefined}>
            <div className={isResponsive ? "topnav responsive" : "topnav"} id="myTopnav">
                <div className="left-login-image">
                    <div class="w3_agile_logo" >
                        <h1><Link to='/'><span>A</span>griculture<i>Technology &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i></Link></h1>
                    </div>
                </div>
                <div className="nav-links">
                    <Link
                        to="/"
                        className={activeLink === 'home' ? 'active' : ''}
                        onClick={() => handleLinkClick('home')}
                    >
                        HOME
                    </Link>
                    <Link
                        to="/Technology"
                        className={activeLink === 'technology' ? 'active' : ''}
                        onClick={() => handleLinkClick('technology')}
                    >
                        TECHNOLOGY
                    </Link>
                    <Link
                        to="/Products"
                        className={activeLink === 'products' ? 'active' : ''}
                        onClick={() => handleLinkClick('products')}
                    >
                        PRODUCTS
                    </Link>
                    <Link
                        to="#"
                        className={activeLink === 'cart' ? 'active' : ''}
                        onClick={() => handleLinkClick('cart')}
                        id='cartt'
                    >
                        CART
                    </Link>
                    <Link
                        to="#"
                        className={activeLink === 'contact' ? 'active' : ''}
                        onClick={() => handleLinkClick('contact')}
                    >
                        CONTACT US
                    </Link>
                    {localStorage.getItem('adminID') && (
                        <Link
                            to="/Admin"
                            className={activeLink === 'Admin' ? 'active' : ''}
                        >
                            Admin
                        </Link>
                    )}
                </div>
                <div className="right-login-image">
                    <div style={{color:"white"}}>{sessionStorage.getItem('UserName')}
                        {localStorage.getItem('AdminName')}
                    </div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <img
                            src="/assets/images/LoginImage.png"
                            alt="login"
                            className="img-responsive"
                            style={{ width: "40px" }}
                        />
                    </IconButton>
                    <Menu id="menu-appbar" anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                        keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        sx={{ mt: "40px", ml: "-20px", boxShadow: 3, '.MuiMenuItem-root': { color: 'black', }, }}>

                        {isLoggedIn ? (
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        ) : (
                            <>
                                <MenuItem onClick={handleUserLoginClick}>User Login</MenuItem>
                                <MenuItem onClick={handleAdminLoginClick}>Admin Login</MenuItem>
                            </>
                        )}
                    </Menu>
                </div>
                <Cart isOpen={isCartOpen} toggleDrawer={toggleCartDrawer} />
            </div>
        </HideOnScroll>

    );
};

export default Header;