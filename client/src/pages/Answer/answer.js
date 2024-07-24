import axios from "../../axiosConfig";
// UserDetails.js
import React, { useState, useEffect,useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AppState } from "../../App";

function AnswerDetails() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers,setAnswer]= useState([]);
  const token=localStorage.getItem('token')
  const answerData=useRef();
  const {user}=useContext(AppState)
  useEffect(() => { 
    async function fetchQuestionDetails() {
      try {
       // const response = await axios.get(`/questions/detail/${questionid}`);
        const {data}= await axios.get(`/answers/questionInfo/${questionid}`,{
            headers:{
              Authorization:'Bearer ' + token,
            },
          });
       //  console.log("hello"+data)
        //const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    }

    fetchQuestionDetails();
  }, [questionid]);


  async function allAnswer() {
    try {
     const {data}= await axios.get('/answers/allAnswer',{
        headers:{
          Authorization:'Bearer ' + token,
        },
      });
     console.log(data)
     setAnswer(data)
    } catch (error) {
      console.log(error)
      //navigate('/login')
    }
  }
  useEffect(()=>{
    allAnswer()
    
  },[])



  async function handleSubmit(e) {
    e.preventDefault();
    // console.log((userNameDom.current.style.backgroundColor='red'));
   //console.log((user.username))

   const usernameValue=user.username;
   const answerValue=answerData.current.value;
   const questionidValue=questionid;
  
   if(
    !answerValue){
    alert('please provide all information');
    return;
   }

   try {
    await axios.post('/answers/answer',{
        username:usernameValue,
        answerData:answerValue,
        questionid:questionidValue,

    },
    {    headers:{
        Authorization:'Bearer ' + token,
      },}
)
    alert('answer posted successfully')
    navigate('/')

   } catch (error) {
    alert("something went wrong ")
    console.log(error.response)
   
   }
    
}

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>question Details</h1>
      
      <div>
        <h1>{question.title}</h1> 
      </div>
      <div>
        <strong>{question.description}</strong> 
      </div>

      <div>
        <h1>ANSWERS FROM COMMUNITY</h1> 
      </div>

      {answers.map((items, i) => {
            return (
              
                <div
                  className=" flex justify-between border-b-2 font-medium"> 
                  <div className=" flex items-center">
                    <div className="text-center">
                      {/* <img className="w-24 mx-auto" src={avator} /> */}
                      {items.username} &nbsp;
                      <strong>{items.answer}</strong>
                    </div>
                    
                  </div>
                  {/* <div className="flex items-center "><ChevronRightIcon/></div> */}
                </div>
             
            );
          })}

      <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <textarea
                id="answerData"
                name="answerData"
                placeholder="provimde your answer"
                ref={answerData}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              className="py-2 flex left-0 text-sm cursor-pointer px-10 md:px-20 mx-3 bg-blue-600 rounded text-white"
            >
              Post Answer
            </button>
          </form>
      
    </div>
  );
}

export default AnswerDetails;