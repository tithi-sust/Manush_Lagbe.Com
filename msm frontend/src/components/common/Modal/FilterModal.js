import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'

const FilterModal=({services,setSelectedOption,link})=>{
    let navigate=useNavigate()
    let hideFilterModal=()=>{
        document.querySelector("#filterModal").style.display="none";
    }
    return(
    <div class="ModalBody" id="filterModal" style={{display:"none"}}>
    <div class="ModalContainer" id="hireModalContainer" style={{margin:"20vh auto"}}>
        <div class="ModalCloseContaier">
            <font style={{fontSize:"24px"}}>Show</font>
            <img class ="ModalCloseButton" src={process.env.PUBLIC_URL+"/pics_icons/cancel.png"} onClick={hideFilterModal}/>
        </div>
        <div>
            {services.map(service=>(
                <div class="filterModlaListItem" onClick={()=>{
                    navigate(`/${link}/${service}`)
                    setSelectedOption(service)
                    hideFilterModal()
                }}>
                    <span class="filter_modal_list_name">{service}</span>
                </div>
                ))}
        </div>
    </div>
    </div>
    )
}
export default FilterModal;