import { useState, useEffect} from 'react';
import axios from "axios";

export const Rating = (props) => {
    const [evaluation, setEvaluation] = useState("0")

    function ratingAgent_5(event){
        localStorage.setItem('evaluation', 5)
        sendData()
    }
    function ratingAgent_4(event){
        localStorage.setItem('evaluation', 4)
        sendData()
    }
    function ratingAgent_3(event){
        localStorage.setItem('evaluation', 3)
        sendData()
    }
    function ratingAgent_2(event){
        localStorage.setItem('evaluation', 2)
        sendData()
    }
    function ratingAgent_1(event){
        localStorage.setItem('evaluation', 1)
        sendData()
    }

    function sendData(event) {
        axios({
          method: "POST",
          url:"http://127.0.0.1:5000/rating",
          headers: {
            Authorization: 'Bearer ' + props.token
          },
          data:{
            agentId: parseInt(localStorage.getItem('agentId')),
            orderId: parseInt(localStorage.getItem('orderId')),
            rate: parseInt(localStorage.getItem('evaluation'))
           }
        })
        .then((response) => {
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
        window.location.href = "http://localhost:3000/profil"
    }

    useEffect(()=>{

    }, [evaluation])

    return(
        <div className="rating-contaner">
            <h1>Értekelés</h1>
            <p>Értékelje ügynökünket belátása szerint </p>
            <button onClick={ratingAgent_5}>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            </button>
            <button onClick={ratingAgent_4} >
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            </button>
            <button onClick={ratingAgent_3} >
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            </button>
            <button onClick={ratingAgent_2} >
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            </button>
            <button onClick={ratingAgent_1} >
            <img src="StarFiled.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            <img src="StarEmpty.svg" alt="" className='star'/>
            </button>
        </div>
    )
}