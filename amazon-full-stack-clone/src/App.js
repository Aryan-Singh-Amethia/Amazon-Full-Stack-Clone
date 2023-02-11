import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import React, { Fragment, useEffect } from 'react';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  
  const [{basket,totalPrice},dispach] = useStateValue();

  useEffect(()=>{
    //will only run the first time the component loads
    auth.onAuthStateChanged(authUser=>{
      console.log('THE USER IS >>>>',authUser);
      if(authUser){
        dispach({
          type : 'SET_USER',
          user : authUser
        });
      }else{
        dispach({
          type : 'SET_USER',
          user : null
        });
      }
    });
  },[]);

  return (
    <Router>
        <div className="App">
        <Routes>
        <Route path='/'
         element={<Fragment>
                    <Header/>
                    <Home/>
                  </Fragment>}
        />
        <Route path='/checkout'
         element={<Fragment>
                    <Header/>
                    <Checkout/>
                  </Fragment>}  
         />
         <Route path='/login'
          element={<Fragment>
                    <Login/>
                   </Fragment>}/>
        </Routes>  
        {/*Main Body*/}
        </div>
    </Router>
  );
}

export default App;
