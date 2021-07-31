import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import * as shippingActions from "@/actions/shipping.action";
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
//call redux
import { useDispatch } from "react-redux";
import Switch from '@material-ui/core/Switch';

interface Shipping {
  status: number,
  fixedCost: number,
  anyCost: number,
  firstCost: number,
}
interface Prop {
  status: number,
  fixedCost: number,
  anyCost: number,
  firstCost: number,
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: '25ch',
    },
    margin: {
      margin: theme.spacing(1),
    },
    table: {
      minWidth: 650,
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
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  })
);

export default function ManageShippingCost(shippingcost: Prop) {
  //useState
  const dispatch = useDispatch();
  const [checkedB, setcheckedB] = React.useState(true);
  const [checkedA, setcheckedA] = React.useState(false);
  const [shippingprice, setShipping] = React.useState<Shipping>({
    anyCost: 0,
    status: 0,
    fixedCost: 0,
    firstCost: 0,
  });
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleChangeSelectA = async () => {
    setcheckedA(true);
    setcheckedB(false);
    setShipping({
      ...shippingprice,
      status: 0
    });
  };
  const handleChangeSelectB = () => {
    setcheckedA(false);
    setcheckedB(true);
    setShipping({
      ...shippingprice,
      status: 1
    });

  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    // return console.log(about);
    // alert(shippingprice.status)
    dispatch(shippingActions.AddShippingCost(shippingprice));
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setShipping({
      ...shippingprice,
      anyCost: shippingcost.anyCost,
      status: shippingcost.status,
      fixedCost: shippingcost.fixedCost,
      firstCost: shippingcost.firstCost,
    })
    if (shippingcost.status == 0) {
      setcheckedA(true);
      setcheckedB(false);
    } else {
      setcheckedA(false);
      setcheckedB(true);
    }
  }, [shippingcost]);
  return (
    <div>
      <Button color="primary"
        variant="contained" onClick={handleClickOpen}>
        เพิ่มบทความ
      </Button>

      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            จัดค่าส่งสินค้า
          </Typography>
          <br />
          <Typography variant="h6" component="h2">
            ค่าส่งเท่ากัน
            <Switch
              checked={checkedA}
              onChange={handleChangeSelectA}
              color="primary"
              name="checkedA"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Typography>
          <TextField
            label="ค่าส่งเท่ากัน"
            id="standard-start-adornment"
            variant="outlined"
            value={shippingprice.fixedCost}
            type="number"
            onChange={(e) =>
              setShipping({ ...shippingprice, fixedCost: Number(e.target.value) })
            }
            InputProps={{
              endAdornment: <InputAdornment position="start">฿</InputAdornment>,
            }}
          />
          <Typography variant="h6" component="h2">
            ค่าส่งแบบแตกต่าง
            <Switch
              checked={checkedB}
              onChange={handleChangeSelectB}
              color="primary"

              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Typography>
          <TextField
            label="ค่าส่งชิ้นแรก"
            id="standard-start-adornment"
            variant="outlined"
            value={shippingprice.firstCost}
            helperText="กำหนดค่าส่งชิ้นแรก"
            onChange={(e) =>
              setShipping({ ...shippingprice, firstCost: Number(e.target.value) })
            }
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="start">฿</InputAdornment>,
            }}
          />
          <TextField
            label="ค่าส่งชิ้นต่อไป"
            id="standard-start-adornment"
            variant="outlined"
            helperText="กำหนดค่าส่งชิ้นต่อไป"
            type="number"
            value={shippingprice.anyCost}
            onChange={(e) =>
              setShipping({ ...shippingprice, anyCost: Number(e.target.value) })
            }
            style={{ marginLeft: '0.8rem' }}
            InputProps={{
              endAdornment: <InputAdornment position="start">฿</InputAdornment>,
            }}
          />

        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
          >
            ยืนยันการแก้ไข
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
        </CardActions>
      </Card>


    </div>
  );
}
