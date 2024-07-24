import axios from "../../axiosConfig";
// UserDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function QuestionDetails() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const token=localStorage.getItem('token')

  useEffect(() => { 
    async function fetchQuestionDetails() {
      try {
       // const response = await axios.get(`/questions/detail/${questionid}`);
        const {data}= await axios.get(`/questions/questionDetail/${questionid}`,{
            headers:{
              Authorization:'Bearer ' + token,
            },
          });
         console.log("hello"+data)
        //const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    }

    fetchQuestionDetails();
  }, [questionid]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>question Details</h1>
      <div>
        <strong>ID:</strong> {question.questionid}
      </div>
      <div>
        <strong>Title:</strong> {question.title}
      </div>
      <div>
        <strong>Description:</strong> {question.description}
      </div>
      <div>
        <strong>User:</strong> {question.username}
      </div>
    </div>
  );
}

export default QuestionDetails;