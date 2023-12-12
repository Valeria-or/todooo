import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import OneNote from './OneNote';


export default function Main() {

    const [notebook, setNotebook] = useState([])

    const dispatch = useDispatch()

    const notebooks = useSelector((state) => state.NotebooksReducer.notebooks);
    const user = useSelector((state) => state.UserReducer.login) 

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
            }
            else {
              setNotebook(notebooks)
            }
          } catch (error) {
            console.log(error);
          }
        })();
      }, [user, notebooks]);
      
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
        } catch (error) {
            console.log("delete error", error);
        }
    }
    
  return (
    <> <Modal/>
    {notebook &&
    <div>
        {notebook.map((el) => 
        <><div key={el.id}>{el.title} <OneNote /></div><button
            type="button"
            id={el.id}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-1 sm:w-auto"
            onClick={() => deleteNote(el.id)}
          >
            X
          </button></>
    )}
    </div>}
    </>
  
  );
}