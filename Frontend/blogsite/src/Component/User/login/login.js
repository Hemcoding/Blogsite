import React from "react";
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useUser } from "../UserContext";


const Login = (props) => {
  let route = `/${props.role}/signup`;
  let home = `/${props.role}/home`;

  const {login} = useUser()

  const { handleSubmit, control, formState: { errors }, reset } = useForm();
  const navigation = useNavigate();

  const onSubmit = async (data) => {
    const body = JSON.stringify(data);
    console.log(body);

    try {
      const response = await axios.post(
        "http://localhost:8000/users/loginUser",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (!response.data.Error) {
        reset(); 
        login(response.data.Data)
        localStorage.setItem("user_info",JSON.stringify(response.data.Data))
        localStorage.setItem("access_token",response.data.AccessToken)
        navigation(home); 
      }
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="card shadow-lg p-3 box border-warning">
          <div className="card-body">
            <h1 className="card-title mb-4">Login</h1>
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          id="email"
                          placeholder="with a placeholder"
                          type="email"
                          value={field.value}
                          onChange={field.onChange}
                          // className="border-warning"
                        />
                      )}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9.!#$%&'*+/=!^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "Invalid email address",
                        },
                      }}
                    />
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          id="password"
                          placeholder="password placeholder"
                          type="password"
                          value={field.value}
                          onChange={field.onChange}
                          // className="border-warning"
                        />
                      )}
                      rules={{
                        required: "Password is required",
                      }}
                    />
                    {errors.password && (
                      <span className="text-danger">
                        {errors.password.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Button style={{border:"none"}} type="submit">Log In</Button>
            </Form>
            <p className="py-4">
              Don't have an Account? <Link to={route}>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )

};


export default Login;
