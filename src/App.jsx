import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage.jsx";
import DishMenu from "./components/DishMenu.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/dishes" element={<DishMenu />} />
            </Routes>
        </Router>
    );
}

export default App;