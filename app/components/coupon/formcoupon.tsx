import React, { Dispatch, SetStateAction, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { green } from "@material-ui/core/colors";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

/*  */
import { useDispatch, useSelector } from "react-redux";
import * as productAction from "@/actions/product.action";
import * as couponActions from "@/actions/coupon.action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      marginTop: theme.spacing(1),
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
      background: "#808080",
      color: "#fff",
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

const ButtonSubmit = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface couponState {
  _id: string; //objectId
  code: string; //code coupon
  percentSale: number; //discount percent
  priceSale: number; //discount price
  couponLimit: number; //limit of coupon
  productAvaliable: string[]; //tag product use coupon
  action: number; //action is mean status open or close use coupon
}

interface data {
  title: string;
  openform: boolean;
  couponObject: couponState;
  handleForm: Dispatch<SetStateAction<boolean>>;
  handleSetobjectId: Dispatch<SetStateAction<object>>;
  isUploading: boolean;
}

export default function FormCoupon({
  title,
  openform,
  handleForm,
  couponObject,
  handleSetobjectId,
  isUploading,
}: data) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  /* get Reducer */
  const productReducer = useSelector(({ product }: any) => product);
  const productLoading: boolean = productReducer.isLoading;
  const { isMessage, isStatus, products } = productReducer;

  const handleClose = () => {
    handleSetobjectId({
      _id: "",
      code: "",
      percentSale: 0,
      priceSale: 0,
      couponLimit: 0,
      productAvaliable: [],
      action: 0,
    });
    handleForm(false);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    handleSetobjectId({
      ...couponObject,
      action: event.target.value,
    });
  };

  const handleChangeMultiple = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    handleSetobjectId({
      ...couponObject,
      productAvaliable: event.target.value as string[],
    });
  };

  const handleSubmit = () => {
    if (title !== "แก้ไขคูปอง") {
      /* _id: "",
      code: "",
      percentSale: 0,
      priceSale: 0,
      couponLimit: 0,
      productAvaliable: [],
      action: 0, */
      if (couponObject.code == "") {
        return alert("กรุณากรอกรหัสคูปอง");
      } else if (couponObject.percentSale < 0) {
        return alert("กรุณากรอกส่วนลดคูปอง");
      } else if (couponObject.priceSale < 0) {
        return alert("กรุณากรอกราคาส่วนลด");
      } else if (couponObject.couponLimit <= 0) {
        return alert("กรุณากรอกจำนวนคูปองที่สามารถใช้ได้");
      } else if (couponObject.productAvaliable.length <= 0) {
        return alert("กรุณาเลือกรายการสินค้าที่สามารถใช้คูปองได้");
      }
      dispatch(couponActions.createCoupon(couponObject));
    } else {
      dispatch(couponActions.updateCoupon(couponObject));
    }
  };

  const handleRandomCode = () => {
    const newRandom = Math.random().toString(36).substring(7);
    handleSetobjectId({ ...couponObject, code: newRandom.toUpperCase() });
  };

  React.useEffect(() => {
    dispatch(productAction.feedProduct());
  }, []);

  return (
    <React.Fragment>
      <Dialog
        open={openform}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        fullWidth={true}
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <TextField
              required={true}
              autoFocus
              margin="dense"
              id="code"
              label="รหัสคูปอง"
              type="email"
              fullWidth
              autoComplete="off"
              variant="outlined"
              value={couponObject.code}
              onChange={(e) =>
                handleSetobjectId({
                  ...couponObject,
                  code: e.target.value.toUpperCase() as string,
                })
              }
              inputProps={{
                maxLength: 8,
              }}
              style={{ width: "90%" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRandomCode}
              style={{ height: 36 }}
            >
              สร้างคูปอง
            </Button>
          </Grid>
          {/*  */}
          <FormControl variant="filled" fullWidth>
            <InputLabel shrink htmlFor="age-native-label-placeholder">
              สถานะคูปอง
            </InputLabel>
            <Select value={couponObject.action} onChange={handleChange}>
              <option value={0}>ปิด</option>
              <option value={1}>เปิด</option>
            </Select>
          </FormControl>
          {/* <TextField
            required={true}
            autoFocus
            margin="dense"
            id="percentSale"
            label="ส่วนลดเปอเซ็นต์"
            type="number"
            fullWidth
            autoComplete="off"
            variant="outlined"
            value={couponObject.percentSale}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
              handleSetobjectId({
                ...couponObject,
                percentSale: e.target.value,
              })
            }
          /> */}
          <TextField
            required={true}
            autoFocus
            margin="dense"
            id="priceSale"
            label="ส่วนลดราคา"
            type="number"
            fullWidth
            autoComplete="off"
            variant="outlined"
            value={couponObject.priceSale}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
              handleSetobjectId({
                ...couponObject,
                priceSale: e.target.value,
              })
            }
          />
          {/* select id use coupon */}
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-mutiple-chip-label">
              สินค้าที่สามารถใช้คูปอง
            </InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={couponObject.productAvaliable}
              onChange={handleChangeMultiple}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {products
                ? products.map((product) => (
                    <MenuItem
                      key={product._id}
                      value={product._id}
                      style={getStyles(
                        product.title,
                        couponObject.productAvaliable,
                        theme
                      )}
                    >
                      {product.title}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          {/*  */}
          <TextField
            required={true}
            autoFocus
            margin="dense"
            id="couponLimit"
            label="จำนวนคูปอง"
            type="number"
            fullWidth
            autoComplete="off"
            variant="outlined"
            value={couponObject.couponLimit}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
              handleSetobjectId({
                ...couponObject,
                couponLimit: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={isUploading}>
            ยกเลิก
          </Button>
          <ButtonSubmit
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
            disabled={isUploading}
          >
            บันทึก
            {isUploading ? (
              <CircularProgress
                color="primary"
                size={18}
                style={{ marginLeft: 5 }}
              />
            ) : null}
          </ButtonSubmit>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
