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

 const UserProfile=()=>{
    const [profilepic,setProfilePic]=useState("./pics_icons/profilepic.jpg")
    const [name,setName]=useState("Tithi Saha")
    const [location,setLocation]=useState({"latitude":100,"longitude":100,"location":"Madina Market, Sylhet"})
    const [phoneno,setPhoneNo]=useState("01751327692")
    const [Educations,setEducations]=useState([{InstituteName:"Notre Dame College, Dhaka",
                    StartingYear:"2018",
                    EndingYear:"2022",
                    Degree:"HSC",id:1
                    },
                    {InstituteName:"Shajalal University of Science And Technology,Sylhet",
                    StartingYear:"2018",
                    EndingYear:"2022",
                    Degree:"BSC",id:2
                    }
                ]);
    const [Services,setServices]=useState([
        {"Name":"Shopping","Charge":"24 Tk/hr","id":1},
        {"Name":"Teaching","Charge":"200 Tk/hr","id":2},
        {"Name":"cooking","Charge":"200 Tk/hr","id":3}
    ])

    let works=[
        {client:"Fuad",worker:"Tithi",rating:"2",description:"Had fun wok with blah blah... .... ...",tag:"Shopping"},
        {client:"Fuad",worker:"Tithi",rating:"2",description:"Had fun wok with blah blah... .... ...",tag:"Shopping"},
        {client:"Fuad",worker:"Tithi",rating:"2",description:"Had fun wok with blah blah... .... ...",tag:"Shopping"},
        {client:"Fuad",worker:"Tithi",rating:"2",description:"Had fun wok with blah blah... .... ...",tag:"Shopping"}
    ]

    let showSetNameModal=()=>{document.querySelector("#setNameModal").style.display="block"}
    let showSetLocationModal=()=>{document.querySelector("#setLocationModal").style.display="block"}
    let showSetPhoneModal=()=>{document.querySelector("#setPhoneModal").style.display="block"}
    let showSetProfilePicModal=()=>{document.querySelector("#setProfilePicModal").style.display="block";}
    let showHireNowModal=()=>{document.querySelector("#hireNowModal").style.display="block";}
    let showEducaionModal=()=>{document.querySelector("#educationModal").style.display="block";}
    let showServiceModal=()=>{document.querySelector("#serviceModal").style.display="block";}
    
    return(
        <div id="container">
            <TitleBar page="clientPage"/>
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
                        
                        <div id="Profilelocation">
                            <img id="locaionicon" src="./pics_icons/location.png"/>
                            {location.location}
                            <img id="locationediticon" src="./pics_icons/edit.png" class="pointer" onClick={showSetLocationModal}/>
                        </div>
                        
                        <div id="phoneno">
                            <img id="phoneicon" src="./pics_icons/phone-callg.png"/>
                            {phoneno}
                            <img id="phonenoediticon" src="./pics_icons/edit.png" class="pointer" onClick={showSetPhoneModal}/>
                        </div>
                    </div>
                    <div id="buttondiv">
                        <div id="profilehirebtn" class="pointer" onClick={showHireNowModal}>Hire Now</div>
                    </div>
                </div>
                <div id="educationdiv" class="userinfo">
                    <div class="infotitle">
                        Education<img id="educationediticon" class="infoediticon pointer" src="./pics_icons/edit.png" onClick={showEducaionModal}/>
                    </div>
                    <div id="educationlist">
                        {Educations.map(Education=>(
                            <div class="educationlistitem">
                            <div id="educationinstitute">{Education.InstituteName}</div>
                            <div id="educationyear"><b>{Education.Degree}</b> {Education.StartingYear}-{Education.EndingYear}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="servicesdiv" class="userinfo">
                    <div class="infotitle">
                        Services <img id="serviceediticon" class="infoediticon pointer" src="./pics_icons/edit.png" onClick={showServiceModal}/>
                    </div>
                    <div id="profileservicelist">
                        {Services.map(Service=>(
                            <div class="profileservicelistitem">{Service.Name}</div>
                        ))}
                    </div>
                </div>
                <div id="workhistorydiv" class="userinfo">
                    <div class="infotitle">
                        Work History
                    </div>
                    <div id="profileworkhistorylist">
                        {works.map(work=>(
                            <div class="profileworkshitorylistitem">
                                <div class="workwith">{`with ${work.client}`}</div>
                                <div class="rating"><Rating rating={work.rating}/></div>
                                <div class="description">{`${work.description}`}</div>
                                <div class="tag">{`${work.tag}`}</div>
                            </div>
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
