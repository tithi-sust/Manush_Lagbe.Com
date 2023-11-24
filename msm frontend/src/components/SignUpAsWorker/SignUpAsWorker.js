import React from "react";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

import Footer from "../common/footer/Footer";
import TitleBar from "../common/Title_bar";
import Notification from "../common/Notification";
import "./style.css"
 const SignUpAsWorker=()=>{
    const [text,setText]=useState(null)
    const navigate=useNavigate()
     const signUp=()=>{
         const name=document.querySelector("#name").value
         const email=document.querySelector("#email").value
         const password=document.querySelector("#password").value
         if(!name || !email || !password)
            {setText("All fields must be filled!")
            return}
        axios.post(`http://localhost:3001/signup?email=${email}&password=${password}&name=${name}&type=Worker`).then(res=>{
            setText(res.data.stat)
            if(res.data.stat==="Account created!")
            {
                navigate("/login")
            }

        })
        
         
     }
    return(
        <div id="container">
            <TitleBar page="signup"/>
            <div id="signUp">
                <div id="signuptxt">Sign Up as Worker</div>
                <input type="name" class="signupinput" id="name" placeholder="Name"/>
                <input class="signupinput" id="email" placeholder="Email"/>
                <input type="password" class="signupinput" id="password" placeholder="password"/>
                <div id="signupbutton" onClick={signUp}>Sign Up</div>
                <div id="alreadyhaveaccount">Already have an account?<Link to="/login"><font id="logIn">Log In</font></Link></div>
                </div>
            <Footer/>
            <Notification text={text} setText={setText}/>
        </div>
    )
 }
 export default SignUpAsWorker;
 