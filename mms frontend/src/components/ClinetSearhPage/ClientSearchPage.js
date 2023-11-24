import React, { useEffect, useState } from "react";
import Title_bar from '../common/Title_bar';
import Footer from "../common/footer/Footer";
import LocationSearchBar from "../common/LocationSearchBar";
import ServiceSearchBar from "../common/ServiceSearchBar";
import './style.css';

const ClinetSearhPage=()=>{
    const [position,setPosition]=useState(null);
    const [service,setService]=useState(null);
    const Search=()=>{
        if(position==null||service==null)
            alert("Location or service invalid");
        else
            alert(`Service:${service}\n Postion;${position.location}`);
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
        </div>
    )
}


export default ClinetSearhPage;