import { Link } from "react-router-dom";
import "./Login.css";
import AmazonLogoForLoginPage from "./resources/AmazonLogoForLoginPage";
import { useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDoc , doc } from "firebase/firestore";
import { db } from "./firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signInHandler = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        navigate(`/`);
      })
      .catch((error) => {
        toast.error(
          "User not Registered !! Please Register with us to Log-In",
          { autoClose: 2000, position: toast.POSITION.TOP_CENTER }
        );
        //alert(error.message);
      });
  };

  const registerHandler = (event) => {
    event.preventDefault();
    async function addNewUserToFirestore(email,password){
      await setDoc(doc(db, "users", email), {
        email : email,
        password : password
      },{merge : true});
    };
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log("user creation success !!!");
        console.log(auth);
        addNewUserToFirestore(email,password);
        navigate('/');
      })
      .catch((error) => {
        if(error.message === 'Firebase: Error (auth/email-already-in-use).'){
          toast.warn("You are already Registered !! Please Sign-In instead !!",
          {
            autoClose : 2000,
            position: toast.POSITION.TOP_CENTER
          })
        }else{
          toast.error("Please Enter a valid email address!!", {
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER,
          });
          console.log(error.message);
        }

      });
  };

  return (
    <div className="login">
      <Link to="/">
        <AmazonLogoForLoginPage className="login__logo" />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="submit"
            className="login__signInButton"
            onClick={signInHandler}
          >
            Sign-In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of use &
          sale. Please see our Privacy Notice , Cookies Notice and our
          Intrest-Based Ads notice.
        </p>
        <button
          className="login__registerButton"
          type="submit"
          onClick={registerHandler}
        >
          Create your Amazon account
        </button>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Login;
