import { useState, useEffect } from 'react';
import axios from "axios";

export const AgentRegsiter = (props) => {

    const [registerForm, setregisterForm] = useState({
        email: "",
        password: "",
        password2: "",
        name: "",
        descriptionShort: "",
        description: "",
        price: "",
        picture: ""
      })

    function signUnAgent(event) {
        axios({
          method: "POST",
          url:"http://127.0.0.1:5000/registerAgent",
          headers: {
            Authorization: 'Bearer ' + props.token
          },
          data:{
            email: registerForm.email,
            password: registerForm.password,
            name: registerForm.name,
            descriptionShort: registerForm.descriptionShort,
            description: registerForm.description,
            price: parseInt(registerForm.price),
            picture: registerForm.picture
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
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            //console.log(error.response.data) msg elkapása
            }
        })
  
        setregisterForm(({
          email: "",
          password: "",
          password2: "",
          name: "",
          descriptionShort: "",
          description: "",
          price: "",
          picture: ""}))
  
        event.preventDefault()
    }

    function handleChange(event) { 
        const {value, name} = event.target
        setregisterForm(prevNote => ({
            ...prevNote, [name]: value})
    )}

    function showErro(msg){
        displayRedBorder("email")
        displayRedBorder("password")
        displayRedBorder("password2")
        displayRedBorder("name")
        displayRedBorder("descriptionShort")
        displayRedBorder("description")
        displayRedBorder("price")
        displayRedBorder("picture")
        var error_text = document.getElementById('errorMsg')
        error_text.style.visibility = "visible";
        error_text.innerHTML = msg  
    }
    function hideErro(){
        hideRedBorder("email")
        hideRedBorder("password")
        hideRedBorder("password2")
        hideRedBorder("name")
        hideRedBorder("descriptionShort")
        hideRedBorder("description")
        hideRedBorder("price")
        hideRedBorder("picture")
        var error_text = document.getElementById('errorMsg')
        error_text.style.visibility = "hidden";
    }

    function validator(){
        hideErro()
        if(registerForm.email === "" || registerForm.password === "" || registerForm.name === "" || registerForm.descriptionShort === "" || registerForm.description === "" || registerForm.password === "" || registerForm.picture === "")
        {
            showErro('Az összes mezőt ki kell tölteni!')
            return
        }
        if(registerForm.password != registerForm.password2){
            showErro('A két jelszó nem egyezik!')
            return
        }
        signUnAgent()
    }

    useEffect(()=>{
        displayTitles("titleEmail","email")
        displayTitles("titlePassword","password")
        displayTitles("titlePassword2","password2")
        displayTitles("titleName","name")
        displayTitles("titleDescriptionShort","descriptionShort")
        displayTitles("titleDescription","description")
        displayTitles("titlePrice","price")
    })
    function displayTitles(titleId, inputId){
        let titleHolder = document.getElementById(titleId)
        let inputHolder = document.getElementById(inputId)
        if(inputHolder.value !== ""){titleHolder.style.visibility = "visible";}else{titleHolder.style.visibility = "hidden";}

    }
    function displayRedBorder(id){
        let redBorder = document.getElementById(id)
        redBorder.style.border = "2px solid #691919"
        redBorder.value = null;
    }
    function hideRedBorder(id){
        let redBorder = document.getElementById(id)
        redBorder.style.border = "0px solid #691919"
        redBorder.value = null;
    }

    return (
        <form  className="auth-from-Agentregister">
        <h1>Ügynök regisztrálása</h1>

        <text id="titleEmail">Ügynök email címe</text>
        <input type="email" placeholder="Ügynök email címe" id="email" name="email" onChange={handleChange}/>

        <text id="titlePassword">Ügynök jelszava</text>
        <input type="password" placeholder="Ügynök jelszava" id="password" name="password" onChange={handleChange}/>

        <text id="titlePassword2">Ügynök jelava ismét</text>
        <input type="password" placeholder="Ügynök jelszava ismét" id="password2" name="password2" onChange={handleChange}/>

        <text id="titleName">Ügynök neve</text>
        <input type="text" placeholder="Ügynök neve" id="name" name="name" onChange={handleChange}/>

        <text id="titleDescriptionShort">Ügynök rövid leírása</text>
        <input type="text" placeholder="Ügynök rövid leírása" id="descriptionShort" name="descriptionShort" onChange={handleChange}/>

        <text id="titleDescription">Ügynök leírása</text>
        <input type="text" placeholder="Ügynök leírása" id="description" name="description" onChange={handleChange}/>

        <text id="titlePrice">Ügynök ára</text>
        <input type="text" placeholder="Ügynök ára" id="price" name="price" onChange={handleChange}/>

        <text id='agentPicture-title'>Ügynök profil képe</text>
        <select name="picture" id="picture" onChange={handleChange}>
            <option></option>
            <option value="1">Fekete őltönyös férfi</option>
            <option value="0">Piros ruhás nő</option>
        </select>

        <text id="errorMsg">Valami nem stimmel!</text>

        <button type="button" onClick={() => validator()}>Regisztráció</button>
    </form>
    )
}