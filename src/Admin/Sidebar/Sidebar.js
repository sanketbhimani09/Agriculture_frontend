import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [hoverIndex, setHoverIndex] = useState(null);

    const buttons = [
        { icon: 'fa-sitemap', label: 'Technology', path: '/Technology' },
        { icon: 'fa-sitemap', label: 'Product Category', path: '/Admin' },
        { icon: 'fa-truck', label: 'Pending Orders',path:'/Admin/Pending-Orders' },
        { icon: 'fa-list-alt', label: 'Completed Orders',path:'/Admin/Completed-Orders' },
        { icon: 'fa-users', label: 'Users', path:'/Admin/Users' },
        { icon: 'fa-home', label: 'Home', path:'/' },
    ];

    return (
        <div id="nav-bar">
            <input id="nav-toggle" type="checkbox" />
            <div id="nav-content" style={{marginTop:"30px",borderRadius:"20px"}}>
                {buttons.map((button, index) => (
                    <Link key={index} className="nav-button" to={button.path}>
                        <div
                            key={index}
                            className="nav-button"
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                        >
                            <i className={`fas ${button.icon}`}></i>
                            <span>{button.label}</span>
                        </div>
                    </Link>

                ))}
                <div
                    id="nav-content-highlight"
                    style={{
                        top: hoverIndex !== null ? `${hoverIndex * 54 + 16}px` : '-54px',
                    }}
                ></div>
            </div>
        </div>
    );
};
export default Sidebar;