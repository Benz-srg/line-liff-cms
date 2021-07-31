import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Image from "next/image";
// import scbLogo from "../../../../public/img/scblogo.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      textAlign: "center",
    },
    addressCard: {
      marginTop: "1em",
      backgroundColor: "#F1F0F0",
    },
    title: {
      margin: theme.spacing(3, 0, 0, 2),
    },
    resend: {
      margin: theme.spacing(3, 0, 2),
      color: "#AD00FF",
      backgroundColor: "#FFF",
      border: "1px solid ",
      borderColor: "#AD00FF",
    },
    bankImg: {
      paddingTop: "6px",
      textAlign: "center",
    },
    bankInfo: {
      display: "flex",
      alignItems: "center",
      textAlign: "left",
      marginLeft: "10px",
    },
    defaultSign: {
      backgroundColor: "#AD00FF",
      padding: "0 4px 0 4px",
      color: "#fff",
      textAlign: "center",
      fontSize: "12px",
    },
    defaultGrid: {
      display: "flex",
      alignItems: "center",
    },
  })
);

const address = () => {
  const classes = useStyles();

  function AddressCard(props) {
    return (
      <Card className={classes.addressCard} variant="outlined">
        <Grid container>
          <Grid item xs={2} className={classes.bankImg}>
            {/* <Image src={scbLogo} alt="logo" width="100" height="50" /> */}
          </Grid>
          <Grid item xs={4} className={classes.bankInfo}>
            <Typography variant="body2">
              SCB <br /> 540-334-05550
            </Typography>
          </Grid>
          <Grid item xs={4} md={3} className={classes.defaultGrid}>
            <Card className={classes.defaultSign} hidden={!props.default}>
              ค่าเริ่มต้น
            </Card>
          </Grid>
          <Grid item xs={2} md={3} className={classes.bankInfo}></Grid>
        </Grid>
      </Card>
    );
  }

  return (
    <Grid container className={classes.paper}>
      <Grid item md={4} xs={6}>
        <Typography variant="h6" className={classes.title}>
          ข้อมูลบัญชี
        </Typography>
      </Grid>
      <Grid item md={4} xs={6}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className={classes.resend}
        >
          ส่งอีกครั้ง
        </Button>
      </Grid>
      <Grid item xs={12}>
        <AddressCard default={true} />
        <AddressCard default={false} />
      </Grid>
    </Grid>
  );
};

export default address;
