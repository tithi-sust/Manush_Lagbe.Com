import axios from "axios";
import React, { useState } from "react";
import './style.css'

import Notification from "../../common/Notification";

const HireNowModal=({services,searchedLocation,user_email})=>{
    const [text,setText]=useState(null);
    let hideHireModal=()=>{
        document.querySelector("#hireNowModal").style.display="none";
    }
    let requeForService=(service)=>{
        axios.post('http://localhost:3001/servicerequest',{
            location:searchedLocation,
            client_email:localStorage.getItem("email"),
            worker_email:user_email,
            service_name:service.service_name
        }).then(res=>{
            console.log(res.data)
            if(res.data.error)
                setText('Already have a request pending!')
            else
                setText('Request Sent!')
        })
        //alert("requested for service "+`${service.service_name} location: ${searchedLocation}`)
        
    }

    console.log(services);
    return(
    <div class="ModalBody" id="hireNowModal">
    <div class="ModalContainer" id="hireModalContainer" style={{margin:"20vh auto"}}>
        <div class="ModalCloseContaier">
            <img class ="ModalCloseButton" src={process.env.PUBLIC_URL+"/pics_icons/cancel.png"} onClick={hideHireModal}/>
        </div>
        <div>
            {services.map(service=>(
                <div class="servcieModlaListItem" onClick={()=>{
                    requeForService(service);
                }}>
                    <span class="service_modal_list_name">{service.service_name}</span>
                    <span class="service_modal_list_charge">{`${service.charge} Tk/hr`}</span>
                </div>
                ))}
        </div>
    </div>
    <Notification text={text} setText={setText}/>
    </div>
    )
}
export default HireNowModal;