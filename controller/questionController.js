//db connection
const dbConnection=require('../db/dbConfig')
const {StatusCodes}=require("http-status-codes")

async function askQuestion(req,res){
     //res.send('ask question');

     //get user_id and username from req.user
    const { username, userid } = req.user;
    //get question and description from req.body
     const {title,description}= req.body;

    if(!title || !description){
        // return res.send('please provide all information')
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'please provide all informationnnn'})
    }
    try {
        const [question]=await dbConnection.query("SELECT title,questionid FROM question WHERE title=? or description=?",[title,description])
         //return res.json({question:question})
        if(question.length>0){
          return res.status(StatusCodes.BAD_REQUEST).json({msg:"question already existed"})
        }
        if(description.length<20){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"description must be aleast 20 charactor"})
        }
        // insert question to question table
          await dbConnection.query("INSERT INTO question(username,title,description) VALUES (?,?,?)", [username,title,description])
        return res.status(StatusCodes.CREATED).json({msg:"question created successfully",username})
    }
    catch(error){
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}
async function allQuestions(req,res){
    //res.send('list all questions');
     //get all questions from question table
  try {
   // const query = "SELECT question.*, users.username FROM question INNER JOIN users ON question.username = users.username ORDER BY question.title DESC";
    const query = "SELECT * FROM question  ORDER BY username DESC";
    const [results] = await dbConnection.query(query);
    // Process the results here, e.g., send them as a JSON response
    return res.status(StatusCodes.OK).json(results);
  } catch (error) {
    // Handle any errors that may occur during the query
    console.error(error);
    res.status(500).json(error);
  }
}



async function questionDetail(req,res){
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


module.exports={askQuestion,allQuestions,questionDetail};