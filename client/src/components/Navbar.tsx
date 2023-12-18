import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface UserState {
  auth: boolean;
}

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authUser = useSelector((state: { UserReducer: UserState }) => state.UserReducer.auth);

    useEffect (() => {
        (async function () {
        try {
            const response = await fetch('http://localhost:3000/user', {
                credentials: 'include',
            })
            const data = await response.json();
            if (data){
                dispatch({type: 'AUTH_USER', payload: {auth: true, login: data}})
            }
        } catch {
            dispatch({type: 'AUTH_USER', payload: {auth: false}})
        }
     } ());
    }, [])

  async function handleLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/logout', {
        credentials: 'include',
      });
      const data = await response.json();
      dispatch({type: 'LOGOUT_USER', payload: {auth: false}})
      navigate('/');
    } catch (error) {
      console.log('logout error', error);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {authUser ? (
               <><button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleLogout}
        >
          Выйти
        </button><button onClick={() => navigate("/lk")}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            личный кабинет
          </button></>

      ) : (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => navigate('/login')}
          >
            Войти
          </button>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => navigate('/register')}
          >
            Регистрация
          </button>
        </div>
      )}
    </div>
  );
}