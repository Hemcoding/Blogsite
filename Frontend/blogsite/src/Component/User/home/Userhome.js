import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Nav";
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
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
    GrFacebook,
    GrInstagram,
    GrLinkedin,
    GrLinkedinOption,
    GrMailOption,
    GrPhone,
    GrTwitter,
} from "react-icons/gr";
import {BiLogoGmail, BiSolidPhoneOutgoing} from "react-icons/bi"
import {Element} from "react-scroll"

const Userhome = () => {
    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const blogsPerPage = 10;

    const navigate = useNavigate();

    // console.log(blogs);
    useEffect(() => {
        axios
            .post("http://localhost:8000/blogs/getBlogs", {
                offset: 0,
            })

            .then((res) => setBlogs(res.data.Data))
            .catch((e) => console.log(e.message));
    }, []);

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
    });

    const twoFunction = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handlecategorychange = async () => {
        try {
            await axios
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
                .catch((e) => setBlogs());
        } catch (e) {
            console.log(e);
        }
    };

    console.log(selectedCategory);

    const handleReadMoreClick = (blog_id) => {
        navigate(`blog/${blog_id}`);
    };

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
    const offset = currentPage * blogsPerPage;
    const currentBlogs = blogs.slice(offset, offset + blogsPerPage);

    return (
        <>
            <div style={{ height: "100px" }}>
                <Navbar role="reader" />
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

                <Row className="g-5 py-3">
                    {blogs ? (
                        blogs.map((blog) => (
                            <Col md={4} key={blog.blog_id}>
                                <Card
                                    className="blog-card"
                                    // style={{
                                    //     width: "18rem",
                                    //     border: "2px solid rgb(246, 162, 4);"
                                    // }}
                                >
                                    <img
                                        className="blog-image"
                                        alt="Sample"
                                        src={
                                            "data:image/jpeg;base64," +
                                            blog.image
                                        }
                                    />
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            {blog.title}
                                        </CardTitle>
                                        <button className="category">
                                            {blog.category}
                                        </button>

                                        <CardText>
                                            {blog.description.slice(0, 40) +
                                                "...."}
                                        </CardText>

                                        <div className="d-flex align-items-center justify-content-between">
                                            <Button
                                                color="warning"
                                                onClick={() =>
                                                    handleReadMoreClick(
                                                        blog.blog_id
                                                    )
                                                }
                                            >
                                                Read more..
                                            </Button>
                                            <p>
                                                {blog.publish_date.slice(0, 10)}
                                            </p>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <div className="d-flex flex-column align-items-center width-100">
                            <h1>Not Found</h1>
                            <img
                                style={{ width: "25%" }}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PxXr6HPamkNUw-h3Qkofb3pciuURDAZovw&usqp=CAU"
                                alt=""
                                srcset=""
                            />
                        </div>
                    )}
                </Row>

                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={Math.ceil(blogs.length / blogsPerPage)}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </div>
            <Element name="contact">
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h4>Contact Us</h4>
                            <div>
                                <BiLogoGmail className="icon"/> :{" "}
                                <a href="mailto:Hemanshu.Parmar@aeonx.digital">
                                    Hemanshu@gmail.com
                                </a>
                            </div>
                            <div>
                                <BiSolidPhoneOutgoing className="icon"/> :{" "}
                                <a href="tel:+911234567890">+1234567890</a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h4>Follow Us</h4>
                            <ul className="social-icons">
                                <li>
                                    <a href="#">
                                        {/* <i className=""></i>/ */}
                                        <GrFacebook />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <GrTwitter />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        {/* <i className="fa fa-linkedin"></i> */}
                                        <GrLinkedinOption />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        {/* <i className="fa fa-instagram"></i> */}
                                        <GrInstagram />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            </Element>
        </>
    );
};

export default Userhome;
