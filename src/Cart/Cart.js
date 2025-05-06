import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function Cart({ isOpen, toggleDrawer }) {
    const [cartItems, setCartItems] = useState([]);
    const [userID,setUserID]=useState(null);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    // Fetch cart items for the logged-in user
    const fetchCartItems = () => {
        setUserID(sessionStorage.getItem('userID'));
        if (userID) {
            axios.get(`https://agriculture-backend-kjha.onrender.com/cart/${userID}`)
                .then(response => {
                    console.log('Cart items response:', response.data); // Print response in console
                    setCartItems(response.data);
                })

                .catch(error => {
                    console.error('Error fetching cart items:', error);
                    setCartItems([]);
                });
        }
    };
    useEffect(() => {
        if (sessionStorage.getItem('userID')) {
            fetchCartItems();  // Fetch cart data when user logs in
        }
    }, [sessionStorage.getItem('userID')]);  // Depend on login state
    
    // Fetch cart items on component load
    useEffect(() => {
        fetchCartItems();
        const handleCartUpdate = () => fetchCartItems();
        window.addEventListener('cartUpdated', handleCartUpdate);
        // window.cartUpdateEvent = fetchCartItems;
        return () => {
            // window.cartUpdateEvent = null;
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, [userID]);
    useEffect(() => {
        const calculatedTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(calculatedTotal);
    }, [cartItems]);

    // Update quantity handler
    const updateQuantity = (productId, change) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );

        const updatedItem = cartItems.find(item => item._id === productId);
        if (updatedItem) {
            const newQuantity = Math.max(1, updatedItem.quantity + change);

            // Send updated quantity to the API
            axios.put(`https://agriculture-backend-kjha.onrender.com/cart/update/${productId}`, { quantity: newQuantity })
                .then(response => {
                    console.log('Quantity updated successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error updating quantity:', error);
                });
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`https://agriculture-backend-kjha.onrender.com/delete-CartProduct/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                // Remove the item from the cart locally
                setCartItems(prevItems => prevItems.filter(item => item._id !== id));
                console.log('Product deleted successfully');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Removed !",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                console.error('Failed to delete product:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleBuy = async (e, item, navigate) => {
        const query = `productName=${encodeURIComponent(item.productName)}&size=${encodeURIComponent(item.size)}&price=${encodeURIComponent(item.price)}`;
        navigate(`/BookNow?${query}`);
        toggleDrawer(false);
    }
    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={() => toggleDrawer(false)} // Close only when clicking outside the Drawer
        >
            <Box
                sx={{ width: 380 }}
                role="presentation"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the Drawer
                onKeyDown={(e) => e.stopPropagation()} // Prevent closing when using keyboard inside the Drawer
            >
                {/* Cart Header */}
                <div style={{ backgroundColor: "#C4E0D2", height: "40px", paddingTop: "6px", position: "fixed", top: "0px", width: "100%", display: "inline-block" }}>
                    <h4>
                        &nbsp;&nbsp;
                        <svg
                            style={{ width: "22px" }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                            className="w-5 h-5 mr-2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M13.5,14.6c-1.7,0-3.5,0-5.2,0c-0.3,0-0.3,0-0.2,0.3c0.1,0.5,0.2,1.1,0.3,1.6c0,0.2,0.1,0.3,0.4,0.3c3.2,0,6.4,0,9.6,0 c1.2,0,2.5,0.9,2.6,2.3c0.2,1.4-0.8,2.6-2.2,2.9c-1.5,0.3-3-0.9-3-2.5c0-0.3,0-0.7,0.2-1c0.1-0.1,0.1-0.2-0.1-0.2c-1.5,0-3,0-4.5,0 c-0.2,0-0.1,0.1-0.1,0.2c0.5,1.4-0.2,2.8-1.5,3.3c-1.1,0.4-2.4,0-3.1-1c-0.7-1-0.6-2.4,0.2-3.2c0.1-0.1,0.2-0.3,0.1-0.5 C6.3,13.7,5.6,10.3,5,6.9c-0.2-1-0.4-2.1-0.6-3.1c0-0.2-0.1-0.3-0.3-0.3c-0.4,0-0.9,0-1.3,0C2.3,3.5,2,3.2,2,2.8C2,2.3,2.3,2,2.8,2 c0.6,0,1.1,0,1.7,0c0.7,0,1.3,0.4,1.4,1.1C6,3.8,6.1,4.6,6.3,5.3c0.1,0.4,0,0.4,0.4,0.4c4.8,0,9.6,0,14.4,0c0.3,0,0.6,0.1,0.7,0.3 C22,6.2,22,6.5,22,6.7c-0.4,2-0.7,4-1.1,6c-0.2,1.2-1.1,1.9-2.3,1.9C16.9,14.6,15.2,14.6,13.5,14.6z"></path>
                        </svg>
                        &nbsp;Cart
                    </h4>
                </div>

                {/* Cart Content */}
                {userID && cartItems.length > 0 ? (
                    <div style={{ marginTop: "40px", marginBottom: "40px" }}>
                        {cartItems.map(item => (
                            <div key={item._id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                                <div className='row'>
                                    <div className='col-3'>
                                        <img
                                            src={item.productImageUrl}
                                            alt={item.productName}
                                            style={{ width: "90px", height: "90px", border: "1px solid lightgrey", borderRadius: "5px" }}
                                        />
                                    </div>
                                    <div
                                        className='col'
                                        style={{ fontSize: "13px", fontFamily: "Nunito, sans-serif", fontWeight: "bold" }}
                                    >
                                        <h5 style={{ fontFamily: "Nunito, sans-serif", fontWeight: "bold" }}>{item.productName}</h5>
                                        <p style={{ color: "gray" }}>{item.productCompany}</p>
                                        <p><strong>size:</strong> {item.size}</p>
                                        <p><strong>price: </strong >₹{item.price}</p>
                                        <strong>quantity: </strong>
                                        <div>
                                            <Button
                                                onClick={() => updateQuantity(item._id, -1)}
                                                disabled={item.quantity === 1}
                                            >
                                                -
                                            </Button>
                                            <span>{item.quantity}</span>
                                            <Button onClick={() => updateQuantity(item._id, 1)}>+</Button>
                                            <br />
                                            <Button
                                                style={{
                                                    backgroundColor: "#9dd8ad",
                                                    color: "black",
                                                    fontFamily: "Nunito, sans-serif",
                                                }}
                                                onClick={(e) => handleBuy(e, item, navigate)}
                                            >
                                                Buy
                                            </Button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <Button
                                                style={{
                                                    backgroundColor: "#fcc5c5",
                                                    color: "black",
                                                    fontFamily: "Nunito, sans-serif"
                                                }} onClick={() => deleteProduct(item._id)}

                                            >
                                                Remove
                                            </Button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div style={{ backgroundColor: "#C4E0D2", height: "40px", paddingTop: "6px", fontWeight: "bold", position: "fixed", top: "720px", width: "100%" }}> &nbsp;&nbsp;Total : ₹{total} </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <img
                                src="/assets/images/continue-shopping-img.webp"
                                style={{ width: "200px", height: "200px", marginLeft: "90px", marginTop: "250px" }}
                                alt="Continue Shopping"
                            />
                        </div>
                        <div align="center">
                            <Link
                                to="/products"
                                style={{
                                    backgroundColor: "#C4E0D2",
                                    color: "black",
                                    padding: "5px",
                                    border: "1px solid black",
                                    borderRadius: "5px",
                                }}
                                onClick={() => toggleDrawer(false)}
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                )}
            </Box>
        </Drawer>
    );
}
