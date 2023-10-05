import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()
    async function hendlerLogout (e) {
      e.preventDefault()
      try {
          const responce = await fetch('http://localhost:3000/logout', {
                credentials: "include",
              });
              const data = await responce.json();
              console.log(data);
               navigate("/")


      } catch (error) {
          console.log("logout error", error);
      }
  }

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
        <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => navigate("/login")}
        >
        Войти
        </button>
        <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => navigate("/register")}
        >
        Регистрация
        </button>
        <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={hendlerLogout}>
        Выйти
        </button>
    </div>

  )
}
