import React from "react";
import axios from "axios";
import './style.css'

const UserPhoneModal=({phoneNo,setPhoneNo})=>{
    let hideSetPhoneModal=()=>{
        document.querySelector("#setPhoneModal").style.display="none";
    }
    let savePhoneNo=()=>{
        let newNo=document.querySelector("#ModalPhoneField").value;
        if(newNo)
        {
            if(localStorage.getItem("type")==="worker")
                axios.post("http://localhost:3001/updateworker",{
                    email:localStorage.getItem("email"),
                    phone_no:newNo
                }).then(res=>{
                    setPhoneNo(newNo)
                })
            if(localStorage.getItem("type")==="client")
                axios.post("http://localhost:3001/updateclient",{
                    email:localStorage.getItem("email"),
                    phone_no:newNo
                }).then(res=>{
                    setPhoneNo(newNo)
                })
        }
        hideSetPhoneModal()
    }
    return(
    <div class="ModalBody" id="setPhoneModal">
    <div class="ModalContainer">
        <div class="ModalCloseContaier">
            <img class ="ModalCloseButton" src="./pics_icons/cancel.png" onClick={hideSetPhoneModal}/>
        </div>
        <div style={{display:"flex", margin:"auto"}}>
        <input placeholder={phoneNo?phoneNo:"Set new Phone no."} id="ModalPhoneField"/>
        <div className="Button" id="UserPhonesavebutton" onClick={savePhoneNo}>Save</div>
        </div>
    </div>
    </div>
    )
}
export default UserPhoneModal;