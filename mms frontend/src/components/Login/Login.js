import React from "react";
import Footer from "../common/footer/Footer";
import TitleBar from "../common/Title_bar";
import "./style.css"
 const Login=()=>{
    return(
        <div id="container">
            <TitleBar page="login"/>
            <div id="login">
                <div id="logintxt">Log in to mms</div>
                <input class="logininput" id="email" placeholder="Email"/>
                <input type="password" class="logininput" id="password" placeholder="password"/>
                <div id="loginbutton">Log in</div>
                <div id="forgotpass">forgot password?</div>
            </div>
            <Footer/>
        </div>
    )
 }
 export default Login;
