import axios from "axios";
import React, { useEffect, useState } from "react";


const ServiceSearchBar=({setService,service})=>{
    const [services,setServices]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/service').then(res=>{
            const service_names=res.data.result.map(service=>service.service_name)
            setServices(service_names)
        });
    },[])
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
        let i=0;
        tempresults.map(result=>{
            resultdiv.innerHTML+=`<div class="li" id=id${i++}>${result}</div>`
        })
        i=0;
        tempresults.map(result=>document.querySelector(`#id${i++}`).onclick=()=>{selectService(result)})
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