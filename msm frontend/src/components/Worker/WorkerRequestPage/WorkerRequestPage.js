import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../common/footer/Footer";
import TitleBar from "../../common/Title_bar";
import "./style.css"
import FilterModal from "../../common/Modal/FilterModal";

 const WorkerRequestPage=()=>{
    const navigate=useNavigate();
    const [clients, setClients]=useState([]);
    const [options,setOptions]=useState([]);
    const [selectedOption,setSelectedOption]=useState(useParams().option);
    useEffect(()=>{
        axios.get(`http://localhost:3001/servicerequestforworker?email=${localStorage.getItem("email")}`)
        .then(res=>{
            setClients(res.data.result.filter(service=>service.status==="pending"))
            let tops=res.data.result.map(worker=>worker.service_name)
            tops.push("All")
            let ntops=[...new Set(tops)]
            setOptions(ntops)
            console.log(clients)
        })
    },[])
    let accept=(client)=>{
        axios.put("http://localhost:3001/servicerequest",{
            "location": client.location,
            "status": client.status,
            "client_email": client.client_email,
            "worker_email":client.worker_email,
            "service_name":client.service_name
        }).then(res=>{
            if(!res.data.error)
                {alert("Accept work for "+client.name)
                removeAfterAcceptOrDecline(client);}
        })
        
    }
    let decline=(client)=>{
        axios.delete(`http://localhost:3001/servicerequest?start_time=${client.start_time}&location=${client.location}&status=${client.status}&client_email=${client.client_email}&worker_email=${client.worker_email}&service_name=${client.service_name}`).then(res=>{
            if(res.data.status==="ok")
                setClients(clients.filter(curclient=>!(curclient.email===client.email &&
                                                        curclient.service_name===client.service_name &&
                                                        curclient.status===client.status&
                                                        curclient.start_time===client.start_time
                                                        )))
                alert("Decline work for "+client.name)
        })
        
    }

    const removeAfterAcceptOrDecline=(client)=>{
        setClients(clients.filter(curclient=>!(curclient.email===client.email&&curclient.service_name===client.service_name&&curclient.status===client.status)))
    }
    

    let viewProfile=(e,client)=>{
        let isClickInsideAcceptButton = false;
        let isClickInsideDeclineButton = false;
        const AcceptButtons = document.querySelectorAll(".acceptbutton");
        const DeclineButtons = document.querySelectorAll(".declinebutton");
      
        AcceptButtons.forEach(acceptbutton => acceptbutton.contains(e.target) ? isClickInsideAcceptButton = true:null)
        DeclineButtons.forEach(declinebutton => declinebutton.contains(e.target) ? isClickInsideDeclineButton = true:null)
        if(isClickInsideAcceptButton || isClickInsideDeclineButton)
            return;
        navigate(`/viewprofile/${client.email}/pending`)
    }

    let showFilter=()=>{document.querySelector("#filterModal").style.display="block"}

    return(
        <div>
            <TitleBar page="workerPage"/>
            <div id="rqst">
                <div id="rqsttxt">
                    My Requests <img src="http://localhost:3000/pics_icons/filter.png" width="24px" class="filter" title="filter" onClick={showFilter}>
                    </img></div>
                {clients.map(client=>
                    selectedOption==="All"||selectedOption===client.service_name?
                    <div className="rectangle" onClick={(e)=>{viewProfile(e,client)}}>
                        <img src={client.profile_pic?"http://localhost:3001/"+client.profile_pic:'http://localhost:3000/pics_icons/alter.png'} class="workerimg" onClick={false}/>
                        <div class="rectxt">{client.name} <br/>
                            <font class="servicetxt">{client.service_name}</font>
                        </div>
                        <button class="acceptbutton" onClick={()=>{accept(client)}}>Accept</button>
                        <button class="declinebutton" onClick={()=>{decline(client)}}>Decline</button>
                    </div>:null
                )}
            </div>
            <Footer/>
            <FilterModal services={options} setSelectedOption={setSelectedOption} link={"requests"}/>
        </div>
    )
 }
 export default WorkerRequestPage;

 
