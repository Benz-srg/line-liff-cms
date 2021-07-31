import React, { useState, useEffect, FC } from "react";
import Grid from "@material-ui/core/Grid";
// import { GetServerSideProps } from "next";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";
import CheckIcon from "@material-ui/icons/Check";
import Divider from "@material-ui/core/Divider";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import * as historyActions from "@/actions/history.action";
import dayjs from "dayjs";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Swal from "sweetalert2";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperModal: {
      position: "absolute",
      minWidth: 300,
      maxWidth: 700,
      boxShadow: "rgba(99,99,99,0.2) 0px 2px 8px 0px",
      padding: "10px",
      backgroundColor: "#FFF",
      borderRadius: "10px",
      textAlign: "center",
    },
    paper: {
      textAlign: "center",
      padding: "0",
    },
    addressCard: {
      marginTop: "1em",
      backgroundColor: "#F1F0F0",
      padding: 5,
    },
    title: {
      textAlign: "left",
    },
    resend: {
      margin: theme.spacing(3, 0, 2),
      color: "#AD00FF",
      backgroundColor: "#FFF",
      border: "1px solid ",
      borderColor: "#AD00FF",
    },
    bankImg: {
      paddingTop: "6px",
      textAlign: "center",
    },
    bankInfo: {
      display: "flex",
      alignItems: "center",
      textAlign: "left",
      fontSize: "12px",
    },
    defaultSign: {
      backgroundColor: "#AD00FF",
      padding: "0 4px 0 4px",
      color: "#fff",
      textAlign: "center",
      fontSize: "12px",
    },
    defaultGrid: {
      display: "flex",
      alignItems: "center",
    },
    quantityGrid: {
      textAlign: "center",
      display: "flex",
      alignItems: "center",
    },
    priceGrid: {
      color: "red",
      display: "flex",
      alignItems: "center",
    },
    quantity: {
      textAlign: "center",
      width: "100%",
    },
    price: {
      textAlign: "center",
      width: "100%",
    },
    copyButton: {
      margin: "10px",
      borderRadius: "2em",
      color: "#AD00FF",
      backgroundColor: "#FFF",
      border: "1px solid ",
      borderColor: "#AD00FF",
      padding: "0",
      fontSize: "10px",
    },
    avtPosition: {
      margin: "auto",
      marginBottom: "20px",
    },
    copyCheck: {
      padding: 5,
      backgroundColor: "#AD00FF",
      color: "#FFF",
      borderRadius: "10px",
      marginTop: "20px",
      margin: 10,
    },
    textDetail: {
      fontSize: "12px",
    },
    addressText: {
      fontSize: "12px",
      fontAlign: "left",
    },
    orderStatusText: {
      width: "100%",
      textAlign: "center",
      marginTop: "40px",
      color: "red",
    },
  })
);

const cancelOrder = (props: any) => {
  console.log(props);
  const classes = useStyles();
  // const [id, setId] = useState("60dc8456b6acdf24d0a806d2");
  const { user } = useSelector(({ authCustomer }: any) => authCustomer);
  const dispatch = useDispatch();
  const { histories } = useSelector(({ history }: any) => history);

  const [modalStyles] = useState(getModalStyle);

  const feedWithId = async () => {
    await dispatch(historyActions.findHistoryWithCustomerId(user.id, 1));
    console.log(histories, "actions actions");
  };

  useEffect(() => {
    feedWithId();
  }, []);

  const ProductCard = (props: any) => {
    const [open, setOpen] = useState(false);
    const copyText = () => {
      handleOpen();
    };
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    if (props.orderStatus != 3) {
      return <div></div>;
    } else {
      return (
        <div key={props.key}>
          <Card className={classes.addressCard} variant="outlined">
            <Grid container>
              <Grid item xs={4} className={classes.bankInfo}>
                <Typography variant="body2">
                  Ref no. {props.orderId} <br /> วันที่: {props.date}
                </Typography>
              </Grid>
              <Grid item xs={5} className={classes.defaultGrid}>
                <p className={classes.orderStatusText}>ยกเลิก</p>
              </Grid>
              <Grid item xs={3} className={classes.priceGrid}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className={classes.copyButton}
                  onClick={() => copyText()}
                >
                  ดูรายละเอียด
                </Button>
              </Grid>
            </Grid>
          </Card>
          <Modal open={open} onClose={handleClose}>
            <div style={modalStyles} className={classes.paperModal}>
              <Avatar className={classes.avtPosition}>
                <CheckIcon />
              </Avatar>
              <Grid container>
                <Grid item xs={12}>
                  <h5>รายละเอียด</h5>
                  <p className={classes.textDetail}>
                    ORDER NO. {props.orderNo}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>ชื่อสินค้า</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>จำนวน</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>ราคา</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>ราคารวม</p>
                  </Grid>
                </Grid>
                {props.product.map((item) => {
                  return (
                    <Grid container item xs={12}>
                      <Grid item xs={3}>
                        <p className={classes.textDetail}>
                          {item.productId.title}
                        </p>
                      </Grid>
                      <Grid item xs={3}>
                        <p className={classes.textDetail}>{item.quantity}</p>
                      </Grid>
                      <Grid item xs={3}>
                        <p className={classes.textDetail}>{item.price}</p>
                      </Grid>
                      <Grid item xs={3}>
                        <p className={classes.textDetail}>
                          {item.quantity * item.price}
                        </p>
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>ราคารวม</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}></p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}></p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>{props.price}</p>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>ชื่อส่วนลด</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>รายละเอียด</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>จำนวน</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>มูลค่าส่วนลด</p>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>ราคาสุทธิ</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}></p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}></p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>{props.price}</p>
                  </Grid>
                </Grid>
              </Grid>

              <Button
                className={classes.copyCheck}
                onClick={() => handleClose()}
              >
                ปิด
              </Button>
            </div>
          </Modal>
        </div>
      );
    }
  };

  return (
    <Grid container className={classes.paper}>
      <Grid item md={4} xs={6}>
        <Typography variant="h6" className={classes.title}>
          คำสั่งซื้อที่ยกเลิก
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {histories.map((item, index) => {
          let date = new Date(item.updatedAt);
          let transformDate = dayjs(date).format("DD/MM/YYYY");
          return (
            <ProductCard
              orderNo={index + 1}
              date={transformDate}
              quantity={item.products.length}
              price={item.totalprice}
              key={index}
              product={item.products}
              image={item.products[0].productId.images[0]}
              customerId={item.customerId}
              shippingAddress={item.shippingAddress}
              orderId={item._id}
              orderStatus={item.orderStatus}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default cancelOrder;
