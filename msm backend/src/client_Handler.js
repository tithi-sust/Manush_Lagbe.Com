const {con}=require('../sql')
const clientSignUpHandler=({payload,res})=>{
    const {email,name,password}=payload
    var query=`INSERT INTO Client(name,email,password) VALUES("${name}","${email}","${password}");`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
        res.send({result:result,error:error})
    })
}

const getClients=(res)=>{
    var query=`SELECT * FROM Client;`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
        res.send({result:result,error:error})
    })
}

const getClient=(res,email)=>{
    var query=`SELECT * FROM Client WHERE email="${email}";`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
        res.send({result:result,error:error})
    })
}

const updateClient=(res,email,payload)=>{
    let query=`SELECT * FROM Client WHERE email="${email}";`
    con.query(query,(error,result)=>{
        if(error)throw error;
        let client=result[0];
        if(payload.name)client.name=payload.name
        if(payload.profile_pic)client.profile_pic=payload.profile_pic
        if(payload.phone_no)client.phone_no=payload.phone_no
        if(payload.password)client.password=payload.password
        query=`UPDATE Client 
        SET name=${client.name?`"${client.name}"`:client.name},
        profile_pic=${client.profile_pic?`"${client.profile_pic}"`:client.profile_pic},
        phone_no=${client.phone_no?`"${client.phone_no}"`:client.phone_no},
        password=${client.password?`"${client.password}"`:client.password}
        WHERE email="${email}";`
        con.query(query,(err,result)=>{
            if(err)
                console.log(err)
            res.send({error:err})
        })
    })
}
const uploadClientImage=(res,email,image)=>{
    let query=`UPDATE Client
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
const getClientInfo=(res,email)=>{
    var query=`SELECT * FROM Client WHERE email="${email}";`
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
                query=`SELECT name,rating,review,service_name FROM ServiceRequest
                INNER JOIN Worker ON ServiceRequest.worker_email=Worker.email
                WHERE client_email="${email}" ;`
                con.query(query ,(error,result)=>{
                    if(error)
                        throw error
                    user.works=result;
                    res.send({user_data:user})
                })
            })
        })
    })
}
const getClienstRequests=(res,email)=>{
    query=`SELECT * FROM ServiceRequest JOIN Worker ON worker_email=email WHERE client_email="${email}";`
    con.query(query,(error,result)=>{
        if(error)
            throw error;
        res.send(result)
    })
}

module.exports={clientSignUpHandler,getClients,getClient,updateClient,uploadClientImage,getClientInfo,getClienstRequests}