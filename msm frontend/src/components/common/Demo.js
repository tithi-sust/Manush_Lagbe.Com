import React, { useEffect } from "react";
import axios from "axios";
const Demo=()=>{
    useEffect(()=>{
        console.log("hello world")
        axios.get('http://localhost:3001').then(res=>console.log(res)).catch(e=>console.log(e))
        axios.post('http://localhost:3001',{name:"dev-fuad"}).then(res=>console.log(res))
    },[])
    return<div>Allah vorsha</div>
}
export default Demo;