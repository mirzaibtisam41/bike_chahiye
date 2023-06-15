import React, {useEffect,useState, useContext} from 'react'
import './bloglist.css'
import {GlobalContext} from '../../Context/Context.js'
import { useNavigate } from 'react-router-dom';
const RelatedBlogsContainer=()=>{
  const { getBlogData,setBlogDetailFunc,} = useContext(GlobalContext);

  const navigate = useNavigate();

  const AddDetailFunc = (item) => {
      setBlogDetailFunc(item)
      navigate(`/blogdetail?name=${item.title}&feature=1`)
  }

    return<div className="container">
    <div className="flex">
    
      {
        getBlogData.map((item, index)=><div className="p-2" key={index} onClick={(e) => AddDetailFunc(item)}>
        
        <div className="content ">
           <img src={item.mainImage} className="card-img-top" alt="..."/>
 
        </div>
        <h3 className="contentTitle">{item.title}</h3>
        </div>
        )}


     
    </div>
    
     
  </div>
}


export default RelatedBlogsContainer