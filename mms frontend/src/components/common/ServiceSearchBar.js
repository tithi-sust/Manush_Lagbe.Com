import React, { useEffect, useState } from "react";


const ServiceSearchBar=({setService,service})=>{
    let services=["Cleaning","RcikshawPulling","Hawkering","Caretalomg","Helping"]
    useEffect(()=>selectService(service),[service])
    let ontype=(e)=>{
        addDataToDiv(e.target.value,"#serviceresult");
    }
    let selectService=(service)=>{
    document.querySelector("#service").value=service
    setService(service);
    clearresult("#serviceresult");
    }
    
    let clearresult=(id)=>{
        let resultdiv=document.querySelector(id);
        resultdiv.innerHTML="";
        document.querySelector("#service").value=service;
    }
    
    let addDataToDiv=(value,id)=>{
        let resultdiv=document.querySelector(id);
        resultdiv.innerHTML="";
        let search=value;
        let tempresults=services.filter(result=>result.toLowerCase().includes(search.toLowerCase()))
        if(search===""&&false);
            //tempresults=[];
        tempresults.map(result=>{
            resultdiv.innerHTML+=`<div class="li" id=${result}>${result}</div>`
        })
        tempresults.map(result=>document.querySelector(`#${result}`).onclick=()=>{selectService(result)})
    }
    
    let addServiceBarOutsideClickListener=()=>{document.addEventListener('click', function(event) {
        var isClickInsideElement = document.querySelector("#serviceresult").contains(event.target);
        var isClickInsideElement2 = document.querySelector("#service").contains(event.target);
        
        if (!isClickInsideElement&&!isClickInsideElement2) {
            clearresult("#serviceresult")
        }
    });}
    addServiceBarOutsideClickListener();

    return(
        <div>
            <div class="inputboxcontaier">
            <div class="input"><input id="service" onChange={ontype} placeholder="What needs to be done"/><img class="inputicon" src="./pics_icons/search.png"/></div>
            </div>
            <div class="resultwrapper" id="serviceresult"></div>
        </div>

                    
    )
}

export default ServiceSearchBar;