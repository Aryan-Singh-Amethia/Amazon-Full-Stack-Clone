import { Link } from 'react-router-dom';
import './Login.css';

const Login = () =>{
   return(
    <div className='login'>
       <Link to='/'>
          <img className='login__logo'
             src='https://logos-world.net/wp-content/uploads/2020/04/Amazon-Emblem.jpg'/>
             </Link>
       <div className='login__container'>
          <h1>Sign In</h1>
          <form>
            <h5>E-mail</h5>
            <input type='text'/>
            <h5>Password</h5>
            <input type='password'/>
            <button className='login__signInButton'>
                Sign In
            </button>
          </form>
          <p>
            By signing-in you agree to the AMAZON FAKE
            CLONE conditions of use & sale. Please
            see our Privacy Notice , Cookies Notice
            and our Intrest-Based Ads notice.
          </p>
          <button className='login__registerButton'>Create your Amazon account</button>
       </div>
    </div>
   );
};

export default Login;