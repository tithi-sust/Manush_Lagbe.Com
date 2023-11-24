import React from "react";
const RatingTaker=({rating,setRating})=>{
    return(
        <div>
        {rating>=1?<img class="workendratings" onClick={()=>setRating(1)} src={process.env.PUBLIC_URL+"/pics_icons/ratingfull.png"}/>:<img class="workendratings" onClick={()=>setRating(1)} src={process.env.PUBLIC_URL+"/pics_icons/rating0.png"}/>}
        {rating>=2?<img class="workendratings" onClick={()=>setRating(2)} src={process.env.PUBLIC_URL+"/pics_icons/ratingfull.png"}/>:<img class="workendratings" onClick={()=>setRating(2)} src={process.env.PUBLIC_URL+"/pics_icons/rating0.png"}/>}
        {rating>=3?<img class="workendratings" onClick={()=>setRating(3)} src={process.env.PUBLIC_URL+"/pics_icons/ratingfull.png"}/>:<img class="workendratings" onClick={()=>setRating(3)} src={process.env.PUBLIC_URL+"/pics_icons/rating0.png"}/>}
        {rating>=4?<img class="workendratings" onClick={()=>setRating(4)} src={process.env.PUBLIC_URL+"/pics_icons/ratingfull.png"}/>:<img class="workendratings" onClick={()=>setRating(4)} src={process.env.PUBLIC_URL+"/pics_icons/rating0.png"}/>}
        {rating>=5?<img class="workendratings" onClick={()=>setRating(5)} src={process.env.PUBLIC_URL+"/pics_icons/ratingfull.png"}/>:<img class="workendratings" onClick={()=>setRating(5)} src={process.env.PUBLIC_URL+"/pics_icons/rating0.png"}/>}
        </div>
    )
}
export default RatingTaker;