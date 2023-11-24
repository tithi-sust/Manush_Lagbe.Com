import React, { useState } from "react";
import './style.css'
import CreateEditEducationModal from "./CreateEditEducationModal";
import axios from "axios";

const EducaionModal=({Educations,setEducations})=>{
    let hideEducaionModal=()=>{
        document.querySelector("#educationModal").style.display="none";
    }
    let showCreateEditEducationModal=()=>{
        document.querySelector("#createEditEducationModal").style.display="block";
        hideEducaionModal();
    }
    const deleteEducaion=(degree)=>{
        let newEducations=Educations.filter(Education=>Education.degree!=degree)
        axios.delete(`http://localhost:3001/education?email=${localStorage.getItem("email")}&degree=${degree}`).then(
            setEducations(newEducations)
        )
        
    }
    const [selectedEducation,setSelectedEducation]=useState(null)
    const [editing,setEditing]=useState(false)
    return(
    <div>
    <div class="ModalBody" id="educationModal" >
    <div class="ModalContainer" id="educaionModalContainer" style={{margin:"20vh auto"}} >
        <div class="ModalCloseContaier">
            <img class ="ModalCloseButton" src="./pics_icons/cancel.png" onClick={hideEducaionModal}/>
        </div>
        <div style={{ margin:"auto",textAlign:"left"}}>
            <span style={{fontSize:"36px",paddingRight:"8px"}}>Your Educaion</span>
            <img onClick={()=>{setEditing(false);showCreateEditEducationModal()}} id="addEducaion" style={{width:"38px",height:"38px",cursor:"pointer"}} src="./pics_icons/add.png"/>
            <div>
                {Educations.map((Education)=>(
                    <div style={{display:"flex"}} class="EducaionModalListItem">
                        <div class="EducaionItemTextContainer">
                            <span style={{fontSize:"18px"}}>{Education.institute}<br/></span>
                            <span style={{fontSize:"18px",color:"#AAA9A9"}}>{Education.starting_year}-{Education.ending_year}<br/></span>
                            <span style={{fontSize:"18px",fontWeight:"bold"}}>{Education.degree}</span>
                        </div>
                        <img onClick={()=>{setEditing(true);setSelectedEducation(Education);showCreateEditEducationModal()}} src="./pics_icons/edit.png" style={{width:"18px",height:"18px",marginLeft:"auto",cursor:"pointer"}}/>
                        <img onClick={()=>deleteEducaion(Education.degree)} src="./pics_icons/delete.png" style={{width:"18px",height:"18px",marginLeft:"8px",cursor:"pointer"}}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
    <CreateEditEducationModal selectedEducation={selectedEducation} setSelectedEducation={setSelectedEducation} Educations={Educations} setEducations={setEducations} editing={editing}/>
    </div>
    )
}
export default EducaionModal;