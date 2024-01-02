import Role from "./Component/Role/Role.js";
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
}

export default App;
