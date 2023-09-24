import React from 'react'
import css from "./author.module.css"

const Author = () => {
  return (
    
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Blogsite</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Blog</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Writing Blog</a>
        </li>
        <div class="text-end">
  <img src="" class="rounded" alt="..."/>
</div>
      </ul>
    </div>
  </div>
</nav>

  
    <div className='container w-75 main' >
    {/* ------------------------- */}

    

    {/* --------------------------- */}
    <div className={`card p-5 shadow-lg mt-5 border-0 d-flex justify-content-center align-items-center fx-4 ${css.mydesign}`} style={{height:"80vh"}}>
    <form className= "row g-6 my-6">
  <div className="col-md-10 ">
    <label htmlFor="inputEmail4" className="form-label">Category</label>
<div className="btn-group">
  <button type="button" className="   btn btn-outline-dark mx-2 dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
    Category
  </button>
  <ul className="dropdown-menu ">
    <li><a className="dropdown-item" href="#">Entertainment</a></li>
    <li><a className="dropdown-item" href="#">Science</a></li>
    <li><a className="dropdown-item" href="#">Politics</a></li>
    <li><a className="dropdown-item" href="#">Fashion</a></li>
  </ul>
</div>
  </div>
  <div className="col-md-12">
    <label htmlFor="inputPassword4" className="form-label">Title</label>
    <input type="text" className="form-control" id="inputPassword4"/>
  </div>
  <div className="col-12">
    <label htmlFor="inputAddress" className="form-label">Image</label>
    <input type="file" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
  </div>
  <div className="col-12">
    <label htmlFor="inputAddress2" className="form-label">Description</label>
    <textarea type="text" className="form-control" id="inputAddress2" placeholder="" style={{height:"150px"}}></textarea>
  </div>
  <div className='col-12'>
    <button type='submit' className='btn btn-dark btn-gradient shadow-lg w-100 my-3'>Submit</button>
  </div>
  

</form> 
    </div>
    </div>
    </div>

  )
}

export default Author
