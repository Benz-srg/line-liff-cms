import React, { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
//icon from @material-ui/icons
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Swal from "sweetalert2";

import * as slipAction from "@/context/actions/slip.action";

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
      textAlign: "center",
      alignItems: "center",
      display: "flex",
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
    changeAddress: {
      textAlign: "right",
    },
    cancelButton: {
      padding: 5,
      backgroundColor: "#FF1111",
      color: "#FFF",
      borderRadius: "10px",
      marginTop: "20px",
      margin: 10,
    },
    uploadButtonAlign: {
      marginTop: 10,
      textAlign: "right",
    },
    input: {
      display: "none",
    },
    previewIMG: {
      background: "50% 50% no-repeat",
      maxWidth: "100%",
      height: "auto",
      paddingRight: "6px",
      margin: "auto",
    },
  })
);

const deliveryProduct = (props: any) => {
  const router = useRouter();
  const classes = useStyles();
  const [user, setUser] = useState({ id: props.id });
  const dispatch = useDispatch();
  const { orders, orderAddress } = useSelector(({ orders }: any) => orders);
  const [modalStyles] = useState(getModalStyle);

  const feedWithId = async () => {
    dispatch(orderActions.getAllShippingAddressWithId(user.id));
    await dispatch(orderActions.getAllOrder(user.id));
    console.log(orders, "actions actions");
  };

  useEffect(() => {
    feedWithId();
  }, []);

  const ProductCard = (props: any) => {
    const [open, setOpen] = useState(false);
    const [selectedShipping, setSelectedShipping] = useState(
      props.shippingAddress
    );
    const [openSwitch, setOpenSwitch] = useState(false);
    const [file, setFile] = useState(null);
    const slipURL: string = `http://localhost:9000/uploads/${props.image}`;
    const copyText = () => {
      handleOpen();
    };
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleSwitchOpen = () => {
      setOpenSwitch(true);
    };
    const handleSwitchClose = () => {
      setOpenSwitch(false);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedShipping((event.target as HTMLInputElement).value);
      console.log(selectedShipping);
    };
    const handleCancelUpdate = (orderid: string) => {
      handleClose();
      Swal.fire({
        title: "Are you sure?",
        text: "ต้องการยกเลิกคำสั่งซื้อหรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(orderActions.updateCancelOrder(orderid));
          Swal.fire("ยกเลิกคำสั่งซื้อสำเร็จ", "success");
        }
      });
    };

    //upload new photo banner
    const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
      const filesImage = event.currentTarget.files[0];
      if (filesImage) {
        setFile(filesImage);
      }
    };
    const submitSlip = async () => {
      const formData = new FormData();
      formData.append("photo", file);
      console.log(file, formData);
      if (file) {
        await dispatch(slipAction.uploadImage(formData, props.orderId));
      }
      router.reload();
    };

    const handleAddressSubmit = async () => {
      console.log(user.id, selectedShipping, "184 send sub mit");
      await dispatch(
        orderActions.updateShippingAddress(props.orderId, selectedShipping)
      );
      await dispatch(orderActions.getAllOrder(user.id));
      router.reload();
    };
    if (props.orderStatus == 3) {
      return <div></div>;
    } else {
      return (
        <div key={props.key}>
          <Card className={classes.addressCard} variant="outlined">
            <Grid container>
              <Grid item xs={2} className={classes.bankImg}>
                <img
                  className={classes.previewIMG}
                  src={slipURL}
                  alt="product"
                  width="100"
                  height="100"
                />
              </Grid>
              <Grid item xs={5} md={3} className={classes.bankInfo}>
                <Typography variant="body2">
                  order no. {props.orderNo}
                  <br /> วันที่: {props.date}
                </Typography>
              </Grid>
              <Grid item xs={2} md={5} className={classes.defaultGrid}>
                {props.category}
              </Grid>
              <Grid item xs={3} md={2} className={classes.priceGrid}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className={classes.copyButton}
                  onClick={() => copyText()}
                >
                  ออเดอร์
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
                <Grid xs={6}>
                  <p>สถานะการชำระ</p>
                  <p>รอการชำระ</p>
                </Grid>
                <Grid xs={6} className={classes.changeAddress}>
                  <Button
                    className={classes.copyCheck}
                    onClick={() => handleSwitchOpen()}
                  >
                    เปลี่ยนที่อยู่จัดส่ง
                  </Button>
                </Grid>
              </Grid>
              <Button
                className={classes.copyCheck}
                onClick={() => handleSwitchOpen()}
              >
                เปลี่ยนที่อยู่จัดส่ง
              </Button>
              <Grid container>
                <Grid item xs={12}>
                  <h5>รายละเอียด</h5>
                  <p className={classes.textDetail}>
                    ORDER NO.
                    {props.orderNo}
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
                <Grid item xs={12} className={classes.uploadButtonAlign}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={handleChangePhoto}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      <CameraAltIcon />
                      &ensp; อัพโหลดสลิป
                    </Button>
                  </label>
                  {file ? <Button onClick={submitSlip}>บันทึกสลิป</Button> : ""}
                </Grid>
              </Grid>

              <Button
                className={classes.copyCheck}
                onClick={() => handleClose()}
              >
                ปิด
              </Button>
              <Button
                className={classes.cancelButton}
                onClick={() => handleCancelUpdate(props.orderId)}
              >
                ยกเลิกรายการ
              </Button>
            </div>
          </Modal>
          <Modal open={openSwitch} onClose={handleSwitchClose}>
            <div style={modalStyles} className={classes.paperModal}>
              <FormControl className={classes.addressText} component="fieldset">
                <FormLabel component="legend">
                  เลือกที่อยู่สำหรับจัดส่ง
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={selectedShipping}
                  onChange={handleChange}
                >
                  {orderAddress.map((item, index) => {
                    return (
                      <>
                        <FormControlLabel
                          value={item._id}
                          control={<Radio />}
                          label={index + 1 + ". " + item.shippingAddress}
                        />
                        <Divider />
                      </>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <Button
                className={classes.copyCheck}
                onClick={() => handleAddressSubmit()}
              >
                ยืนยัน
              </Button>
              <Button
                className={classes.copyCheck}
                onClick={() => handleSwitchClose()}
              >
                ยกเลิก
              </Button>
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
          คำสั่งซื้อที่รอการชำระ
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {orders.map((item, index) => {
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

export default deliveryProduct;
