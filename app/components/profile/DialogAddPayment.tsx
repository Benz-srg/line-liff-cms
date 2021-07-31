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
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import * as allbankActions from "@/actions/allbank.action";
import * as paymentActions from "@/actions/payment.action";
import ButtonSubmit from "@/components/ButtonSubmit";
import { useSelector, useDispatch } from "react-redux";

import { green, pink, purple } from "@material-ui/core/colors";

interface Props {
  id: string;
}
interface Payment {
  bankId: string;
  customerId: string;
  bankAccName: string;
  bankAccNo: string;
  paymentStatus: Number;
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: theme.spacing(50),
    },
  })
);

export default function DialogAddPayment({ id }: Props) {
  const [open, setOpen] = useState(false);
  const [bankName, setBankName] = useState("");
  const dispatch = useDispatch();
  const { isUploading, allbanks } = useSelector(({ allbank }: any) => allbank);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const authCustomer = useSelector((state: any) => state.authCustomer);
  const [newPayment, setNewPayment] = useState<Payment>({
    bankId: "",
    bankAccName: "",
    bankAccNo: "",
    customerId: id,
    paymentStatus: 0,
  });
  

  const feedWithId = () => {
    dispatch(allbankActions.getAllbanks());
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeBankAccNo = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewPayment({ ...newPayment, bankAccNo: e.target.value });
  };
  const handleChangeBankId = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBankName(event.target.value as string);
    setNewPayment({ ...newPayment, bankId: event.target.value as string });
  };
  const handleChangeBankAccName = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewPayment({ ...newPayment, bankAccName: e.target.value });
  };
  const handleSubmit = () => {
    console.log(newPayment);
    dispatch(paymentActions.AddItems(newPayment));
    setOpen(false);
  };

  useEffect(() => {
    // setProductObject(productReducer.products[0]);
    feedWithId();
  }, []);
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        + เพิ่มบัญชี
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
              <AccountBalanceWalletIcon />
            </Avatar>
            บัญชีชำระเงิน
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
                  ชื่อ-นามสกุล บัญชี
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={newPayment.bankAccName}
                  placeholder="ข้อมูลบัญชี"
                  onChange={handleChangeBankAccName}
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                  labelWidth={130}
                />
              </FormControl>
              <FormControl
              
                fullWidth
               >

                <TextField
                  id="outlined-select-currency-native"
                  select
                  value={bankName}
                  onChange={handleChangeBankId}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="โปรดเลือกธนาคารของท่าน"
                  variant="outlined"
                >
                  {allbanks.map((allbank) => (
                    <option value={allbank._id}>{allbank.bankName}</option>
                  ))}
                </TextField>
              </FormControl>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  หมายเลขบัญชี
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={newPayment.bankAccNo}
                  placeholder="ข้อมูลหมายเลขบัญชี"
                  onChange={handleChangeBankAccNo}
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                  labelWidth={100}
                />
              </FormControl>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
          <ButtonSubmit handleSubmit={handleSubmit} isUploading={isUploading} />
        </DialogActions>
      </Dialog>
    </div>
  );
}
