import React, { useEffect, useState } from "react";
import Title_bar from '../common/Title_bar';
import Footer from "../common/footer/Footer";
import LocationSearchBar from "../common/LocationSearchBar";
import ServiceSearchBar from "../common/ServiceSearchBar";
import Notification from "../common/Notification";
import './style.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClinetSearhPage=()=>{
    const [position,setPosition]=useState(null);
    const [service,setService]=useState(null);
    const [text,setText]=useState(null);
    const navigate=useNavigate()
    const Search=()=>{
        if(position==null||service==null)
            setText("Location or service invalid");
        else
            navigate(`/searched/${position.latitude}/${position.longitude}/${service}/${position.location}`)
        console.log(service)
        console.log(position)
            
    }
    return(
        <div>
            <Title_bar page="clientPage"/>
            <div id="searchdiv">
                <div id="inputfields">
                    <LocationSearchBar setPosition={setPosition} position={position}/>
                    <ServiceSearchBar setService={setService} service={service}/>
                    <div id="searchbutton" onClick={Search}>Search</div>
                </div>
            </div>
            <Footer/>
            <Notification text={text} setText={setText}/>
        </div>
    )
}


export default ClinetSearhPage;