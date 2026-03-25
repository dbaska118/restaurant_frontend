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
import {AuthProvider} from "./AuthContext.jsx";

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
                    <Route path="/userpanel" element={<UserPanel/>} />
                    <Route path="/adminpanel" element={<AdminPanel/>} />
                    <Route path="/admin/dishes" element={<DishEdit/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;