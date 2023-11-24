import React, { useState } from "react";
import RatingTaker from "../../../common/RatingTaker";
import Notification from "../../../common/Notification";
import './style.css'
import axios from "axios";

const ReviewModal=({Worker,Workers,setWorkers})=>{
    const [rating,setRating]=useState(0)
    const [notification,setNotification]=useState(null);
    let hideReviewModal=()=>{
        document.querySelector("#setNameModal").style.display="none";
        
        document.querySelector("#hiresModalNameField").value="";
        setRating(0);
    }
    const saveReview=()=>{
        let review=document.querySelector("#hiresModalNameField").value;
        if(rating===0||review==="")
            {setNotification("Please, add review and rating to end work!");return;}
        console.log(review)
        console.log(rating)
        axios.patch('http://localhost:3001/servicerequest',{
               "location": Worker.location,
                "status": Worker.status,
                "client_email": Worker.client_email,
                "worker_email":Worker.email,
                "service_name":Worker.service_name,
                "review":review,
                "rating":rating,
                "end_time":new Date().toString(),
                "start_time":Worker.start_time
        }).then(res=>{
            if(!res.data.error)
                {let newWorkers=Workers.map(curWorker=>{if(curWorker.email===Worker.email && curWorker.service_name===Worker.service_name &&
                    curWorker.status===Worker.status && curWorker.start_time===Worker.start_time)
                    curWorker.status="Ended"
                    return curWorker;
                    }
                    
                    )
                hideReviewModal()
                alert("Done!")
                setWorkers(newWorkers)}
            else{
               console.log(res.data.error) 
            }
          
        
        })
        
        
    }
    return(
    <div class="ModalBody" id="setNameModal">
    <div class="ModalContainer" id="hirepagemodal">
        <div class="ModalCloseContaier" >
            <img class ="ModalCloseButton" src="http://localhost:3000/pics_icons/cancel.png" onClick={hideReviewModal}/>
        </div>
        <div style={{display:"flex",flexDirection:"column", margin:"auto"}}>
        <textarea placeholder={"Write your review here... "} id="hiresModalNameField" cols="36" rows="4"></textarea>
        <div id="endRatingTaker"><RatingTaker rating={rating} setRating={setRating}/></div>
        <div><div className="Button" id="reviewokbutton" onClick={saveReview}>Ok</div></div>
        
        </div>
    </div>
    <Notification setText={setNotification} text={notification}/>
    </div>
    )
}
export default ReviewModal;