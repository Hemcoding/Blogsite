import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Signup = (props) => {
  const role = props.role;
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    mobileno: "",
    password: "",
    role: role,
  });
  const navigation = useNavigate()

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  let route = `/${props.role}/login`;
  
  console.log(route);

  const register = async () => {
    const body = JSON.stringify(user);
    console.log(body)
    await axios
      .post("http://10.201.1.171:8000/users/registerUser", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        Form.reset();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        // style={{height:"100vh"}}
      >
        <div className="card shadow-lg p-3 box my-5">
          <div className="card-body ">
            <h1 className="card-title mb-4">Signup</h1>
            <Form autoComplete="off">
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>Firstname</Label>
                    <Input
                      id="firstname"
                      name="firstname"
                      type="text"
                      className=""
                      value={user.firstname}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>Lastname</Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      type="text"
                      className=""
                      value={user.lastname}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      className=""
                      value={user.username}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className=""
                      value={user.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>Mobile no</Label>
                    <Input
                      id="mobileno"
                      name="mobileno"
                      type="text"
                      className=""
                      value={user.mobileno}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={user.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input id="cpassword" name="cpassword" type="password" />
                  </FormGroup>
                </Col>
              </Row>
              {/* <div onClick={()=> navigation("/reader/login")}> */}
                <Button onClick={() => {register();navigation("/reader/login");}}>Sign Up</Button>
                {/* </div> */}
            </Form>

            {/* <input type="text" name="username" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
          <button onClick={register}>SignUp</button> */}
            <p className="py-4">
              Already have an Account? <Link to={route}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
