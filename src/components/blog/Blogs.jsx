import React from 'react';
import BlogsList from './BlogsList/BlogsList';
import './blog.css';


const Blogs=({heading, success})=>{

    return (
      <div className="blogContainer">
        <div>
          {/* <h2 className=" blogHead text-center pb-4 pt-4">Blog</h2> */}
          {heading !== false && (
            <section className="container text-center mt-4">
              <span
                className=" h2 bold"
                style={{ borderBottom: "3px solid #dc3545", color: "black" }}
              >
                {success ? success : "PK-BIKE NEWS"}
              </span>
              <div className={success ? "my-4" : "mx-auto my-4 service-text"}>
                {!success && (
                  <span className="text-center mt-2 mb-4">
                   
                  </span>
                )}
              </div>
            </section>
          )}
        </div>
        <BlogsList />
      </div>
    );
}

 export default Blogs