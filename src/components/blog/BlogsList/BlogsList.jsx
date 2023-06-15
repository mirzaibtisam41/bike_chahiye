import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../useBikes/Pagination";
import Card from "./Card";
import { setBlogsData } from "../../../redux/reducers/productSlice";
import { useDispatch } from "react-redux";

const BlogsList = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(9);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://bikechahiye.blog/wp-json/wp/v2/posts?_embed`
        );
        setUsers(response.data);
        dispatch(setBlogsData(response.data));
        setErrorMsg("");
      } catch (error) {
        setErrorMsg("Error while loading data. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const _filter = users?.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container">
      {isLoading ? (
        <CircularProgress style={{ color: "#dc3545" }} />
      ) : (
        <div id="ibtisam">
          {_filter?.map((item, index) => (
            <Card key={index} item={item} navigate={navigate} />
          ))}
        </div>
      )}
      {!isLoading && (
        <div className="my-4">
          <Pagination
            total={users?.length}
            postPerPage={postsPerPage}
            handleChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default BlogsList;
