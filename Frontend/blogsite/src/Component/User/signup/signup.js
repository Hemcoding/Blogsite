import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom"
import React from 'react'

const signup = () => {
  return (
    <>
    

    <div className="container d-flex justify-content-center align-items-center" 
    // style={{height:"100vh"}}
    >

    
      <div className="card shadow-lg p-3 box my-5">
        <div className="card-body ">
          <h1 className="card-title mb-4">Signup</h1>
          <Form>
          <Row>
              <Col md={12}>
                <FormGroup>
                  <Label>Firstname</Label>
                  <Input
                    id="firstName"
                    name="firstname"
                    type="text"
                    className=""
                    />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md={12}>
                <FormGroup>
                  <Label>Lastname</Label>
                  <Input
                    id="lastName"
                    name="lastname"
                    type="text"
                    className=""
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
                    />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md={12}>
                <FormGroup>
                  <Label>Mobile no</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="text"
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
                    id="password"
                    name="password"
                    type="password" 
                    />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="examplePassword">Confirm Password</Label>
                  <Input
                    id="confirm_password"
                    name="confirm_password"
                    type="password" 
                    />
                </FormGroup>
              </Col>
            </Row>
            <Button>Sign Up</Button>
          </Form>
            <p className="py-4">Already have an Account? <Link to="/login">Login</Link></p>
            
        </div>
      </div>
      </div>
    </>
  )
}

export default signup
