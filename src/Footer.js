import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for styling

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="w3agile_footer_grids">
          <div className="col-md-3 agileinfo_footer_grid">
            <div className="agileits_w3layouts_footer_logo">
              <h2><a href="index.html"><span>G</span>erminate<i>Grow healthy products</i></a></h2>
            </div>
          </div>
          <div className="col-md-4 agileinfo_footer_grid">
            <h3>Contact Info</h3>
            <h4>Call Us <span>+1234 567 891</span></h4>
            <p>My Company, 875 Jewel Road <span>8907 Ukraine.</span></p>
            <ul className="agileits_social_list">
              <li><a href="#" className="w3_agile_facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a href="#" className="agile_twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
              <li><a href="#" className="w3_agile_dribble"><i className="fa fa-dribbble" aria-hidden="true"></i></a></li>
              <li><a href="#" className="w3_agile_vimeo"><i className="fa fa-vimeo" aria-hidden="true"></i></a></li>
            </ul>
          </div>
          <div className="col-md-2 agileinfo_footer_grid agileinfo_footer_grid1">
            <h3>Navigation</h3>
            <ul className="w3layouts_footer_nav">
              <li><a href="index.html"><i className="fa fa-long-arrow-right" aria-hidden="true"></i>Home</a></li>
              <li><a href="icons.html"><i className="fa fa-long-arrow-right" aria-hidden="true"></i>Web Icons</a></li>
              <li><a href="typography.html"><i className="fa fa-long-arrow-right" aria-hidden="true"></i>Typography</a></li>
              <li><a href="contact.html"><i className="fa fa-long-arrow-right" aria-hidden="true"></i>Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-3 agileinfo_footer_grid">
            <h3>Blog Posts</h3>
            <div className="agileinfo_footer_grid_left">
              <a href="#" data-toggle="modal" data-target="#myModal"><img src="/assets/images/6.jpg" alt="Blog Post 1" className="img-responsive" /></a>
            </div>
            <div className="agileinfo_footer_grid_left">
              <a href="#" data-toggle="modal" data-target="#myModal"><img src="/assets/images/2.jpg" alt="Blog Post 2" className="img-responsive" /></a>
            </div>
            <div className="agileinfo_footer_grid_left">
              <a href="#" data-toggle="modal" data-target="#myModal"><img src="/assets/images/5.jpg" alt="Blog Post 3" className="img-responsive" /></a>
            </div>
            <div className="agileinfo_footer_grid_left">
              <a href="#" data-toggle="modal" data-target="#myModal"><img src="/assets/images/3.jpg" alt="Blog Post 4" className="img-responsive" /></a>
            </div>
            <div className="clearfix"> </div>
          </div>
          <div className="clearfix"> </div>
        </div>
      </div>
      <div className="w3_agileits_footer_copy">
        <div className="container">
          <p><a target="_blank" rel="noopener noreferrer" href="https://www.templateshub.net">Templates Hub</a></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
