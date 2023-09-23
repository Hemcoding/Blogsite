import React, { useRef, useState } from "react";
import "./Navbar.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownMenu, DropdownItem } from "reactstrap";
// import { useUser } from "../UserContext";
import axios from "axios"

const NavBar = () => {
  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState({
    image:""
  })
  const [url, setUrl] = useState("")
  // const [User, setUser] = useState({})
  const token = localStorage.getItem("access_token")
  localStorage.setItem("url",url)
  const user_info = localStorage.getItem("user_info")
  const imageUrl = localStorage.getItem("url")
  const parseuser = JSON.parse(user_info)
  
  const {image,first_name,last_name,email} = parseuser
 
  // const {user} = useUser()
  
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
  const profileImg = imageUrl? imageUrl : image;
  
  return (
    <>
      <nav className="nav">
        <div className="Container">
          <div className="sub-Container">
            <div className="navbar-brand">
              <h2 href="/">Blogsite</h2>
            </div>
            <ul className="navbar-links">
              <li>
                <h4>
                  <a className="link" to="/home">
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
                  <a className="link" to="/about">
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
              src={'data:image/jpeg;base64,'+ profileImg}
            />
          </div>
        </div>
      </nav>
     

      <Modal isOpen={modal}  fullscreen>
        <ModalHeader toggle={toggle}>Your Profile</ModalHeader>
        <ModalBody>
          <div className="user-details-container">
            <div className="edit-img-box">
              <img
                className="user-profile-img rounded-circle"
                src={'data:image/jpeg;base64,'+ profileImg}
                alt=""
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
          
          <Button color="secondary border-0`" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default NavBar;
