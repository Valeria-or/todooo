import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from './Modal';


export default function Main() {
    const [notebook, setNotebook] = useState([])
    const [login, setLogin] = useState("")
    const userLogin = useSelector((state) => state.UserReducer.login);
    console.log("userLogin=>", userLogin)

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
            setNotebook(result)  
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