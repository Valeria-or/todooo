import { useState } from 'react'
import Register from './components/Register'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {

  return (
  <>
  <Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />
</Routes>
    </>
  )
}

export default App
