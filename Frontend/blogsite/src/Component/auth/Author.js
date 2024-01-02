import React, { useEffect, useState } from "react";
import "./author.css";
import NavBar from "../Navbar/Nav";
import axios from "axios";
import * as Yup from "yup";

const Author = () => {
    const [category, setCategory] = useState([]);
    const [blog, setBlog] = useState({
        category: "",
        title: "",
        image: "",
        description: "",
    });
    const [error, setError] = useState({});

    const validationSchema = Yup.object({
        category: Yup.string().required("Category is required"),
        title: Yup.string().min(10).max(80).required("Title is required"),
        image: Yup.mixed().required("Image is required"),
        description: Yup.string()
            .min(120)
            .max(1500)
            .required("Description is required"),
    });

    const token = localStorage.getItem("access_token");
    console.log(token);

    useEffect(() => {
        axios
            .post("http://localhost:8000/categories/showCategories")
            .then((cat) => setCategory(cat.data.Data))
            .catch((e) => console.log(e.message));
    }, []);

    const validateField = async (name, value) => {
        try {
            await Yup.reach(validationSchema, name).validate(value);
            setError((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        } catch (validationError) {
            setError((prevErrors) => ({
                ...prevErrors,
                [name]: validationError.message,
            }));
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setBlog({ ...blog, [name]: value });
        await validateField(name, value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError({});
        const form = e.target;
        const formData = new FormData(form);

        try {
            await validationSchema.validate(formData, { abortEarly: false });
        } catch (validationError) {
            // Handle validation errors here
            const validationErrors = {};
            validationError.inner.forEach((err) => {
                validationErrors[err.path] = err.message;
            });
            setError(validationErrors);
        }
        try {
            const response = await axios.post(
                "http://localhost:8000/blogs/postBlog",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorization: `b ${token}`,
                    },
                }
            );
            console.log(response);

            if (!response.data.Error) {
                setBlog({
                    category: "",
                    title: "",
                    image: null,
                    description: "",
                });

                alert("Blog Post Created Successfully");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <div className="main">
                <NavBar className="nav" />

                <div className="container sub">
                    <div className="card p-5 shadow-lg w-100">
                        <h2 className="pb-3">Create a blog</h2>

                        <form className="row g-4" onSubmit={onSubmit}>
                            <div className="select">
                                <label htmlFor="category" required>
                                    Choose a Category:
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    value={blog.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a category</option>
                                    {category.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {error.category && (
                                <div className="text-danger">
                                    {error.category}
                                </div>
                            )}

                            <div className="col-md-12">
                                <label htmlFor="title" className="form-label">
                                    Title
                                </label>
                                <input
                                    value={blog.title}
                                    onChange={handleChange}
                                    name="title"
                                    type="text"
                                    className="form-control"
                                    id="title"
                                />
                            </div>
                            {error.title && (
                                <div className="text-danger">{error.title}</div>
                            )}
                            <div className="col-12">
                                <label htmlFor="image" className="form-label">
                                    Image
                                </label>
                                <input
                                    accept="image/*"
                                    onChange={handleChange}
                                    name="image"
                                    type="file"
                                    className="form-control"
                                    id="image"
                                />
                            </div>
                            {error.image && (
                                <div className="text-danger">{error.image}</div>
                            )}
                            <div className="col-12">
                                <label
                                    htmlFor="description"
                                    className="form-label"
                                >
                                    Description
                                </label>
                                <textarea
                                    value={blog.description}
                                    onChange={handleChange}
                                    name="description"
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    style={{ height: "150px" }}
                                ></textarea>
                            </div>
                            {error.description && (
                                <div className="text-danger">
                                    {error.description}
                                </div>
                            )}
                            {/* {error && <div className="alert alert-danger">{error}</div>} */}
                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn shadow-lg w-100 my-3"
                                    style={{
                                        backgroundColor: "rgb(246, 162, 4)",
                                        color: "black",
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Author;


