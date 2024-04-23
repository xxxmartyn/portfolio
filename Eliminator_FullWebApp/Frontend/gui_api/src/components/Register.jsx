import { useState, useEffect } from 'react';
import axios from "axios";

export const Regsiter = (props) => {

  const [registerForm, setregisterForm] = useState({
        email: "",
        password: "",
        password2: ""
      })

      function signMeUn(event) {
        axios({
          method: "POST",
          url:"http://127.0.0.1:5000/register",
          data:{
            email: registerForm.email,
            password: registerForm.password
           }
        })
        .then((response) => {
            if(response.data.return === 1)
            {
                var error_text = document.getElementById('errorMsg')
                var input_email = document.getElementById('email')
                input_email.style.border = "1px solid #691919";
                error_text.style.visibility = "visible";
                error_text.innerHTML = 'Ez az email cím foglalt!'   
            }
            window.location.href = "http://localhost:3000/login"
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
  
        setregisterForm(({
          email: "",
          password: "",
          password2: ""}))
  
        event.preventDefault()
      }
      function handleChange(event) { 
        const {value, name} = event.target
        setregisterForm(prevNote => ({
            ...prevNote, [name]: value})
        )}

    function showErro(msg){
            var error_text = document.getElementById('errorMsg')
            var input_email = document.getElementById('email')
            var input_password = document.getElementById('password')
            var input_password2 = document.getElementById('password2')
            input_email.style.border = "1px solid #691919";
            input_password2.style.border = "1px solid #691919";
            input_password.style.border = "1px solid #691919";
            error_text.style.visibility = "visible";
            input_email.value = null;
            input_password.value = null;
            input_password2.value = null;
            error_text.innerHTML = msg  
    }
    function hideErro(){
        var error_text = document.getElementById('errorMsg')
        var input_email = document.getElementById('email')
        var input_password = document.getElementById('password')
        var input_password2 = document.getElementById('password2')
        input_email.style.border = "0px solid #691919";
        input_password2.style.border = "0px solid #691919";
        input_password.style.border = "0px solid #691919";
        error_text.style.visibility = "hidden";
  }
  function validator(){
        hideErro()
        if(registerForm.email === "")
        {
            showErro('Az email mező nem lehet üres!')
            return
        }
        if(registerForm.password === ""){
            showErro('Az jelszó mező nem lehet üres!')
            return
        }
        if(registerForm.password != registerForm.password2){
            showErro('A két jelszó nem egyezik!')
            return
        }
        signMeUn()
    }

    useEffect(()=>{
      displayTitles("titleEmail","email")
      displayTitles("titlePassword","password")
      displayTitles("titlePassword2","password2")


  })
  function displayTitles(titleId, inputId){
      let titleHolder = document.getElementById(titleId)
      let inputHolder = document.getElementById(inputId)
      if(inputHolder.value !== ""){titleHolder.style.visibility = "visible";}else{titleHolder.style.visibility = "hidden";}
  }

    return (
        <form  className="auth-from-register">
        <h1>Regisztráció</h1>

        <text id="titleEmail">Azonasító</text>
        <input type="email" placeholder="Azonasító" id="email" name="email" onChange={handleChange}/>

        <text id="titlePassword">Jelszó</text>
        <input type="password" placeholder="Jelszó" id="password" name="password" onChange={handleChange}/>

        <text id="titlePassword2">Jelszó ismét</text>
        <input type="password" placeholder="Jelszó ismét" id="password2" name="password2" onChange={handleChange}/>

        <text id="errorMsg">Valami nem stimmel!</text>

        <button type="button" onClick={() => validator()}>Regisztráció</button>
    </form>
    )
}