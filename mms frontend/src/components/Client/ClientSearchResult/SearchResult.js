import React from "react";
import Footer from "../../common/footer/Footer";
import TitleBar from "../../common/Title_bar";
import "./style.css"

 const SearchResult=()=>{
    return(
        <div>
            <TitleBar page="clientPage"/>
            <div id="hire">
                <div id="hiretxt">Search Results</div>

                <div className="rectangle">
                <img src="./pics_icons/profilepic.jpg" id="workerimg" onClick={false}/>
                    <div class="rectxt">Tithi Saha (23) <br/><font id="servicetxt">$24.00/hr</font>
                    <button id="hirebutton">Hire Now</button> </div>
                </div>

                <div className="rectangle">
                <img src="./pics_icons/profilepic.jpg" id="workerimg" onClick={false}/>
                    <div class="rectxt">Tithi Saha (23) <br/><font id="servicetxt">$24.00/hr</font>
                    <button id="hirebutton">Hire Now</button> </div>
                </div>

                <div className="rectangle">
                <img src="./pics_icons/profilepic.jpg" id="workerimg" onClick={false}/>
                    <div class="rectxt">Tithi Saha (23) <br/><font id="servicetxt">$24.00/hr</font>
                    <button id="hirebutton">Hire Now</button> </div>
                </div>

                <div className="rectangle">
                <img src="./pics_icons/profilepic.jpg" id="workerimg" onClick={false}/>
                    <div class="rectxt">Tithi Saha (23) <br/><font id="servicetxt">$24.00/hr</font>
                    <button id="hirebutton">Hire Now</button> </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
 }
 export default SearchResult;
