import React from "react";
import './style.css'

const HireNowModal=({services})=>{
    let hideHireModal=()=>{
        document.querySelector("#hireNowModal").style.display="none";
    }
    let requeForService=(id)=>{alert("requested for service "+`${id}`)}

    console.log(services);
    return(
    <div class="ModalBody" id="hireNowModal">
    <div class="ModalContainer" id="hireModalContainer" style={{margin:"20vh auto"}}>
        <div class="ModalCloseContaier">
            <img class ="ModalCloseButton" src="./pics_icons/cancel.png" onClick={hideHireModal}/>
        </div>
        <div>
            {services.map(service=>(
                <div class="servcieModlaListItem" onClick={()=>{
                    requeForService(service.id);
                }}>
                    <span class="service_modal_list_name">{service.Name}</span>
                    <span class="service_modal_list_charge">{service.Charge}</span>
                </div>
                ))}
        </div>
    </div>
    </div>
    )
}
export default HireNowModal;