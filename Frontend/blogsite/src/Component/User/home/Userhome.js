import React, { useEffect, useState} from "react";
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
import Blogread from "../../blogread/Blogread.js";
import { useNavigate } from "react-router-dom";

const Userhome = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const navigate = useNavigate()

  // console.log(blogs);
  useEffect(() => {
    axios
      .post("http://localhost:8000/blogs/getBlogs", {
        offset: 0,
      })

      .then((res) => setBlogs(res.data.Data))
      .catch((e) => console.log(e.message));
  }, [Card]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/categories/showCategories")

      .then((cat) => setCategory(cat.data.Data))
      .catch((e) => console.log(e.message));
  }, []);
  console.log(blogs);

  useEffect(() => {
    if (selectedCategory) {
      handlecategorychange();
    }
  }, [selectedCategory])
  

  const twoFunction = (e) => {
    // handlecategorychange();
    setSelectedCategory(e.target.value);
    // console.log(e.target.value);
  };
 
  // const blog_id = blogs.blog_id

 
  const handlecategorychange = async () => {
    try {
      const response = await axios
        .post(
          "http://localhost:8000/blogs/blogsByCategory",
          {
            category: selectedCategory,
            offset: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => setBlogs(response.data.Data))
        .catch((e) =>setBlogs());
        
        
    } catch (e) {
      console.log(e);
    }
  };

  console.log(selectedCategory);

  const handleReadMoreClick = (blog_id) => {
    // setSelectedBlog(blog);
    navigate(`blog/${blog_id}`) 
  };

  return (
    <>
      <div style={{ height: "100px" }}>
        <Navbar />
      </div>

      <div className="wrapper">
        <p className="heading">Read All Blogs Here...</p>

        <div className="select">
          <label for="category">Choose a Category:</label>
          <select
            name="category"
            id="category"
            onChange={(e) => {
              twoFunction(e);
            }}
          >
            {category.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
        {/* <div> */}
        {/* <Card className="w-100 my-4 Card">
          <CardBody> */}
            <Row className="g-5 py-3">
              {blogs ? (
                blogs.map((blog) => (
                  <Col md={4} key={blog.blog_id}>
                    <Card
    
                      style={{
                        width: "18rem",
                      }}
                      
                    >
                      <img
                        className="blog-image"
                        alt="Sample"
                        src={"data:image/jpeg;base64," + blog.image}
                      />
                      <CardBody>
                        <CardTitle tag="h5">{blog.title}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                          {blog.category}
                        </CardSubtitle>

                        <CardText>
                          {blog.description.slice(0, 40) + "...."}
                        </CardText>

                        <div className="d-flex align-items-center justify-content-between">
                          <Button color="warning" onClick={() => handleReadMoreClick(blog.blog_id)}>Read more..</Button>
                          <p>{blog.publish_date.slice(0, 10)}</p>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))
              ) : (
              <div className="d-flex flex-column align-items-center width-100">
                <h1>Not Found</h1>
                <img style={{width:"25%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PxXr6HPamkNUw-h3Qkofb3pciuURDAZovw&usqp=CAU" alt="" srcset="" />
              </div>
                
              )}
            </Row>
          {/* </CardBody>
        </Card> */}
        {/* </div> */}
        {selectedBlog && <Blogread blog={selectedBlog} />}
      </div>
    </>
  );
};

export default Userhome;
