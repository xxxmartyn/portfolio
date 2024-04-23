import { Link, useMatch, useResolvedPath } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from 'react';

export const Navbar = (props) => {

    function logMeOut() {
        axios({
          method: "POST",
          url:"http://127.0.0.1:5000/logout",
        })
        .then((response) => {
           props.removToken()
           //props.setLoggedin(false)
           localStorage.removeItem('identifier')
           localStorage.removeItem('authority')
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}

    function ShowAndHideNavBar(){
        const collection = document.getElementsByClassName("HamburgerMenu-elem");
        const navbar = document.getElementById("nav");
        const menuIcon = document.getElementById("HamburgerMenu");
        for(let i = 0; i< collection.length; i++){
            if(collection[i].style.display === "block"){
                collection[i].style.display = "none";
                navbar.style.backdropFilter = "blur(0)";
                menuIcon.style.width = "50px";
            }
            else{
                collection[i].style.display = "block";
                navbar.style.backdropFilter = "blur(55px)";
                menuIcon.style.width = "250px";
            }
        }
    }
    function ResteMenu(){
        var w = window.innerWidth;
        const collection = document.getElementsByClassName("HamburgerMenu-elem");
        if(w >= 925){
            for(let i = 0; i< collection.length; i++){
                collection[i].style.display = "block";
            }
        }

    }

    useEffect(()=>{
        function handleResize() {
            ResteMenu()
        }
    })

    return(
        <nav className="nav" id="nav">
            {props.token != null &&
                <ul>
                    <button className="HamburgerMenu" id="HamburgerMenu" onClick={ShowAndHideNavBar}></button>
                    <CustomLinks className="HamburgerMenu-elem" to="/">Kezdőlap</CustomLinks>
                    <CustomLinks className="HamburgerMenu-elem" to="/agents">Ügynökök</CustomLinks>
                    {localStorage.getItem('authority') == 0 &&
                        <CustomLinks className="HamburgerMenu-elem" to="/agentRegister">Ügynök regisztráció</CustomLinks>}
                    {localStorage.getItem('authority') == 0 &&
                        <CustomLinks className="HamburgerMenu-elem" to="/listofusers">Felhasználók</CustomLinks>}
                    {localStorage.getItem('authority') != 0 &&
                        <CustomLinks className="HamburgerMenu-elem" to="/profil">Profil</CustomLinks>}
                    <Link className="HamburgerMenu-elem" onClick={logMeOut} to="/">Kijelentkezés</Link>
                </ul>
            }
            {props.token === null &&
                <ul>
                    <button className="HamburgerMenu" id="HamburgerMenu" onClick={ShowAndHideNavBar}></button>
                    <CustomLinks className="HamburgerMenu-elem" to="/">Kezdőlap</CustomLinks>
                    <CustomLinks className="HamburgerMenu-elem" to="/login">Belépés/Regisztráció</CustomLinks>
                </ul>
            }
        </nav>
    )
}

function CustomLinks({to, children, className, ...props}){
    const resovedPath = useResolvedPath(to)
    const isActive = useMatch({path: resovedPath.pathname})
    return(
        <li className={isActive ? "active" : ""}>
        <Link className={className} to={to}>{children}</Link>
    </li>
    )
}