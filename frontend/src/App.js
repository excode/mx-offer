import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom";
//components

import Offer from "./Offer";
import User from "./User";
import Transaction from "./Transaction";


function App() {
return (
  <Router>
    <div>
      <nav class="nav"> 
        <ul>
          <li class="nav-item">  
            <Link to="/"> User List</Link>
          </li>
          <li class="nav-item">
            <Link to="/offer">Offer List</Link>
          </li>
          <li class="nav-item">
            <Link to="/trasnaction">Transactions</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes >
        <Route path="/" element={<User/>}>
          

        </Route>
        <Route path="/offer" element={<Offer/>}>
         
        </Route>
        <Route path="/trasnaction" element={<Transaction/>}>
        
 

        </Route>
      </Routes >
    </div>
  </Router>
);
}

export default App;
