import React, { useContext } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../Context/Context";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "red",
  },
}));

export default function SimpleBackdrop() {
  const classes = useStyles();
  const { backdropOpen } = useContext(GlobalContext);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
