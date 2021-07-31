import React, { Dispatch, SetStateAction } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import * as couponActions from "@/actions/coupon.action";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxAcctionCode: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selected: string[];
}

export default function Formcode({ open, setOpen, selected }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const couponRedcuer = useSelector((state: any) => state.coupon);
  const [code, setCode] = React.useState<string>("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (code === "") {
      return alert("กรุณากรอกโค้ดคูปอง");
    }
    return dispatch(couponActions.getCouponWithInputCode(code));
  };

  const handleUseCode = (code: any) => {
    dispatch(couponActions.couponUseCode(code));
    handleClose();
  };

  React.useEffect(() => {
    return () => {
      dispatch(couponActions.destroyCoupon());
    };
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">เลือกโค้ดส่วนลด</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={8} sm={8} md={8}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="เพิ่มโค้ด"
                type="text"
                variant="outlined"
                fullWidth
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCode(e.target.value)
                }
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Button
                variant="outlined"
                fullWidth
                style={{ height: 40, marginTop: 8 }}
                onClick={(e) => handleSearch(e)}
              >
                ค้นหา
              </Button>
            </Grid>
            <Grid item xs={12}>
              {couponRedcuer.coupons ? (
                couponRedcuer.coupons.map((row) => (
                  <div className={classes.boxAcctionCode} key={row._id}>
                    {" "}
                    <Typography variant="body1" gutterBottom>
                      {row.code}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      ส่วนลด {row.priceSale}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleUseCode(row)}
                    >
                      ใช้โค้ด
                    </Button>
                  </div>
                ))
              ) : (
                <Typography variant="h5" gutterBottom>
                  ไม่พบคูปอง
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: "8px 24px" }}>
          <Button onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
          <Button variant="contained" onClick={handleClose} color="primary">
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
