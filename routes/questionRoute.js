const express=require('express');
const router=express.Router();

//authentication middleware
//const authMiddleware=require('../middleware/authMiddleware')
//  router.get('/all-question',authMiddleware,(req,res)=>{
//     router.get('/all-question',(req,res)=>{
//     res.send('all question')
//  })

const authMiddleware=require('../middleware/authMiddleware')

 const {askQuestion,allQuestions,questionDetail}=require('../controller/questionController')
 router.post('/ask',authMiddleware,askQuestion);
 router.get('/all-question',allQuestions);
 router.get('/questionDetail/:questionid',questionDetail);

 module.exports=router
 