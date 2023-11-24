import React, { useState } from "react";
import './style.css'
import CreateEditServiceModal from "./CreateEditServiceModal";
import axios from "axios";

const ServiceModal=({Services,setServices})=>{
    const [editService,setEditService]=useState(null);
    const [editing,setEditing]=useState(false);
    let hideServiceModal=()=>{
        document.querySelector("#serviceModal").style.display="none";
    }
    let showCreateEditServiceModal=(service)=>{
        if(service)
            {setEditService(service);setEditing(true);}
        else
            {setEditService(null);setEditing(false);}
        document.querySelector("#createEditServiceModal").style.display="block";
        hideServiceModal();
    }
    const deletService=(name)=>{
        axios.delete(`http://localhost:3001/workerservice?email=${localStorage.getItem("email")}&service_name=${name}`)
        .then(res=>setServices(Services.filter(Serivce=>Serivce.service_name!=name)))
        
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
                            <span style={{fontSize:"24px",fontWeight:"bold"}}>{Service.service_name}<br/></span>
                            <span style={{fontSize:"18px",color:"#AAA9A9"}}>{Service.charge} Tk/Hr<br/></span>
                        </div>
                        <img onClick={()=>showCreateEditServiceModal(Service)} src="./pics_icons/edit.png" style={{width:"36px",height:"36px",marginLeft:"auto",cursor:"pointer"}}/>
                        <img src="./pics_icons/delete.png" style={{width:"36px",height:"36px",marginLeft:"8px",cursor:"pointer"}} onClick={()=>deletService(Service.service_name)}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
    <CreateEditServiceModal setEditService={setEditService} editService={editService} Services={Services} setServices={setServices} editing={editing}/>
    </div>
    )
}
export default ServiceModal;