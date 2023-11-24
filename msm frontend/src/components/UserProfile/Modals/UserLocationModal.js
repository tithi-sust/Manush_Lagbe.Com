import axios from "axios";
import React, { useState } from "react";
import LocationSearchBar from "../../common/LocationSearchBar";
import './style.css'

const UserLocationModal=({setLocation})=>{
    let hideSetLocationModal=()=>{
        setPosition(null)
        document.querySelector("#setLocationModal").style.display="none";
    }
    const [position,setPosition]=useState(null);
    const save=()=>{
        if(position)
            axios.post("http://localhost:3001/updateworker",{
                email:localStorage.getItem("email"),
                location_name:position.location,
                latitude:position.latitude,
                longitude:position.longitude
            }).then(res=>{
                setLocation(position);
                hideSetLocationModal();
            })
    }
    return(
    <div class="ModalBody" id="setLocationModal">
    <div class="ModalContainer" id="locationModalContainer">
        <div class="ModalCloseContaier">
            <img class ="ModalCloseButton" src="./pics_icons/cancel.png" onClick={hideSetLocationModal}/>
        </div>
        <div style={{display:"flex", margin:"auto"}}>
        <LocationSearchBar position={position} setPosition={setPosition}/>
        <div className="Button" id="Userlocationsavebutton" onClick={save}>Save</div>
        </div>
    </div>
    </div>
    )
}
export default UserLocationModal;