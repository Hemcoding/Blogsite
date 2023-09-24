import React, { useState } from "react";
import "./Navbar.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useUser } from "../User/UserContext";
import axios from "axios"
import userImage from "../../assets/profile.png"
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll"

const NavBar = (props) => {
  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState({
    image:""
  })
  const [url, setUrl] = useState("")

  const token = localStorage.getItem("access_token")
  localStorage.setItem("url",url)
  const user_info = localStorage.getItem("user_info")
  const imageUrl = localStorage.getItem("url")
  const parseuser = JSON.parse(user_info)
  
  const {image,first_name,last_name,email} = parseuser

  const navigate = useNavigate()
 
  const {logout} = useUser()

  console.log(props.role);

  const path = `/${props.role}/login`
  
  // const {first_name ,last_name,email} = user
  const toggle = () => setModal(!modal);
 
    const handleChange = (e) => {
      const {name, value} = e.target;
  
  
      setProfile({...profile, [name]: value})
  }

  const onSubmit = async (event) => {
    
      event.preventDefault(); 
      
      const form = event.target
      console.log(form)
      const formData = new FormData(form);
      
      try {
        const response = await axios.post(
          "http://localhost:8000/users/setProfile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "authorization": `b ${token}`
            },
          }
        );
        console.log(response);

        const res = await axios.post(
          "http://localhost:8000/users/getProfile",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "authorization": `b ${token}`
            },
          }
        );

        setUrl(res.data.image)
        console.log(url)
        // if (!response.data.Error) {
  
        //   alert("profile image is posted Successfully");
        // }



      } catch (e) {
        console.error(e);
      }
    
  }

  const handleLogout= () => {
    logout()
    navigate(path)
  }

  const profileImg = imageUrl? imageUrl : image;
  
  return (
    <>
    {props.role? (
       <nav className="nav">
       <div className="Container">
         <div className="sub-Container">
           <div className="navbar-brand">
             <h2>Blogsite</h2>
           </div>
           <ul className="navbar-links">
             <li>
               <h4>
                 <a className="link" href="#">
                   Home
                 </a>
               </h4>
             </li>
             <li>
               <h4>
                 <a className="link" onClick={toggle}>
                   Profile
                 </a>
               </h4>
             </li>
             <li>
               <h4>
                 <Link to="contact">
                   Contact
                 </Link>
               </h4>
             </li>
             <li>
               <h4>
                <a onClick={handleLogout}>
                  Logout
                </a> 
                
               </h4>
             </li>
           </ul>
         </div>
         <div className="user-profile">
           <p>{"Hi, "+first_name+" "+last_name}</p>
           <img
             onClick={toggle}
             className="user-img"
             src={profileImg?('data:image/jpeg;base64,'+ profileImg):(userImage)}
             alt="profile"
           />
         </div>
       </div>
     </nav>
    ) : ( <nav className="nav">
    <div className="Container">
      <div className="sub-Container">
        <div className="navbar-brand">
          <h2>Blogsite</h2>
        </div>
        <ul className="navbar-links">
          <li>
            <h4>
              <a className="link" to="/home" href="/author/home">
                Home
              </a>
            </h4>
          </li>
          <li>
            <h4>
              <a className="link" to="/categories">
                Categories
              </a>
            </h4>
          </li>
          <li>
            <h4>
              <a className="link" to="/about" href="/author/details">
                About
              </a>
            </h4>
          </li>
          <li>
            <h4>
              <a className="link" to="/contact">
                Contact
              </a>
            </h4>
          </li>
        </ul>
      </div>
      <div className="user-profile">
        <p>{first_name+" "+last_name}</p>
        <img
          onClick={toggle}
          className="user-img"
          src={profileImg?('data:image/jpeg;base64,'+ profileImg):(userImage)}
          alt="profile"
        />
      </div>
    </div>
  </nav>)}
     
     

      <Modal isOpen={modal}  fullscreen>
        <ModalHeader toggle={toggle}>Your Profile</ModalHeader>
        <ModalBody>
          <div className="user-details-container">
            <div className="edit-img-box">
              <img
                className="user-profile-img rounded-circle"
                src={profileImg?('data:image/jpeg;base64,'+ profileImg):(userImage)}
                alt="profile-img"
              />
              <form onSubmit={onSubmit}>
                
              <input
                  accept="image/*"
                  onChange={handleChange}
                  name="image"
                  type="file"
                  className="form-control border-warning"
                  id="image"
                />
                <Button className="btn my-3 border-0" type="submit">Update</Button>
                </form>
            </div>
            <div className="details">
              <h3>{first_name+" "+last_name}</h3>
              <p>{email}</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          
          <Button color="secondary border-0" onClick={toggle}>
            Cancel
          </Button>
          <Button color="secondary border-0" onClick={handleLogout}>
            Logout
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default NavBar;
