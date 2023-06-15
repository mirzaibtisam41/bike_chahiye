import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Gallery from "./Gallery";
import { CircularProgress } from "@mui/material";

const Post = () => {
  const param = useParams();
  const blogs = useSelector((state) => state.products.blogs);
  const [blogDetail, setBlogDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = () => {
    setLoading(true);
    const _find = blogs?.find((item) => item.id == param?.id);
    if (_find) {
      setLoading(false);
      setBlogDetail(_find);
    }
  };

  return (
    <>
      <div className=" pt-5 postbody">
        <section className="container">
          <Row>
            <Col lg={12} className="p-2">
              {loading ? (
                <CircularProgress />
              ) : (
                <Gallery blogDetail={blogDetail} />
              )}
            </Col>
          </Row>
        </section>
      </div>
    </>
  );
};

export default Post;
