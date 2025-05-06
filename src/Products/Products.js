import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Products = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const carouselRef = useRef(null);  // Create a ref for the carousel container

    // Fetch categories from your API
    useEffect(() => {
        fetch('https://agriculture-backend-kjha.onrender.com/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching data:', error));

        // Initialize the Bootstrap carousel only once after the component mounts
        if (carouselRef.current) {
            const carouselInstance = new window.bootstrap.Carousel(carouselRef.current, {
                interval: 2500,
                ride: "carousel",
                wrap: true,
            });

            // Cleanup the carousel instance when the component unmounts
            return () => {
                carouselInstance.dispose();
            };
        }
    }, []); // Empty dependency array means this effect runs once

    // Handle category click and navigate to the collection page
    const handleCategoryClick = (categoryId, categoryName) => {
        console.log("Navigating to:", categoryId, categoryName); // Debug log
        navigate(`/collections/${categoryId}`, { state: { categoryName } });
    };

    return (
        <>
            {/* Carousel */}
            <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
                ref={carouselRef}  // Attach the ref here
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="/assets/images/slide1.webp" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="/assets/images/slide2.webp" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="/assets/images/slide3.webp" alt="Third slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="/assets/images/slide4.webp" alt="fourth slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

            {/* Categories */}
            <br />
            <div className="container">
                <h2 align="center">Product Categories</h2>
                <hr style={{height: "1px", backgroundColor: "black"}} />
                <div className="row">
                    {categories.map((category) => (
                        <div key={category._id} className="col-md-2" onClick={() => handleCategoryClick(category._id, category.categoryName)}>
                            <div style={{ padding: '20px', cursor: 'pointer' }}>
                                <img
                                    src={category.imageUrl}
                                    style={{ width: "100%", borderRadius: "100%" }}
                                    alt={category.categoryName}
                                />
                                <h4 align="center" className="p-2" style={{ fontFamily: "Nunito, sans-serif", fontWeight: "bold" }}>
                                    {category.categoryName}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Products;
