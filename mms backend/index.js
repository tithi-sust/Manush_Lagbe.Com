const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
const  {con,createMysqlConnection}=require('./sql')
const sql = require('./sql')
const {workerSignUpHandler,getWorkers,getWorker,updateWorker}=require('./src/worker_Handler')
const {clientSignUpHandler,getClients,getClient,updateClient}=require('./src/client_Handler')
const {createEducation,getEducations,updateEducation,deletEducation}=require('./src/education_Handler')
const {createWorkerService,getWorkerServices,updateWorkerService,deletWorkerService}=require('./src/workService_Handler')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cors())

createMysqlConnection()

app.get('/',(req,res)=>{
res.send("Bismillah")
console.log('get requset')
})

app.post('/',(req,res)=>{
    query=`INSERT INTO Demo(data1) VALUES("${req.body.name}");`
    console.log(req.body)
    con.query(query,(err,result)=>{
      if(err) throw err
      console.log(result)
    })
    return res.json({status:"ok"})
})

app.post('/worker',(req,res)=>workerSignUpHandler({payload:req.body,res:res}))
app.get('/workers',(req,res)=>getWorkers(res))
app.get('/worker',(req,res)=>getWorker(res,req.query.email))
app.post('/updateworker',(req,res)=>updateWorker(res,req.body.email,req.body))

app.post('/client',(req,res)=>clientSignUpHandler({payload:req.body,res:res}))
app.get('/clients',(req,res)=>getClients(res))
app.get('/client',(req,res)=>getClient(res,req.query.email))
app.post('/updateclient',(req,res)=>updateClient(res,req.body.email,req.body))

app.get('/education',(req,res)=>getEducations(res,req.query.email))
app.post('/education',(req,res)=>createEducation(res,req.body))
app.patch('/education',(req,res)=>updateEducation(res,req.body))
app.delete('/education',(req,res)=>deletEducation(res,req.query.email,req.query.degree))

app.get('/workerservice',(req,res)=>getWorkerServices(res,req.query.email))
app.post('/workerservice',(req,res)=>createWorkerService(res,req.body))
app.patch('/workerservice',(req,res)=>updateWorkerService(res,req.body))
app.delete('/workerservice',(req,res)=>deletWorkerService(res,req.query.email,req.query.service_name))



app.listen(3001)
//console.log("bismillah")