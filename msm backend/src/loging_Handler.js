const {con}=require('../sql')
const {keyMap}=require('./common')

const keys=["email","name","profile_pic","phone_no","active_status","location_name","longitude","latitude"]

const Login=(res,email,password)=>{
    var query=`SELECT * FROM Client WHERE email="${email}";`
    con.query(query,(error,result)=>{
        if(error) throw error
        if(result[0])
         {  if(result[0].password===password)
                {res.send({type:"client",user:keyMap(result[0],keys),error:error});
                return}
        }
        query=`SELECT * FROM Worker WHERE email="${email}";`
        con.query(query,(error,result)=>{
            if(error) throw error
            if(result[0])
             {  if(result[0].password===password)
                    {res.send({type:"worker",user:keyMap(result[0],keys),error:error});
                    return}
            }
            res.send({type:"none",error:error})
        })
    })
   

    

}
module.exports={Login}