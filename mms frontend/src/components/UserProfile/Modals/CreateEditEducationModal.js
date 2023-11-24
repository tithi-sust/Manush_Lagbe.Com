import React from "react";
import './style.css'

const CreateEditEducationModal=({Educations,setEducations,selectedEducation,setSelectedEducation})=>{
    let hideCreateEditEducationModal=()=>{
        document.querySelector("#createEditEducationModal").style.display="none";
        document.querySelector("#Degree").value=null;
        document.querySelector("#InstituteName").value=null;
        document.querySelector("#StartingYear").value=null;
        document.querySelector("#EdingYear").value=null;
        setSelectedEducation(null);
    }
    const saveEducation=()=>{
        let degree=document.querySelector("#Degree").value;
        let institue=document.querySelector("#InstituteName").value;
        let startingYear=document.querySelector("#StartingYear").value;
        let endingYear=document.querySelector("#EdingYear").value;
        let nw=selectedEducation
        if(selectedEducation===null)
            nw={InstituteName:null,StartingYear:null,EndingYear:null,Degree:null}
        if(degree)
            nw.Degree=degree;
        if(institue)
            nw.InstituteName=institue;
        if(startingYear)
            nw.StartingYear=startingYear
        if(endingYear)
            nw.EndingYear=endingYear
        if(nw.Degree ===null|| nw.InstituteName===null || nw.StartingYear===null || nw.EndingYear===null)
            {console.log("invalid intput");return}
        let newEducations=Educations.filter(Education=>Education.id!==nw.id)
        newEducations=[...newEducations,nw]
        setEducations(newEducations)
        hideCreateEditEducationModal();
    }
    return(
    <div class="ModalBody" id="createEditEducationModal">
    <div class="ModalContainer" style={{margin:"20vh auto"}} id="createEditEducationModalContainer">
        <div class="ModalCloseContaier">
            <img class ="ModalCloseButton" src="./pics_icons/cancel.png" onClick={hideCreateEditEducationModal}/>
        </div>
        <div style={{margin:"auto"}}>
        <div id="educaionEditContainer" >
            <input class="educationinputbox" placeholder={selectedEducation?selectedEducation.InstituteName:"Institute name"} id="InstituteName"/>
            <div class="flex">
            <input class="educationinputbox HW" placeholder={selectedEducation?selectedEducation.StartingYear:"Starting year"} id="StartingYear"/>
            <input class="educationinputbox HW" placeholder={selectedEducation?selectedEducation.EndingYear:"Eding Year"} id="EdingYear"/>
            </div>
            <input class="educationinputbox" placeholder={selectedEducation?selectedEducation.Degree:"Degree name"} id="Degree"/>
        
        </div>
        <div className="Button" onClick={saveEducation} style={{width:"fit-content",marginLeft:"auto"}} id="educaionSaveButton">Save</div>
        </div>
    </div>
    </div>
    )
}
export default CreateEditEducationModal;