import React, { useState } from "react";
import Footer from "../common/footer/Footer";
import TitleBar from "../common/Title_bar";
import Notification from "../common/Notification";
import axios from "axios";
import "./style.css"
import {useNavigate } from 'react-router-dom'

const setLocalStorage=(data)=>{
    localStorage.setItem("type", data.type);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("name", data.user.name);
    if(data.user.profile_pic)
        localStorage.setItem("profile_pic","http://localhost:3001/"+data.user.profile_pic);
    else
        localStorage.setItem("profile_pic",process.env.PUBLIC_URL+"/pics_icons/alter.png")
    localStorage.setItem("phone_no", data.user.phone_no);
    localStorage.setItem("active_status", data.user.active_status);
    localStorage.setItem("location_name", data.user.location_name);
    localStorage.setItem("longitude", data.user.longitude);
    localStorage.setItem("latitude", data.user.latitude);
}


const Login=()=>{
    const [text,setText]=useState(null)
    const navigate=useNavigate ();
    
    const loginHandler=()=>{
        const email=document.querySelector("#email").value
        const password=document.querySelector("#password").value
        axios.get(`http://localhost:3001/login?email=${email}&password=${password}`).then(res=>{
            console.log(res.data)
            if(res.data.user)
                setLocalStorage(res.data)
            if(res.data.type==="none")
                setText("Invalid credentials!");
            else
                {setText("Welcome!");navigate('/profile');}
        })
    }


    return(
        <div id="container">
            <TitleBar page="login"/>
            <div id="login">
                <div id="logintxt">Log in to mms</div>
                <input class="logininput" id="email" placeholder="Email"/>
                <input type="password" class="logininput" id="password" placeholder="password"/>
                <div id="loginbutton" onClick={loginHandler}>Log in</div>
                <div id="forgotpass" onClick={()=>navigate('/resetpassword')}>forgot password?</div>
            </div>
            <Notification text={text} setText={setText}/>
            <Footer/>
        </div>
    )
 }
 export default Login;
