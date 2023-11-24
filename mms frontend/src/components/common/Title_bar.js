import React, { useEffect, useState } from "react";
import './style.css'
import LogoutMenu from "./LogoutMenu";

const hideMenu=()=>{document.querySelector("#lgm").style.display="none"}
const showMenu=()=>{document.querySelector("#lgm").style.display="block"}

const TitleBar=({page,style})=>{
    const[menuVis,setMenuVis]=useState(false);
    
    let addLis=()=>{document.addEventListener('click', function(event) {
        var isClickInsideElement1 = document.querySelector("#lgm").contains(event.target);
        var isClickInsideElement2 = document.querySelector("#titlebarimg").contains(event.target);
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
                <div id="title_bar_login"><b>Log In</b></div>
                <div id="title_bar_signup"><b>Sign Up</b></div> 
            </div>):null}
            
           { page==="clientPage"?(<div id="titlebarclientcontainer">
            <div id="clienttabs" class="tabcontainer">
                <a href="" class="tab">profile</a>
                <a href="" class="tab">find workers</a>
                <a href="" class="tab">my hires</a>
            </div>
            <img src="./pics_icons/profilepic.jpg" id="titlebarimg" onClick={titleImgClick}/>
            </div>):null}
        </div>
        <LogoutMenu setMenuVis={setMenuVis}/>
        </div>
    )
}
export default TitleBar;