import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';

export default function CreateTodo(id) {

    const [todos, setNewTodo] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function hendlerInputTodo (e: React.ChangeEvent<HTMLInputElement>) {
        setNewTodo((pre: string) => ({...pre, [e.target.name]:e.target.value}))
    }

    async function hendlerNewTodo (values) {
        values.preventDefault()
        try {
            const responce = await fetch('http://localhost:3000/oneNote/newTodo', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({"todo": `${todos.todo}`, id }),
                  credentials: "include",
                });
                console.log("todos", todos)
                const data = await responce.json();
                if(data.msg){
                    console.log("ok")
                    dispatch({type: 'CREATETODO', payload: todos})
                } else {
                    console.log("error")
                }

        } catch (error) {
            console.log("login error", error);
        }
    }
  return (

    <form>
      <div>
        <label
          htmlFor="login"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Напиши свои никому не нужные дела
        </label>
        <div className="mt-2">
          <input
            id="login"
            name="todo"
            type="text"
            autoComplete="login"
            required
            onChange={hendlerInputTodo}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <button
          onClick={hendlerNewTodo}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Дроп
        </button>
      </div>
    </form>
  );
}
