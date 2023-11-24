import React from "react";
import { Link } from "react-router-dom";
import Footer from "../common/footer/Footer";
import TitleBar from "../common/Title_bar";
import "./style.css"
 const SignUp1=()=>{
    return(
        <div id="container">
            <TitleBar page="signup"/>
            <div id="signup">
            
                <div id="signuptxt1">Join as</div>
                <div>
                <Link to="/signup2" > 
                    <div className="rectangle1">
                        <img class="picture" src="./pics_icons/employee.png"/>
                        <div class="rectext">Worker</div>
                    </div>
                </Link>
                <Link to="/signup3" >
                    <div className="rectangle2">
                        <img class="picture" src="./pics_icons/customer.png"/>
                        <div class="rectext">Client</div>
                    </div>
                </Link>
                </div>
                <br/><br/><br/>
                <div id="alreadyhaveaccount1">Already have an account?<Link to="/login"><font id="logIn">Log In</font></Link></div>
            </div>
            <Footer/>
        </div>
    )
 }
 export default SignUp1;
