import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [reg, setReg] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [errText, setErrorText] = useState('');

    function hendlerRegister (e: React.ChangeEvent<HTMLInputElement>) {
        setReg((pre: string) => ({...pre, [e.target.name]:e.target.value}))
        
    }

    async function hendlerNewUser (values: React.MouseEvent<HTMLButtonElement, MouseEvent>)  {
        values.preventDefault()
        try {
            const responce = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(reg),
                  credentials: "include",
                });
                const data = await responce.json();
                console.log(data);
                if(data.msg){
                  dispatch({type: 'REG_USER', payload: {login: data.login}})
                  navigate("/main")
                } else {
                  
                  setErrorText(data.err)
                }
                

        } catch (error) {
            console.log("register error", error);
        }
    }

  return (
    <div>
       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Зарегайся мудила
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="login" className="block text-sm font-medium leading-6 text-gray-900">
                ВВеди свой ебучий логин
              </label>
              <div className="mt-2">
                <input
                  id="login"
                  name="login"
                  type="login"
                  autoComplete="login"
                  required
                  onChange={hendlerRegister}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  И придумай пароль
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={hendlerRegister}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
            <p>{errText.length > 0 && errText}</p>
            </div>
            <div>
              <button onClick={hendlerNewUser}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Зарегаться
              </button>
              <button onClick={() => navigate(-1)}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Пошел наХуй назад
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
