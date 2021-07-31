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
import { useDispatch, useSelector } from "react-redux";
import * as historyActions from "@/actions/history.action";
import dayjs from "dayjs";
import copy from "copy-to-clipboard";
import { checkPadding } from "@/utils/constans";

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
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
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
      padding: 5,
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
      padding: "3",
      backgroundColor: "#AD00FF",
      color: "#FFF",
      borderRadius: "10px",
      marginTop: "20px",
      margin: "10px",
    },
    textDetail: {
      fontSize: "12px",
    },
    textDetailHead: {
      fontSize: "12px",
      textAlign: "left",
    },
    textDetailTail: {
      fontSize: "12px",
      textAlign: "right",
    },
    statusText: {
      width: "100%",
      fontSize: "12px",
      marginTop: "40px",
      color: "red",
    },
    modalActionButton: {
      display: "flex",
      alignItems: "center",
    },
    buttonWrap: {
      width: "100%",
    },
    textDetailTailsum1: {
      fontSize: "12px",
      textAlign: "right",
      textDecorationLine: "underline",
      textDecorationStyle: "solid",
    },
    textDetailTailsum2: {
      fontSize: "12px",
      textAlign: "right",
      textDecorationLine: "underline",
      textDecorationStyle: "double",
    },
  })
);

const RecieveProduct = (props: any) => {
  const classes = useStyles();
  const [user, setUser] = useState({ id: props.id });
  const dispatch = useDispatch();
  const { histories } = useSelector(({ history }: any) => history);
  // const { user } = useSelector(({ authCustomer }: any) => authCustomer);
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
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const copyText = (sCode: string) => {
      copy(sCode, {
        debug: true,
        message: "คัดลอกหมายเลขเรียบร้อย",
      });
      alert("คัดลอกหมายเลขเรียบร้อย");
    };
    if (props.status == 3) {
      return <div></div>;
    } else {
      return (
        <div key={props.key}>
          <Card className={classes.addressCard} variant="outlined">
            <Grid container>
              <Grid item xs={3} className={classes.bankInfo}>
                <Typography variant="body2">
                  order no. {props.orderNo} <br /> วันที่: {props.date}
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.defaultGrid}>
                <p className={classes.statusText}>
                  {checkPadding(props.status)}
                </p>
              </Grid>

              <Grid item xs={3} className={classes.priceGrid}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className={classes.copyButton}
                  onClick={handleOpen}
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
                    <p className={classes.textDetailHead}>ชื่อสินค้า</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>จำนวน</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>ราคา</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetailTail}>ราคารวม</p>
                  </Grid>
                </Grid>
                {props.product.map((item) => {
                  return (
                    <Grid container item xs={12}>
                      <Grid item xs={3}>
                        <p className={classes.textDetailHead}>
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
                        <p className={classes.textDetailTail}>
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
                    <p className={classes.textDetailHead}>ราคารวม</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}></p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}></p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetailTailsum1}>{props.price}</p>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}>
                    <p className={classes.textDetailHead}>ชื่อส่วนลด</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>รายละเอียด</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}>จำนวน</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetailTail}>{props.discount}</p>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}>
                    <p className={classes.textDetailHead}>ราคาสุทธิ</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}></p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetail}></p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className={classes.textDetailTailsum2}>{props.price}</p>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container>
                <Grid className={classes.modalActionButton} item xs={12}>
                  <div className={classes.buttonWrap}>
                    <Button
                      className={classes.copyCheck}
                      onClick={() => handleClose()}
                    >
                      ปิด
                    </Button>
                    <Button
                      className={classes.copyCheck}
                      onClick={() => copyText(props.status)}
                    >
                      คัดลอกหมายเลขจัดส่ง
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Modal>
        </div>
      );
    }
  };

  return (
    <Grid container className={classes.paper}>
      <Grid item md={4} xs={8}>
        <Typography variant="h6" className={classes.title}>
          คำสั่งซื้อที่ชำระแล้ว
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {histories
          ? histories.map((item, index) => {
              let date = new Date(item.updatedAt);
              let transformDate = dayjs(date).format("DD/MM/YYYY");
              return (
                <ProductCard
                  orderNo={item._id}
                  date={transformDate}
                  quantity={item.products.length}
                  price={item.totalprice}
                  key={index}
                  product={item.products}
                  image={item.products[0].productId.images[0]}
                  sCode={item._id}
                  status={item.paidStatus}
                  discount={item.discount}
                />
              );
            })
          : ""}
      </Grid>
    </Grid>
  );
};
export default RecieveProduct;
