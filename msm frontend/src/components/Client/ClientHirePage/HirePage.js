import React, { useEffect, useState } from "react";
import Footer from "../../common/footer/Footer";
import TitleBar from "../../common/Title_bar";
import "./style.css"
import ReviewModal from "./Modal/ReviewModal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FilterModal from "../../common/Modal/FilterModal";

 const SearchResultt=()=>{
    const [workers, setWorkers]=useState([]);
    const [worker,setWorker]=useState(null);
    const [options,setOptions]=useState([]);
    const [selectedOption,setSelectedOption]=useState(useParams().option);
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:3001/clientsrequests?email=${localStorage.getItem("email")}`).then(res=>{
            let sw=res.data
            console.log(sw)
            sw=sw.sort((a,b)=>new Date(a.start_time)>new Date(b.start_time))
            setWorkers(sw)
            let tops=res.data.map(worker=>worker.service_name)
            tops.push("All")
            let ntops=[...new Set(tops)]
            setOptions(ntops)
        })
    },[]);

    let endWork=(worker)=>{
        alert("End work for "+worker.name)
    }
    let deleteWorker=(worker)=>{
        alert("Delete "+worker.name)
    }
    
    const removeWorker=(worker)=>{
        console.log(worker)
        axios.delete(`http://localhost:3001/servicerequest?start_time=${worker.start_time}&location=${worker.location}&status=${worker.status}&client_email=${worker.client_email}&worker_email=${worker.email}&service_name=${worker.service_name}`).then(res=>{
            if(res.data.status==="ok")
                setWorkers(workers.filter(curworker=>!(curworker.email===worker.email &&
                                                        curworker.service_name===worker.service_name &&
                                                        curworker.status===worker.status&
                                                        curworker.start_time===worker.start_time
                                                        )))
        })
    }


    let viewProfile=(e,worker)=>{
        let isClickInsideHireButton = false;
        let isClickOnDeleteImg = false;
        const Buttons = document.querySelectorAll(".endbutton");
        const Images = document.querySelectorAll(".workerdeleteimg");
        Buttons.forEach(button => button.contains(e.target) ? isClickInsideHireButton = true:null)
        Images.forEach(Image => Image.contains(e.target) ? isClickOnDeleteImg = true:null)
        if(isClickInsideHireButton || isClickOnDeleteImg)
            return;
        navigate(`/viewprofile/${worker.email}/${worker.status}`)
        //alert("Visiting profile of "+worker.name)
    }

    let showReviewModal=()=>{document.querySelector("#setNameModal").style.display="block"}
    let showFilter=()=>{document.querySelector("#filterModal").style.display="block"}

    return(
        <div>
            <TitleBar page="clientPage"/>
            <div id="hire">
                <div id="clientshiretxt">
                    My Hires <img src="http://localhost:3000/pics_icons/filter.png" width="24px" class="filter" title="filter" onClick={showFilter}>
                    </img></div>
                {workers.map(worker=>selectedOption==="All"||selectedOption===worker.service_name?
                    <div className="hirerectangle" onClick={(e)=>{viewProfile(e,worker)}}>
                        <img src={'http://localhost:3001/'+worker.profile_pic} class="hireworkerimg" onClick={false}/>
                        <div class="rectxt">{worker.name} <br/>
                            <font class="servicetxt">{worker.service_name}</font>
                            <font class="statustxt">{worker.status}</font>
                        </div>
                        {
                            (worker.status) === "Running" ? <button class="endbutton" onClick={()=>{showReviewModal();setWorker(worker)}}>End Now</button> : 
                            (worker.status) === "pending" ?<img src="http://localhost:3000/pics_icons/delete.png" class="workerdeleteimg" onClick={() => { removeWorker(worker)}}/>:null
                        }
                        
                    </div>:null
                )}
            </div>
            <Footer/>
            <ReviewModal Worker={worker} Workers={workers} setWorkers={setWorkers}/>
            <FilterModal services={options} setSelectedOption={setSelectedOption} link={"hires"}/>
        </div>
    )
 }
 export default SearchResultt;

 