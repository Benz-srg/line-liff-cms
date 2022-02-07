import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import * as authCustomerActions from "@/actions/authCustomer.action";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    purpleAvatar: {
      margin: 10,
      color: "#fff",
      backgroundColor: "#AD00FF",
    },
    registerSpace: {
      marginTop: theme.spacing(2),
    },
    lineLogin: {
      backgroundColor: "#06c300",
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    card: {
      padding: theme.spacing(2),
      minWidth: theme.spacing(45),
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      color: "#fff",
      backgroundColor: "#AD00FF",
    },
  })
);

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const loginLiff = async (e) => {
    e.preventDefault();
    const liff = (await import("@line/liff")).default;
    try {
      await liff.init({ liffId: "1656870964-3j6xxkBb" });
    } catch (error) {
      console.error("liff init error", error.message);
    }

    liff.login();
  };

  /* useEffect(() => {
    loginLiff();
  }, []); */

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.container}>
        <Card className={classes.card}>
          <div className={classes.paper}>
            <Avatar className={classes.purpleAvatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              {/* <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="ชื่อผู้ใช้"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="รหัสผ่าน"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="จำรหัสผ่าน"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                เข้าสู่ระบบ
              </Button> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.lineLogin}
                onClick={(e) => loginLiff(e)}
              >
                <img alt="line-icon" src="./icon/line.svg" width="30" />
                เข้าสู่ระบบผ่านไลน์
              </Button>
              {/* <Grid container className={classes.registerSpace}>
                <Grid item xs>
                  <Link href="/forget-password" variant="body2">
                    ลืมรหัสผ่าน
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"สมัครสมาชิก"}
                  </Link>
                </Grid>
              </Grid> */}
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Card>
      </div>
    </Container>
  );
};

export default SignIn;
