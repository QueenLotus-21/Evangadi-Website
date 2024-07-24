import { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";



// import avator image
//import avator from "../../../asset/2263539.png";
//import avator from "../../../src/asset/";

function AllQuestions(){
    const {user}=useContext(AppState)
    console.log(user)
    //const [{ username,  questionData }, dispatch] = useStateValue();  // define dispatch
    const [questions,setQuestion]= useState([]);
    
  const token=localStorage.getItem('token')
  const navigate=useNavigate()
 
  async function checkQuestion() {
    try {
     const {data}= await axios.get('/questions/all-question',{
        headers:{
          Authorization:'Bearer ' + token,
        },
      });
     console.log(data)
    setQuestion(data)
    } catch (error) {
      console.log(error)
      //navigate('/login')
    }
  }
  useEffect(()=>{
    checkQuestion()
    
  },[])
  const handleQuestionClick = (questionid) => {
    navigate(`/questionDetail/${questionid}`);
  };
  const handleAnswerClick = (questionid) => {
    navigate(`/answerDetail/${questionid}`);
  };

    return(
        <div>
      <div className="w-9/12 m-auto my-10">
        <div className="flex justify-between py-4">
          <Link to={"/ask"}>
            <button className=" text-sm cursor-pointer px-5 md:px-12 mx-2 py-2 bg-blue-600 rounded text-white">
              Ask Question
            </button>
          </Link>
          <p className=" text-2xl font-medium">Welcome: {user.username}</p>
        </div>userId
        <div>
          <p className=" py-2 text-lg font-medium border-b-2">Questions</p>
          {questions.map((items, i) => {
            return (
              
                <div
                  className=" flex justify-between border-b-2 font-medium"
                  
                > Question Details
                  <div className=" flex items-center">
                    <div className="text-center">
                      {/* <img className="w-24 mx-auto" src={avator} /> */}
                        
                      <li key={items.questionid} onClick={() => handleQuestionClick(items.questionid)}>
                      ID {items.questionid}  
                       </li>

                      <p className=" -mt-4 mb-6">{items.username}</p>
                    </div>
                    <div className="mx-6 items-center">
                      <p  onClick={() => handleAnswerClick(items.questionid)}>{items.title}</p>
                    </div>
                  </div>
                  {/* <div className="flex items-center "><ChevronRightIcon/></div> */}
                </div>
             
            );
          })}
        </div>
      </div>
    </div>
    )

}

export default AllQuestions