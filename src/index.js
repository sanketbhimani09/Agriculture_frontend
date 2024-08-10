import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Technologys from './Technologys';
import Home from './home'; // Ensure this is the correct path
import Innovation from './Innovation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='Technology' element={<Technologys />} />
                <Route path='Innovation' element={<Innovation />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
