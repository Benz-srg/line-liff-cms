import React, { Dispatch, SetStateAction } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

interface Message {
  type: string;
  message: string;
  open: boolean;
  handleCloseSnakbar: Dispatch<SetStateAction<boolean>>;
}

export default function Snackbars(props: Message) {
  const classes = useStyles();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    props.handleCloseSnakbar(!open);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={props.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        {props.type == "success" ? (
          <Alert onClose={handleClose} severity="success">
            {props.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            {props.message}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
