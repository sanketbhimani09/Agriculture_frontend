import React, { useState, useEffect } from 'react';

const Innovation=()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const menuPanel = document.querySelector('.shy-menu-panel');
        if (menuPanel) { // Check if menuPanel is not null
            if (isMenuOpen) {
                menuPanel.classList.add('open');
            } else {
                menuPanel.classList.remove('open');
            }
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const cardStyle = {
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const card1Style = {
        ...cardStyle,
        backgroundImage: 'url("https://zylemsa.co.za/wp-content/uploads/2019/09/Untitled-design.png")',
    };

    const card2Style = {
        ...cardStyle,
        backgroundImage: 'url("https://www.thegef.org/sites/default/files/2024-03/shutterstock_1827169505_rice_pesticides.jpg")',
    };

    const card3Style = {
        ...cardStyle,
        backgroundImage: 'url("https://media.istockphoto.com/id/1128687123/photo/shopping-bag-full-of-fresh-vegetables-and-fruits.jpg?s=612x612&w=0&k=20&c=jXInOVcduhEnfuUVffbUacldkF5CwAeThD3MDUXCItM=")',
    };

    return (
        <div>
            <link href="/assets/css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
            <link href="/assets/css/style.css" rel="stylesheet" type="text/css" media="all" />
            <link href="/assets/css/mislider.css" rel="stylesheet" type="text/css" />
            <link href="/assets/css/mislider-custom.css" rel="stylesheet" type="text/css" />
            <link href="/assets/css/font-awesome.css" rel="stylesheet" />
            <script type="text/javascript" src="/assets/js/jquery-2.1.4.min.js"></script>          
            <h2>Hello from Innovation</h2>
            
        </div>
    );
}
export default Innovation;