import Role from "./Component/Role/Role.js";
<<<<<<< HEAD
import Login from "./Component/Author/login/login.js"
import Signup from "./Component/Author/signup/signup.js"
import Userhome from "./Component/User/home/Userhome.js";
import {Route, Routes} from  "react-router-dom"
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Role/>}/>
      
        <Route path="author/login" element={<Login/>}/>
        <Route path="author/signup" element={<Signup/>}/>

        <Route path="/user/login" element={<Login/>}/>
        <Route path="/user/signup" element={<Signup/>}/>
        <Route path="/user/home" element={<Userhome/>}/>
      
    </Routes>
   
      );
=======
import Signup from "./Component/signup/signup.js";
import Userhome from "./Component/User/home/Userhome.js";
import Auth from "./Component/auth/Author.js";
import { Route, Routes } from "react-router-dom";
import Login from "./Component/login/Login.js";

import "./App.css";
import Autherdetails from "./Component/autherdetail/Autherdetails.js";
import Blogread from "./Component/blogread/Blogread.js";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Role />} />

            <Route path="/reader/login" element={<Login role="reader" />} />
            <Route path="/reader/signup" element={<Signup role="reader" />} />

            <Route path="author/login" element={<Login role="author" />} />
            <Route path="author/signup" element={<Signup role="author" />} />

            <Route path="/reader/home" element={<Userhome />} />
            <Route path="/author/home" element={<Auth />} />

            <Route path="/author/details" element={<Autherdetails />} />
            <Route path="/reader/home/blog/:blog_id" element={<Blogread />} />
        </Routes>
    );
>>>>>>> 9b9469a3b61ffd1a6c2d5b35ce508bfb92c1ff6a
}

export default App;
