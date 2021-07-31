import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { imgApi } from "./imgAPI";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    overflow: "scroll",
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    paperModal: {
      position: "absolute",
      width: 600,
      boxShadow: "rgba(99,99,99,0.2) 0px 2px 8px 0px",
      padding: "10px",
      backgroundColor: "#FFF",
      borderRadius: "10px",
      textAlign: "center",
    },
    copyCheck: {
      padding: "3",
      backgroundColor: "#AD00FF",
      color: "#FFF",
      borderRadius: "10px",
      marginTop: "20px",
      margin: "10px",
    },
    modalActionButton: {
      display: "flex",
      alignItems: "center",
    },
    buttonWrap: {
      width: "100%",
    },
    modalButton: {
      color: "#FFF",
      backgroundColor: "#3f51b5",
    },
    imageModal: {
      width: "50%",
      margin: "auto",
    },
  })
);

const slipModal = (props: any) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyles] = useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} className={classes.modalButton}>
        ตรวจสอบสลิป
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyles} className={classes.paperModal}>
          <Grid container>
            <Grid item xs={12}>
              <img
                src={`${imgApi}uploads/slip/${props.imgURL}`}
                alt=""
                className={classes.imageModal}
              />
            </Grid>
            <Grid className={classes.modalActionButton} item xs={12}>
              <div className={classes.buttonWrap}>
                <Button
                  className={classes.copyCheck}
                  onClick={() => handleClose()}
                >
                  ปิด
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </>
  );
};

export default slipModal;
