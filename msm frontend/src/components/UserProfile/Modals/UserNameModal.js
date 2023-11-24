import axios from "axios";
import React from "react";
import './style.css'

const UserNameModal=({name,setName})=>{
    let hideSetNameModal=()=>{
        document.querySelector("#setNameModal").style.display="none";
    }
    const saveName=()=>{
        let newName=document.querySelector("#ModalNameField").value;
        if(newName)
            {   
                if(localStorage.getItem("type")==="worker")
                    axios.post("http://localhost:3001/updateworker",{
                        email:localStorage.getItem("email"),
                        name:newName
                    }).then(res=>{
                        setName(newName)
                    })
                if(localStorage.getItem("type")==="client")
                    axios.post("http://localhost:3001/updateclient",{
                        email:localStorage.getItem("email"),
                        name:newName
                    }).then(res=>{
                        setName(newName)
                    })
            }
        hideSetNameModal()
    }
    return(
    <div class="ModalBody" id="setNameModal">
    <div class="ModalContainer">
        <div class="ModalCloseContaier">
            <img class ="ModalCloseButton" src="./pics_icons/cancel.png" onClick={hideSetNameModal}/>
        </div>
        <div style={{display:"flex", margin:"auto"}}>
        <input placeholder={name?name:"Set new name"} id="ModalNameField" />
        <div className="Button" id="Usernamesavebutton" onClick={saveName}>Save</div>
        </div>
    </div>
    </div>
    )
}
export default UserNameModal;