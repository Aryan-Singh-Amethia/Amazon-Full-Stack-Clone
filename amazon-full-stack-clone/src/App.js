import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import React, { Fragment } from 'react';
import Checkout from './Checkout';
import Login from './Login';

function App() {
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
