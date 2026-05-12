import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage.jsx";
import DishMenu from "./components/DishMenu.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import UserPanel from "./components/user/UserPanel.jsx";
import AdminPanel from "./components/admin/AdminPanel.jsx";
import DishEdit from "./components/admin/DishEdit.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import ChangeName from "./components/ChangeName.jsx";
import {AuthProvider} from "./AuthContext.jsx";
import UserEdit from "./components/admin/UserEdit.jsx";
import OpeningHours from "./components/admin/OpeningHours.jsx";
import TablePriceEdit from "./components/admin/TablePriceEdit.jsx";
import RestaurantTableEdit from "./components/admin/RestaurantTableEdit.jsx";
import Reservations from "./components/Reservations.jsx";


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/dishes" element={<DishMenu />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/changePassword" element={<ChangePassword />} />
                    <Route path="/changeName" element={<ChangeName />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/userpanel" element={<UserPanel/>} />
                    <Route path="/adminpanel" element={<AdminPanel/>} />
                    <Route path="/admin/dishes" element={<DishEdit/>} />
                    <Route path="/admin/users" element={<UserEdit/>} />
                    <Route path="/admin/openingHours" element={<OpeningHours/>} />
                    <Route path="/admin/tablePrice" element={<TablePriceEdit/>} />
                    <Route path="/admin/restaurantTable" element={<RestaurantTableEdit />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;