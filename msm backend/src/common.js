const { query } = require('express');
const {con}=require('../sql')

const keyMap=(obj,keys)=>{
    let result={}
    keys.map(key=>{
        result[key]=obj[key];
    })
    return result;
}
const getLandingPageCount=(res)=>{
    let counts={}
    let query='SELECT COUNT(email) AS cnt FROM Client;';
    con.query(query,(error,result)=>{
        if(error)
            throw error;
        counts.client=result[0].cnt;
        query='SELECT count(worker_email) AS cnt  FROM ServiceRequest;';
        con.query(query,(error,result)=>{
            if(error)
                throw error;
            counts.work=result[0].cnt;
            query='SELECT count(email) AS cnt  FROM Worker;';
            con.query(query,(error,result)=>{
                if(error)
                    throw error;
                counts.worker=result[0].cnt;
                res.send(counts)
            })
        })
    })
    //res.send('counted')
}
const searchWorker=(res,latitude,longitude,service_name)=>{
    console.log(latitude+"--"+longitude+"--"+service_name)
    let query=`SELECT email,name,profile_pic,longitude,latitude,charge,active_status FROM Worker NATURAL JOIN WorkerService WHERE service_name="${service_name}";`
    con.query(query,(error,result)=>{
        if(error)
            throw error
        const workers=result.filter(worker=>{
            return ((worker.latitude-latitude)*(worker.latitude-latitude)+(worker.longitude-longitude)*(worker.longitude-longitude))<=0.005
        })
        res.send(workers)
    })
    
}
const ViewUserProfileInfo=(res,user_email,viewer_email,viewer_type,status)=>{
    let user_type="client"
    if(viewer_type==="client")
        user_type="worker"
    console.log(user_email+" "+user_type+" "+viewer_email+" "+viewer_type)
    let user={}
    let query=`SELECT * FROM ${user_type==="worker"?"Worker":"Client"} WHERE email="${user_email}"`
    con.query(query,(error,result)=>{
        if(error)
            throw error
        user.basic_info=result[0]
        user.basic_info.password="donno"
        let client=user_email
        let worker=user_email
        if(user_type==="worker")
            client=viewer_email
        else
            worker=viewer_email
        query=`SELECT status FROM ServiceRequest
        WHERE client_email="${client}" AND worker_email="${worker}" AND (status="Running" OR status="Ended");
        `
        con.query(query,(error,result)=>{
            if(error)
                throw error
            if(result.length===0)
                user.basic_info.phone_no=null;
            query=`SELECT * FROM Education WHERE email="${user_email}";`
            con.query(query,(error,result)=>{
                if(error)
                    throw error;
                user.educations=result;
                query=`SELECT * FROM WorkerService WHERE email="${user_email}";`
                con.query(query,(error,result)=>{
                    if(error)
                        throw error;
                    user.services=result;
                    if(user_type==="worker")
                        query=`SELECT name,rating,review,service_name FROM ServiceRequest
                        INNER JOIN Client ON ServiceRequest.client_email=Client.email
                        WHERE worker_email="${user_email}" ;`
                    else
                        query=`SELECT name,rating,review,service_name FROM ServiceRequest
                        INNER JOIN Worker ON ServiceRequest.worker_email=Worker.email
                        WHERE client_email="${user_email}" ;`
                        
                    con.query(query,(error,result)=>{
                        if(error)
                            throw error
                        user.works=result;
                        user.user_type=user_type;
                        if(status!=="Running"&&status!=="Ended")
                            user.basic_info.phone_no=null;
                        res.send({user_data:user})
                    })
                })
            })
            
        })
    })
    
}
const resetPassword=(res,email,phone_no,pass)=>{
    let query=`UPDATE Worker
    SET password="${pass}"
    WHERE email="${email}" AND phone_no="${phone_no}"
    ;`
    con.query(query,(error,result)=>{
        if(error || result.affectedRows>=1)
            {res.send({error:error,result:result});return}
        query=`UPDATE Client
        SET password="${pass}"
        WHERE email="${email}" AND phone_no="${phone_no}"
        ;`
        con.query(query,(error,result)=>{
            res.send({error:error,result:result})
            console.log(error)
        })
    })
    
    
}
module.exports={keyMap,getLandingPageCount,searchWorker,ViewUserProfileInfo,resetPassword}