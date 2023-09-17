import React from "react";
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
// import { loginUser } from "../../../Redux/slice/userSclice"; 
import { loginAsync } from "../../../Redux/userAction";

const Login = (props) => {
  let route = `/${props.role}/signup`;
  let home = `/${props.role}/home`;

  const { handleSubmit, control, formState: { errors }, reset } = useForm();
  const navigation = useNavigate();

  const dispatch = useDispatch();

  // const onSubmit = async (data) => {
  //   const body = JSON.stringify(data);
  //   console.log(body);

  //   try {
  //     const response = await axios.post(
  //       "http://10.201.1.171:8000/users/loginUser",
  //       body,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(response);

  //     if (!response.data.Error) {
  //       reset(); 
  //       dispatch(loginUser(data)); 
  //       navigation("/reader/home"); 
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const onSubmit = (data) => {
    const isLoginSuccessful = dispatch(loginAsync(data));
     

     
    if (isLoginSuccessful) {
      reset();
      navigation(home);
    }else{
      console.log("error")
    }
  };

 
  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="card shadow-lg p-3 box">
          <div className="card-body">
            <h1 className="card-title mb-4">Login</h1>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              <Button type="submit">Log In</Button>
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
