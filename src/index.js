import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Technologys from './Technology/Technologys';
import Home from './Home/home'; // Ensure this is the correct path
import Login from './Login/Login';
import Products from './Products/Products'
import Collections from './Products/Collections';
import Cart from './Cart/Cart';
import Registration from './SignUp/Registration';
import BookNow from './BookNow/BookNow';
import ContactUs from './ContactUs/ContactUs';
import AdminLayout from './Admin/AdminLayout/AdminLayout';
import Category from './Admin/Product/Category';
import CategoryWiseProduct from './Admin/Product/CategoryWiseProduct';
import PendingOrders from './Admin/Orders/PendingOrders';
import CompletedOrders from './Admin/Orders/CompletedOrders';
import Users from './Admin/Users/Users';
import Messages from './Admin/Messages/Messages';
import ProtectedRoute from './ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='Technology' element={<Technologys />} />
                <Route path='Products' element={<Products />} />
                <Route path="collections/:categoryId" element={<Collections />} />
                <Route path='cart' element={<Cart />} />
                <Route path='Login' element={<Login />} />
                <Route path='Registration' element={<Registration />} />
                <Route path='BookNow' element={<BookNow />} />
                <Route path='ContactUs' element={<ContactUs />} />
            </Route>
            <Route path='/Admin' element={<ProtectedRoute> <AdminLayout /></ProtectedRoute>}>
                <Route index element={<Category />} />
                <Route path='CategoryWiseProduct/:categoryId' element={<CategoryWiseProduct />} />
                <Route path='Pending-Orders' element={<PendingOrders />} />
                <Route path='Completed-Orders' element={<CompletedOrders />} />
                <Route path='Users' element={<Users />} />
                <Route path='Messages' element={<Messages />} />
            </Route>
        </Routes>
    </BrowserRouter >
);
