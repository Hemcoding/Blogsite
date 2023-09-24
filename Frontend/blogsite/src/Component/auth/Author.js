// import React, { useEffect, useState } from "react";
// import "./author.css";
// import NavBar from "../User/Navbar/Nav";
// import axios from "axios";

// const Author = () => {
//   const [category, setCategory] = useState([]);
//   const [blog, setBlog] = useState({
//     category: "",
//     title: "",
//     image: null,
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;

//     if (type === "file") {
//       // Handle file input correctly
//       if (e.target.files.length > 0) {
//         setBlog({ ...blog, [name]: e.target.files[0] });
//       } else {
//         setBlog({ ...blog, [name]: null });
//       }
//     } else {
//       setBlog({ ...blog, [name]: value });
//     }
//   };

//   useEffect(() => {
//     axios
//       .post("http://10.201.1.171:8000/categories/showCategories")
//       .then((cat) => setCategory(cat.data.Data))
//       .catch((e) => console.log(e.message));
//   }, []);

//   const onSubmit = async () => {
//     const formData = new FormData();
//     formData.append("category", blog.category);
//     formData.append("title", blog.title);

//     if (blog.image !== null) {
//       formData.append("image", blog.image);
//     }

//     formData.append("description", blog.description);

//     console.log(formData);

//     try {
//       const response = await axios.post(
//         "http://10.201.1.171:8000/blogs/postBlog",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response);

//       if (!response.data.Error) {
//         setBlog({
//           category: "",
//           title: "",
//           image: null,
//           description: "",
//         });

//         alert("Blog Post Created Successfully");
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div>
//       <div className="main">
//         <NavBar className="nav" />
//         <div className="container sub">
//           <div className="card p-5 shadow-lg w-100">
//             <h2 className="pb-3">Create a blog</h2>
//             <form id="blogPost" className="row g-4">
//               <div className="select">
//                 <label htmlFor="category">Choose a Category:</label>
//                 <select
//                   name="category"
//                   id="category"
//                   value={blog.category}
//                   onChange={handleChange}
//                 >
//                   {category.map((item, index) => (
//                     <option key={index}>{item.name}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-12">
//                 <label htmlFor="title" className="form-label">
//                   Title
//                 </label>
//                 <input
//                   value={blog.title}
//                   onChange={handleChange}
//                   name="title"
//                   type="text"
//                   className="form-control"
//                   id="title"
//                 />
//               </div>
//               <div className="col-12">
//                 <label htmlFor="image" className="form-label">
//                   Image
//                 </label>
//                 <input
//                   accept="image/*"
//                   onChange={handleChange}
//                   name="image"
//                   type="file"
//                   className="form-control"
//                   id="image"
//                 />
//               </div>
//               <div className="col-12">
//                 <label htmlFor="description" className="form-label">
//                   Description
//                 </label>
//                 <textarea
//                   value={blog.description}
//                   onChange={handleChange}
//                   name="description"
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   style={{ height: "150px" }}
//                 ></textarea>
//               </div>
//               <div className="col-12">
//                 <button
//                   type="button"
//                   onClick={onSubmit}
//                   className="btn shadow-lg w-100 my-3"
//                   style={{
//                     backgroundColor: "rgb(246, 162, 4)",
//                     color: "black",
//                   }}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Author;

import React, { useEffect, useState } from "react";
import "./author.css";
import NavBar from "../User/Navbar/Nav";
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

  // const validateField = async (name, value) => {
  //   try {
  //     await Yup.reach(validationSchema, name).validate(value);
  //     setError({ ...error, [name]: "" });
  //   } catch (error) {
  //     setError({ ...error, [name]: error.message });
  //     console.log(error)
  //   }
  // };

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
    }catch (validationError) {
        // Handle validation errors here
        const validationErrors = {};
        validationError.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setError(validationErrors);
      } 
      try{
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
      
    } catch(e){
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
                  <div className="text-danger">{error.category}</div>
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
                <label htmlFor="description" className="form-label">
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
                  <div className="text-danger">{error.description}</div>
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

// import React, { useEffect, useState } from "react";
// import "./author.css";
// import NavBar from "../User/Navbar/Nav";
// import axios from "axios";
// import * as Yup from 'yup'; // Import Yup for validation

// const Author = () => {
//   const [category, setCategory] = useState([]);
//   const [blog, setBlog] = useState({
//     category: "",
//     title: "",
//     image: "",
//     description: "",
//   });

//   const [errors, setErrors] = useState({}); // Initialize errors state

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     axios
//       .post("http://localhost:8000/categories/showCategories")
//       .then((cat) => setCategory(cat.data.Data))
//       .catch((e) => console.log(e.message));
//   }, []);

//   // const validationSchema = Yup.object().shape({
//   //   category: Yup.string().required('Category is required'),
//   //   title: Yup.string().required('Title is required'),
//   //   image: Yup.mixed().required('Image is required'),
//   //   description: Yup.string().required('Description is required'),
//   // });

//   const validationSchema = Yup.object().shape({
//         category: Yup.string().min(1).max(30).required(""),
//         title: Yup.string().min(10).max(80).required(""),
//         image: Yup.mixed().required(""),
//         description: Yup.string()
//           .min(120)
//           .required(""),
//       });
    

//   const handleChange = async (e) => {
//     const { name, value, files } = e.target;
//     setBlog({ ...blog, [name]: value });

//     try {
//       await validationSchema.validateAt(name, value); // Validate individual field
//       setErrors({ ...errors, [name]: "" }); // Clear error for the field
//     } catch (error) {
//       setErrors({ ...errors, [name]: error.message }); // Set error for the field
//       console.log(errors);
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const formData = new FormData(form);

//     try {
//       await validationSchema.validate(formData, { abortEarly: false });

//       // If validation passes, proceed with form submission
//       const response = await axios.post(
//         "http://localhost:8000/blogs/postBlog",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             "authorization": `b ${token}`
//           },
//         }
//       );

//       if (!response.data.Error) {
//         setBlog({
//           category: "",
//           title: "",
//           image: null,
//           description: "",
//         });

//         alert("Blog Post Created Successfully");
//       }
//     } catch (validationError) {
//       // Handle validation errors here
//       const validationErrors = {};
//       validationError.inner.forEach((err) => {
//         validationErrors[err.path] = err.message;
//       });
//       setErrors(validationErrors);
//     }
//     //  catch (e) {
//     //   console.error(e);
//     // }
//   };

//   return (
//     <div>
//       <div className="main">
//         <NavBar className="nav" />
//         <div className="container sub">
//           <div className="card p-5 shadow-lg w-100">
//             <h2 className="pb-3">Create a blog</h2>
//             <form className="row g-4" onSubmit={onSubmit}>
//               <div className="select">
//                 <label htmlFor="category">Choose a Category:</label>
//                 <select
//                   name="category"
//                   id="category"
//                   value={blog.category}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select a category</option>
//                   {category.map((item, index) => (
//                     <option key={index} value={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.category && (
//                   <div className="error-message">{errors.category}</div>
//                 )}
//               </div>

//               <div className="col-md-12">
//                 <label htmlFor="title" className="form-label">
//                   Title
//                 </label>
//                 <input
//                   value={blog.title}
//                   onChange={handleChange}
//                   name="title"
//                   type="text"
//                   className="form-control"
//                   id="title"
//                 />
//                 {errors.title && (
//                   <div className="error-message">{errors.title}</div>
//                 )}
//               </div>
//               <div className="col-12">
//                 <label htmlFor="image" className="form-label">
//                   Image
//                 </label>
//                 <input
//                   accept="image/*"
//                   onChange={handleChange}
//                   name="image"
//                   type="file"
//                   className="form-control"
//                   id="image"
//                 />
//                 {errors.image && (
//                   <div className="error-message">{errors.image}</div>
//                 )}
//               </div>
//               <div className="col-12">
//                 <label htmlFor="description" className="form-label">
//                   Description
//                 </label>
//                 <textarea
//                   value={blog.description}
//                   onChange={handleChange}
//                   name="description"
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   style={{ height: "150px" }}
//                 ></textarea>
//                 {errors.description && (
//                   <div className="error-message">{errors.description}</div>
//                 )}
//               </div>
//               <div className="col-12">
//                 <button
//                   type="submit"
//                   className="btn shadow-lg w-100 my-3"
//                   style={{
//                     backgroundColor: "rgb(246, 162, 4)",
//                     color: "black",
//                   }}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Author;


// import React, { useEffect, useState } from "react";
// import "./author.css";
// import NavBar from "../User/Navbar/Nav";
// import axios from "axios";

// const Author = () => {
//   const [category, setCategory] = useState([]);
//   const [blog, setBlog] = useState({
//     category: "",
//     title: "",
//     image: null,
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;

//     const newValue = type === "file" ? files[0] : value;

//     setBlog({ ...blog, [name]: newValue });
//   };

//   useEffect(() => {
//     axios
//       .post("http://10.201.1.171:8000/categories/showCategories")
//       .then((cat) => setCategory(cat.data.Data))
//       .catch((e) => console.log(e.message));
//   }, []);

//   const onSubmit = async () => {
//     const formData = new FormData();
//     formData.append("category", blog.category);
//     formData.append("title", blog.title);
//     formData.append("image", blog.image);
//     formData.append("description", blog.description);

//     console.log(formData)
//     try {
//       const response = await axios.post(
//         "http://10.201.1.171:8000/blogs/postBlog",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response);

//       if (!response.data.Error) {

//         setBlog({
//           category: "",
//           title: "",
//           image: null,
//           description: "",
//         });

//         alert("Blog Post Created Successfully");
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div>
//       <div className="main">
//         <NavBar className="nav" />
//         <div className="container sub">
//           <div className="card p-5 shadow-lg w-100">
//             <h2 className="pb-3">Create a blog</h2>
//             <form id="blogPost" className="row g-4">
//               <div className="select">
//                 <label htmlFor="category">Choose a Category:</label>
//                 <select
//                   name="category"
//                   id="category"
//                   value={blog.category}
//                   onChange={handleChange}
//                 >
//                   {category.map((item, index) => (
//                     <option key={index}>{item.name}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-12">
//                 <label htmlFor="title" className="form-label">
//                   Title
//                 </label>
//                 <input
//                   value={blog.title}
//                   onChange={handleChange}
//                   name="title"
//                   type="text"
//                   className="form-control"
//                   id="title"
//                 />
//               </div>
//               <div className="col-12">
//                 <label htmlFor="image" className="form-label">
//                   Image
//                 </label>
//                 <input
//                   accept="image/*"
//                   onChange={handleChange}
//                   name="image"
//                   type="file"
//                   className="form-control"
//                   id="image"
//                 />
//               </div>
//               <div className="col-12">
//                 <label htmlFor="description" className="form-label">
//                   Description
//                 </label>
//                 <textarea
//                   value={blog.description}
//                   onChange={handleChange}
//                   name="description"
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   style={{ height: "150px" }}
//                 ></textarea>
//               </div>
//               <div className="col-12">
//                 <button
//                   type="button" // Change to type="button" to prevent form submission
//                   onClick={onSubmit}
//                   className="btn shadow-lg w-100 my-3"
//                   style={{
//                     backgroundColor: "rgb(246, 162, 4)",
//                     color: "black",
//                   }}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Author;

//

// import React, { useEffect, useState } from "react";
// import "./author.css";
// import NavBar from "../User/Navbar/Nav";
// import axios from "axios";

// const Author = () => {
//   const [categories, setCategories] = useState([]);
//   const [blog, setBlog] = useState({
//     category_id: "",
//     title: "",
//     image: null, // Initialize with null for file input
//     description: "",
//   });

//   useEffect(() => {
//     axios
//       .post("http://10.201.1.171:8000/categories/showCategories")
//       .then((response) => setCategories(response.data.Data))
//       .catch((error) => console.log(error.message));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;

//     if (name === "category") {
//       const selectedCategory = categories.find((cat) => cat.name === value);

//       if (selectedCategory) {
//         setBlog({ ...blog, category_id: selectedCategory.id });
//       }
//     } else if (type === "file") {
//       // Handle file input correctly
//       setBlog({ ...blog, [name]: files[0] }); // Use files[0] to get the first selected file
//     } else {
//       setBlog({ ...blog, [name]: value });
//     }
//   };

//   const onSubmit = async () => {
//     const formData = new FormData();
//     formData.append("category_id", blog.category_id);
//     formData.append("title", blog.title);

//     // Check if an image file has been selected
//     if (blog.image) {
//       formData.append("image", blog.image);
//     }

//     formData.append("description", blog.description);

//     try {
//       const response = await axios.post(
//         "http://10.201.1.171:8000/blogs/postBlog",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response);

//       if (!response.data.Error) {
//         setBlog({
//           category_id: "",
//           title: "",
//           image: null,
//           description: "",
//         });

//         alert("Blog Post Created Successfully");
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div>
//       <div className="main">
//         <NavBar className="nav" />
//         <div className="container sub">
//           <div className="card p-5 shadow-lg w-100">
//             <h2 className="pb-3">Create a blog</h2>
//             <form className="row g-4">
//               <div className="select">
//                 <label htmlFor="category">Choose a Category:</label>
//                 <select
//                   name="category"
//                   id="category"
//                   value={blog.category_id}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map((category) => (
//                     <option key={category.id} value={category.name}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-12">
//                 <label htmlFor="title" className="form-label">
//                   Title
//                 </label>
//                 <input
//                   value={blog.title}
//                   onChange={handleChange}
//                   name="title"
//                   type="text"
//                   className="form-control"
//                   id="title"
//                 />
//               </div>
//               <div className="col-12">
//                 <label htmlFor="image" className="form-label">
//                   Image
//                 </label>
//                 <input
//                   accept="image/*"
//                   onChange={handleChange}
//                   name="image"
//                   type="file"
//                   className="form-control"
//                   id="image"
//                 />
//               </div>
//               <div className="col-12">
//                 <label htmlFor="description" className="form-label">
//                   Description
//                 </label>
//                 <textarea
//                   value={blog.description}
//                   onChange={handleChange}
//                   name="description"
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   style={{ height: "150px" }}
//                 ></textarea>
//               </div>
//               <div className="col-12">
//                 <button
//                   type="button"
//                   onClick={onSubmit}
//                   className="btn shadow-lg w-100 my-3"
//                   style={{
//                     backgroundColor: "rgb(246, 162, 4)",
//                     color: "black",
//                   }}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Author;

// import React, { useEffect, useState } from "react";
// import "./author.css";
// import NavBar from "../User/Navbar/Nav";
// import axios from "axios";

// const Author = () => {
//   const [categories, setCategories] = useState([]);
//   const [blog, setBlog] = useState({
//     category_id: "", // Change to category_id
//     title: "",
//     image: null,
//     description: "",
//   });

//   useEffect(() => {
//     axios
//       .post("http://10.201.1.171:8000/categories/showCategories")
//       .then((response) => setCategories(response.data.Data))
//       .catch((error) => console.log(error.message));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;

//     if (name === "category") {
//       const selectedCategory = categories.find((cat) => cat.name === value);

//       if (selectedCategory) {
//         setBlog({ ...blog, category_id: selectedCategory.id });
//       }
//     } else if (type === "file") {
//       setBlog({ ...blog, [name]: files[0] });
//     } else {
//       setBlog({ ...blog, [name]: value });
//     }
//   };

//   const onSubmit = async () => {
//     const formData = new FormData();
//     formData.append("category_id", blog.category_id); // Use "category_id" instead of "category"
//     formData.append("title", blog.title);

//     if (blog.image) {
//       formData.append("image", blog.image);
//     }

//     formData.append("description", blog.description);

//     try {
//       const response = await axios.post(
//         "http://10.201.1.171:8000/blogs/postBlog",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response);

//       if (!response.data.Error) {
//         setBlog({
//           category_id: "",
//           title: "",
//           image: null,
//           description: "",
//         });

//         alert("Blog Post Created Successfully");
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div>
//       <div className="main">
//         <NavBar className="nav" />
//         <div className="container sub">
//           <div className="card p-5 shadow-lg w-100">
//             <h2 className="pb-3">Create a blog</h2>
//             <form className="row g-4">
//               <div className="select">
//                 <label htmlFor="category">Choose a Category:</label>
//                 <select
//                   name="category"
//                   id="category"
//                   value={blog.category_id} // Use category_id
//                   onChange={handleChange}
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map((category) => (
//                     <option key={category.id} value={category.name}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-12">
//                 <label htmlFor="title" className="form-label">
//                   Title
//                 </label>
//                 <input
//                   value={blog.title}
//                   onChange={handleChange}
//                   name="title"
//                   type="text"
//                   className="form-control"
//                   id="title"
//                 />
//               </div>
//               <div className="col-12">
//                 <label htmlFor="image" className="form-label">
//                   Image
//                 </label>
//                 <input
//                   accept="image/*"
//                   onChange={handleChange}
//                   name="image"
//                   type="file"
//                   className="form-control"
//                   id="image"
//                 />
//               </div>
//               <div className="col-12">
//                 <label htmlFor="description" className="form-label">
//                   Description
//                 </label>
//                 <textarea
//                   value={blog.description}
//                   onChange={handleChange}
//                   name="description"
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   style={{ height: "150px" }}
//                 ></textarea>
//               </div>
//               <div className="col-12">
//                 <button
//                   type="button"
//                   onClick={onSubmit}
//                   className="btn shadow-lg w-100 my-3"
//                   style={{
//                     backgroundColor: "rgb(246, 162, 4)",
//                     color: "black",
//                   }}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Author;
