import React, { useState } from "react";
import './style.css'
import CreateEditEducationModal from "./CreateEditEducationModal";

const EducaionModal=({Educations,setEducations})=>{
    let hideEducaionModal=()=>{
        document.querySelector("#educationModal").style.display="none";
    }
    let showCreateEditEducationModal=()=>{
        document.querySelector("#createEditEducationModal").style.display="block";
        hideEducaionModal();
    }
    const deleteEducaion=(id)=>{
        let newEducations=Educations.filter(Education=>Education.id!=id)
        setEducations(newEducations)
    }
    const [selectedEducation,setSelectedEducation]=useState(null)
    return(
    <div>
    <div class="ModalBody" id="educationModal" >
    <div class="ModalContainer" id="educaionModalContainer" style={{margin:"20vh auto"}} >
        <div class="ModalCloseContaier">
            <img class ="ModalCloseButton" src="./pics_icons/cancel.png" onClick={hideEducaionModal}/>
        </div>
        <div style={{ margin:"auto",textAlign:"left"}}>
            <span style={{fontSize:"36px",paddingRight:"8px"}}>Your Educaion</span>
            <img onClick={showCreateEditEducationModal} id="addEducaion" style={{width:"38px",height:"38px",cursor:"pointer"}} src="./pics_icons/add.png"/>
            <div>
                {Educations.map((Education)=>(
                    <div style={{display:"flex"}} class="EducaionModalListItem">
                        <div class="EducaionItemTextContainer">
                            <span style={{fontSize:"18px"}}>{Education.InstituteName}<br/></span>
                            <span style={{fontSize:"18px",color:"#AAA9A9"}}>{Education.StartingYear}-{Education.EndingYear}<br/></span>
                            <span style={{fontSize:"18px",fontWeight:"bold"}}>{Education.Degree}</span>
                        </div>
                        <img onClick={()=>{setSelectedEducation(Education);showCreateEditEducationModal()}} src="./pics_icons/edit.png" style={{width:"18px",height:"18px",marginLeft:"auto",cursor:"pointer"}}/>
                        <img onClick={()=>deleteEducaion(Education.id)} src="./pics_icons/delete.png" style={{width:"18px",height:"18px",marginLeft:"8px",cursor:"pointer"}}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
    <CreateEditEducationModal selectedEducation={selectedEducation} setSelectedEducation={setSelectedEducation} Educations={Educations} setEducations={setEducations}/>
    </div>
    )
}
export default EducaionModal;