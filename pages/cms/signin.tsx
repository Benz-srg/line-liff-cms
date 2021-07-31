import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "@/actions/authAdmin.action";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      background: "#d8d8d8",
    },
    root: { width: 350, height: "auto", padding: theme.spacing(3) },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    boxActions: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: theme.spacing(2, 4),
    },
  })
);

interface signin {
  username: string | number;
  password: string | number;
}

const Signin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [account, setAccount] = useState<signin>({
    username: "gamezxii",
    password: "12345678",
  });

  const authAdmin = useSelector((state: any) => state.authAdmin);

  const handleSignin = () => {
    if (account.username == "" && account.password == "") {
      return alert("กรุณากรอก ชื่อผู้ใช้ หรือ รหัสผ่าน");
    }
    dispatch(authActions.signinAdmin(account, router));
  };
  return (
    <div className={classes.container}>
      <Loading open={authAdmin.isLoading} />
      <Paper className={classes.root} elevation={5}>
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className={classes.large}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="ชื่อผู้ใช้"
              type="text"
              value={account.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAccount({ ...account, username: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="รหัสผ่าน"
              type="password"
              value={account.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAccount({ ...account, password: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <div className={classes.boxActions}>
          <Button>ลืมรหัสผ่าน</Button>
          <Button variant="contained" color="primary" onClick={handleSignin}>
            เข้าสู่ระบบ
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Signin;
