import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../common/footer/Footer";
import TitleBar from "../../common/Title_bar";
import "./style.css"
import FilterModal from "./Modal/FilterModal";

 const SearchResult=()=>{
    const navigate=useNavigate()
    const {longitude,latitude,service,location}=useParams();
    const [workers,setWorkers]=useState([])
    const [limit,setLimit]=useState({low:0,high:10000})
     useEffect(()=>{
        axios.get(`http://localhost:3001/searchworker?longitude=${longitude}&latitude=${latitude}&service_name=${service}`).then(res=>{
                console.log(res.data)
                setWorkers(res.data.filter(worker=>worker.active_status!==2))
            })
     },[])
     

    let hire=(worker)=>{
        alert("Hiring "+worker.name)
    }
    let viewProfile=(e,worker)=>{
        let isClickInsideHireButton = false;
        const Buttons = document.querySelectorAll(".hirebutton");
        Buttons.forEach(button=>button.contains(e.target)?isClickInsideHireButton=true:null)
        if(isClickInsideHireButton)
            return;
        navigate(`/viewsearchedprofile/${worker.email}/${location}`)
    }
    let showFilterModal=()=>{document.querySelector("#searchFilterModal").style.display="block"}
    return(
        <div>
            <TitleBar page="clientPage"/>
            <div id="hire">
                <div id="searchpagehiretxt">Search Results <img src="http://localhost:3000/pics_icons/filter.png" width="24px" class="filter" title="filter" onClick={showFilterModal}>
                    </img></div>
                <div id="searchstatetxt">{service} in {location}</div>
                {workers.map(worker=>worker.charge>=(limit.low)
                && worker.charge<=(limit.high)?
                    <div className="rectangle" onClick={(e)=>{viewProfile(e,worker)}}>
                        <img src={`http://localhost:3001/${worker.profile_pic}`} onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src=process.env.PUBLIC_URL+"/pics_icons/alter.png";
                        }} class="workerimg" onClick={false}/>
                        <div class="rectxt">{worker.name} <br/><font id="servicetxt">{worker.charge}TK/hr</font>
                         </div>
                         <button class="hirebutton" style={{visibility:"hidden"}}  onClick={()=>{hire(worker)}}>Hire Now</button>
                    </div>:null
                )}
            </div>
            <Footer/>
            <FilterModal limit={limit} setLimit={setLimit}/>
        </div>
    )
 }
 export default SearchResult;
