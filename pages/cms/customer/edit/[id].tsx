import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ButtonSubmit from "@/components/ButtonSubmit";
import Snackbars from "@/components/Snackbar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useRouter } from "next/router";
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const param = await context.query;
  return {
    props: { id: param.id },
  };
};

interface addCustomer {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  sex: string | number;
  age: string;
  address: any[];
  billingAddress: string;
  shippingAddress: string;
  tel: string;
}

const EditCustomer = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");
  const { adminPermission } = useSelector(({ permission }:any) => permission)
  const { isUploading, isStatus, isMessage, customers } = useSelector(
    ({ customer }: any) => customer
  );
  const [newCustomer, setNewCustomer] = useState<addCustomer>({
    _id: "",
    fullName: "",
    email: "",
    role: "ลูกค้า",
    sex: 0,
    age: "",
    address: [],
    billingAddress: "",
    shippingAddress: "",
    tel: "",
  });

  const handleChangeSex = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewCustomer({ ...newCustomer, sex: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(customerActions.updateCustomer(newCustomer));
  };

  const feed = async () => {
    await dispatch(customerActions.queryCustomerWithId(id));
  };

  useEffect(() => {
    if (isStatus === 201) {
      setNewCustomer(customers);
      setTypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
    } else if (isStatus == 401 || isStatus == 400) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);

  useEffect(() => {
    feed();
  }, []);

  useEffect(() => {
    if (customers != "") {
      setNewCustomer(customers);
    }
  }, [customers]);

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
            <Button onClick={() => router.push({ pathname: "/cms/customer" })}>
              <ArrowBackIcon /> กลับ
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              แก้ไขข้อมูลลูกค้า
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="fullName">ชื่อ-นามสกุล</InputLabel>
              <OutlinedInput
                id="fullName"
                label="ชื่อ-นามสกุล"
                value={newCustomer.fullName}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setNewCustomer({ ...newCustomer, fullName: ev.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="tel">เบอร์โทร</InputLabel>
              <OutlinedInput
                id="tel"
                label="เบอร์โทร"
                value={newCustomer.tel}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setNewCustomer({ ...newCustomer, tel: ev.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="email">อีเมล์</InputLabel>
              <OutlinedInput
                id="email"
                label="อีเมล์ "
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
              <InputLabel htmlFor="role">ระดับ</InputLabel>
              <OutlinedInput
                readOnly
                id="role"
                label="ระดับ "
                value={newCustomer.role == "customer" ? "ลูกค้า" : "ลูกค้า"}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setNewCustomer({ ...newCustomer, role: ev.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                เพศ
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={newCustomer.sex}
                onChange={handleChangeSex}
                label="เพศ"
              >
                <MenuItem value={0}>ชาย</MenuItem>
                <MenuItem value={1}>หญิง</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="age">อายุ</InputLabel>
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
          {newCustomer.address
            ? newCustomer.address.map((addres, index) => (
                <Grid item xs={12} key={index}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="address">
                      ที่อยู่ {index + 1}{" "}
                      {addres._id == newCustomer.shippingAddress
                        ? "ที่อยู่เริ่มต้น"
                        : ""}
                    </InputLabel>
                    <OutlinedInput
                      id={`address${index}`}
                      label={`ที่อยู่ ${index + 1} ${
                        addres._id == newCustomer.shippingAddress
                          ? "ที่อยู่เริ่มต้น"
                          : ""
                      }`}
                      readOnly
                      value={addres.shippingAddress}
                    />
                  </FormControl>
                </Grid>
              ))
            : ""}

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

export default EditCustomer;
