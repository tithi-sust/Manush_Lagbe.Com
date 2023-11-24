import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'

const FilterModal=({limit,setLimit,link})=>{
    let navigate=useNavigate()
    let hideFilterModal=()=>{
        document.querySelector("#searchFilterModal").style.display="none";
    }
    let Filter=()=>{
        let high=document.querySelector("#searchFIlterModalInputHigh").value
        let low=document.querySelector("#searchFIlterModalInputLow").value
        console.log(low)
        console.log(high)
        if(!low)
            low=limit.low
        if(!high)
            high=limit.high
        console.log(limit)
        setLimit({low:parseInt(low),high:parseInt(high)})
        hideFilterModal()
    }
    return(
    <div class="ModalBody" id="searchFilterModal" style={{display:"none"}}>
    <div class="ModalContainer" id="hireModalContainer" style={{margin:"20vh auto"}}>
        <div class="ModalCloseContaier">
            <font style={{fontSize:"24px"}}>Show Tk/hr</font>
            <img class ="ModalCloseButton" src={process.env.PUBLIC_URL+"/pics_icons/cancel.png"} onClick={hideFilterModal}/>
        </div>
        <div>
            <input class="searchFIlterModalInput" id="searchFIlterModalInputLow" placeholder={limit.low}></input>
            <b>-</b><input class="searchFIlterModalInput" id="searchFIlterModalInputHigh" placeholder={limit.high}></input>
            <span className="Button " id="searchFilterButton" onClick={Filter}>OK</span>
        </div>
    </div>
    </div>
    )
}
export default FilterModal;