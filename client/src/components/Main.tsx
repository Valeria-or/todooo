import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import OneNote from './OneNote';


export default function Main() {

    const [notebook, setNotebook] = useState([])

    const dispatch = useDispatch()

    const [changeTodos, setChangeTodos] = useState(false)

    const notebooks = useSelector((state) => state.NotebooksReducer.notebooks);
    const user = useSelector((state) => state.UserReducer.login) 

    const allNotebooks = useSelector((state) => state.NotebooksReducer.notebooks);

    useEffect(() => {
        void (async function fetchData() {
                try {
            const response: Response = await fetch('http://localhost:3000/notebook/one', {
                method: 'GET',
                  credentials: "include",
            });
            const result = await response.json();
            if (result){
              setNotebook(result)
              dispatch({
                type: "NOTEBOOKS",
                payload: { notebooks: result },
              });
            }
            else {
              setNotebook(notebooks)
            }
          } catch (error) {
            console.log(error);
          }
        })();
      }, [user, changeTodos]);
      
      async function deleteNote (id: object) {
        try {
            const responce = await fetch('http://localhost:3000/oneNote/deleteNote', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({'id': id}),
                  credentials: "include",
            });
            const data = await responce.json();
            dispatch({type: 'DELETE', payload: {id: id}})
            if (changeTodos) {
              setChangeTodos(false)
            } else {
              setChangeTodos(true)
            }
        } catch (error) {
            console.log("delete error", error);
        }
    }

    const [inputFind, setInputFind] = useState({"notebook": ""})


  function hendlerFindNotebook(e: React.ChangeEvent<HTMLInputElement>) {
    setInputFind((pre: string) => ({ ...pre, [e.target.name]: e.target.value }));
    const findText = e.target.value
    if (findText){
      dispatch({type: 'FINDNOTEBOOK', payload: {word: findText}})
    } else {
      if (changeTodos) {
        setChangeTodos(false)
      } else {
        setChangeTodos(true)
      }
    }
  }

  return (
    <> <Modal/>
     <input
        id="login"
        name="notebook"
        type="text"
        autoComplete="login"
        required
        value={inputFind.notebook}
        onChange={hendlerFindNotebook}
        className="inline-flex rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    {allNotebooks &&
    <div>
        {allNotebooks.map((el) => 
        <><div key={el.id}>{el.title} <OneNote id={el.id}/></div><button
            type="button"
            id={el.id}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-1 sm:w-auto"
            onClick={() => deleteNote(el.id)}
          >
            X
          </button>
          </>
    )}
    </div>}
    </>
  
  );
}