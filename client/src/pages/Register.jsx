import React from "react";
import { useRef } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "../axiosConfig";

function Register(){
    const navigate=useNavigate();
    const userNameDom=useRef();
    const firstNameDom=useRef();
    const lastNameDom=useRef();
    const emailDom=useRef();
    const passwordDom=useRef();
    const errorDom=useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log((userNameDom.current.style.backgroundColor='red'));
       // console.log((userNameDom.current.value))

       const usernameValue=userNameDom.current.value;
       const firstnameValue=firstNameDom.current.value;
       const lastnameValue=lastNameDom.current.value;
       const emailValue=emailDom.current.value;
       const passwordValue=passwordDom.current.value;
       if(
        !usernameValue ||
        !firstnameValue ||
        !lastnameValue ||
        !emailValue ||
        !passwordValue
       ){
        alert('please provide all information');
        return;
       }

       try {
        await axios.post('/users/register',{
            username:usernameValue,
            firstname:firstnameValue,
            lastname:lastnameValue,
            email:emailValue,
            password:passwordValue,
            
        })
        alert('Registerd successfully:please login')
        navigate('/login')

       } catch (error) {
        alert("something went wrong ")
        console.log(error.response)
       }
        
    }
    return <section>
              
            <form onSubmit={handleSubmit}>
            

                <div>
                <span> username :...</span>
                <input 
                ref={userNameDom}
                type="text" 
                placeholder="username"/>
                </div>
                <br />

                <div>
                <span> first name :...</span>
                <input
                ref={firstNameDom} 
                type="text" 
                placeholder="first name"/>
                </div>
                <br />

                <div>
                <span> last name :...</span>
                <input
                 ref={lastNameDom}
                 type="text" 
                 placeholder="last name"/>
                </div>
                <br />
                <div>
                <span> email :...</span>
                <input 
                ref={emailDom}
                type="text" 
                placeholder="email"/>
                </div>
                <br />
                <div>
                <span> password :...</span>
                <input 
                ref={passwordDom}
                type="password" 
                placeholder="password"/>
                </div>
                <button type="submit">Register</button>
            </form>
            <Link to={'/login'}>login</Link>

    </section>
}

export default Register