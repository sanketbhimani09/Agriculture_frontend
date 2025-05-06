import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Collections = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // To hold selected product data for modal
    const [showModal, setShowModal] = useState(false); // To control modal visibility
    const location = useLocation();
    const navigate = useNavigate();
    const categoryName = location.state?.categoryName || "Collection";

    const cartAddApi = "https://agriculture-backend-kjha.onrender.com/add-product-cart";


    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`https://agriculture-backend-kjha.onrender.com/products/${categoryId}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]); // If not an array, set to empty
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [categoryId]);

    const handleCardClick = (product) => {
        const selectedSize = product.selectedSize || product.variants[0]?.size; // Default to the first size
        const selectedPrice =
            product.selectedPrice ||
            product.variants.find((variant) => variant.size === selectedSize)?.price; // Find price for the selected size
        setSelectedProduct({
            ...product,
            selectedSize: selectedSize,
            selectedPrice: selectedPrice,
        });
        setShowModal(true); // Show the modal
    };
    // Function to close the modal
    const closeModal = () => {
        setShowModal(false); // Hide the modal
        setSelectedProduct(null); // Reset the selected product
    };
    // Handle size change for price update
    const handleSizeChange = (productId, selectedSize) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === productId
                    ? {
                        ...product,
                        selectedSize: selectedSize, // Update the selected size
                        selectedPrice: product.variants.find(
                            (variant) => variant.size === selectedSize
                        )?.price, // Update price based on selected size
                    }
                    : product
            )
        );
    };
    const handleModalSizeChange = (selectedSize) => {
        setSelectedProduct((prevProduct) => {
            const selectedPrice = prevProduct.variants.find(
                (variant) => variant.size === selectedSize
            )?.price;
            return {
                ...prevProduct,
                selectedSize: selectedSize,
                selectedPrice: selectedPrice,
            };
        });
    };
    const addInCart = async (e) => {
        e.preventDefault();

        const userId = sessionStorage.getItem("userID"); // Get the logged-in user's ID from session storage
        if (!userId) {
            navigate('/Login', { state: { loginType: 'user' } });
            // alert("User not logged in.");
            return;
        }

        const data = {
            productName: selectedProduct.productName,
            productCompany: selectedProduct.productCompany,
            productImageUrl: selectedProduct.productImageUrl,
            size: selectedProduct.selectedSize,
            price: selectedProduct.selectedPrice,
            quantity: 1, // Default quantity
            userId: userId, // Attach the userId
        };

        try {
            const response = await fetch(cartAddApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data), // Send the correct data format
            });
            window.dispatchEvent(new Event('cartUpdated'));
            if (response.ok) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added in Cart !",
                    showConfirmButton: false,
                    timer: 1500
                });
                if (typeof window.cartUpdateEvent === 'function') {
                    window.cartUpdateEvent(); // Call the global event to update the cart
                }

            } else {
                const errorMsg = await response.text();
                alert(`Failed to add product to cart: ${errorMsg}`);
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("An error occurred while adding the product to cart.");
        }
    };
    const checkLogin = async (e, selectedProduct, navigate) => {
        e.preventDefault();
        const userId = sessionStorage.getItem("userID"); // Get the logged-in user's ID from session storage
        console.log("user logged in ?:" + userId)
        if (!userId) {
            navigate('/Login', { state: { loginType: 'user' } });
            return;
        } else {
            const query = `productName=${encodeURIComponent(selectedProduct.productName)}&size=${encodeURIComponent(selectedProduct.selectedSize)}&price=${encodeURIComponent(selectedProduct.selectedPrice)}`;
            navigate(`/BookNow?${query}`);
        }
    }

    return (
        <>
            <div style={{
                width: "100%", height: "100px", backgroundColor: "rgb(34,193,195)",
                background: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', color: "white" }}>
                    <h2>{categoryName}</h2>
                </div>
            </div>
            <div style={{ width: "100%", backgroundColor: "#EAF5F1", paddingTop: "40px" }}>
                <div className="container">
                    <div className="row">
                        {products.length === 0 ? (
                            <div className="col-12" align="center">
                                <img src="/assets/images/NoData.png" alt='no data' style={{ width: "500px", height: "500px" }} />
                                {/* <h4>No products available in this category.</h4> */}
                            </div>
                        ) : (
                            products.map((product) => (
                                <div
                                    key={product._id}
                                    className="col-md-2"
                                    style={{ flex: '0 0 20%', maxWidth: '20%' }}
                                // Handle card click
                                >
                                    <div className="card p-1" style={{ width: "13rem", border: "1px solid grey", borderRadius: "13px" }}>
                                        <img
                                            src={product.productImageUrl}
                                            className="card-img-top"
                                            alt={product.productName}
                                            onClick={() => handleCardClick(product)}
                                            style={{ height: "200px" }}
                                        />
                                        <div className="card-body" style={{ fontFamily: "Nunito, sans-serif", fontWeight: "bold" }}>
                                            <h5 className="card-title" style={{ fontFamily: "Nunito, sans-serif", fontWeight: "bold" }}>{product.productName}</h5>
                                            <p className="card-text text-secondary" style={{ fontSize: "13px" }}>{product.productCompany}</p>
                                            <div className='row' style={{ marginTop: "4px" }}>
                                                <div className='col' style={{ marginTop: "7px" }}>Size:</div>
                                                <div className='col-8'><select
                                                    onChange={(e) => handleSizeChange(product._id, e.target.value)}
                                                    value={product.selectedSize || product.variants[0]?.size} // Set the default size to the first option
                                                    className="form-select"
                                                >
                                                    {product.variants.map((variant) => (
                                                        <option key={variant._id} value={variant.size}>
                                                            {variant.size}
                                                        </option>
                                                    ))}
                                                </select></div>
                                            </div>

                                            {/* Price based on selected size */}
                                            <div className='row' style={{ marginTop: "5px" }}>
                                                <div className='col'>
                                                    Price: <span className="fs-5">&nbsp;&nbsp;&nbsp;&#8377;{product.selectedPrice || product.variants[0]?.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedProduct && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} aria-labelledby="exampleModalCenterTitle" aria-hidden="false">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content" style={{ borderRadius: "10px" }}>
                            <div className="bg-white" style={{ borderRadius: "10px", marginRight: "30px", marginTop: "25px" }}>
                                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                    <span aria-hidden="true" align="right">
                                        <i className="fa fa-close" style={{ color: "grey", fontSize: "35px" }}></i>
                                    </span>
                                </button>
                            </div>
                            <div className="modal-body" align="center">
                                <img src={selectedProduct.productImageUrl} alt={selectedProduct.productName} style={{ width: '50%' }} />
                                <h5 className="modal-title" id="exampleModalLongTitle" >{selectedProduct.productName}</h5>
                                <p className="text-dark"><strong>Description:</strong> {selectedProduct.Description}</p>
                                <div className="row" style={{ marginTop: "4px" }}>
                                    <div className="col-3" style={{ marginTop: "7px" }} >Size:</div>
                                    <div className="col-3">
                                        <select
                                            onChange={(e) => handleModalSizeChange(e.target.value)}
                                            value={selectedProduct.selectedSize}
                                            className="form-select"
                                        >
                                            {selectedProduct.variants.map((variant) => (
                                                <option key={variant._id} value={variant.size}>
                                                    {variant.size}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "5px", paddingLeft: "37px" }}>
                                    <div className="col" align="left">
                                        Price: <span className="fs-5 ms-5">&#8377;{selectedProduct.selectedPrice}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button type="button" className="btn btn-warning" onClick={addInCart}>Add to Cart</button>
                                <Link
                                // to={`/BookNow?productName=${encodeURIComponent(selectedProduct.productName)}&size=${encodeURIComponent(selectedProduct.selectedSize)}&price=${selectedProduct.selectedPrice}`}
                                >
                                    <button type="button" className="btn btn-success" onClick={(e) => checkLogin(e, selectedProduct, navigate)}>
                                        Buy Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};
export default Collections;