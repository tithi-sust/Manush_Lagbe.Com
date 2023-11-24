const { DATE } = require('mysql/lib/protocol/constants/types')
const {con}=require('../sql')

const createServiceRequest=(res,payload)=>{
    const {location,client_email,worker_email,service_name}=payload
    const status="pending"
    var query=`SELECT * FROM ServiceRequest
    WHERE location="${location}" AND status="pending" AND client_email="${client_email}"
    AND worker_email="${worker_email}" AND service_name="${service_name}";`
    con.query(query,(error,result)=>{
        if(error)
         console.log(error)
        if(result[0])
            {res.send({error:"duplicatevalue"})
            return}
        query=`INSERT INTO ServiceRequest(location,status,client_email,worker_email,service_name)
        VALUES("${location}","${status}","${client_email}","${worker_email}","${service_name}");`
        con.query(query,(error,result)=>{
            if(error)
                console.log(error)
            else
                console.log(result)
            res.send({result:result,error:error})
        })
    })
    
}

const getServiceRequests=(res,email)=>{
    var query=`SELECT * FROM ServiceRequest WHERE client_email="${email}" OR worker_email="${email}";`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
        res.send({result:result,error:error})
    })
}

const updateServiceRequest=(res,payload)=>{
    console.log(payload)
    let query=`SELECT * FROM ServiceRequest WHERE client_email="${payload.client_email}" AND 
    worker_email="${payload.worker_email}" AND start_time="${payload.start_time}" AND
    location="${payload.location}" AND status="${payload.status}" AND 
    service_name="${payload.service_name}";`
    con.query(query,(error,result)=>{
        if(error)throw error;
        let request=result[0];
        console.log(request)
        if(payload.end_time)request.end_time=payload.end_time
        if(payload.review)request.review=payload.review
        if(payload.rating)request.rating=payload.rating
        
        query=`UPDATE ServiceRequest
        SET rating=${request.rating?`"${request.rating}"`:request.rating},
        end_time=${request.end_time?`"${request.end_time}"`:request.end_time},
        review=${request.review?`"${request.review}"`:request.review},
        status="Ended"
        WHERE client_email="${payload.client_email}" AND 
        worker_email="${payload.worker_email}" AND start_time="${payload.start_time}" AND
        location="${payload.location}" AND status="${payload.status}" AND 
        service_name="${payload.service_name}";`

        con.query(query,(err,result)=>{
            if(err)
                console.log(err)
            res.send({error:err})
        })
    })
}
const updateServiceRequestStartTime=(res,payload)=>{
    let query=`SELECT * FROM ServiceRequest WHERE client_email="${payload.client_email}" AND 
    worker_email="${payload.worker_email}" AND start_time="N/A" AND
    location="${payload.location}" AND status="${payload.status}" AND 
    service_name="${payload.service_name}";`
    con.query(query,(error,result)=>{
        if(error)throw error;
        let request=result[0];
        request.start_time=payload.start_time
        query=`UPDATE ServiceRequest
        SET start_time="${new Date().toString()}",status="Running"
        WHERE client_email="${payload.client_email}" AND 
        worker_email="${payload.worker_email}" AND start_time="N/A" AND
        location="${payload.location}" AND status="${payload.status}" AND 
        service_name="${payload.service_name}";`

        con.query(query,(err,result)=>{
            if(err)
                console.log(err)
            res.send({error:err})
        })
    })
}
const deletServiceRequest=(res,location,status,client_email,worker_email,service_name,start_time)=>{
    
    let query=`DELETE FROM ServiceRequest 
    WHERE client_email="${client_email}" AND 
    worker_email="${worker_email}" AND start_time="${start_time}" AND
    location="${location}" AND status="${status}" AND 
    service_name="${service_name}";`
    console.log(query)
    con.query(query,(error,result)=>{
        if(error)throw error;
        console.log(location+"|"+status+"|"+client_email+"|"+worker_email+"|"+service_name+"|"+start_time)
    return res.json({status:"ok"})
        
    })
}

const getServiceRequestsForWorker=(res,email)=>{
    var query=`SELECT * FROM ServiceRequest
    JOIN Client ON client_email=email
    WHERE client_email="${email}" OR worker_email="${email}";`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
        res.send({result:result,error:error})
    })
}

module.exports={createServiceRequest,getServiceRequests,updateServiceRequest,deletServiceRequest,updateServiceRequestStartTime,getServiceRequestsForWorker}