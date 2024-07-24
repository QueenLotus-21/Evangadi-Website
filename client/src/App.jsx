import React, { Component, createContext, useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from './axiosConfig';
import QuestionForm from './pages/question/ask-question';
import AllQuestions from './pages/question/all-question';
import QuestionDetails from './pages/question/question-detail';
import AnswerDetails from './pages/Answer/answer';


 //import Register from './pages/Register';

 export const AppState=createContext();

 function App(){
  const [user,setUser]= useState({});
  const token=localStorage.getItem('token')
  const navigate=useNavigate()
  async function checkUser() {
    try {
     const {data}= await axios.get('/users/check',{
        headers:{
          Authorization:'Bearer ' + token,
        },
      });
     //console.log(data)
     setUser(data)
    } catch (error) {
      console.log(error.response)
      navigate('/login')
    }
  }

  useEffect(()=>{
    checkUser()
    
  },[])
  

    return (
      <AppState.Provider value={{user,setUser}}> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/ask' element={<QuestionForm  />} />
          <Route path='/all-question' element={<AllQuestions />} />
          <Route path='/questionDetail/:questionid' element={<QuestionDetails />} />
          <Route path='/answer' element={<AnswerDetails />} />
          <Route path='/answerDetail/:questionid' element={<AnswerDetails />} />
         
 
        </Routes>
        {/* <Login/>
        <Register/>
        <Home/> */}
      
        {/* <h2>hello</h2> */}
      </AppState.Provider >
    );
  }


export default App;
