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
      
    
  return (
    <> <Modal/>
    {notebook &&
    <div>
        {notebook.map((el) => 
        <div key={el.id}>{el.title} <OneNote/></div>
    )}
    </div>}
    </>
  
  );
}