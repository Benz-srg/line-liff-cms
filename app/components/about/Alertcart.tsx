import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      height: 180,
      background: "rgba(0,0,0,0.7)",
      color: "#fff",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1,
    },
    boxtext: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 180,
      width: "100%",
      flexDirection: "column",
    },
    iconCustom: {
      width: 46,
      color: "#00D100",
      backgroundColor: "tranparent",
      borderRadius: "50%",
      display: "flex",
      position: "relative",
    },
    icon: {
      fontSize: 46,
      overflow: "hidden",
      zIndex: 1,
    },
    boxColorIcon: {
      width: 30,
      height: 30,
      position: "absolute",
      background: "#fff",
      borderRadius: "50%",
      top: 5,
      left: 6,
    },
  })
);

const Alertcart = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.boxtext}>
        <div className={classes.iconCustom}>
          <div className={classes.boxColorIcon}></div>
          <CheckCircleRoundedIcon className={classes.icon} />
        </div>
        <Typography variant="body1" gutterBottom>
          คุณได้ทำการเพิ่มสินค้าลงในรถเข็นแล้ว
        </Typography>
      </div>
    </div>
  );
};

export default Alertcart;
