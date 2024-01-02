<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
=======
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./Component/User/UserContext";
>>>>>>> 9b9469a3b61ffd1a6c2d5b35ce508bfb92c1ff6a

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
<<<<<<< HEAD
    <App />
=======
    
    <UserProvider>
      <App />
    </UserProvider>

  
>>>>>>> 9b9469a3b61ffd1a6c2d5b35ce508bfb92c1ff6a
  </BrowserRouter>
);
