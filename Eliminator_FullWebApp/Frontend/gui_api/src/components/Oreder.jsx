import { useState, useEffect } from 'react';
import axios from "axios";

export const Order = (props) => {
    const [registerForm, setregisterForm] = useState({
        userId: "",
        targetName: "",
        targetLocation: "",
        targetDescription: "",
        reason: ""
      })

    function orderAgent(event) {
        axios({
          method: "POST",
          url:"http://127.0.0.1:5000/order",
          headers: {
            Authorization: 'Bearer ' + props.token
          },
          data:{
            agentId: parseInt(localStorage.getItem('viewIndex')),
            userId: parseInt(localStorage.getItem('identifier')),
            targetName: registerForm.targetName,
            targetLocation: registerForm.targetLocation,
            targetDescription: registerForm.targetDescription,
            reason: registerForm.reason
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
        displayRedBorder("targetName")
        displayRedBorder("targetLocation")
        displayRedBorder("targetDescription")
        displayRedBorder("reason")
        var error_text = document.getElementById('errorMsg')
        error_text.style.visibility = "visible";
        error_text.innerHTML = msg  
    }
    function hideErro(){
        hideRedBorder("targetName")
        hideRedBorder("targetLocation")
        hideRedBorder("targetDescription")
        hideRedBorder("reason")
        var error_text = document.getElementById('errorMsg')
        error_text.style.visibility = "hidden";
    }

    function validator(){
        hideErro()
        if(registerForm.targetName === "" || registerForm.targetLocation === "" || registerForm.targetDescription === "" || registerForm.reason === "")
        {
            showErro('Az összes mezőt ki kell tölteni!')
            return
        }
        orderAgent()
    }

    useEffect(()=>{
        displayTitles("titleTargetName","targetName")
        displayTitles("titleTargetLocation","targetLocation")
        displayTitles("titleTargetDescription","targetDescription")
        displayTitles("titleReason","reason")
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
        <h1>Rendelés</h1>

        <text id="titleTargetName">Célpont neve</text>
        <input type="text" placeholder="Célpont neve" id="targetName" name="targetName" onChange={handleChange}/>

        <text id="titleTargetLocation">Célpont tartózkodási helye</text>
        <input type="text" placeholder="Célpont tartózkodási helye" id="targetLocation" name="targetLocation" onChange={handleChange}/>

        <text id="titleTargetDescription">Célpont leírása</text>
        <input type="text" placeholder="Célpont leírása" id="targetDescription" name="targetDescription" onChange={handleChange}/>

        <text id="titleReason">Likvidálás oka</text>
        <input type="text" placeholder="Likvidálás oka" id="reason" name="reason" onChange={handleChange}/>

        <text id="errorMsg">Valami nem stimmel!</text>

        <button type="button" onClick={() => validator()}>Rendelés</button>
    </form>
    )
}