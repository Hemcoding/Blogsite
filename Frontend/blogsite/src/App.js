import Role from "./Component/Role/Role.js";
import Login from "./Component/User/login/Login.js"
// import AuthSignup from "./Component/Author/signup/signup.js"
import Signup from "./Component/User/signup/signup.js";
import Userhome from "./Component/User/home/Userhome.js";
import Auth from "./Component/auth/Author.js"
import {Route, Routes} from  "react-router-dom"

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Role/>}/>
      
        
        <Route path="/reader/login" element={<Login role="reader"/>}/>
        <Route path="/reader/signup" element={<Signup role="reader"/>}/>

        <Route path="author/login" element={<Login role="author"/>}/>
        <Route path="author/signup" element={<Signup role="author"/>}/>

        <Route path="/reader/home" element={<Userhome/>}/>
        <Route path="/author/home" element={<Auth/>}/>
      
    </Routes>
   
      );
}

export default App;
