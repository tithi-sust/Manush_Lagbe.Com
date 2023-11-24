import React, { Component, useEffect, useState } from "react";
import Footer from "../common/footer/Footer";
import TitleBar from "../common/Title_bar";
import Rating from "./Rating";
import "./style.css"
import { useParams } from "react-router-dom";
import axios from "axios";

 const ViewProfile=()=>{
    const {email,status}=useParams();
    const [profilepic,setProfilePic]=useState("http://localhost:3000/pics_icons/alter.png")
    const [name,setName]=useState("")
    const [location,setLocation]=useState({"latitude":100,"longitude":100,"location":""})
    const [phoneno,setPhoneNo]=useState("")
    const [Educations,setEducations]=useState([]);
    const [Services,setServices]=useState([])

    const [works,setWorks]=useState([])
    const [type,setType]=useState(localStorage.getItem("type"))

    useEffect(()=>{
        axios.get(`http://localhost:3001/viewprofile?user=${email}&viewer=${localStorage.getItem("email")}&viewer_type=${localStorage.getItem("type")}&status=${status}`).then(res=>{
            const data=res.data.user_data;
            setEducations(data.educations)
            setServices(data.services)
            setWorks(data.works)
            setName(data.basic_info.name)
            setLocation({"latitude":data.basic_info.latitude,"longitude":data.basic_info.longitude,"location":data.basic_info.location_name})
            setPhoneNo(data.basic_info.phone_no)
            if(data.basic_info.profile_pic)
                setProfilePic("http://localhost:3001/"+data.basic_info.profile_pic);
            else
                setProfilePic('http://localhost:3000/pics_icons/alter.png')
            setType(data.user_type)
            console.log(data)
        })
    },[])
    
    return(
        <div id="container">
            <TitleBar page={type==="client"?"clientPage":"workerPage"}/>
            <div id="profilediv">
                <div id="basicinfo" class="userinfo">
                    <div id="profilepicdiv">
                        <img src={profilepic} id="profilepic"/>
                    </div>
                    <div id="basicinfotxt">
                        <div id="username">
                            {name}
                        </div>
                        
                        {type==="worker"?<div id="Profilelocation">
                            <img id="locaionicon" src={process.env.PUBLIC_URL+"/pics_icons/location.png"}/>
                            {location.location}
                        </div>:null}
                        
                        <div id="phoneno">
                            <img id="phoneicon" src={process.env.PUBLIC_URL+"/pics_icons/phone-callg.png"}/>
                            {phoneno?phoneno:<font color="#a9a9a9">##########</font>}
                        </div>
                    </div>
                    <div id="buttondiv">
                    </div>
                </div>
                {type==="worker"?<div id="educationdiv" class="userinfo">
                    <div class="infotitle">
                        Education
                    </div>
                    <div id="educationlist">
                        {Educations.map(Education=>(
                            <div class="educationlistitem">
                            <div id="educationinstitute">{Education.institute}</div>
                            <div id="educationyear"><b>{Education.degree}</b> {Education.starting_year}-{Education.ending_year}</div>
                            </div>
                        ))}
                    </div>
                </div>:null}
                {type==="worker"?<div id="servicesdiv" class="userinfo">
                    <div class="infotitle">
                        Services
                    </div>
                    <div id="profileservicelist">
                        {Services.map(Service=>(
                            <div class="profileservicelistitem">{Service.service_name}</div>
                        ))}
                    </div>
                </div>:null}
                <div id="workhistorydiv" class="userinfo">
                    <div class="infotitle">
                        Work History
                    </div>
                    <div id="profileworkhistorylist">
                        {works.map(work=>(
                            work.review?
                            <div class="profileworkshitorylistitem">
                                <div class="workwith">with <b>{` ${work.name}`}</b></div>
                                <div class="rating"><Rating rating={work.rating}/></div>
                                <div class="description">{`${work.review}`}</div>
                                <div class="tag">{`${work.service_name}`}</div>
                            </div>:null
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
 }
 export default ViewProfile;
