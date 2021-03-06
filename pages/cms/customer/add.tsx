import React, { useState } from "react";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ButtonSubmit from "@/components/ButtonSubmit";
import Snackbars from "@/components/Snackbar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import ButtonBack from "@/components/ButtonBack";
/*  */
import * as customerActions from "@/actions/customer.action";
import { useSelector, useDispatch } from "react-redux";
/*  */

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      // minHeight: "80vh",
      //color: theme.palette.text.secondary,
    },
    textfield: {
      marginBottom: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    button: {
      marginBottom: theme.spacing(1),
    },
  })
);

interface addCustomer {
  fullName: string;
  userName: string;
  passWord: string;
  email: string;
  role: string;
  sex: string;
  age: string;
  address: string;
  billingAddress: string;
  shippingAddress: string;
}

const add = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");
  const { isUploading, isStatus, isMessage } = useSelector(
    ({ customer }: any) => customer
  );
  const [newCustomer, setNewCustomer] = useState<addCustomer>({
    fullName: "",
    userName: "",
    passWord: "",
    email: "",
    role: "??????????????????",
    sex: "0",
    age: "",
    address: "",
    billingAddress: "",
    shippingAddress: "",
  });

  const [errors, setErrors] = useState({
    fullName: "???????????????????????????????????????-?????????????????????",
    userName: "",
    passWord: "",
    email: "",
    role: "??????????????????",
    sex: "0",
    age: "",
    address: "",
    billingAddress: "",
    shippingAddress: "",
  });

  const handleChangeSex = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewCustomer({ ...newCustomer, sex: e.target.value });
  };

  const handleSubmit = () => {
    for (const [key, value] of Object.entries(newCustomer)) {
      console.log(`${key}: ${value}`);
    }
    dispatch(customerActions.createCustomer(newCustomer));
  };

  React.useEffect(() => {
    if (isStatus === 201) {
      setNewCustomer({
        fullName: "",
        userName: "",
        passWord: "",
        email: "",
        role: "??????????????????",
        sex: "0",
        age: "",
        address: "",
        billingAddress: "",
        shippingAddress: "",
      });
      setTypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
    } else if (isStatus == 401 || isStatus == 400) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);
  return (
    <Layout>
      <Paper className={classes.root} elevation={4}>
        <Snackbars
          open={openSnackbar}
          handleCloseSnakbar={setOpenSnackbar}
          message={isMessage}
          type={typeSnackbar}
        />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <ButtonBack />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              ?????????????????????????????????
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="fullName">????????????-?????????????????????</InputLabel>
              <OutlinedInput
                error
                id="fullName"
                label="????????????-?????????????????????"
                value={newCustomer.fullName}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setNewCustomer({ ...newCustomer, fullName: ev.target.value })
                }
              />
              <FormHelperText id="fullName-error-text">
                {errors.fullName}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="userName">??????????????????????????????</InputLabel>
              <OutlinedInput
                id="userName"
                label="??????????????????????????????"
                type="text"
                value={newCustomer.userName}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setNewCustomer({ ...newCustomer, userName: ev.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="passWord">????????????????????????</InputLabel>
              <OutlinedInput
                id="passWord"
                label="???????????????????????? "
                type="password"
                value={newCustomer.passWord}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setNewCustomer({ ...newCustomer, passWord: ev.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="email">??????????????????</InputLabel>
              <OutlinedInput
                id="email"
                label="?????????????????? "
                type="email"
                value={newCustomer.email}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setNewCustomer({ ...newCustomer, email: ev.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="role">???????????????</InputLabel>
              <OutlinedInput
                readOnly
                id="role"
                label="??????????????? "
                value={newCustomer.role}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setNewCustomer({ ...newCustomer, role: ev.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                ?????????
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={newCustomer.sex}
                onChange={handleChangeSex}
                label="?????????"
              >
                <MenuItem value={"0"}>
                  <b>?????????????????????????????????????????????</b>
                </MenuItem>
                <MenuItem value={"?????????"}>?????????</MenuItem>
                <MenuItem value={"????????????"}>????????????</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="age">????????????</InputLabel>
              <OutlinedInput
                id="component-outlined"
                label="age"
                type="number"
                value={newCustomer.age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setNewCustomer({
                    ...newCustomer,
                    age: e.target.value as string,
                  })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="address">?????????????????????</InputLabel>
              <OutlinedInput
                id="address"
                label="?????????????????????"
                value={newCustomer.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setNewCustomer({
                    ...newCustomer,
                    address: e.target.value as string,
                  })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="billingAddress">
                ?????????????????????????????????????????????????????????????????????
              </InputLabel>
              <OutlinedInput
                id="billingAddress"
                label="????????????????????????????????????????????????????????????????????? "
                value={newCustomer.billingAddress}
                multiline
                rows={3}
                rowsMax={5}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setNewCustomer({
                    ...newCustomer,
                    billingAddress: e.target.value as string,
                  })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="shippingAddress">
                ?????????????????????????????????????????????????????????
              </InputLabel>
              <OutlinedInput
                id="shippingAddress"
                label="????????????????????????????????????????????????????????? "
                value={newCustomer.shippingAddress}
                multiline
                rows={3}
                rowsMax={5}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setNewCustomer({
                    ...newCustomer,
                    shippingAddress: e.target.value as string,
                  })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <ButtonSubmit
              handleSubmit={handleSubmit}
              isUploading={isUploading}
            />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default add;
