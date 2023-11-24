import React from "react";
import './style.css'

const UserPhoneModal=({phoneNo,setPhoneNo})=>{
    let hideSetPhoneModal=()=>{
        document.querySelector("#setPhoneModal").style.display="none";
    }
    let savePhoneNo=()=>{
        let newNo=document.querySelector("#ModalPhoneField").value;
        if(newNo)
            setPhoneNo(newNo)
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