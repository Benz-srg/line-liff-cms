import React from "react";
import Layout from "@/layout";
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
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: "25ch",
    },
    paperStyle: {
      padding: "30px 20px",
      maxWidth: theme.spacing(80),
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

interface adminState {
  _id: string;
  fullName: string;
  userName: string;
  passWord: string;
  role: string;
  email: string;
  tel: string;
}
interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}
export default function InputAdornments() {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Layout align-items="center">
      {/* <Loading open={isLoading || isUploading} /> */}
      <Card className={classes.paperStyle}>
        <CardContent>
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
            <h2 className={classes.headerStyle}>สมัครสมาชิก</h2>
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
                  label="ชื่อผู้ใช้งาน"
                  placeholder="ชื่อผู้ใช้งาน"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl className={classes.marginTop}>
                  <InputLabel htmlFor="standard-adornment-password">
                    รหัสผ่าน
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    placeholder="กรุณากรอกรหัสผ่านของท่าน"
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <br />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl className={classes.marginTop}>
                  <InputLabel htmlFor="standard-adornment-password">
                    ยืนยันรหัสผ่าน
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    placeholder="กรุณายืนยันรหัสผ่านของท่าน"
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <br />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ชื่อ - นามสกุล"
                  placeholder="กรุณากรอกชื่อ  - นามสกุล"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="อายุ"
                  placeholder="กรุณากรอกอายุของท่าน"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="เบอร์โทรศัพท์"
                  placeholder="กรุณากรอกเบอร์โทรศัทพ์ของท่าน"
                />
              </Grid>
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="อีเมล"
                placeholder="กรุณากรอกอีเมลของท่าน"
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
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="ชาย"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="หญิง"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <br />
            <br />
            <Grid item xs={12}>
              <InputLabel htmlFor="standard-adornment-password">
                ที่อยู่
              </InputLabel>
              <br />
              <TextField
                fullWidth
                multiline
                rows={5}
                rowsMax={5}
                label="ที่อยู่"
                placeholder="เพิ่มที่อยู่ของท่าน"
                id="outlined-basic"
                variant="outlined"
              />
              <br />
              <br />
              <InputLabel htmlFor="standard-adornment-password">
                ที่อยู่การจัดส่ง
              </InputLabel>

              <FormControlLabel
                value="sameAddress"
                control={<Radio />}
                label="เลือกที่อยู่เดิม"
              />
              <br />
              <TextField
                fullWidth
                multiline
                rows={5}
                rowsMax={5}
                label="ที่อยู่การจัดส่ง"
                placeholder="เพิ่มที่อยู่การจัดส่งของท่าน"
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
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
              <Button type="submit" variant="contained" color="primary">
                สมัครสมาชิก
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
}
