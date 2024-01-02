<<<<<<< HEAD
import React from 'react'
import {Card, CardBody, Button, Row} from 'reactstrap'
import { Link }from 'react-router-dom'

function Role() {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"100vh",backgroundColor:"rgb(207,221,236)"}}>
      <Card className='w-50 p-4'>
        <CardBody>
          <Row>
            <h2>Select a Role</h2>
          </Row>
          <Row className='py-3'>
          <Link to="/author/login">
          <Button className='w-100'>
            As a Author
          </Button>
          </Link>
          </Row>
          <Row>
          <Link to="/user/login">
          <Button className='w-100'>
            As a User
          </Button>
          </Link>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
  }

  export default Role


=======
import React from "react";
import { Card, CardBody, Button, Row } from "reactstrap";
import { Link } from "react-router-dom";

function Role() {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <Card className="w-50 p-4 border-warning">
                <CardBody>
                    <Row>
                        <h2 className="text-warning">Select a Role</h2>
                    </Row>
                    <Row className="py-3">
                        <Link to="/author/login">
                            <Button
                                className="w-100 text-white"
                                style={{ border: "none" }}
                            >
                                As a Author
                            </Button>
                        </Link>
                    </Row>
                    <Row>
                        <Link to="/reader/login">
                            <Button
                                className="w-100 text-white"
                                style={{ border: "none" }}
                            >
                                As a Reader
                            </Button>
                        </Link>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default Role;
>>>>>>> 9b9469a3b61ffd1a6c2d5b35ce508bfb92c1ff6a
