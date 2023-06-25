import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import React, { Fragment, useEffect } from 'react';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Orders from './Orders';
import Order from './Order';
import ProductDetail from './ProductDetail';

const promise = loadStripe('pk_test_51McmhuSEw7WnUxNcdY7QtBx5qQSSnH0x3VbywDBg9Ei2UEVzlwunOBQ4k5SI5NUlLxVK0mxdfjP7FMnuQyBSxUEB00mI4S3BCk');

function App() {
  
  const [{user,basket,totalPrice},dispach] = useStateValue();

  useEffect(()=>{
    //will only run the first time the component loads
    auth.onAuthStateChanged(authUser=>{
      //console.log('THE USER IS >>>>',authUser);
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
        <Header/>
        <Routes>
        <Route path='/'
         element={<Fragment>
                    <Home/>
                  </Fragment>}
        />
        <Route path='/checkout'
         element={<Fragment>
                    <Checkout/>
                  </Fragment>}  
         />
         <Route path='/login'
          element={<Fragment>
                    <Login/>
                   </Fragment>}/>
         <Route path='/payments'
          element={<Elements stripe={promise}>
                    <Payment/>
                  </Elements>}/>  
          <Route path='/orders'
           element={<Fragment>
                     <Orders/>
                   </Fragment>}/>   
          <Route path='/order'
           element={<Fragment>
                     <Order
                      user={user}/>
                   </Fragment>}/>                               
          <Route path='/product-detail'   
           element={<Fragment>
                      <ProductDetail/>
                    </Fragment>}/>    
        </Routes>  
        </div>
      </Router>  
  );
}
export default App;
