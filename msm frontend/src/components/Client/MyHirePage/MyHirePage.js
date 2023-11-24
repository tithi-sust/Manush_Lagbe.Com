import React from "react";
import Footer from "../../common/footer/Footer";
import TitleBar from "../../common/Title_bar";
import "./style.css"

 const HirePage=()=>{

    


    return(
        <div>
            <TitleBar page="clientPage"/>
            <div id="hire">
                <div id="hiretxt">My Hires</div>
                <div className="rectangle">
                <img src="./pics_icons/profilepic.jpg" class="workerimg" onClick={false}/>
                    <div class="rectxt">Tithi Saha (23)<br/><font class="servicetxt">Painting</font><font class="statustxt">Running</font>
                    <button class="endbutton">End work</button> </div>
                </div>

                <div className="rectangle">
                <img src="./pics_icons/profilepic.jpg" class="workerimg" onClick={false}/>
                    <div class="rectxt">Tithi Saha (23)<br/><font class="servicetxt">Painting</font><font class="statustxt">Running</font>
                    <button class="endbutton">End work</button> </div>
                </div>

                <div className="rectangle">
                <img src="./pics_icons/profilepic.jpg" class="workerimg" onClick={false}/>
                    <div class="rectxt">Tithi Saha (23)<br/><font class="servicetxt">Painting</font>
                    <img src="./pics_icons/delete.png" class="deleteimg" onClick={false}/>
                    </div>
                </div>

                <div className="rectangle">
                <img src="./pics_icons/profilepic.jpg" class="workerimg" onClick={false}/>
                    <div class="rectxt">Tithi Saha (23)<br/><font class="servicetxt">Painting</font>
                    <img src="./pics_icons/delete.png" class="deleteimg" onClick={false}/>
                    </div>
                </div>

                <div className="rectangle">
                <img src="./pics_icons/profilepic.jpg" class="workerimg" onClick={false}/>
                    <div class="rectxt">Tithi Saha (23)<br/><font class="servicetxt">Painting</font>
                    <img src="./pics_icons/delete.png" class="deleteimg" onClick={false}/>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
 }
 export default HirePage;
