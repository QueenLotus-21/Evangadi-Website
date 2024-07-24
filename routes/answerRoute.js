const express=require('express');
const router=express.Router();

//authentication middleware
//const authMiddleware=require('../middleware/authMiddleware')
//  router.get('/all-question',authMiddleware,(req,res)=>{
//     router.get('/all-question',(req,res)=>{
//     res.send('all question')
//  })

const authMiddleware=require('../middleware/authMiddleware')

 const {PostAnswer,answerDetail,allAnswers}=require('../controller/answerController')
 router.post('/answer',authMiddleware,PostAnswer);
 router.get('/questionInfo/:questionid',authMiddleware,answerDetail);
 router.get('/allAnswer',authMiddleware,allAnswers);
 module.exports=router