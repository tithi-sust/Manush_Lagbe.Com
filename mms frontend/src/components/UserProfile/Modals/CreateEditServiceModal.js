import React, { useEffect, useState } from "react";
import ServiceSearchBar from "../../common/ServiceSearchBar";
import './style.css'

const CreateEditServiceModal=({editService,setEditService,Services,setServices})=>{
    let hideCreateEditServiceModal=()=>{
        document.querySelector("#createEditServiceModal").style.display="none";
        setServiceName(null);
        setCharge(null);
        setEditService(null);
    }
    let chargeChange=(e)=>{
        setCharge(e.target.value)
    }
    const [serviceName,setServiceName]=useState(editService?editService.Name:null);
    const [charge,setCharge]=useState(editService?editService.Charge:"");
    useEffect(()=>{
        setServiceName(editService?editService.Name:null)
        setCharge(editService?editService.Charge:null)
    },[editService])
    useEffect(()=>document.querySelector("#modalServiceCharge").value=charge,[charge])
    const save=()=>{
        if(charge===""||serviceName===null)
            {console.log('error input');return}
        let newServices=Services.filter(Service=>Service!=editService)
        editService={Name:serviceName,Charge:charge+" TK/hr"}
        newServices=[...newServices,editService]
        setServices(newServices)
        hideCreateEditServiceModal();
    }
    return(
    <div class="ModalBody" id="createEditServiceModal">
    <div class="ModalContainer" style={{margin:"30vh auto",maxWidth:"360px"}} id="createEditServiceModalContainer">
        <div class="ModalCloseContaier">
            <img class ="ModalCloseButton" src="./pics_icons/cancel.png" onClick={hideCreateEditServiceModal}/>
        </div>
        <div style={{margin:"auto"}}>
        <div id="serviceEditContainer" >
            <ServiceSearchBar service={serviceName} setService={setServiceName}/>
            <div class="flex">
            <input class="educationinputbox HW f24" id="modalServiceCharge" placeholder={editService?editService.Charge:"TK/hr"} onChange={chargeChange}/>
            <div className="Button f24 " id="serviceSaveButton" onClick={save}>Save</div>
            </div>
        </div>
        
        </div>
    </div>
    </div>
    )
}
export default CreateEditServiceModal;