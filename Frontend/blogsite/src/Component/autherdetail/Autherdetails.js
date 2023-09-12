import React from "react";
import styles from "./autherdetails.module.css";

function Autherdetails() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Blogsite
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Blog
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Writing Blog
                </a>
              </li>
              {/* //         <div class="text-end">
//   <img src="" class="rounded" alt="..."/>
// </div> */}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container w-80 main mt-5 mb-5 ">
        <img
          src="https://m.economictimes.com/thumb/msid-71433991,width-200,height-200,resizemode-4,imgsize-1786236/amit-agarwal-says-hes-lucky-to-receive-a-good-upbringing-in-an-environment-that-valued-humility-honesty-grit-and-gratitude-.jpg"
          className="rounded float-start mx-auto p-4 fs-2"
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

      {/* <div className={`${styles.card}`}> */}
      <div className="container">
        <h1 className="text-center m-3">Recent 3 Blog</h1>
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
    </div>
  );
}

export default Autherdetails;
