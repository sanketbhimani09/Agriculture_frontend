import React, { useState } from 'react';
import './Header.css';  // External CSS for styling
import { Link } from 'react-router-dom';

const Header = () => {
    const [activeLink, setActiveLink] = useState('home');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className="navbar">
            <Link
                to="/" // Use the path that matches your route
                className={activeLink === 'about' ? 'active' : ''}
                onClick={() => handleLinkClick('about')}
            >
                HOME
            </Link>
            <Link
                to="/Technology" // Use the path that matches your route
                className={activeLink === 'about' ? 'active' : ''}
                onClick={() => handleLinkClick('about')}
            >
                TECHNOLOGY
            </Link>
            <a
                href="#services"
                className={activeLink === 'services' ? 'active' : ''}
                onClick={() => handleLinkClick('services')}
            >
                SERVICES
            </a>
            <a
                href="#gallery"
                className={activeLink === 'gallery' ? 'active' : ''}
                onClick={() => handleLinkClick('gallery')}
            >
                GALLERY
            </a>
            <a
                href="#contact"
                className={activeLink === 'contact' ? 'active' : ''}
                onClick={() => handleLinkClick('contact')}
            >
                CONTACT US
            </a>
        </div>
    );
};

export default Header;