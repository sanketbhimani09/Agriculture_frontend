import React, { useState, useEffect } from "react";
import './Footer.css';
import './Technologys.css';
const Technologys = () => {
    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5000/technology')
            .then(response => response.json())
            .then(data => setTechnologies(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="backimage">
            <link href="/assets/css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
            <link href="/assets/css/style.css" rel="stylesheet" type="text/css" media="all" />
            <link href="/assets/css/mislider.css" rel="stylesheet" type="text/css" />
            <link href="/assets/css/mislider-custom.css" rel="stylesheet" type="text/css" />
            <link href="/assets/css/font-awesome.css" rel="stylesheet" />
            <script type="text/javascript" src="/assets/js/jquery-2.1.4.min.js"></script>
            
            <div align="center">
                <br />
                <h3 className="agileits_w3layouts_head">Agriculture <span>Technology</span></h3>
                <img src="/assets/images/1.png" alt="Agriculture Technology" className="img-responsive" />
            </div>
            
            <div className="container text-center">
                <p style={{ fontSize: "17px",backgroundColor: "rgba(120,120,120, 0.6)",color:"white",border:"1px solid black",borderRadius:"10px"}}>
                    Agricultural technology or agrotechnology (abbreviated agtech, agritech, AgriTech, or agrotech) is the use of technology in agriculture, horticulture, and aquaculture with the aim of improving yield, efficiency, and profitability.
                </p>
            </div>
            <br />
            
            <div className="container" align="center">
                <div className="row">
                    {technologies.map((technology) => (
                        <div className="col-4" key={technology._id}>
                            <div className="card" style={{ width: "20rem", height: "450px",boxShadow:"rgba(0, 0, 0, 0.26) 0px 20px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",marginBottom:"65px" }}>
                                <img 
                                    className="card-img-top" 
                                    src={technology.image} 
                                    alt={technology.title} 
                                    style={{ height: "230px", width: "auto" }} 
                                />
                                <div className="card-body">
                                    <h5 className="card-title" style={{ fontSize: "18px" }}>{technology.title}</h5>
                                    <p className="card-text" style={{ fontSize: "16px" }}>{technology.description}</p>
                                </div>
                            </div>
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Technologys;
