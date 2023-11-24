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
        localStorage.setItem("profile_pic","./pics_icons/alter.png")
    localStorage.setItem("phone_no", data.user.phone_no);
    localStorage.setItem("active_status", data.user.active_status);
    localStorage.setItem("location_name", data.user.location_name);
    localStorage.setItem("longitude", data.user.longitude);
    localStorage.setItem("latitude", data.user.latitude);
}


const ResetPassword=()=>{
    const [text,setText]=useState(null)
    const navigate=useNavigate ();
    
    const resetPasswordHandler=()=>{
        const email=document.querySelector("#email").value
        const password=document.querySelector("#password").value
        const phone_no=document.querySelector("#forgotphnno").value
        axios.post(`http://localhost:3001/resetpassword?email=${email}&password=${password}&phoneno=${phone_no}`).then(res=>{
            if(res.data.result.affectedRows>0)
                {setText("Password Set!");
                 setTimeout(()=>{navigate('/login')},1000)
                }
            else
                setText("Invalid credentials!");
                
        })
    }


    return(
        <div id="container">
            <TitleBar page="login"/>
            <div id="login">
                <div id="logintxt">Reset Password</div>
                <input class="logininput" id="email" placeholder="Email"/>
                <input class="logininput" id="forgotphnno" placeholder="Phone no."/>
                <input class="logininput" id="password" placeholder="New Password"/>
                <div id="loginbutton" onClick={resetPasswordHandler}>Reset</div>
            </div>
            <Notification text={text} setText={setText}/>
            <Footer/>
        </div>
    )
 }
 export default ResetPassword;
