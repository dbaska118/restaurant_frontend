import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage.jsx";
import DishMenu from "./components/DishMenu.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import UserPanel from "./components/UserPanel.jsx";
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
                    <Route path="/userpanel" element={<UserPanel/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;