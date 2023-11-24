const {con}=require('../sql')

const workerSignUpHandler=({payload,res})=>{
    const {email,name,password}=payload
    var query=`INSERT INTO Worker(name,email,password) VALUES("${name}","${email}","${password}");`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
        res.send({result:result,error:error})
    })
}

const getWorkers=(res)=>{
    var query=`SELECT * FROM Worker;`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
        res.send({result:result,error:error})
    })
}

const getWorker=(res,email)=>{
    var query=`SELECT * FROM Worker WHERE email="${email}";`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
        res.send({result:result,error:error})
    })
}

const updateWorker=(res,email,payload)=>{
    let query=`SELECT * FROM Worker WHERE email="${email}";`
    //console.log(email);
    con.query(query,(error,result)=>{
        if(error)throw error;
        let worker=result[0];
        if(payload.name)worker.name=payload.name
        if(payload.profile_pic)worker.profile_pic=payload.profile_pic
        if(payload.phone_no)worker.phone_no=payload.phone_no
        if(payload.password)worker.password=payload.password
        if(payload.active_status)worker.active_status=payload.active_status
        if(payload.location_name)worker.location_name=payload.location_name
        if(payload.latitude)worker.latitude=payload.latitude
        if(payload.longitude)worker.longitude=payload.longitude
        query=`UPDATE Worker 
        SET name=${worker.name?`"${worker.name}"`:worker.name},
        profile_pic=${worker.profile_pic?`"${worker.profile_pic}"`:worker.profile_pic},
        phone_no=${worker.phone_no?`"${worker.phone_no}"`:worker.phone_no},
        password=${worker.password?`"${worker.password}"`:worker.password},
        active_status=${worker.active_status},
        location_name=${worker.location_name?`"${worker.location_name}"`:worker.location_name},
        latitude=${worker.latitude},
        longitude=${worker.longitude}
        WHERE email="${email}";`
        con.query(query,(err,result)=>{
            if(err)
                console.log(err)
            res.send({error:err})
        })
    })
}
const getWorkerInfo=(res,email)=>{
    var query=`SELECT * FROM Worker WHERE email="${email}";`
    var user={}
    con.query(query,(error,result)=>{
        if(error)
            throw error;
        user.basic_info=result[0];
        query=`SELECT * FROM Education WHERE email="${email}";`
        con.query(query,(error,result)=>{
            if(error)
                throw error;
            user.educations=result;
            query=`SELECT * FROM WorkerService WHERE email="${email}";`
            con.query(query,(error,result)=>{
                if(error)
                    throw error;
                user.services=result;
                query=`SELECT name,rating,review,service_name,start_time,end_time FROM ServiceRequest
                INNER JOIN Client ON ServiceRequest.client_email=Client.email
                WHERE worker_email="${email}" ;`
                con.query(query,(error,result)=>{
                    if(error)
                        throw error
                    user.works=result;
                    res.send({user_data:user})
                })
            })
        })
    })
}
const uploadWorkerImage=(res,email,image)=>{
    let query=`UPDATE Worker
    SET profile_pic="${image.path}"
    WHERE email="${email}";
    `
    con.query(query,(error,result)=>{
        if(error)
            throw error
        res.send({
            error:error,
            result:result
        })
    })
    console.log(email) 
    console.log(image)
}

module.exports={workerSignUpHandler,getWorkers,getWorker,updateWorker,getWorkerInfo,uploadWorkerImage}