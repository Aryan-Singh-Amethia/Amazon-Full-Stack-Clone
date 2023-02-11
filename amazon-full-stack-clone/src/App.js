import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import React, { Fragment } from 'react';
import Checkout from './Checkout';

function App() {
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
        </Routes>  
        {/*Main Body*/}
        </div>
    </Router>
  );
}

export default App;
