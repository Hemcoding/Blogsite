import React from "react";
import styles from "./autherdetails.module.css";
import NavBar from "../Navbar/Nav";
import dummyAuthor from "../../assets/profile.png"

function Autherdetails() {

  const authorImg = localStorage.getItem("url")

  return (
    <>
    <div style={{ marginBlock: "100px" }}>
      <NavBar />

      <div className="container w-80 main mt-5 mb-5 ">
        <img
          src={authorImg? (authorImg):(dummyAuthor)}
          className="rounded-circle float-start mx-auto p-4 fs-2"
          alt="..."
        />

        <div className={`${styles.details}`}>
          <h1>Amit Agarwal :Founder, Labnol</h1>
          <p class="text-capitalize">
            Amit Agarwal is one of the very few people who started tech blogging
            in India. He is an IIT graduate in computer science. 5 years into
            his first job in 2004, Amit decided to move to Agra and that’s when
            he started writing about technology on his blog named Labnol.
            Regardless to say, this blog has remained successful at delivering
            content around technology for more than a decade now and Amit
            Agarwal is undoubtedly one of the top bloggers in India. The Labnol
            blog attracts around 524,882 monthly visitors at present and is one
            of the most popular tech blogs in India.
          </p>
        </div>
      </div>
    </div>
      <p className={`${styles.bar}`}/>
      <div className="container flex jastify-content-center">
        <h3 className="text-center mt-3 text-warning">Your All Blogs</h3>
        <div className="row">
          <div class="card col-4 m-2" style={{ width: "22rem" }}>
            <img
              src="https://www.researchgate.net/publication/29487111/figure/fig1/AS:309919476666377@1450901969318/a-Original-image-of-size-200x200-pixels.png"
              class="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Tim & Teddy</h5>
              <p className="card-text">
                The little Tim and his Teddy bear were always together.Every
                night, when the little boy went...
              </p>
              <a href="#" class="btn btn-primary">
                View more
              </a>
            </div>
          </div>

          <div class="card col-4 m-2" style={{ width: "24rem" }}>
            <img
              src="https://www.researchgate.net/publication/29487111/figure/fig1/AS:309919476666377@1450901969318/a-Original-image-of-size-200x200-pixels.png"
              class="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Tim & Teddy</h5>
              <p className="card-text">
                The little Tim and his Teddy bear were always together.Every
                night, when the little boy went...
              </p>
              <a href="#" class="btn btn-primary">
                View more
              </a>
            </div>
          </div>

          <div class="card col-4 m-2" style={{ width: "22rem" }}>
            <img
              src="https://www.researchgate.net/publication/29487111/figure/fig1/AS:309919476666377@1450901969318/a-Original-image-of-size-200x200-pixels.png"
              class="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Tim & Teddy</h5>
              <p className="card-text">
                The little Tim and his Teddy bear were always together.Every
                night, when the little boy went...
              </p>
              <a href="#" class="btn btn-primary">
                View more
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Autherdetails;
