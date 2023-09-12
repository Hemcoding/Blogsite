import React from "react";
import Navbar from "../Navbar/Nav.js";
import "./home.scss";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Row,
  Col
} from "reactstrap";

const Userhome = () => {
  return (
    <>
    <div style={{height:"100px"}}>

      <Navbar />
    </div>
      

      <div className="wrapper">
        <p className="heading">Read All Blogs Here...</p>

        <div className="select">
          <label for="category">Choose a Category:</label>
          <select name="category" id="category">
            <option value="science">Science</option>
            <option value="entertainment">Entertainment</option>
            <option value="sport">Sport</option>
            <option value="politics">Politics</option>
          </select>
        </div>

        <Card className="w-100 my-4">
          <CardBody>
            <Row xs="3">
            <Col>
            <Card
              style={{
                width: "18rem",
              }}
              >
              <img alt="Sample" src="https://picsum.photos/300/200" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card‘s content.
                </CardText>
                <Button>Readmore..</Button>
              </CardBody>
            </Card>
            </Col>
            </Row>
          </CardBody>
        </Card>
      </div>

      
    </>
              
  );
};

export default Userhome;
