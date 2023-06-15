import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import "./Gallery.css";
import PostDetail from "./PostDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: "600px",

    ["@media (max-width:768px)"]: {
      height: "450px",
      width: "auto",
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const Gallery = ({ blogDetail }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className="w-100">
        <GridListTile className="cont flex-fill w-100 h-100">
          <img
            className="images w-100"
            src={blogDetail?._embedded["wp:featuredmedia"][0].source_url}
            alt=""
          />
        </GridListTile>
      </GridList>

      <div className=" w-100" style={{ backgroundColor: "white" }}>
        <PostDetail productBlog={blogDetail} />
      </div>
    </div>
  );
};

export default Gallery;
