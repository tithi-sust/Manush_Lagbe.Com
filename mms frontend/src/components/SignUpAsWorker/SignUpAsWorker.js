import React from "react";
import Footer from "../common/footer/Footer";
import TitleBar from "../common/Title_bar";
import "./style.css"
 const SignUpAsWorker=()=>{
    return(
        <div id="container">
            <TitleBar page="signUp"/>
            <div id="signUp">
                <div id="signuptxt">Sign Up as Worker</div>
                <input type="name" class="signupinput" id="name" placeholder="Name"/>
                <input class="signupinput" id="email" placeholder="Email"/>
                <input type="password" class="signupinput" id="password" placeholder="password"/>
                <div id="signupbutton">Sign Up</div>
                <div id="alreadyhaveaccount">Already have an account?<font id="logIn">Log In</font></div>
            </div>
            <Footer/>
        </div>
    )
 }
 export default SignUpAsWorker;
