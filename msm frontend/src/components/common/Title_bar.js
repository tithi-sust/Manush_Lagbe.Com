import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './style.css'
import LogoutMenu from "./LogoutMenu";

const hideMenu=()=>{document.querySelector("#lgm").style.display="none"}
const showMenu=()=>{document.querySelector("#lgm").style.display="block"}

const TitleBar=({page,style,up})=>{
    const[menuVis,setMenuVis]=useState(false);
    
    let addLis=()=>{document.addEventListener('click', function(event) {
        var isClickInsideElement1 = document.querySelector("#lgm").contains(event.target);
        var isClickInsideElement2=null;
        if(document.querySelector("#titlebarimg"))
            isClickInsideElement2 = document.querySelector("#titlebarimg").contains(event.target);
        if (!isClickInsideElement1 && !isClickInsideElement2) {
            setMenuVis(false);
        }
    });}

    addLis();

    useEffect(()=>{
        if(menuVis)
            {showMenu();}
        else
            {hideMenu();}
    },[menuVis])


    let titleImgClick=()=>{
    if(menuVis)
        {setMenuVis(false);}
    else
        {setMenuVis(true);}    
    }

    return(
        <div id="titlebar container">
        <div id="title_bar" style={style}>
            <div id="Logo">
                <div id="mms"><b>mms</b></div>
            </div>
           { page==="landing"?(<div id="buttons">
                <Link to="/login" id="title_bar_login"><b>Log In</b></Link>
                <Link to="/signup1" id="title_bar_signup"><b>Sign Up</b></Link> 
            </div>):null}
            
           { page!=="landing" && page!=="signup" && page!=="login"  && localStorage.getItem("type")==="client"?(<div id="titlebarclientcontainer">
            <div id="clienttabs" class="tabcontainer">
                <Link to="/profile" class="tab">profile</Link>
                <Link to="/search" class="tab">find workers</Link>
                <Link to="/hires/All" class="tab">my hires</Link>
            </div>
            <img src={up?up:localStorage.getItem("profile_pic")} id="titlebarimg" onClick={titleImgClick}/>
            </div>):null}
            { page!=="landing" && page!=="signup" && page!=="login" && localStorage.getItem("type")==="worker"?(<div id="titlebarclientcontainer">
            <div id="clienttabs" class="tabcontainer">
                <Link to="/profile" class="tab">profile</Link>
                <Link to="/services/All" class="tab">my services</Link>
                <Link to="/requests/All" class="tab">my requests</Link>
            </div>
            <img src={up?up:localStorage.getItem("profile_pic")} id="titlebarimg" onClick={titleImgClick}/>
            </div>):null}
        </div>
        <LogoutMenu setMenuVis={setMenuVis}/>
        </div>
    )
}
export default TitleBar;