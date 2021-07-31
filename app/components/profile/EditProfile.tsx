import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import Snackbars from "@/components/Snackbar";
import Loading from "@/components/Loading";
import * as customerActions from "@/actions/customer.action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    margin: {
      margin: theme.spacing(1),
    },
    paperStyle: {
      padding: "30px 20px",
      // width: theme.spacing(80),
      margin: "20px auto",
      justify: "center",
      alignItems: "center",
    },

    headerStyle: {
      margin: 0,
    },
    avatarStyle: {
      backgroundColor: "#1bbd7e",
    },
    marginTop: {
      marginTop: 5,
    },
    paper: {
      padding: theme.spacing(2),
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
  })
);
interface Customer {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  sex: string;
  age: string;
  tel: string;
  address: any[];
  billingAddress: string;
  shippingAddress: string;
}
interface Props {
  id: string;
}
export default function InputAdornments({ id }: Props) {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");
  const dispatch = useDispatch();
  const { isStatus, isMessage, isLoading, customers } = useSelector(
    ({ customer }: any) => customer
  );
  const [customer, setCustomer] = useState<Customer>({
    _id: "",
    fullName: "",
    email: "",
    role: "",
    sex: "",
    age: "",
    tel: "",
    address: [],
    billingAddress: "",
    shippingAddress: "",
  });

  const feedWithId = () => {
    dispatch(customerActions.queryCustomerWithId(id));
  };
  const handleSubmit = () => {
    dispatch(customerActions.updateCustomer(customer));
  };
  const handleChangeFullName = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCustomer({ ...customer, fullName: e.target.value });
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCustomer({ ...customer, email: e.target.value });
  };
  const handleChangeAge = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCustomer({ ...customer, age: e.target.value as any });
  };
  const handleChangeTel = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCustomer({ ...customer, tel: e.target.value });
  };
  const handleChangeSex = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCustomer({ ...customer, sex: e.target.value });
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  useEffect(() => {
    if(id){
      feedWithId();
    }
  }, [id]);
  useEffect(() => {
    setCustomer(customers);
  }, [customers]);
  useEffect(() => {
    if (isStatus === 201) {
      setTypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
    } else if (isStatus == 401 || isStatus == 400) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);
  return (
    <div>
      <Loading open={isLoading} />
      <Snackbars
        open={openSnackbar}
        handleCloseSnakbar={setOpenSnackbar}
        message={isMessage}
        type={typeSnackbar}
      />

      <Card className={classes.paperStyle}>
        <CardContent>
          <Loading open={isLoading} />
          <Snackbars
            open={openSnackbar}
            handleCloseSnakbar={setOpenSnackbar}
            message={isMessage}
            type={typeSnackbar}
          />
          {/* header card */}
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Avatar className={classes.avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <br />
            <h2 className={classes.headerStyle}>ข้อมูลส่วนตัว</h2>
            <Typography variant="caption" gutterBottom>
              รายละเอียดสมัครสมาชิก
            </Typography>
          </Grid>
          {/* header card */}
          {/* open form signup */}
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ชื่อ - นามสกุล"
                  placeholder="กรุณากรอกชื่อ  - นามสกุล"
                  onChange={handleChangeFullName}
                  value={customer.fullName}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="อายุ"
                  placeholder="กรุณากรอกอายุของท่าน"
                  onChange={handleChangeAge}
                  value={customer.age}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="เบอร์โทรศัพท์"
                  onChange={handleChangeTel}
                  placeholder="กรุณากรอกเบอร์โทรศัทพ์ของท่าน"
                  value={customer.tel}
                />
              </Grid>
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="อีเมล"
                onChange={handleChangeEmail}
                placeholder="กรุณากรอกอีเมลของท่าน"
                value={customer.email}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.marginTop}>
                <FormLabel component="legend">เพศ</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  style={{ display: "initial" }}
                >
                  {customer.sex == "0" ? (
                    <>
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="ชาย"
                        onChange={handleChangeSex}
                        checked
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        onChange={handleChangeSex}
                        label="หญิง"
                      />
                    </>
                  ) : (
                    <>
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        onChange={handleChangeSex}
                        label="ชาย"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        onChange={handleChangeSex}
                        label="หญิง"
                        checked
                      />
                    </>
                  )}
                </RadioGroup>
              </FormControl>
            </Grid>
            <br />
            <br />

            <Grid
              item
              xs={12}
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <br />
              <Button
                variant="contained"
                onClick={handleSubmit}
                color="primary"
              >
                ยืนยันการแก้ไข
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
