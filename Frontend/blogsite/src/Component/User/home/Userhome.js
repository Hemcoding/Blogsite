import React, { useEffect, useState } from "react";
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
  Col,
} from "reactstrap";
import axios from "axios";

const Userhome = () => {
  const [blogs, setBlogs] = useState([]);
  const [ category , setCategory] = useState([])
  // console.log(blogs);
  useEffect(() => {
    axios
      .post("http://172.16.108.121:8000/blogs/getBlogs", {
        offset: 0,
      })

      .then((res) => setBlogs(res.data.Data))
      .catch((e) => console.log(e.message));

      
    }, [Card]);
    
    useEffect(() =>{
    axios
  .post("http://172.16.108.121:8000/categories/showCategories")

  .then((cat) => setCategory(cat.data.Data))
  .catch((e) => console.log(e.message));
    
  },[])
  console.log(blogs);

  return (
    <>
      <div style={{ height: "100px" }}>
        <Navbar />
      </div>

      <div className="wrapper">
        <p className="heading">Read All Blogs Here...</p>

        <div className="select">
          <label for="category">Choose a Category:</label>
          <select name="category" id="category">
            {
              category.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))
            }
          </select>
        </div>
        {/* <div> */}
        <Card className="w-100 my-4 Card">
          <CardBody>
          <Row className="g-5">
                {blogs.map((blog) => (
                 
                    <Col md={4}>
                  <Card 
                  // className="g-col-4"
                  style={{
                    width: "18rem",
                  }}
                  >
                    <img alt="Sample" src={'data:image/jpeg;base64,'+blog.image} />
                    <CardBody>
                      <CardTitle tag="h5">{blog.title}</CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                        ></CardSubtitle>
                        
                      <CardText>
                        {blog.description.slice(0,40)+"...."}
                      </CardText>
                      
                      <div className="d-flex align-items-center justify-content-between">

                      <Button color="warning">Read more..</Button>
                      <p>{blog.publish_date.slice(0,10)}</p>
                      </div>
                    </CardBody>
                  </Card>
                  </Col>
                ))}
                </Row>
              
          </CardBody>
        </Card>
        {/* </div> */}
      </div>
    </>
  );
};

export default Userhome;
