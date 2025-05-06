import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import './AdminHeader.css';
import axios from 'axios';
export default function AdminHeader() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [totalRecords, setTotalRecords] = useState(0);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = () => {
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
                localStorage.removeItem('adminID');
                navigate('/');
                Swal.fire({
                    title: "Logged Out!",
                    text: "You have been logged out.",
                    icon: "success"
                });
            }
        });
        setAnchorEl(null);
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleDrawerToggle = () => {
        // Toggle the sidebar and navigate to the given link
        const sidebarToggle = document.getElementById('nav-toggle');
        const navTitle = document.getElementById('nav-title');

        if (sidebarToggle) {
            sidebarToggle.checked = !sidebarToggle.checked;
        }
        if (navTitle) {
            window.open(navTitle.href, '_blank');
        }
    };

    axios.get("https://agriculture-backend-kjha.onrender.com/messages")
        .then(response => {
            setTotalRecords( response.data.length); // Assuming response.data is an array
            console.log("Total Records:", totalRecords);
        })
        .catch(error => {
            console.error("Error fetching messages:", error);
        });

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
        </Menu>
    );

    // const adminName=localStorage.getItem('adminID');
    return (
        <Box sx={{ flexGrow: 1 }} >
<AppBar position="fixed" style={{ backgroundColor: "#2c3e50" }}>
<Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerToggle} // Attach the toggle functionality here
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >

                        <div className="left-login-image "  >
                            <div class="w3_agile_logo" >
                                <h1><Link to='/'><span>A</span>griculture<i>Technology </i></Link></h1>
                            </div>
                        </div>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Link to='/Admin/Messages' style={{ color: "white" }}> <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={totalRecords} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton></Link>
                        {/* <div>
                {adminName}
              </div> */}
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
