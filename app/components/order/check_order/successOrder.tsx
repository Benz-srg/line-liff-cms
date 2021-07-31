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
import * as orderActions from "@/actions/order.action";
import dayjs from "dayjs";

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
      width: 300,
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
      padding: "0",
      backgroundColor: "#AD00FF",
      color: "#FFF",
      borderRadius: "10px",
      marginTop: "20px",
    },
    textDetail: {
      fontSize: "12px",
    },
  })
);

const successOrder = (props: any) => {
  console.log(props);
  const classes = useStyles();
  const [id, setId] = useState("60dc8456b6acdf24d0a806d2");
  const dispatch = useDispatch();
  const { orders } = useSelector(({ orders }: any) => orders);

  const [modalStyles] = useState(getModalStyle);

  const feedWithId = async () => {
    await dispatch(orderActions.getAllOrder(id));
    console.log(orders, "actions actions");
  };

  useEffect(() => {
    feedWithId();
  }, []);

  const ProductCard = (props: any) => {
    const [open, setOpen] = useState(false);
    const imageURL: string = `http://192.168.1.2:9000/uploads/${props.image}`;
    const copyText = (sCode: string) => {
      console.log(sCode);
      // navigator.clipboard.writeText(sCode);
      handleOpen();
    };
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <div key={props.key}>
        <Card className={classes.addressCard} variant="outlined">
          <Grid container>
            <Grid item xs={2} className={classes.bankImg}>
              <img src={imageURL} alt="product" width="100" height="100" />
            </Grid>
            <Grid item xs={3} className={classes.bankInfo}>
              <Typography variant="body2">
                order no.: {props.orderNo} <br /> วันที่: {props.date}
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.defaultGrid}>
              {props.category}
            </Grid>
            <Grid item xs={2} className={classes.quantityGrid}>
              <p className={classes.quantity}>{props.quantity}</p>
            </Grid>
            <Grid item xs={3} className={classes.priceGrid}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={classes.copyButton}
                onClick={() => copyText(props.shippingCode)}
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
                <p className={classes.textDetail}>ORDER NO. {props.orderNo}</p>
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

            <Button className={classes.copyCheck} onClick={() => handleClose()}>
              ปิด
            </Button>
          </div>
        </Modal>
      </div>
    );
  };

  return (
    <Grid container className={classes.paper}>
      <Grid item md={4} xs={6}>
        <Typography variant="h6" className={classes.title}>
          จัดส่งสำเร็จ
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {orders.map((item, index) => {
          let date = new Date(item.updatedAt);
          let transformDate = dayjs(date).format("DD/MM/YYYY");
          let orderNo = index + 1;
          return (
            <ProductCard
              orderNo={orderNo}
              date={transformDate}
              quantity={item.products.length}
              price={item.totalprice}
              key={index}
              product={item.products}
              image={item.products[0].productId.images[0]}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default successOrder;
