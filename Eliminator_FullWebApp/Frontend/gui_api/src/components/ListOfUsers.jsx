import { useState, useEffect } from 'react'
import axios from "axios"

export const ListOfUsers = (props) => {

    const[post, setPost] = useState([])

    useEffect(()=>{
        getData()
    }, [])

    function getData() {
        axios({
          method: "POST",
          url:"http://127.0.0.1:5000/users",
          headers: {
            Authorization: 'Bearer ' + props.token
          },
          data:{
            id: localStorage.getItem('identifier')
          }
        })
        .then((response) => {
            const res =response.data
            res.access_token && props.setToken(res.access_token)
            console.log(res)
            setPost(res)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            console.log(error.response.Authorization)
            }
        })}

    function deletData(event){
        console.log(event.target.getAttribute('index'))
        let id = event.target.getAttribute('index')
        axios({
            method: "POST",
            url:"http://127.0.0.1:5000/deleteuser",
            headers: {
              Authorization: 'Bearer ' + props.token
            },
            data:{
              id: id
            }
          })
          .then((response) => {
            console.log(response)
          }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
              console.log(error.response.Authorization)
              }
        })
        window.location.href = "http://localhost:3000/listofusers"
    }

    return(
        <div className='users-contaner'>
            <h1>Felhasználók</h1>

            <div>
            {post.map(post =>(
                <div key={post.id} className='userHolder'>
                     <p>Felhasználó név: {post.email}</p>
                     <p>Jelszó: {post.password}</p>
                     <FancyAuthority auth={post.authority}/>
                     <button index={post.id} onClick={deletData}>Törlés</button>
                </div>
                ))}
            </div>
        </div>
    )
}

function FancyAuthority(auth, ...props){
    let num = parseInt(auth.auth)
    if(num == 0)
        return(
            <p>Jogkör: Admin</p>
        )
    else if(num == 1)
        return(
            <p>Jogkör: Ügynök</p>
        )
    else if(num == 2)
    return(
        <p>Jogkör: Egyszerű felhasznóló</p>
    )

}