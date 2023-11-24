var mysql=require('mysql2')

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"MMS@tithi@fuad@126@24",
    database:"mms"
})

const createMysqlConnection=()=>{
    con.connect(error=>{
        if(error)
            throw error
        console.log("Alhamdulillah db connected")
    })
}

module.exports={
    con:con,
    createMysqlConnection:createMysqlConnection
}