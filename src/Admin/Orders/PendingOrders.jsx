import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const PendingOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrders, setSelectedOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get("https://agriculture-backend-kjha.onrender.com/pending-orders")
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
            });
    };

    const handleRowClick = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCheckboxChange = (orderId) => {
        setSelectedOrders((prevSelected) =>
            prevSelected.includes(orderId)
                ? prevSelected.filter(id => id !== orderId)
                : [...prevSelected, orderId]
        );
    };

    const handleDeleteOrders = () => {
        if (selectedOrders.length === 0) {
            Swal.fire("Warning", "No orders selected for deletion.", "warning");
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover these orders!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete them!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("https://agriculture-backend-kjha.onrender.com/delete-orders", { orderIds: selectedOrders })
                    .then(() => {
                        Swal.fire("Deleted!", "Selected orders have been deleted.", "success");
                        fetchOrders();
                        setSelectedOrders([]);
                    })
                    .catch(error => {
                        Swal.fire("Error", "Failed to delete orders. Try again later.", "error");
                    });
            }
        });
    };

    const handleUpdateOrders = () => {
        if (selectedOrders.length === 0) {
            Swal.fire("Warning", "No orders selected for update.", "warning");
            return;
        }

        Swal.fire({
            title: "Mark as Completed?",
            text: "The selected orders will be marked as Completed.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, update them!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("https://agriculture-backend-kjha.onrender.com/update-orders", { orderIds: selectedOrders })
                    .then(() => {
                        Swal.fire("Updated!", "Selected orders marked as Completed.", "success");
                        fetchOrders();
                        setSelectedOrders([]);
                    })
                    .catch(error => {
                        Swal.fire("Error", "Failed to update orders. Try again later.", "error");
                    });
            }
        });
    };

    return (
        <>
            <div style={{ marginTop: '30px', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <div align="right" className="row">
                    <div className="col-7">
                        <span align="center" style={{ fontSize: '30px', fontWeight: 'normal' }}>
                            Pending Orders
                        </span>
                    </div>
                    <div className="d-flex justify-content-between w-100">
                        <button type="button" className="btn btn-outline-success" onClick={handleUpdateOrders}>Complete</button>
                        <button type="button" className="btn btn-outline-danger" onClick={handleDeleteOrders}>Cancel</button>
                    </div>
                </div>
                <hr style={{ height: '1px', backgroundColor: 'black' }} />
                <div className="row">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" className="w-15 text-center">Sr. No.</th>
                                <th scope="col" className="w-30">Product Name</th>
                                <th scope="col" className="w-20">Size</th>
                                <th scope="col" className="w-20">Price</th>
                                <th scope="col" className="w-20">User Name</th>
                                <th scope="col" className="text-center">Select Item</th>
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
                                        <td className="text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedOrders.includes(order._id)}
                                                onChange={() => handleCheckboxChange(order._id)}
                                                onClick={(event) => event.stopPropagation()}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No Pending Orders</td>
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
                            <p><strong>Status:</strong> {selectedOrder.status}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PendingOrders;
