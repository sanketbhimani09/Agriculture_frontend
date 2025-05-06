import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
    return (
        <>
            {/* Fixed Header */}
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 1000
            }}>
                <AdminHeader />
            </div>

            <div style={{ display: "flex", height: "100vh" }}>
            {/* Fixed Sidebar */}
                <div style={{
                    width: "256px",
                    height: "100vh",
                    position: "fixed",
                    top: 0,  // Adjust based on header height
                    left: 0,
                    backgroundColor: "#2c3e50",
                    padding: "10px",
                    color: "white",
                }}>
                    <Sidebar />
                </div>

                {/* Scrollable Main Content */}
                <div style={{
                    marginLeft: "250px",  // Same as sidebar width
                    padding: "20px",
                    flexGrow: 1,
                    height: "calc(100vh - 60px)",  // Full height minus header
                    overflowY: "auto"
                }}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
