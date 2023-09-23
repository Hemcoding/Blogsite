import React from "react";
import { useState, useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import styles from "./blogread.module.css";
import { BiSolidLike } from "react-icons/bi";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import NavBar from "../User/Navbar/Nav";

function Blogread() {
  const { blog_id } = useParams();

  const like = localStorage.getItem("likes");
  const dislike = localStorage.getItem("dislikes");
  const token = localStorage.getItem("access_token");

  const [Blog, setBlog] = useState([{}]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [comments, setComments] = useState([{}]);

  const initialValues = {
    
    commentText: ""
  };

  const commentSchema = Yup.object().shape({
    commentText: Yup.string().required("Comment is required"),
  });

  useEffect(() => {
    axios
      .post("http://10.201.1.195:8000/blogs/blogsById", {
        blog_id: blog_id,
      })

      .then((response) => {
        setBlog(response.data.Data);
        console.log(response.data.Data);
      })
      .catch((e) => console.log(e));
  }, [blog_id]);

  console.log(Blog);

  const [data] = Blog;
  // const {comments} = data
  // console.log(comments)
  const likes = data.likes;
  console.log(likes);
  const dislikes = data.dislikes;
  console.log(dislikes);
  localStorage.setItem("likes", likes);
  localStorage.setItem("dislike", dislikes);

  const handleLikeClick = () => {
    axios
      .post("http://10.201.1.195:8000/blogs/likes", {
        blog_id: blog_id,
        like: !liked ? 1 : -1,
      })

      .then((res) => {
        setLikeCount(res.data.Likes);
      })
      .catch((e) => console.log(e.message));

    if (!liked) {
      setLiked(true);
    } else {
      setLiked(false);
    }

    if (disliked) {
      setDisliked(false);
      handleDislikeClick();
    }
  };

  const handleDislikeClick = () => {
    axios
      .post("http://10.201.1.195:8000/blogs/dislikes", {
        blog_id: blog_id,
        dislike: !disliked ? 1 : -1,
      })

      .then((res) => {
        setDislikeCount(res.data.Dislikes);
      })
      .catch((e) => console.log(e.message));

    if (!disliked) {
      setDisliked(true);
    } else {
      setDisliked(false);
    }

    if (liked) {
      setLiked(false);
      handleLikeClick();
    }
  };

  const handleComments = () => {
    axios
      .post("http://10.201.1.195:8000/comments/getComments", {
        blog_id: blog_id,
      })

      .then((res) => {
        setComments(res.data.Data.comments);
      })
      .catch((e) => console.log(e.message));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: commentSchema,
    onSubmit: (values, { resetForm }) => {
      axios
        .post(
          "http://10.201.1.195:8000/comments/postComment",
          {
            "comment": values.commentText,
            "blog_id": blog_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `b ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          resetForm();
        })
        .catch((e) => console.log(e.message));
    },
  });

  

  return (
    <>
    <NavBar/>
    <div className="container">


      {Blog.map((blog) => (
        <div className="blog" key={blog.blog_id}>
          <h1>{blog.title}</h1>
          <h3>___________{blog.category}</h3>
          <img
            src={"data:image/jpeg;base64," + blog.image}
            className={`${styles.details}`}
          />
          <p className="desc">{blog.description}</p>

          <div>
            <div className="d-flex flex-row align-items-start me-3 p-3">
              <div className="d-flex align-items-center me-3">
                <span id="likeCount">{likeCount}</span>

                <i
                  onClick={handleLikeClick}
                  style={{ fontSize: "40px", cursor: "pointer" }}
                >
                  {liked ? <BiSolidLike color="blue" /> : <BiLike />}
                </i>
              </div>

              <div className="d-flex align-items-center me-3">
                <span id="dislikeCount">{dislikeCount}</span>
                <i
                  onClick={handleDislikeClick}
                  style={{ fontSize: "40px", cursor: "pointer" }}
                >
                  {disliked ? (
                    <BiSolidDislike id="dislike" color="red" />
                  ) : (
                    <BiDislike id="dislike" />
                  )}
                </i>
              </div>
            </div>

            <div className="conatiner card p-4 w-100">
              <Button type="button" onClick={handleComments}>
                Show comments
              </Button>
              {comments ? (
                comments.map((items) => (
                  <div className="card w-100">
                    <div className="card-body" key={items.comment_id}>
                      <div className="d-flex flex-start mb-4">
                        <img
                          src={
                            items.image
                              ? "data:image/jpeg;base64," + items.image
                              : "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-login-interface-abstract-blue-icon-png-image_3917504.jpg"
                          }
                          className="rounded-circle me-3"
                          width="55"
                          height="55"
                          alt=""
                          srcset=""
                        />
                        <div className="d-flex flex-column justify-content-start ml-2 w-100">
                          <span className="d-block fw-bold name">
                            {items.username}
                          </span>
                          <div className="form-outline w-50 h-50">
                            <div className="mt-2">
                              <p className="comment-text">{items.comment}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h3>Comments Not Found</h3>
              )}

              <div className="form-container mt-5">
                <form className="form-block" onSubmit={formik.handleSubmit}>

                  <div className="form-outline w-40 h-60">
                    <textarea
                      className="form-control"
                      id="textAreaExample"
                      rows="4"
                      placeholder="write comment"
                      name="commentText"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.commentText}
                    />
                    {formik.touched.commentText && formik.errors.commentText ? (
                      <div className="error">{formik.errors.commentText}</div>
                    ) : null}
                    <button
                      type="submit"
                      className="btn btn-primary pull-right my-3"
                      style={{ border: "none" }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Blogread;
