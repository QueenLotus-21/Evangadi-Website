import React, { useContext } from "react";
import { useRef } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "../../axiosConfig";
import { AppState } from "../../App";

function askQuestion(){
    const navigate=useNavigate();
    const title=useRef();
    const description=useRef();
    const userid=useRef();
    const token=localStorage.getItem('token')
    const {user}=useContext(AppState)
    

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log((userNameDom.current.style.backgroundColor='red'));
       //console.log((user.username))

       const usernameValue=user.username;
       const titleValue=title.current.value;
       const descriptionValue=description.current.value;
      
       if(
        !titleValue ||
        !descriptionValue 
       ){
        alert('please provide all information');
        return;
       }

       try {
        await axios.post('/questions/ask',{
            username:usernameValue,
            title:titleValue,
            description:descriptionValue,
   
        },
        {    headers:{
            Authorization:'Bearer ' + token,
          },}
    )
        alert('ask question successfully')
        navigate('/')

       } catch (error) {
        alert("something went wrong ")
        console.log(error.response)
       
       }
        
    }
    return <section>
              
           
            

            <div>
      <div className="w-9/12 m-auto my-10 ">
        <div className="flex justify-around my-10">
          <div>
            <p className="text-2xl font-medium mx-5 my-2">
              Steps to write a good question
            </p>
            <ul>
              <li className="list-disc">
                Summerize your problem in a one-line title.
              </li>
              <li className="list-disc">
                Describe your problem in mode detail.
              </li>
              <li className="list-disc">
                Describe what you tried and what you expected to happen.
              </li>
              <li className="list-disc">
                {" "}
                Review your question and post it to the site.
              </li>
            </ul>
          </div>
        </div>
        <div className=" mx-auto mt-8 p-6 bg-white rounded shadow-md text-center">
          <h1 className="text-2xl font-semibold mb-2">Ask a Question</h1>
          <Link to={"/all-questions"}>
            <p className="mb-2 text-xs font-light">Go to Question page</p>
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="question"
                name="question"
                placeholder="Title"
               ref={title}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <textarea
                id="description"
                name="description"
                placeholder="Question Description"
                ref={description}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              className="py-2 flex left-0 text-sm cursor-pointer px-10 md:px-20 mx-3 bg-blue-600 rounded text-white"
            >
              Ask Question
            </button>
          </form>
        </div>
      </div>
    </div>
            
            <Link to={'/login'}>login</Link>

    </section>
}

export default askQuestion