import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const CompletedOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get("https://agriculture-backend-kjha.onrender.com/completed-orders")
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    const handleRowClick = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    return (
        <>
            <div style={{ marginTop: '30px', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <div align="right" className="row">
                    <div className="col-7">
                        <span
                            align="center"
                            style={{ fontSize: '30px', fontWeight: 'normal' }}
                        >
                            Completed Orders
                        </span>
                    </div>
                </div>
                <hr style={{ height: '1px', backgroundColor: 'black' }} />
                <div className="row">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" className="w-15 text-center">Sr. No.</th>
                                <th scope="col" className="w-30">Product Name</th>
                                <th scope="col" className="w-25">Size</th>
                                <th scope="col" className="w-25">Price</th>
                                <th scope="col" className="">User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <tr key={index} onClick={() => handleRowClick(order)} style={{ cursor: "pointer" }}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>{order.productName}</td>
                                        <td>{order.size}</td>
                                        <td>₹{order.price}/-</td>
                                        <td>{order.fullName}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No Pending Orders</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for displaying order details */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <div>
                            <p><strong>Product Name:</strong> {selectedOrder.productName}</p>
                            <p><strong>Size:</strong> {selectedOrder.size}</p>
                            <p><strong>Price:</strong> ₹{selectedOrder.price}/-</p>
                            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                            <p><strong>Full Name:</strong> {selectedOrder.fullName}</p>
                            <p><strong>Mobile No:</strong> {selectedOrder.mobileNo}</p>
                            <p><strong>Email:</strong> {selectedOrder.email}</p>
                            <p><strong>Street:</strong> {selectedOrder.street}</p>
                            <p><strong>Pincode:</strong> {selectedOrder.pincode}</p>
                            <p><strong>City:</strong> {selectedOrder.city}</p>
                            <p><strong>District:</strong> {selectedOrder.district}</p>
                            <p><strong>State:</strong> {selectedOrder.state}</p>
                            <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                            <p><strong>Status:</strong> {selectedOrder.status}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default CompletedOrders;