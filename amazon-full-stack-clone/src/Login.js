import { Link } from 'react-router-dom';
import './Login.css';
import AmazonLogoForLoginPage from './resources/AmazonLogoForLoginPage';
import { useState} from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth';

const Login = () =>{

   const [email , setEmail] = useState('');
   const [password , setPassword] = useState(''); 
   
   const navigate = useNavigate();

   const signInHandler = (event) =>{
      event.preventDefault();
      signInWithEmailAndPassword(auth,email,password)
          .then(auth=>{
            navigate(`/`);
          })
          .catch(error=>alert(error.message));
   };

   const registerHandler =(event) =>{
      event.preventDefault();
      createUserWithEmailAndPassword(auth,email,password)
          .then((auth)=>{
            console.log('user creation success !!!');
            console.log(auth);
          })
          .catch((error)=>alert(error.message));
   };

   return(
    <div className='login'>
       <Link to='/'>
          <AmazonLogoForLoginPage className='login__logo'/>
             </Link>
       <div className='login__container'>
          <h1>Sign In</h1>
          <form>
            <h5>E-mail</h5>
            <input type='text' value={email} onChange={(event)=>setEmail(event.target.value)}/>
            <h5>Password</h5>
            <input type='password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
            <button type='submit' 
                    className='login__signInButton'
                    onClick={signInHandler}>
                Sign-In
            </button>
          </form>
          <p>
            By signing-in you agree to the AMAZON FAKE
            CLONE conditions of use & sale. Please
            see our Privacy Notice , Cookies Notice
            and our Intrest-Based Ads notice.
          </p>
          <button className='login__registerButton'
                  type='submit'
                  onClick={registerHandler}>Create your Amazon account</button>
       </div>
    </div>
   );
};

export default Login;