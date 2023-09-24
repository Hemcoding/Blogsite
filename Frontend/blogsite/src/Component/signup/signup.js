// import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
// import { Link, useNavigate } from "react-router-dom";
// import React, { useState } from "react";
// import axios from "axios";
// import "./signup.scss"

// const Signup = (props) => {
//   const role = props.role;
//   const [user, setUser] = useState({
//     firstname: "",
//     lastname: "",
//     username: "",
//     email: "",
//     mobileno: "",
//     password: "",
//     role: role,
//   });
//   const navigation = useNavigate()

//   let name, value;
//   const handleChange = (e) => {
//     name = e.target.name;
//     value = e.target.value;

//     setUser({ ...user, [name]: value });
//   };

//   let route = `/${props.role}/login`;
  
//   console.log(route);

//   const register = async () => {
//     const body = JSON.stringify(user);
//     console.log(body)
//     await axios
//       .post("http://localhost:8000/users/registerUser", body, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         Form.reset();
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };
//   return (
//     <>
//       <div
//         className="container d-flex justify-content-center align-items-center"
//         // style={{height:"100vh"}}
//       >
//         <div className="card shadow-lg p-3 box my-5 border-warning">
//           <div className="card-body ">
//             <h1 className="card-title mb-4 signup-text">Signup</h1>
//             <Form autoComplete="off">
//               <Row>
//                 <Col md={12}>
//                   <FormGroup>
//                     <Label className="lable">Firstname</Label>
//                     <Input
//                       id="firstname"
//                       name="firstname"
//                       type="text"
//                       className=""
//                       value={user.firstname}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col md={12}>
//                   <FormGroup>
//                     <Label className="lable">Lastname</Label>
//                     <Input
//                       id="lastname"
//                       name="lastname"
//                       type="text"
//                       className=""
//                       value={user.lastname}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col md={12}>
//                   <FormGroup>
//                     <Label className="lable">Username</Label>
//                     <Input
//                       id="username"
//                       name="username"
//                       type="text"
//                       className=""
//                       value={user.username}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col md={12}>
//                   <FormGroup>
//                     <Label className="lable">Email</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       className=""
//                       value={user.email}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col md={12}>
//                   <FormGroup>
//                     <Label className="lable">Mobile no</Label>
//                     <Input
//                       id="mobileno"
//                       name="mobileno"
//                       type="text"
//                       className=""
//                       value={user.mobileno}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col md={12}>
//                   <FormGroup>
//                     <Label className="lable">Password</Label>
//                     <Input
//                       id="password"
//                       name="password"
//                       type="password"
//                       value={user.password}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col md={12}>
//                   <FormGroup>
//                     <Label className="lable">Confirm Password</Label>
//                     <Input id="cpassword" name="cpassword" type="password" />
//                   </FormGroup>
//                 </Col>
//               </Row>
//               {/* <div onClick={()=> navigation("/reader/login")}> */}
//                 <Button className="btn text-white" onClick={() => {register();navigation("/reader/login");}}>Sign Up</Button>
//                 {/* </div> */}
//             </Form>

//             {/* <input type="text" name="username" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
//           <button onClick={register}>SignUp</button> */}
//             <p className="py-4">
//               Already have an Account? <Link to={route}>Login</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import * as Yup from "yup";
import "./signup.scss";

const Signup = (props) => {
  const role = props.role;
  const navigation = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    mobileno: "",
    password: "",
    cpassword: "",
    role: role,
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    mobileno: Yup.string().matches(/^\+\d{1,3}\s?\d+$/, "Invalid mobile number").required("Mobile no is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    cpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: "" });
    setUser({ ...user, [name]: value });
  };

  const register = async () => {
    try {
      const { cpassword, ...userWithoutCPassword } = user;

      await validationSchema.validate(user, { abortEarly: false });

      const body = JSON.stringify(userWithoutCPassword);
      await axios.post("http://localhost:8000/users/registerUser", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

    
      setUser({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        mobileno: "",
        password: "",
        cpassword: "",
        role: role,
      });

      setErrors({});

      navigation(`/${role}/login`);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-3 box my-5 border-warning">
        <div className="card-body">
          <h1 className="card-title mb-4 signup-text">Signup</h1>
          <Form autoComplete="off">
            <Row>
               <Col md={12}>
                   <FormGroup>
                     <Label className="lable">Firstname</Label>
                     <Input
                       id="firstname"
                       name="firstname"
                       type="text"
                       className=""
                       value={user.firstname}
                       onChange={handleChange}
                     />
                      {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                   </FormGroup>
                 </Col>
               </Row>
               <Row>
                <Col md={12}>
                   <FormGroup>
                     <Label className="lable">Lastname</Label>
                     <Input
                       id="lastname"
                       name="lastname"
                       type="text"
                       className=""
                       value={user.lastname}
                       onChange={handleChange}
                     />
                      {errors.lastname && <div className="text-danger">{errors.lastname}</div>}
                   </FormGroup>
                 </Col>
               </Row>
               <Row>
                 <Col md={12}>
                   <FormGroup>
                     <Label className="lable">Username</Label>
                     <Input
                       id="username"
                       name="username"
                       type="text"
                       className=""
                       value={user.username}
                       onChange={handleChange}
                     />
                      {errors.username && <div className="text-danger">{errors.username}</div>}
                   </FormGroup>
                 </Col>
              </Row>
               <Row>
                 <Col md={12}>
                   <FormGroup>
                     <Label className="lable">Email</Label>
                     <Input
                       id="email"
                       name="email"
                       type="email"
                       className=""
                       value={user.email}
                       onChange={handleChange}
                     />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                   </FormGroup>
                 </Col>
               </Row>
               <Row>
                 <Col md={12}>
                   <FormGroup>
                     <Label className="lable">Mobile no</Label>
                     <Input
                       id="mobileno"
                       name="mobileno"
                       type="text"
                       className=""
                       value={user.mobileno}
                       onChange={handleChange}
                       placeholder="eg.+91xxxxxxxxxxx"
                     />
                      {errors.mobileno && <div className="text-danger">{errors.mobileno}</div>}
                   </FormGroup>
                 </Col>
               </Row>
               <Row>
                 <Col md={12}>
                   <FormGroup>
                     <Label className="lable">Password</Label>
                     <Input
                       id="password"
                       name="password"
                       type="password"
                       value={user.password}
                      onChange={handleChange}
                     />
                      {errors.password && <div className="text-danger">{errors.password}</div>}
                  </FormGroup>
                 </Col>
               </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label className="lable">Confirm Password</Label>
                  <Input
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    value={user.cpassword}
                    onChange={handleChange}
                  />
                  {errors.cpassword && <div className="text-danger">{errors.cpassword}</div>}
                </FormGroup>
              </Col>
            </Row>
            <Button className="btn text-white" onClick={register}>
              Sign Up
            </Button>
          </Form>
          <p className="py-4">
            Already have an Account? <Link to={`/${role}/login`}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

