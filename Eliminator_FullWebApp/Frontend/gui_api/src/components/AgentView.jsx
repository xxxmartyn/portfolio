import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

export const AgentView = (props) =>{

    const[post, setPost] = useState([])

    
    useEffect(()=>{
        getData()
    }, [])

    const getData = async () =>{
        axios({
            method: "POST",
            url:"http://127.0.0.1:5000/agnetView",
            headers: {
              Authorization: 'Bearer ' + props.token
            },
            data:{
                id: localStorage.getItem('viewIndex')
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
          })
    }

    return(
        <div className="agent-view-contaner">
            <h1>Ügynök</h1>
            <div className='agent-view-itemholder'>
            <h2>{post.name}</h2>
            <img className='itemImage-view' src={post.picture === 0 ? "WomanAgentIcon.png" : "ManAgentIcon.png"} alt=""/>
            <p>{post.description}</p>
            <p></p>
            <dir className="itemInfo-holder">
                <Rating str={post.rating}/>
                <p></p>
                <h3>Költség: {post.price} M$</h3>
                <Link to="/order"><button>Rendelés</button></Link>
            </dir>
            </div>
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