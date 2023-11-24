import React, { useState } from "react";
import './style.css'
import CreateEditServiceModal from "./CreateEditServiceModal";

const ServiceModal=({Services,setServices})=>{
    const [editService,setEditService]=useState(null);
    let hideServiceModal=()=>{
        document.querySelector("#serviceModal").style.display="none";
    }
    let showCreateEditServiceModal=(service)=>{
        if(service)
            setEditService(service)
        else
            setEditService(null)
        document.querySelector("#createEditServiceModal").style.display="block";
        hideServiceModal();
    }
    const deletService=(name)=>{
        setServices(Services.filter(Serivce=>Serivce.Name!=name))
    }
    return(
    <div>
    <div class="ModalBody" id="serviceModal" >
    <div class="ModalContainer" id="serviceModalContainer" style={{margin:"20vh auto"}} >
        <div class="ModalCloseContaier">
            <img class ="ModalCloseButton" src="./pics_icons/cancel.png" onClick={hideServiceModal}/>
        </div>
        <div style={{ margin:"auto",textAlign:"left",width:"400px"}}>
            <span style={{fontSize:"36px",paddingRight:"8px"}}>Your Services</span>
            <img onClick={()=>showCreateEditServiceModal(null)} id="addService" style={{width:"38px",height:"38px",cursor:"pointer"}} src="./pics_icons/add.png"/>
            <div>
                {Services.map((Service)=>(
                    <div style={{display:"flex"}} class="EducaionModalListItem">
                        <div class="EducaionItemTextContainer">
                            <span style={{fontSize:"24px",fontWeight:"bold"}}>{Service.Name}<br/></span>
                            <span style={{fontSize:"18px",color:"#AAA9A9"}}>{Service.Charge}<br/></span>
                        </div>
                        <img onClick={()=>showCreateEditServiceModal(Service)} src="./pics_icons/edit.png" style={{width:"36px",height:"36px",marginLeft:"auto",cursor:"pointer"}}/>
                        <img src="./pics_icons/delete.png" style={{width:"36px",height:"36px",marginLeft:"8px",cursor:"pointer"}} onClick={()=>deletService(Service.Name)}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
    <CreateEditServiceModal setEditService={setEditService} editService={editService} Services={Services} setServices={setServices}/>
    </div>
    )
}
export default ServiceModal;