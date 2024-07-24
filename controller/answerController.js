//db connection
const dbConnection=require('../db/dbConfig')
const {StatusCodes}=require("http-status-codes")
async function PostAnswer(req,res){
    //res.send('ask question');

    //get user_id and username from req.user
   const { username} = req.user;
   //get question and description from req.body
   // const {answer}= req.body;
    const {questionid}= req.body;
    const {answerData}= req.body;

    
   if(!answerData){
       // return res.send('please provide all information')
       return res.status(StatusCodes.BAD_REQUEST).json({msg:'please provide ayour answer'})
   }
   try {
       const [answer]=await dbConnection.query("SELECT answer,answerid FROM answer WHERE answer=? ",[answerData])
        //return res.json({question:question})
       if(answer.length>0){
         return res.status(StatusCodes.BAD_REQUEST).json({msg:"answer already existed"})
       }
    //    if(answerD.length<20){
    //        return res.status(StatusCodes.BAD_REQUEST).json({msg:"answer must be aleast 20 charactor"})
    //    }
       // insert question to question table
         await dbConnection.query("INSERT INTO answer(answer,username,questionid) VALUES (?,?,?)", [answerData,username,questionid])
       return res.status(StatusCodes.CREATED).json({msg:"answer posted successfully",username})
   }
   catch(error){
       console.log(error.message);
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
   }
}

async function answerDetail(req,res){
    try{
    const questionid = req.params.questionid;
      const [rows] = await dbConnection.query('SELECT * FROM question WHERE questionid = ?', [questionid]);
      if (rows.length === 0) {
        res.status(404).json({ error: 'question not found' });
      } else {
        res.json(rows[0]);
      }
    }
      catch (error) {
        console.error('Error fetching question details:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
  }

  async function allAnswers(req,res){
    //res.send('list all questions');
     //get all questions from question table
  try {
    const query = "SELECT * FROM answer ORDER BY username DESC";
    const [results] = await dbConnection.query(query);
    // Process the results here, e.g., send them as a JSON response
    return res.status(StatusCodes.OK).json(results);
  } catch (error) {
    // Handle any errors that may occur during the query
    console.error(error);
    res.status(500).json(error);
  }
}


module.exports={PostAnswer,answerDetail,allAnswers};