import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import * as addressActions from "@/actions/address.action";
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
import DialogEditAddress from "@/components/profile/edit/DialogEditAddress";

interface Props {
  id: string;
}
interface Address {
  customerId: string;
  addressName: string;
  shippingAddress: string;
  addressStatus: number;
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
export default function DialogAddAddress({ id }: Props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newAddress, setNewAddress] = useState<Address>({
    customerId: id,
    addressName: "",
    shippingAddress: "",
    addressStatus: 0,
  });
  const handleAddressName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewAddress({ ...newAddress, addressName: e.target.value });
  };
  const handleShippingAddress = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewAddress({ ...newAddress, shippingAddress: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(addressActions.AddItems(newAddress));
    setOpen(false);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // setProductObject(productReducer.products[0]);
  }, []);
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        + เพิ่มข้อมูลที่อยู่
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
            ข้อมูลที่อยู่
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form className={classes.root} noValidate autoComplete="off">
              <FormControl
                fullWidth
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  ชื่อที่อยู่
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={newAddress.addressName}
                  placeholder="รายละเอียดข้อมูลชื่อที่อยู่ เช่น บ้าน อพาร์ทเม้นท์"
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                  onChange={handleAddressName}
                  labelWidth={60}
                />
              </FormControl>
              <br />
              <br />

              <FormControl
                fullWidth
                variant="outlined"
              >

                <TextField  
                  multiline
                  rows={5}
                  rowsMax={5}
                  label="ที่อยู่การจัดส่ง"
                  placeholder="เพิ่มที่อยู่ของท่าน"
                  id="outlined-basic"
                  variant="outlined"
                  value={newAddress.shippingAddress}
                  onChange={handleShippingAddress}
                />
                <br />
              </FormControl>
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
