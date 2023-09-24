import React from "react";
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import "./login.scss"
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <>
    

    <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>

    
      <div className="card shadow-lg p-3 box">
        <div className="card-body ">
          <h1 className="card-title mb-4">Login</h1>
          <Form>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="email"
                    className=""
                    />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="password placeholder"
                    type="password" 
                    /> 
                </FormGroup>
              </Col>
            </Row>
            <Button>Log In</Button>
          </Form>
            <p className="py-4">Don't have an Account? <Link to="/author/signup">Sign Up</Link></p>
            
        </div>
      </div>
      </div>
    </>
  );     
};

export default Login;
