import React from "react";
import Footer from "../common/footer/Footer";
import TitleBar from "../common/Title_bar";
import "./style.css"
 const SignUp1=()=>{
    return(
        <div id="container">
            <TitleBar page="signup"/>
            <div id="signup">
            
                <div id="signuptxt">Join as</div>
                <div>
                    <div className="rectangle1">
                        <img class="picture" src="./pics_icons/employee.png"/>
                        <div class="rectext">Worker</div>
                    </div>
                    <div className="rectangle2">
                        <img class="picture" src="./pics_icons/customer.png"/>
                        <div class="rectext">Client</div>
                    </div>
                </div>
                <br/><br/><br/>
                <div id="alreadyhaveaccount">Already have an account?<font id="logIn">Log In</font></div>
            </div>
            <Footer/>
        </div>
    )
 }
 export default SignUp1;
