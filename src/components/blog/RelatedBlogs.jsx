import React from 'react'
import './blog.css'
import RelatedBlogsContainer from './BlogsList/RelatedBlogsContainer'
// import BlogsList from './BlogsList/RelatedBlogsContainer'


const Blogs=()=>{


    return<div className="relatedblogContainer">
    <div>
    <h2 className=" blogHead text-center pb-4 pt-5">Related Articles</h2>
    </div>
   <RelatedBlogsContainer/>
    </div>
}

 export default Blogs