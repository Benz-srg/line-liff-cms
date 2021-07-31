import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import { urlApi } from "@/context/urlapi";
import { LazyLoadImage } from "react-lazy-load-image-component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1),
      border: "none",
    },
    paper: {
      boxShadow: theme.shadows[5],
      borderRadius: theme.spacing(1),
      height: 400,
    },
    close: {
      flexGrow: 1,
      textAlign: "right",
      background: "#ff9100",
    },
    icon: {
      color: "red",
    },
  })
);

interface Props {
  photo: string;
}

const Promotion = ({ photo }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.close}>
              <IconButton
                name="close-promotion"
                className={classes.icon}
                onClick={handleClose}
              >
                <CancelIcon />
              </IconButton>
            </div>
            <LazyLoadImage
              effect="blur"
              src={`${urlApi}uploads/promotion/${photo}`}
              alt={"รูปภาพเกี่ยวกับโปรโมชั่น"}
              width="400"
              height="400"
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Promotion;
