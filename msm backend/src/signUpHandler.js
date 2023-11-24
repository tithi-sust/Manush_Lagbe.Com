const {con}=require('../sql')
const {keyMap}=require('./common')

const keys=["email","name","profile_pic","phone_no","active_status","location_name","longitude","latitude"]

const SignUp=(res,name,email,password,type)=>{
    var query=`SELECT * FROM Worker WHERE email="${email}";`
    con.query(query,(error,result)=>{
        if(error) throw error
        if(result[0])
         {      res.send({status:"Email already in use!",error:error});
                return
        }
        query=`SELECT * FROM Client WHERE email="${email}";`
        con.query(query,(error,result)=>{
            if(error) throw error
            if(result[0])
             {      res.send({stat:"Email already in use!",error:error});
                    return
            }

            query=`INSERT INTO ${type}(name,email,password) VALUES("${name}","${email}","${password}") ;`
            con.query(query,(error,result)=>{
                if(error) throw error
                res.send({stat:"Account created!",error:error})
            })
        })
    })
   

    

}
module.exports={SignUp}