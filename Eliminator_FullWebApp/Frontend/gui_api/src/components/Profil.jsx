import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios";

export const Profile = (props) => {
  const[permission, setPermission] = useState(null)
  const[userName, setUserName] = useState(null)
  const[orders, setOrders] = useState([])

  useEffect(()=>{
    getData()
  }, [])

  function getData() {
    axios({
      method: "POST",
      url:"http://127.0.0.1:5000/profile",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data:{
        id: localStorage.getItem('identifier')
      }
    })
    .then((response) => {
      const res = response.data
      console.log(res)
      res.access_token && props.setToken(res.access_token)
      setUserName(res.userName)
      setPermission(res.authority)
      setOrders(JSON.parse(res.orders))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        console.log(error.response.Authorization)
        }
    })}
  
  function workDone(event) {
    console.log(event.target.getAttribute('index'))
    let orderId = event.target.getAttribute('index')

    axios({
      method: "POST",
      url:"http://localhost:5000/workDone",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data:{
        orderId: orderId,
        id: localStorage.getItem('identifier')
      }
    })
    .then((response) => {
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        console.log(error.response.Authorization)
        }
    })
    window.location.href = "http://localhost:3000/profil"
  }


  function openRating(event){
    console.log(event.target.getAttribute('index'))
    console.log(event.target.getAttribute('index2'))
    let agentId = event.target.getAttribute('index')
    let orderId = event.target.getAttribute('index2')
    localStorage.setItem('orderId', orderId)
    localStorage.setItem('agentId', agentId)
    window.location.href = "http://localhost:3000/rating"
  }

  return (
    <div className="profile-contener">
      {permission != null &&
      <>
        <h1>Profil</h1>
        <h2>Üdvözöljük {userName}</h2>
        {permission == 2 && 
          <div className='profile-list-contaner'>
            <h2>Rendelések</h2>
            {orders.map(orders=>(
              <div key={orders.id} className="order-item-contaner">
                <p>Dátum: {orders.date}</p>
                <p>Ügynök neve: {orders.agentName}</p>
                <p>Költsége: {orders.pay} ß</p>
                <p>Célpont neve: {orders.targetName}</p>
                <p>Célpont tartózkodási helye: {orders.targetLocation}</p>
                <p>Célpont leírás: {orders.targetDescription}</p>
                <p>Likvidálás oka: {orders.reason}</p>
                {orders.status == 0 &&
                  <p className='fakeButon-green'>Elvégezve</p>
                }
                {orders.status == 1 &&
                  <p className='fakeButon-yelow'>Folyamatban</p>
                }
                {orders.status == 2 &&
                  <button index={orders.agentId} index2={orders.id} onClick={openRating}>Értékelésre vár</button>
                }
              </div>
            ))}
            </div>
          }
          {permission == 1 && 
          <div className='profile-list-contaner'>
            <h2>Munkák</h2>
            {orders.map(orders=>(
              <div key={orders.id} className="order-item-contaner">
                <p>Dátum: {orders.date}</p>
                <p>Célpont neve: {orders.targetName}</p>
                <p>Célpont tartózkodási helye: {orders.targetLocation}</p>
                <p>Célpont leírás: {orders.targetDescription}</p>
                <p>Likvidálás oka: {orders.reason}</p>
                {orders.status == 0 &&
                  <p className='fakeButon-green'>Elvégezve</p>
                }
                {orders.status == 1 &&
                  <button index={orders.id} onClick={workDone}>Munka elvégezve</button>
                }
                {orders.status == 2 &&
                  <p className='fakeButon-green'>Elvégezve</p>
                }
              </div>
            ))}
            </div>
          }
      </>
      }
      {permission === null &&
      <>
      <h1>Hoppá!</h1>
      <h2>Ez az oldal csak felhasználóknak érhető el!</h2>
      <Link to={"/login"}><button>Bejelentkezés</button></Link>
      <h4>──────── vagy ────────</h4>
      <Link to={"/regsiter"}><button>Regisztráció</button></Link>
      </>
      }
    </div>
  );
}
