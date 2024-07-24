import { useRef } from "react";
import {useNavigate,Link} from "react-router-dom";
import axios from "../axiosConfig";

function Login() {
   const navigate=useNavigate();
   const emailDom=useRef();
   const passwordDom=useRef();

   async function handleSubmit(e) {
      e.preventDefault();
   
     const emailValue=emailDom.current.value;
     const passwordValue=passwordDom.current.value;

     if(!emailValue || !passwordValue){
      alert('please provide all information');
      return;
     }

     try {
      const {data}=await axios.post('/users/login',{
          email:emailValue,
          password:passwordValue,
      })
      alert('login successfully')
      navigate('/')
      //console.log(response.data)
      console.log(data)
      localStorage.setItem('token',data.token)

     } catch (error) {
      alert(error?.response?.data?.msg)
      console.log(error.response.data)
     }
      
  }

   return ( 
   <section>
      <form onSubmit={handleSubmit}>
            
 
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
            <button type="submit">Login</button>
        </form>
        <Link to={'/register'}>register</Link>

   </section> 
   );
}

export default Login;

