import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import "./Post.css";
// import Parser from "react-html-parser"

import { makeStyles } from "@material-ui/core/styles";
import "./PostDetail.css";
// import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "20px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(26),
    fontWeight: theme.typography.fontWeightRegular,
  },
  head: {
    color: 'black"',
  },
  head1: {
    color: "#dc3545;",

    "&:hover": {
      color: "black",
    },
  },
  tit: {
    color: "#dc3545;",

    "&:hover": {
      color: "black",
    },
  },
}));

const PostDetail = ({ productBlog, blog }) => {
  const classes = useStyles();

  return (
    <div style={{ backgroundColor: "white" }}>
      <div
        className="title pt-2 font-size-small border-btm "
        style={{
          fontFamily: "Roboto",
          fontSize: "48px",
          fontWeight: "700",
          color: "#dc3545;",
          backgroundColor: "white",
        }}
      >
        <p className={classes.tit}>
          {" "}
          {ReactHtmlParser(productBlog && productBlog?.title?.rendered)}
        </p>
      </div>

      <br />
      <br />

      <div style={{ textAlign: "justify" }}>
        {ReactHtmlParser(productBlog && productBlog?.content?.rendered)}
      </div>

      <a
        className="btn btn-danger text-white mt-2 mb-3"
        style={{
          color: "#0353a5",
        }}
        target="_blank"
        href={productBlog?.link}
      >
        See More Details
      </a>
    </div>
  );
};

export default PostDetail;
