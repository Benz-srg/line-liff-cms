import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Formcode from "./Formcode";
import { numberWithCommas } from "@/utils/service";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      border: "2px solid #AD00FF",
    },
    titleHeader: {
      display: "flex",
      color: "#AD00FF",
      "& p": {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: 500,
      },
    },
    subTotal: {
      display: "flex",
      color: "#878787",
      justifyContent: "space-between",
      "& p": {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: 500,
      },
      "& span": {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: 500,
        color: "red",
      },
    },
  })
);

interface subTotal {
  total: number;
  discount: number;
  totalprice: number;
  selected: string[];
  usecode: any;
}
const Checkout = ({
  total,
  discount,
  totalprice,
  selected,
  usecode,
}: subTotal) => {
  const classes = useStyles();
  const router = useRouter();
  const [openFormCode, setOpenFormCode] = useState(false);
  const couponReducer = useSelector((state: any) => state.coupon);
  const handleOpenCode = () => {
    if (selected.length <= 0) {
      Swal.fire({
        icon: "error",
        text: "กรุณาเลือกรายการที่ต้องการใช้โค้ดส่วนลด!",
        confirmButtonText:'ตกลง'
      });
      return;
    }
    setOpenFormCode(!openFormCode);
  };
  setOpenFormCode;

  const handleCheckoutProcress = () => {
    if (selected.length <= 0) {
      Swal.fire({
        icon: "error",
        text: "กรุณาเลือกสินค้าที่ต้องการสั่งซื้อ!",
        confirmButtonText:'ตกลง'
      });
      return;
    }
    let newCode = "";
    const objectIds = JSON.stringify(selected);
    if (usecode != null) {
      newCode = usecode.code;
    }
    router.push({
      pathname: "/checkout",
      query: { state: objectIds, code: newCode },
    });
  };

  React.useEffect(() => {}, [usecode]);

  return (
    <Paper className={classes.root} elevation={1}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          {selected.length > 0 ? (
            <Formcode
              open={openFormCode}
              setOpen={setOpenFormCode}
              selected={selected}
            />
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12}>
          <div className={classes.titleHeader}>
            <CardGiftcardIcon />
            <Typography variant="body1" gutterBottom>
              คูปองส่วนลด
            </Typography>
          </div>
          <div>
            <Button
              variant="outlined"
              fullWidth
              style={{
                justifyContent: "space-between",
                background: "#F1F0F0",
                color: "#AD00FF",
                marginBottom: 10,
              }}
              onClick={() => handleOpenCode()}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <AddIcon /> เพิ่มโค้ดส่วนลด
              </span>
              {couponReducer.usecode ? couponReducer.usecode.code : ""}
            </Button>
          </div>
          <div className={classes.subTotal}>
            <Typography variant="body1" gutterBottom>
              ราคารวม :
            </Typography>
            <span>{numberWithCommas(total)}฿</span>
          </div>
          <div className={classes.subTotal}>
            <Typography variant="body1" gutterBottom>
              ส่วนลด :
            </Typography>
            <span>{numberWithCommas(discount)}฿</span>
          </div>
          <div className={classes.subTotal}>
            <Typography variant="body1" gutterBottom>
              ราคาสุทธิ :
            </Typography>
            <span>{numberWithCommas(totalprice)}฿</span>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="row"
        justify="flex-end"
        alignItems="flex-end"
      >
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            style={{
              color: "#3f51b5",
              borderColor: "#3f51b5",
            }}
            onClick={handleCheckoutProcress}
          >
            สั่งซื้อสินค้า
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Checkout;
