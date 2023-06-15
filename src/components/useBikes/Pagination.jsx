import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
  },
}));

export default function BasicPagination({ total, postPerPage, handleChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        count={Math.ceil(total / postPerPage)}
        color="secondary"
        onChange={handleChange}
      />
    </div>
  );
}
