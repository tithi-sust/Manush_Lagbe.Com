const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
const  {con,createMysqlConnection}=require('./sql')
const sql = require('./sql')
const multer=require('multer')

const {Login}=require('./src/loging_Handler')
const {SignUp}=require('./src/signUpHandler')
const {workerSignUpHandler,getWorkers,getWorkerInfo,updateWorker,uploadWorkerImage}=require('./src/worker_Handler')
const {clientSignUpHandler,getClients,getClientInfo,updateClient,uploadClientImage,getClienstRequests}=require('./src/client_Handler')
const {createEducation,getEducations,updateEducation,deletEducation}=require('./src/education_Handler')
const {createWorkerService,getWorkerServices,updateWorkerService,deletWorkerService,getServices}=require('./src/workService_Handler')
const {createServiceRequest,getServiceRequests,updateServiceRequest,deletServiceRequest,updateServiceRequestStartTime,getServiceRequestsForWorker}=require('./src/serviceRequest_Handler')
const {getLandingPageCount,searchWorker,ViewUserProfileInfo,resetPassword}=require('./src/common')

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
     cb(null,'./uploads/');
  },
  filename:(req,file,cb)=>{
    cb(null,new Date().toISOString()+file.originalname)
  }
});
const upload=multer({storage:storage})
app.use('/uploads',express.static('uploads'))

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
app.get('/worker',(req,res)=>getWorkerInfo(res,req.query.email))
app.post('/updateworker',(req,res)=>updateWorker(res,req.body.email,req.body))
app.post('/workerprofilepic',upload.single('profile_pic'),(req,res)=>uploadWorkerImage(res,req.body.email,req.file))

app.post('/client',(req,res)=>clientSignUpHandler({payload:req.body,res:res}))
app.get('/clients',(req,res)=>getClients(res))
app.get('/client',(req,res)=>getClientInfo(res,req.query.email))
app.get('/clientsrequests',(req,res)=>getClienstRequests(res,req.query.email))
app.post('/updateclient',(req,res)=>updateClient(res,req.body.email,req.body))
app.post('/clientprofilepic',upload.single('profile_pic'),(req,res)=>uploadClientImage(res,req.body.email,req.file))


app.get('/education',(req,res)=>getEducations(res,req.query.email))
app.post('/education',(req,res)=>createEducation(res,req.body))
app.patch('/education',(req,res)=>updateEducation(res,req.body))
app.delete('/education',(req,res)=>deletEducation(res,req.query.email,req.query.degree))

app.get('/workerservice',(req,res)=>getWorkerServices(res,req.query.email))
app.post('/workerservice',(req,res)=>createWorkerService(res,req.body))
app.patch('/workerservice',(req,res)=>updateWorkerService(res,req.body))
app.delete('/workerservice',(req,res)=>deletWorkerService(res,req.query.email,req.query.service_name))

app.get('/service',(req,res)=>getServices(res)) 

app.get('/servicerequest',(req,res)=>getServiceRequests(res,req.query.email))
app.post('/servicerequest',(req,res)=>createServiceRequest(res,req.body))
app.patch('/servicerequest',(req,res)=>updateServiceRequest(res,req.body))
app.delete('/servicerequest',(req,res)=>deletServiceRequest(
  res,req.query.location,req.query.status,req.query.client_email,
  req.query.worker_email,req.query.service_name,req.query.start_time)) 
app.put('/servicerequest',(req,res)=>updateServiceRequestStartTime(res,req.body))
app.get('/servicerequestforworker',(req,res)=>getServiceRequestsForWorker(res,req.query.email))


app.get('/login',(req,res)=>Login(res,req.query.email,req.query.password))
app.post('/signup',(req,res)=>SignUp(res,req.query.name,req.query.email,req.query.password,req.query.type))
app.post('/resetpassword',(req,res)=>resetPassword(res,req.query.email,req.query.phoneno,req.query.password))
app.get('/searchworker',(req,res)=>searchWorker(res,req.query.latitude,req.query.longitude,req.query.service_name))
app.get('/landingpagecount',(req,res)=>getLandingPageCount(res))
app.get('/viewprofile',(req,res)=>ViewUserProfileInfo(res,req.query.user,req.query.viewer,req.query.viewer_type,req.query.status))



app.listen(3001)
//console.log("bismillah")