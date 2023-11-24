import React from "react";
const Rating=({rating})=>{
    return(
        <div>
        {rating>=1?<img class="workhistoryrating" src="./pics_icons/ratingfull.png"/>:<img class="workhistoryrating" src="./pics_icons/rating0.png"/>}
        {rating>=2?<img class="workhistoryrating" src="./pics_icons/ratingfull.png"/>:<img class="workhistoryrating" src="./pics_icons/rating0.png"/>}
        {rating>=3?<img class="workhistoryrating" src="./pics_icons/ratingfull.png"/>:<img class="workhistoryrating" src="./pics_icons/rating0.png"/>}
        {rating>=4?<img class="workhistoryrating" src="./pics_icons/ratingfull.png"/>:<img class="workhistoryrating" src="./pics_icons/rating0.png"/>}
        {rating>=5?<img class="workhistoryrating" src="./pics_icons/ratingfull.png"/>:<img class="workhistoryrating" src="./pics_icons/rating0.png"/>}
        </div>
    )
}
export default Rating;