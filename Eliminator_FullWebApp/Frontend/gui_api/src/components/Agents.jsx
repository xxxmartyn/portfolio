import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom"

export const Agents = (props) => {

    const[post, setPost] = useState([])

    useEffect(()=>{
        getData()
    }, [])

    const getData = async () =>{
        const data = []
        axios({
            method: "GET",
            url:"http://127.0.0.1:5000/agentShop",
            headers: {
              Authorization: 'Bearer ' + props.token
            }
          })
          .then((response) => {
            const res =response.data
            res.access_token && props.setToken(res.access_token)
            //console.log(res)
            setPost(res)
          }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
              console.log(error.response.Authorization)
              }
          })
    }

    function openDetails(event){
        console.log(event.target.getAttribute('index'))
        let id = event.target.getAttribute('index')
        localStorage.setItem('viewIndex', id)
        window.location.href = "http://localhost:3000/agentView"
    }


    return(
        <div className='agent-item-contener'>
            {props.token != null && <>
                <h1>Elérhető ügynökeink</h1>
                {post.map(post =>(<>
                    {post.status === 1 &&
                                  <div key={post.id} className='itemHolder'>
                                  <img className='itemImage' src={post.picture === 0 ? "WomanAgentIcon.png" : "ManAgentIcon.png"} alt=""/>
                                  <div className='itemInfo'>
                                      <h1>{post.name}</h1>
                                      <p>{post.descriptionShort}</p>
                                      <Rating str={post.rating}/>
                                      <button index={post.id} onClick={openDetails}>Részletek</button>
                                  </div>
                              </div>
                    }</>
                ))}</>
            }
            {props.token === null && <>
                <h1>Hoppá!</h1>
                <h2>Ez az oldal csak felhasználóknak érhető el!</h2>
                <Link to={"/login"}><button>Bejelentkezés</button></Link>
                <h4>──────── vagy ────────</h4>
                <Link to={"/regsiter"}><button>Regisztráció</button></Link>
      </>
      }

        </div>
    )
}

function Rating({str, ...props}){
    let text = "" + str
    let num = 0
    const myArry = text.split(',')
    for (let i = 0; i < myArry.length; i++) {
        num += parseInt(myArry[i])
    }
    num = num/myArry.length
    num = Math.round(num)
    if(num === 5){
        return(
        <div>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
        </div>
        )
    }
    else if(num === 4){
        return(
        <div>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
        </div>
        )
    }
    else if(num === 3){
        return(
        <div>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
        </div>
        )
    }
    else if(num === 2){
        return(
        <div>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
        </div>
        )
    }
    else if(num === 1){
        return(
        <div>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
        </div>
        )
    }
    else{
        return(
        <div>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
        </div>
        )
    }
    
}