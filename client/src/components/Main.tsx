import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';


export default function Main() {

    const [notebook, setNotebook] = useState([])
    const [login, setLogin] = useState("")

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.UserReducer.login);
    const notebooks = useSelector((state) => state.NotebooksReducer.notebooks);

    useEffect(() => {
        void (async function fetchData() {
            setLogin(userLogin)
            if(userLogin) {
                try {
            const response: Response = await fetch('http://localhost:3000/notebook/one', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({login : userLogin}),
                  credentials: "include",
            });
            const result = await response.json();
            dispatch({type: 'NOTEBOOKS', payload: {notebooks: result}})  
            setNotebook(notebooks)
          } catch (error) {
            console.log(error);
          }
            }
          
        })();
      }, [userLogin]);
      
    
  return (
    <> <Modal/>
    {notebook &&
    <div>
        {notebook.map((el) => 
        <div key={el.id}>{el.title}</div>
    )}
    </div>}
    </>
  
  );
}