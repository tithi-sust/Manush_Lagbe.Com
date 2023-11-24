import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'



const LogoutMenu=({setMenuVis})=>{

    const naviagte=useNavigate()
    const [active_text,setActiveText]=useState("Active");
    useEffect(()=>{
        if(localStorage.getItem("active_status")==="null"||localStorage.getItem("active_status")==="1")
            setActiveText("Active")
        else
            setActiveText("Not Active")
    },[])
    let Active=()=>{
        //1-activ/2-deactive
        let confirmAction = window.confirm("Changing your active status.");
        if(!confirmAction)
            return;
        if(active_text==="Active")
            axios.post("http://localhost:3001/updateworker",{
                "email": localStorage.getItem("email"),
                "active_status": 2
            }).then(res=>{
                if(!res.data.error)
                    {localStorage.setItem("active_status",2)
                    setActiveText("Not Active")}
            })
        else
            axios.post("http://localhost:3001/updateworker",{
                "email": localStorage.getItem("email"),
                "active_status": 1
            }).then(res=>{
                if(!res.data.error)
                    {localStorage.setItem("active_status",1)
                    setActiveText("Active")}
            })
    }
    let Logout=()=>{
        localStorage.clear();
        setMenuVis(false);
        naviagte('/')
    }


    return(
    <div id="lgm">
        <div class="logoutmenuitem" onClick={Logout}>
            Logout
        </div>
        {localStorage.getItem("type")!=="client"?<div class="logoutmenuitem" onClick={Active}>
            {active_text}
        </div>:null}
    </div>
)
}
export default LogoutMenu;
