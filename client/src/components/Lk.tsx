import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Lk() {
  const [file, setFile] = useState();
const [photoUser, setPhotoUser] = useState({"photo": ''})
const [restart, setRestart] = useState(false)
const dispath = useDispatch()
const avatar = useSelector((state) => state.UserReducer.photo)
console.log('avatar', avatar);


  const upload = (): void => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append('id', photoUser.id);
    axios
      .patch("http://localhost:3000/upload/lkPhoto", formData)
      .then((res) => {})
      .catch((er) => console.log(er));
      dispath({type: 'LOG_USER', payload: {photo: photoUser}})
      setRestart(!restart)
  };

  useEffect(() => {
    void (async function fetchData() {
        try {
            const response = await fetch("http://localhost:3000/upload",{
             method: "GET",
             credentials: "include"
            }) 
            const result = await response.json()
            dispath({type: 'LOG_USER', payload: {photo: result}})
            setPhotoUser(result)
         } catch (error) {
             console.log(error)
         }
    })();
}, [restart]);

console.log(photoUser)
  return (
    <form action="/profile" method="post" enctype="multipart/form-data">
      <input
        type="file"
        name="avatar"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="button" onClick={upload}>
        Загрузить картинку
      </button>
      <div><img src={`http://localhost:3000/data/uploads/${avatar.photo}`}></img></div>
    </form>
  );
}
