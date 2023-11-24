import axios from "axios";
import React, { useState } from "react";
import LocationSearchBar from "../../common/LocationSearchBar";
import './style.css'

const ProfilePicUploadModal=({profilePic,setProfilePic})=>{
    const [selectedImage,setSelectedImage]=useState(null);
    const [selectedImageFile,setSelectedImageFile]=useState(null);
    let selectImage=(e)=>{
        const file=e.target.files[0];
        console.log(e.target.files)
        if(!file){
            return;
        }
        const reader=new FileReader();
        reader.addEventListener("load",()=>{
            //console.log(reader.result);
            setSelectedImage(reader.result);
            setSelectedImageFile(file);
        })
        reader.readAsDataURL(file);
        document.querySelector("#selectedImage").style.display="block";
        document.querySelector("#UploadButton").style.display="block";
        document.querySelector("#UserProfilePicUploadButton").style.display="none";
    }
    let hideSetProfilePicModal=()=>{
        setSelectedImage(null);
        document.querySelector("#selectedImage").style.display="none";
        document.querySelector("#UploadButton").style.display="none";
        document.querySelector("#UserProfilePicUploadButton").style.display="block";
        document.querySelector("#setProfilePicModal").style.display="none";
    }
    const makeProfilePic=()=>{
        if(selectedImage){
            setProfilePic(selectedImage)
            const fd=new FormData()
            fd.append('profile_pic',selectedImageFile,selectedImageFile.name)
            fd.append('email',localStorage.getItem("email"))
            if(localStorage.getItem("type")==="worker")
                axios.post('http://localhost:3001/workerprofilepic',fd).then(res=>{
                    localStorage.setItem("profile_pic",selectedImage)
                })
            else
                axios.post('http://localhost:3001/clientprofilepic',fd).then(res=>{
                    localStorage.setItem("profile_pic",selectedImage)
                })
            
            console.log(selectedImageFile)
        }
        hideSetProfilePicModal();
    }
    return(
    <div class="ModalBody" id="setProfilePicModal">
    <div class="ModalContainer" style={{margin:"20vh auto"}} id="profilePicModalContainer">
        <div class="ModalCloseContaier" style={{borderBottom:"2px solid #a9a9a9",padding:"16px 0px"}}>
            Update profile picture
            <img class ="ModalCloseButton" src="./pics_icons/cancel.png" onClick={hideSetProfilePicModal}/>
        </div>
        <div id="priofilepicuplodcontainer">
        <label for="upload" className="Button" id="UserProfilePicUploadButton">Upload Picture</label>
        <input type="file" id="upload" onChange={selectImage} accept="image/*" hidden/>
        <img className="u2" alt="Image not selected" src={selectedImage} id="selectedImage"/>
        <div className="Button u2" id="UploadButton" onClick={makeProfilePic}>Make Profile Picture</div>
        </div>
    </div>
    </div>
    )
}
export default ProfilePicUploadModal;