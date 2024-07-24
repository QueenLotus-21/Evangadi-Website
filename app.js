require('dotenv').config()
//const mysql=require('mysql');

const express=require('express');
const app=express()
const port=5600

//cors
const cors=require('cors')
app.use(cors())

//db connnection
const dbConnection=require('./db/dbConfig')

// const dbConnection=mysql.createPool({
//     // user:"evangadi-admin",
//     // database:"evangadi-db",
//     user:"root",
//     database:"evangadi_db",
//     host:"localhost",
//     password:"Act@1234",
//     connectionLimit:10
// })

//authentication middleware file
const authMiddleware=require('./middleware/authMiddleware')

// app.get('/tig',(req,res)=>{
//     res.send('tigye')
// })


//user routes middleware file
const userRoutes=require('./routes/userRoute')

//question middleware file
const questionRoutes=require('./routes/questionRoute')

//answer routes middleware file
const answerRoute=require('./routes/answerRoute')
//json middleware extract from json file
//any method called by like this
app.use(express.json())

//user routes middleware
app.use('/api/users/',userRoutes);

//question routes middleware
app.use('/api/questions/',authMiddleware,questionRoutes);

app.use('/api/answers/',authMiddleware,answerRoute);
async function start(){
    try {
        const result=await dbConnection.query("select 'success' ")
        await app.listen(port)
        console.log('database connection established')
        console.log(`listening on ${port}`)
        
    } catch (error) {
        console.log(error.message)
    }
}
start();

//question routes middleware

// app.listen(port,(err)=>{
//     if(err){
//         console.log(err.message);
//     }
//     else{
//         console.log(`listening on ${port}`);
//     }

// })
