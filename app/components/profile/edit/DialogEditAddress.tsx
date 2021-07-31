import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { green, pink, purple } from "@material-ui/core/colors";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";

import * as addressActions from "@/actions/address.action";

interface Props {
  _id: string;
  customerId: string;
  addressName: string;
  shippingAddress: string;
}
interface Address {
  _id: string;
  customerId: string;
  addressName: string;
  shippingAddress: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);
export default function DialogAddAddress({
  _id,
  customerId,
  addressName,
  shippingAddress,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const [address, setAddress] = React.useState<Address>({
    _id: _id,
    customerId: customerId,
    addressName: addressName,
    shippingAddress: shippingAddress,
  });
  const handleChangeAddressName = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddress({ ...address, addressName: e.target.value });
  };
  const handleChangeShippingAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddress({ ...address, shippingAddress: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(addressActions.updateAddress(address));
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        แก้ไข
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Avatar
              style={{
                backgroundColor: purple[500],
              }}
            >
              <PersonPinCircleIcon />
            </Avatar>
            ข้อมูลที่อยู่ {addressName}
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form className={classes.root} noValidate autoComplete="off">
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  ชื่อที่อยู่
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={address.addressName}
                  onChange={handleChangeAddressName}
                  placeholder="รายละเอียดข้อมูลชื่อที่อยู่"
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                  labelWidth={60}
                />
              </FormControl>
              <br />
              <br />
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="outlined"
                >
                  {/* <InputLabel htmlFor="standard-adornment-password">
            ที่อยู่การจัดส่ง
              </InputLabel> */}

                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    rowsMax={5}
                    value={address.shippingAddress}
                    label="ที่อยู่การจัดส่ง"
                    placeholder="เพิ่มที่อยู่ของท่าน"
                    id="outlined-basic"
                    variant="outlined"
                    onChange={handleChangeShippingAddress}
                  />
                  <br />
                </FormControl>
              </Grid>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
