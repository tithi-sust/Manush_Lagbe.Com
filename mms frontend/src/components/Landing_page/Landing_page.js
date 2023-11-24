import React from "react";
import '../common/Title_bar';
import TitleBar from "../common/Title_bar";
import Footer from "../common/footer/Footer";
import './style.css';

let count_workers=240;
let count_clients=120;
let count_works=24;
const LandingPage=()=>{

    return(
        <div>
            <TitleBar page="landing" style={{"border-bottom":"0px solid white"}}/>
            <img src="./pics_icons/landing.png" id="landing_img"></img>
            <div id="Manush_lagbe"><b>Mansuh Lagbe?</b></div>
            <div id="we_are_here">We are here for you</div>
            <div id="counts">
                <div class="cnt">
                    <img class="cntimg" src="./pics_icons/handshake.png"/>
                    <div class="cntnum"><b>{count_clients}</b></div>
                    <div class="cnttxt">Clients</div>
                </div>
                <div class="cnt">
                    <img class="cntimg" src="./pics_icons/employeelan.png"/>
                    <div class="cntnum"><b>{count_workers}</b></div>
                    <div class="cnttxt">Workers</div>
                </div>
                <div class="cnt">
                    <img class="cntimg" src="./pics_icons/wallet.png"/>
                    <div class="cntnum"><b>{count_works}</b></div>
                    <div class="cnttxt">works</div>
                </div>
            </div>
            <div id="whymms">
                    <div id="whymmstitle"><b>Why MMS?</b></div>
                    <div id="whymmstxt">
                    Manush Lagbe.com has made to search for<br></br> workers around you very easily and safely.
                     Also finding jobs through MMS is easier. 
                    </div>
            </div>
            <Footer/>
        </div>
    )
}
export default LandingPage;