import axios from "axios";
import React, { useEffect, useState } from "react";
import ServiceSearchBar from "../../common/ServiceSearchBar";
import './style.css'

const CreateEditServiceModal=({editService,setEditService,Services,setServices,editing})=>{
    let hideCreateEditServiceModal=()=>{
        document.querySelector("#createEditServiceModal").style.display="none";
        setServiceName(null);
        setCharge(null);
        setEditService(null);
    }
    let chargeChange=(e)=>{
        setCharge(e.target.value)
    }
    const [serviceName,setServiceName]=useState(editService?editService.service_name:null);
    const [charge,setCharge]=useState(editService?editService.charge:"");
    useEffect(()=>{
        setServiceName(editService?editService.service_name:null)
        setCharge(editService?editService.charge:null)
    },[editService])
    useEffect(()=>document.querySelector("#modalServiceCharge").value=charge,[charge])
    const save=()=>{
        if(charge===""||serviceName===null)
            {console.log('error input');return}
        let newServices=Services.filter(Service=>Service!=editService)

        editService={service_name:serviceName,charge:charge}

        console.log(editService)
        newServices=[...newServices,editService]
        if(editing)
            axios.patch("http://localhost:3001/workerservice",{
                email:localStorage.getItem("email"),
                service_name:editService.service_name,
                charge:editService.charge
            }).then(res=>{
                if(!res.data.error)
                    setServices(newServices)
                hideCreateEditServiceModal();
            })
        else{
            axios.post("http://localhost:3001/workerservice",{
                email:localStorage.getItem("email"),
                service_name:editService.service_name,
                charge:editService.charge
            }).then(res=>{
                if(!res.data.error)
                    setServices(newServices)
                hideCreateEditServiceModal();
            })
        }
    }
    return(
    <div class="ModalBody" id="createEditServiceModal">
    <div class="ModalContainer" style={{margin:"30vh auto",maxWidth:"360px"}} id="createEditServiceModalContainer">
        <div class="ModalCloseContaier">
            <img class ="ModalCloseButton" src="./pics_icons/cancel.png" onClick={hideCreateEditServiceModal}/>
        </div>
        <div style={{margin:"auto"}}>
        <div id="serviceEditContainer" >
            {editing?<div class="inputboxcontaier"><div class="input" style={{fontSize:"24px"}}>{editService?editService.service_name:null}</div></div>:
            <ServiceSearchBar service={serviceName} setService={setServiceName}/>}
            <div class="flex">
            <input class="educationinputbox HW f24" id="modalServiceCharge" placeholder={editService?editService.charge:"TK/hr"} onChange={chargeChange}/>
            <div className="Button f24 " id="serviceSaveButton" onClick={save}>Save</div>
            </div>
        </div>
        
        </div>
    </div>
    </div>
    )
}
export default CreateEditServiceModal;