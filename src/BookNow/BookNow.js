import React, { useState } from "react";
import "./BookNow.css";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BookNow = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate=useNavigate()
    const productName = queryParams.get("productName") || "Default Product";
    const size = queryParams.get("size") || "Default Size";
    const price = queryParams.get("price") || "0";

    const [formData, setFormData] = useState({
        fullName: "",
        mobileNo: "",
        email: "",
        street: "",
        pincode: "",
        city: "",
        district: "",
        state: "",
        productName,
        size,
        price,
        quantity: "1",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation for fullName: Only letters allowed
        if (name === "fullName" && /\d/.test(value)) return;

        // Validation for numeric fields
        if (["mobileNo", "pincode", "quantity"].includes(name) && /\D/.test(value)) return;

        // Prevent quantity less than 1
        if (name === "quantity" && Number(value) < 1) return;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // SweetAlert confirmation
        const result = await Swal.fire({
            title: "Confirm Order",
            text: "Are you sure you want to place this order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, place order",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch("https://agriculture-backend-kjha.onrender.com/add-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                Swal.fire("Success!", "Your order has been placed successfully.", "success");
                setFormData({
                    fullName: "",
                    mobileNo: "",
                    email: "",
                    street: "",
                    pincode: "",
                    city: "",
                    district: "",
                    state: "",
                    productName: "",
                    size: "",
                    price: "",
                    quantity: "",
                });
                navigate('/Products');
            } else {
                Swal.fire("Error", "Failed to place order. Please try again.", "error");
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire("Error", "An error occurred. Please try again.", "error");
        }
    };
    const handleBack = async (e) =>{
        navigate(-1);
    }
    return (
        <div className="book-now-container">
            <h2>Place Your Order</h2>
            <form onSubmit={handleSubmit} className="book-now-form">
                <div className="form-group book-now-inp">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group book-now-inp">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row">
                    <div className="col-8">
                        <div className="form-group book-now-inp">
                            <label>Mobile Number:</label>
                            <input
                                type="text"
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group book-now-inp">
                            <label>Pincode:</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group book-now-inp">
                            <label>City:</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group book-now-inp">
                            <label>District:</label>
                            <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group book-now-inp">
                            <label>State:</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="form-group book-now-inp">
                            <label>Street:</label>
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group book-now-inp">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        readOnly
                    />
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group book-now-inp">
                            <label>Size:</label>
                            <input
                                type="text"
                                name="size"
                                value={formData.size}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group book-now-inp">
                            <label>Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group book-now-inp">
                            <label>Quantity:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="submit-btn">
                    Submit Order
                </button>

            </form>
            <br/>
                <button className="back" onClick={handleBack}>&larr;</button>
        </div>
    );
};

export default BookNow;
