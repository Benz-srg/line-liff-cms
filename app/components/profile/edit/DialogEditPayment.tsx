import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonSubmit from "@/components/ButtonSubmit";
//call redux
import { useSelector, useDispatch } from "react-redux";
import * as allbankActions from "@/actions/allbank.action";
import * as paymentActions from "@/actions/payment.action";

interface Props {
  _id: string;
  bankAccName: string;
  bankAccNo: string;
  bankId: any;
}
interface Payment {
  _id: string;
  bankName: string;
  bankId: string;
  customerId:string;
  bankAccName: string;
  bankAccNo: string;
  paymentStatus: Number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    paper: {
      marginTop: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: theme.spacing(50),
    },
  })
);

export default function DialogEditPayment({
  _id,
  bankAccName,
  bankAccNo,
  bankId,
}: Props) {
  //useState
  const { isUploading, allbanks } = useSelector(({ allbank }: any) => allbank);
  const dispatch = useDispatch(); 
  const feedWithId = () => {
    dispatch(allbankActions.getAllbanks());
  };
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [newPayment, setNewPayment] = useState<Payment>({
    _id: _id,
    bankId: bankId._id,
    bankName: bankId.bankName,
    bankAccName: bankAccName,
    bankAccNo: bankAccNo,
    customerId: "60dc8456b6acdf24d0a806d2",
    paymentStatus: bankId.paymentStatus
  });
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
  const handleChangeBankId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target)
    setNewPayment({ ...newPayment, bankId: e.target.id });
    setNewPayment({ ...newPayment, bankName: e.target.value });
  };
  const handleChangeBankAccName = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewPayment({ ...newPayment, bankAccName: e.target.value });
  };
  const handleSubmit = () => {
    // console.log(newPayment);
    dispatch(paymentActions.updatePayment(newPayment));
    setOpen(false);
  };

  useEffect(() => {
    // setProductObject(productReducer.products[0]);
    feedWithId();
  }, []);

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
        <DialogTitle id="responsive-dialog-title">{"ข้อมูลบัญชี"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="bankAccName"
                      name="bankAccName"
                      variant="outlined"
                      required
                      fullWidth
                      value={newPayment.bankAccName}
                      id="bankAccName"
                      label="ชื่อบัญชี"
                      onChange={handleChangeBankAccName}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="bankAccNo"
                      name="bankAccNo"
                      variant="outlined"
                      required
                      fullWidth
                      value={newPayment.bankAccNo}
                      id="bankAccNo"
                      label="เลขที่บัญชี"
                      onChange={handleChangeBankAccNo}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        เลขที่บัญชี {newPayment.bankName}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={newPayment.bankName}
                        onChange={handleChangeBankId}
                      >
                        <MenuItem value={newPayment.bankName} id={newPayment.bankId}>{newPayment.bankName}</MenuItem>
                        {allbanks.map((allbank) => {
                          if (allbank.bankName != bankId.bankName) {
                            return (
                              <MenuItem value={allbank.bankName} id={allbank._id}>{allbank.bankName}</MenuItem>
                            );
                          }
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </div>
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
