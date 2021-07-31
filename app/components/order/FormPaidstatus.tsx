import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import ButtonSubmitComponent from "../ButtonSubmit";
import { useSelector, useDispatch } from "react-redux";
import * as orderActions from "@/actions/order.action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  paidStatus: number;
  objectId: string;
}

export default function FormPaidstatus({
  open,
  setOpen,
  paidStatus,
  objectId,
}: Props) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState<number>(paidStatus ? paidStatus : 0);
  const [visibleText, setVisibleText] = React.useState<boolean>(false);
  const [trackingNumber, setTrackingNumber] = React.useState<string | number>(
    ""
  );
  const [shippingName, setShippingName] = React.useState<string>("");

  const { orders } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const statusPaids = [
    { status: 0, title: "ผู้ส่งกำลังเตรียมพัสดุ" },
    { status: 1, title: "ผู้กำลังจัดส่งพัสดุ" },
    { status: 2, title: "ยกเลิกการจัดส่ง" },
  ];

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState(event.target.value as number);
  };

  const handleSubmit = () => {
    if (state == 0) return alert("กรุณาเปลี่ยนสถานะการจัดส่ง");
    if (state == 1 && shippingName == "" && trackingNumber == "")
      return alert("กรุณากรอกชื่อขนส่งและ เลขติดตามสินค้า");
    dispatch(
      orderActions.updatePaidStatusOrder(
        state,
        trackingNumber,
        objectId,
        shippingName
      )
    );
  };

  React.useEffect(() => {
    if (state == 1) {
      setVisibleText(!visibleText);
    } else {
      setVisibleText(false);
    }
    return () => {
      //cleanup
    };
  }, [state]);

  React.useEffect(() => {
    if (orders.isStatus == 200 || orders.isStatus == 201) {
      handleClose();
    }
  }, [orders.isStatus]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">เปลี่ยนสถานะการจัดส่ง</DialogTitle>
        <DialogContent>
          <div>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                สถานะจัดส่ง
              </InputLabel>
              <Select
                native
                value={state}
                onChange={handleChange}
                label="สถานะจัดส่ง"
                inputProps={{
                  name: "age",
                  id: "outlined-age-native-simple",
                }}
              >
                {statusPaids.map((status) => (
                  <option key={status.status} value={status.status}>
                    {status.title}
                  </option>
                ))}
              </Select>
            </FormControl>
            {visibleText ? (
              <React.Fragment>
                <TextField
                  style={{ marginLeft: 8, marginBottom: 5 }}
                  fullWidth
                  id="outlined-basic"
                  label="ชื่อขนส่งสินค้า"
                  variant="outlined"
                  value={shippingName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShippingName(e.target.value)
                  }
                />
                <TextField
                  style={{ marginLeft: 8 }}
                  fullWidth
                  id="outlined-basic"
                  label="หมายเลขจัดส่งสินค้า"
                  variant="outlined"
                  value={trackingNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTrackingNumber(e.target.value)
                  }
                />
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
          <ButtonSubmitComponent
            handleSubmit={handleSubmit}
            isUploading={orders.isUploading}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
