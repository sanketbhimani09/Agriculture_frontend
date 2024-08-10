import React, { useState, useEffect } from 'react';

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    useEffect(() => {
        const menuPanel = document.querySelector('.shy-menu-panel');
        if (menuPanel) { 
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
            {/* Importing external CSS */}
            <link href="/assets/css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
            <link href="/assets/css/style.css" rel="stylesheet" type="text/css" media="all" />
            <link href="/assets/css/mislider.css" rel="stylesheet" type="text/css" />
            <link href="/assets/css/mislider-custom.css" rel="stylesheet" type="text/css" />
            <link href="/assets/css/font-awesome.css" rel="stylesheet" />

            {/* Importing external JS */}
            <script type="text/javascript" src="/assets/js/jquery-2.1.4.min.js"></script>

            {/* Removed Header for this part */}

            <div className="banner">
                <div className="container">
                    <div className="w3_banner_info">
                        <div className="w3_banner_info_grid">
                            <h3 className="test" style={{ fontSize: "50px" }}>What is Agriculture?</h3>
                            <p style={{
                                fontSize: "17px",
                                backgroundColor: "rgba(90, 90, 90, 0.7)",
                                padding: "10px",
                                borderRadius: "5px"
                            }}>
                                <span style={{ fontSize: "20px" }}>&#8618;</span> &nbsp;To answer the question of what is agriculture, let's look at the definition first, then we can dive into history, learn how agriculture started and how it looks today.<br />
                                <span style={{ fontSize: "20px" }}>&#8618;</span> &nbsp;Agriculture is the science of farming, it includes the cultivation of soil for growing crops, rearing animals to provide food, wool and other products, and harvesting grown crops as effectively as possible.<br />
                                <span style={{ fontSize: "20px" }}>&#8618;</span> &nbsp;It is agriculture that has allowed human civilization to expand to the great heights that it is at today, and it is agriculture that took humanity from the simple hunter-gatherer way of life to a more complex society.
                            </p>
                            <ul>
                                <li><a href="contact.html" className="w3l_contact">Contact Us</a></li>
                                <li style={{ marginLeft: "5px" }}><a href="#" className="w3ls_more" data-toggle="modal" data-target="#myModal">Read More</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <div className="modal video-modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            Germinate
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <section>
                            <div className="modal-body">
                                <img src="/assets/images/4.jpg" alt=" " className="img-responsive" />
                                <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div className="banner-bottom">
                <div className="col-md-4 agileits_banner_bottom_left" style={card1Style}>
                    <div className="agileinfo_banner_bottom_pos">
                        <div className="w3_agileits_banner_bottom_pos_grid">
                            <div className="col-xs-4 wthree_banner_bottom_grid_left">
                                <div className="agile_banner_bottom_grid_left_grid hvr-radial-out">
                                    <i className="fa fa-pagelines" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="col-xs-8 wthree_banner_bottom_grid_right">
                                <h4>Subsistence Agriculture</h4>
                                <p>Subsistence farming is a form of farming where nearly all crops or livestock raised are used to maintain the farmer and their family. There is little to no surplus available for sale or trade.</p>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 agileits_banner_bottom_left1" style={card2Style}>
                    <div className="agileinfo_banner_bottom_pos">
                        <div className="w3_agileits_banner_bottom_pos_grid">
                            <div className="col-xs-4 wthree_banner_bottom_grid_left">
                                <div className="agile_banner_bottom_grid_left_grid hvr-radial-out">
                                    <i className="fa fa-certificate" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="col-xs-8 wthree_banner_bottom_grid_right">
                                <h4>Commercial Agriculture</h4>
                                <p>Commercial agriculture can be defined as farming that focuses on producing agricultural products for sale in the market rather than solely for subsistence purposes</p>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 agileits_banner_bottom_left2" style={card3Style}>
                    <div className="agileinfo_banner_bottom_pos">
                        <div className="w3_agileits_banner_bottom_pos_grid">
                            <div className="col-xs-4 wthree_banner_bottom_grid_left">
                                <div className="agile_banner_bottom_grid_left_grid hvr-radial-out">
                                    <i className="fa fa-yelp" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="col-xs-8 wthree_banner_bottom_grid_right">
                                <h4>Mixed Farming</h4>
                                <p>Mixed farming is a type of farming which involves both the growing of crops and the raising of livestock.</p>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                    </div>
                </div>
                <div className="clearfix"> </div>
            </div>
        </div>
    );
};

export default Home;
