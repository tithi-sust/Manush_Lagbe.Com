import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../common/footer/Footer";
import TitleBar from "../../common/Title_bar";
import "./style.css"
import FilterModal from "../../common/Modal/FilterModal";

 const WorkerWorkPage=()=>{
     const navigate=useNavigate();
    const [workers,setWorkers]=useState([])
    const [options,setOptions]=useState([]);
    const [selectedOption,setSelectedOption]=useState(useParams().option);

    let viewProfile=(e,worker)=>{
        navigate(`/viewprofile/${worker.email}/${worker.status}`)
    }

    useEffect(()=>{
        axios.get(`http://localhost:3001/servicerequestforworker?email=${localStorage.getItem("email")}`)
        .then(res=>{
            setWorkers(res.data.result.filter(service=>service.status!=="pending"))
            console.log(res.data.result.filter(service=>service.status!=="pending"))
            let tops=res.data.result.map(worker=>worker.service_name)
            tops.push("All")
            let ntops=[...new Set(tops)]
            setOptions(ntops)
        })
    },[])
    let showFilter=()=>{document.querySelector("#filterModal").style.display="block"}
    return(
        <div>
            <TitleBar page="workerPage"/>
            <div id="workerwork">
                <div id="workersworktxt">
                    My Services <img src="http://localhost:3000/pics_icons/filter.png" width="24px" class="filter" title="filter" onClick={showFilter}></img></div>
                {workers.map(worker=>
                    selectedOption==="All"||selectedOption==worker.service_name?
                    <div className="rectangle" onClick={(e)=>{viewProfile(e,worker)}}>
                        <img src={worker.profile_pic?"http://localhost:3001/"+worker.profile_pic:"http://localhost:3000/pics_icons/alter.png"} class="workerimg" onClick={false}/>
                        <div class="rectxt">{worker.name} <br/>
                            <font class="servicetxt">{worker.service_name}</font>
                            
                        </div>
                        {
                            (worker.status) === "Running" ? <button class="runningbutton" >Running</button> :<button class="endedbutton" >Ended</button>
                        }
                        
                    </div>:null
                )}
            </div>
            <Footer/>
            <FilterModal services={options} setSelectedOption={setSelectedOption} link={"services"}/>
        </div>
    )
 }
 export default WorkerWorkPage;

 