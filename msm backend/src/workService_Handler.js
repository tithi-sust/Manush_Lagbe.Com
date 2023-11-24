const {con}=require('../sql')

const createWorkerService=(res,payload)=>{
    const {service_name,charge,email}=payload
    var query=`INSERT INTO WorkerService VALUES("${email}","${service_name}",${charge});`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
        res.send({result:result,error:error})
    })
}

const getWorkerServices=(res,email)=>{
    var query=`SELECT * FROM WorkerService WHERE email="${email}";`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
        res.send({result:result,error:error})
    })
}

const updateWorkerService=(res,payload)=>{
    let query=`SELECT * FROM WorkerService WHERE email="${payload.email}" AND service_name="${payload.service_name}";`
    con.query(query,(error,result)=>{
        if(error)throw error;
        let service=result[0];
        if(payload.charge)service.charge=payload.charge
        query=`UPDATE WorkerService
        SET charge=${service.charge}
        WHERE email="${payload.email}" AND service_name="${payload.service_name}" ;`
        con.query(query,(err,result)=>{
            if(err)
                console.log(err)
            res.send({error:err})
        })
    })
}
const deletWorkerService=(res,email,service_name)=>{
    let query=`DELETE FROM WorkerService WHERE email="${email}" AND service_name="${service_name}";`
    con.query(query,(error,result)=>{
        if(error)throw error;
    return res.json({status:"ok"})
        
    })
}
const getServices=(res)=>{
    var query=`SELECT * FROM Service;`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            //console.log(result)
        res.send({result:result,error:error})
    })
}

module.exports={createWorkerService,getWorkerServices,updateWorkerService,deletWorkerService,getServices}