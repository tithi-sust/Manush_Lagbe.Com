import React, { Component, useEffect, useState } from "react";
import Footer from "../common/footer/Footer";
import TitleBar from "../common/Title_bar";
import Rating from "./Rating";
import "./style.css"
import UserNameModal from './Modals/UserNameModal'
import UserLocationModal from "./Modals/UserLocationModal";
import UserPhoneModal from "./Modals/UserPhoneModal";
import ProfilePicUploadModal from "./Modals/ProfilePicUploadModal"
import HireNowModal from "./Modals/HireNowModal";
import EducaionModal from "./Modals/EducationModal";
import ServiceModal from "./Modals/ServiceModal";
import axios from "axios";

 const UserProfile=()=>{
    const [profilepic,setProfilePic]=useState("./pics_icons/alter.png")
    const [name,setName]=useState("")
    const [location,setLocation]=useState({"latitude":100,"longitude":100,"location":""})
    const [phoneno,setPhoneNo]=useState("")
    const [Educations,setEducations]=useState([]);
    const [Services,setServices]=useState([])

    const [works,setWorks]=useState([])
    const [type,setType]=useState(localStorage.getItem("type"))

    let showSetNameModal=()=>{document.querySelector("#setNameModal").style.display="block"}
    let showSetLocationModal=()=>{document.querySelector("#setLocationModal").style.display="block"}
    let showSetPhoneModal=()=>{document.querySelector("#setPhoneModal").style.display="block"}
    let showSetProfilePicModal=()=>{document.querySelector("#setProfilePicModal").style.display="block";}
    let showHireNowModal=()=>{document.querySelector("#hireNowModal").style.display="block";}
    let showEducaionModal=()=>{document.querySelector("#educationModal").style.display="block";}
    let showServiceModal=()=>{document.querySelector("#serviceModal").style.display="block";}

    useEffect(()=>{
        axios.get(`http://localhost:3001/${type}?email=${localStorage.getItem("email")}`).then(res=>{
            const data=res.data.user_data;
            setEducations(data.educations)
            setServices(data.services)
            
            let sw=data.works
            sw=sw.sort((a,b)=>new Date(a.start_time)>=new Date(b.start_time))
            setWorks(sw)
            console.log(sw)

            setName(data.basic_info.name)
            setLocation({"latitude":data.basic_info.latitude,"longitude":data.basic_info.longitude,"location":data.basic_info.location_name})
            setPhoneNo(data.basic_info.phone_no)
            if(data.basic_info.profile_pic)
                setProfilePic("http://localhost:3001/"+data.basic_info.profile_pic);
            else
                setProfilePic('./pics_icons/alter.png')
            console.log(data)
        })
    },[])
    
    return(
        <div id="container">
            <TitleBar page={type==="client"?"clientPage":"workerPage"} up={profilepic}/>
            <div id="profilediv">
                <div id="basicinfo" class="userinfo">
                    <div id="profilepicdiv">
                        <img src={profilepic} id="profilepic"/>
                        <div id="profilepicedit" class="pointer">
                            <img onClick={showSetProfilePicModal} id="profilepiceditimg" src="./pics_icons/camera.png"/>
                        </div>
                    </div>
                    <div id="basicinfotxt">
                        <div id="username">
                            {name}
                            <img id="nameediticon" src="./pics_icons/edit.png" onClick={showSetNameModal} class="pointer"/>
                        </div>
                        
                        {type==="worker"?<div id="Profilelocation">
                            <img id="locaionicon" src="./pics_icons/location.png"/>
                            {location.location}
                            <img id="locationediticon" src="./pics_icons/edit.png" class="pointer" onClick={showSetLocationModal}/>
                        </div>:null}
                        
                        <div id="phoneno">
                            <img id="phoneicon" src="./pics_icons/phone-callg.png"/>
                            {phoneno}
                            <img id="phonenoediticon" src="./pics_icons/edit.png" class="pointer" onClick={showSetPhoneModal}/>
                        </div>
                    </div>
                    <div id="buttondiv">
                    </div>
                </div>
                {type==="worker"?<div id="educationdiv" class="userinfo">
                    <div class="infotitle">
                        Education<img id="educationediticon" class="infoediticon pointer" src="./pics_icons/edit.png" onClick={showEducaionModal}/>
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
                        Services <img id="serviceediticon" class="infoediticon pointer" src="./pics_icons/edit.png" onClick={showServiceModal}/>
                    </div>
                    <div id="profileservicelist">
                        {Services.map(Service=>(
                            <div class="profileservicelistitem">{Service.service_name}</div>
                        ))}
                    </div>
                </div>:null}
                <div id="workhistorydiv" class="userinfo">
                    <div class="infotitle">
                        {type==="worker"?"Work History":"My Hires"}
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
            <UserNameModal name={name} setName={setName}/>
            <UserLocationModal setLocation={setLocation}/>
            <UserPhoneModal phoneNo={phoneno} setPhoneNo={setPhoneNo}/>
            <ProfilePicUploadModal profilePic={profilepic} setProfilePic={setProfilePic}/>
            <HireNowModal services={Services}/>
            <EducaionModal Educations={Educations} setEducations={setEducations}/>
            <ServiceModal Services={Services} setServices={setServices}/>
        </div>
    )
 }
 export default UserProfile;
