import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div align="center">
                <br />
                <h3 class="agileits_w3layouts_head">Grow <span>With</span> Us.</h3>
                <img src="/assets/images/1.png" alt="Blog Post 1" className="img-responsive" />
            </div>
            <div className="footer">

                <div className="container">
                    <div className="w3agile_footer_grids">
                        <div className="col-md-3 agileinfo_footer_grid">
                            <div className="agileits_w3layouts_footer_logo">
                                <h2><a href="index.html"><span>A</span>griculture<i>Technology</i></a></h2>
                            </div>
                        </div>
                        <div className="col-md-4 agileinfo_footer_grid">
                            <h3>Contact Info</h3>
                            <h4>Call Us <span>+91 7041302055</span></h4>
                            <p>sanketbhimani92@gmail.com<span>22010101018@gmail.com</span></p>
                            <ul className="agileits_social_list">
                                <li><a href="https://www.facebook.com/sanket.bhimani.09?rdid=vFa51SntHhisceVo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DyEYAVJpU%2F" className="w3_agile_facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="https://x.com/Sanket_Bhimani_?t=01O9kDq8jkDATlYMTIhTOg&s=09&mx=2" className="agile_twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                <li><a href="https://www.instagram.com/sanket_bhimani_?igsh=aDNmbjFsbGNsNGFr" className="w3_agile_instagram"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQEOZt8y3z2ukwAAAZNJQ5xgkrj83aZQBTY6YpILC2XOuQAaqs5upqblHd-mBxEUQkWigREkjy_iPqY-OlFyEaVBg0Qe3yeqbD0t-2jm2G5Jf9gHirwV_ftKkoadypZaCwpfrYg=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fsanket-bhimani-46292626a%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app" className="w3_agile_linkedin"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                        <div className="col-md-2 agileinfo_footer_grid agileinfo_footer_grid1">
                            <h3>Navigation</h3>
                            <ul className="w3layouts_footer_nav">
                                <li><Link to='/'><i className="fa fa-long-arrow-right" aria-hidden="true"></i>Home</Link></li>
                                <li><Link to='/Technology'><i className="fa fa-long-arrow-right" aria-hidden="true"></i>Technology</Link></li>
                                <li><Link to='/Products'><i className="fa fa-long-arrow-right" aria-hidden="true"></i>Product</Link></li>
                                <li><Link to='/ContactUs'><i className="fa fa-long-arrow-right" aria-hidden="true"></i>ContactUs</Link></li>
                            </ul>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
                <div className="w3_agileits_footer_copy">
                    <div className="container">
                        <p>&#169; Sanket Bhimani, All Right Reserved</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
