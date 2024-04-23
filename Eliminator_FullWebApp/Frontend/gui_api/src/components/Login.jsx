import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"

export const Login = (props) => {

    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
      })

    function showErro(){
        var error_text = document.getElementById('errorMsg')
        var input_emil = document.getElementById('email')
        var input_password = document.getElementById('password')
        input_emil.style.border = "1px solid #691919";
        input_password.style.border = "1px solid #691919";
        error_text.style.visibility = "visible";
        input_emil.value = null;
        input_password.value = null;
    }
    function hideError(){
        var error_text = document.getElementById('errorMsg')
        var input_emil = document.getElementById('email')
        var input_password = document.getElementById('password')
        input_emil.style.border = "0px solid #691919";
        input_password.style.border = "0px solid #691919";
        error_text.style.visibility = "hidden";
        input_emil.value = null;
        input_password.value = null;
    }

    function logMeIn(event) {
        axios({
          method: "POST",
          url:"http://127.0.0.1:5000/token",
          data:{
            email: loginForm.email,
            password: loginForm.password
           }
        })
        .then((response) => {
          hideError()
          props.setToken(response.data.access_token)
          console.log(response.data.access_token)
          localStorage.setItem('identifier', response.data.id)
          localStorage.setItem('authority', response.data.authority)
          window.location.href = "http://localhost:3000/profil"
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            showErro()
            }
        })
  
        setloginForm(({
          email: "",
          password: ""}))
  
        event.preventDefault()
    }

    function handleChange(event) { 
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
    )}

    useEffect(()=>{
      displayTitles("titleEmail","email")
      displayTitles("titlePassword","password")
  })
  function displayTitles(titleId, inputId){
      let titleHolder = document.getElementById(titleId)
      let inputHolder = document.getElementById(inputId)
      if(inputHolder.value !== ""){titleHolder.style.visibility = "visible";}else{titleHolder.style.visibility = "hidden";}
  }


    return (
        <form  className="auth-from-login">
            <h1>Belépés</h1>
            <text id="titleEmail">Azonasító</text>
            <input type="email" placeholder="Azonasító" id="email" name="email" onChange={handleChange}/>

            <text id="titlePassword">Jelszó</text>
            <input type="password" placeholder="Jelszó" id="password" name="password" onChange={handleChange}/>
            
            <text id="errorMsg">Hibás vagy ismeretlen azonasító és jelszó páros!</text>
            <button type="submit" onClick={logMeIn}>Belépés</button>
            <h4>──────── vagy ────────</h4>
            <Link to="/regsiter">
            <button  type="button">Regisztráció</button>
            </Link>
        </form>
    )
}