import { useState } from 'react'
import Register from './components/Register'
import './App.css'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
<Routes>
<Route path="/register" element={<Register />} />
</Routes>
    </>
  )
}

export default App
