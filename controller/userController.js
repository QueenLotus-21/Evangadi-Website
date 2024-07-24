//db connection
const dbConnection=require('../db/dbConfig')

const bcrypt=require('bcryptjs')
const {StatusCodes}=require("http-status-codes")
const jwt=require('jsonwebtoken')

async function register(req,res){ 
    // res.send('register');
    const {username,firstname,lastname,email,password}= req.body;
    if(!email || !password || !username || !firstname || !lastname){
        // return res.send('please provide all information')
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'please provide all information'})
    }

    try {
        const [user]=await dbConnection.query("SELECT username,id FROM users WHERE username=? or email=?",[username,email])
        //return res.json({user:user})
        if(user.length>0){
          return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already existed"})
        }

        if(password.length<8){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be aleast 8 charactor"})
        }

        //encrypt password
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)

        await dbConnection.query("INSERT INTO users(username,firstname,lastname,email,password) VALUES (?,?,?,?,?)", [username,firstname,lastname,email,hashPassword])
         return res.status(StatusCodes.CREATED).json({msg:"user created successfully"})
        
        
    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong,try again"})
    }
}
async function login(req,res){
    //res.send('login');
    const {email,password}=req.body;
    if(!email || !password){
       return res.status(StatusCodes.BAD_REQUEST).json({msg:'Please enter all required fields'})
    }

    try {
        const [user]=await dbConnection.query("SELECT username,id,password FROM users where email=?",[email]) 
        //return res.json({user:user}) 
        if(user.length==0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:'Invalid Credencial'})
        }
        
        // else{
        //     res.json("user exist")
        // }

        //password comparison
        const isMatch= await bcrypt.compare(password,user[0].password)
        if(!isMatch){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:'Invalid Credencia'})
            //return res.json({user:user[0].password})
        }
        //return res.json({user:user[0].password})

        //jwt token
        const username=user[0].username
        const id=user[0].id
      // const token= jwt.sign({username,userid},"tig",{expiresIn:"1d"})
        const token= jwt.sign({username,id},process.env.JWT_SECRET,{expiresIn:"1d"})
        return res.status(StatusCodes.OK).json({msg:"user login sucessfully",token,username})


    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong,try again"})
    }
}
async function checkUser(req,res){
   // res.send('user type');
   const username=req.user.username
   const id=req.user.id
   return res.status(StatusCodes.OK).json({msg:"valid user",username,id})
}

module.exports={register,login,checkUser};