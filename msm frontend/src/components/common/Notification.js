import React, { useEffect, useState } from "react";
import './style.css'

const Notification=({text,setText})=>{
    const [txt,setTxt]=useState(null);
    useEffect(()=>{
        if(text!==null)
        {
            setTxt(text)
            document.querySelector("#notification").style.display="block";
            setTimeout(()=>{document.querySelector("#notification").style.display="none";setText(null)},1000)
        }
    },[text])
    return(
    <div id="notification"><p>{txt}</p></div>
    )
}
export default Notification;
