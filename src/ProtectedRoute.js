import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "./Admin/AdminLayout/AdminLayout";

const ProtectedRoute = () => {
    let adminID = localStorage.getItem("adminID");

    return adminID ? <AdminLayout /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;
