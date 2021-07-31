import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Appbar from "app/layouts/Appbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { numberWithCommas, totalPrice, totalDiscount } from "@/utils/service";
import * as basketActions from "@/actions/basket.action";
import Checkout from "@/components/checkout/Checkout";
import { parseCookiesCustomer } from "@/utils/token";
import { wrapper } from "@/wapper/store";
import { urlApi } from "@/context/urlapi";
import Swal from "sweetalert2";

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req }) => {
    let user = await parseCookiesCustomer(req);
    /* if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    } */
    return {
      props: { user, data: { props: { user } } },
    };
  }
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: theme.spacing(1, 0),
      padding: theme.spacing(2, 4),
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    boxHeader: {
      padding: theme.spacing(1),
      display: "flex",
      flexGrow: 1,
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    boxItems: {
      padding: theme.spacing(1),
      display: "flex",
      flexGrow: 1,
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "left",
      borderBottom: "1px solid #000",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    boxProduct: {
      display: "flex",
      alignItems: "center",
      "& img": {
        width: 80,
        height: 80,
      },
      "& div": {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        "& p": {
          padding: theme.spacing(0, 2),
          width: "50%",
        },
      },
    },
    boxQuantity: {
      display: "flex",
      alignItem: "center",
      justifyContent: "center",
      border: "1px solid #dfdfdf",
      borderRadius: 3,
      "& input": {
        textAlign: "center",
        maxWidth: 30,
        height: 5,
        borderRadius: 0,
        borderColor: "#dfdfdf",
      },
      "& button": {
        width: 60,
        borderRadius: 0,
        background: "#fff",
        border: 0,
        color: "#000",
        margin: 0,
      },
      [theme.breakpoints.down("sm")]: {
        height: 32,
        marginBottom: 5,
        "& input": {
          textAlign: "center",
          maxWidth: 30,
          borderRadius: 0,
          borderColor: "#dfdfdf",
          padding: theme.spacing(1.5, 2),
        },
        "& button": {
          width: 32,
          height: 32,
          borderRadius: 0,
          background: "#fff",
          color: "#000",
          margin: 0,
        },
      },
    },
    notItems: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
      flexDirection: "column",
    },
    mobileBoxItems: {
      display: "flex",
      alignItems: "center",
      height: 130,
      borderBottom: "1px solid #dfdfdf",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    boxDescriptionMobile: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      textAlign: "left",
      marginLeft: 10,
    },
    boxpriceMobile: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    },
  })
);

interface objectBasket {
  _id: string;
  customerId: string;
  productId: any;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

const Basket = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { baskets } = useSelector(({ basket }: any) => basket);
  const couponReducer = useSelector((state: any) => state.coupon);
  const authCustomer = useSelector((state: any) => state.authCustomer);
  const [selected, setSelected] = useState<string[]>([]);
  const [subTotal, setSubTotal] = useState({
    total: 0,
    discount: 0,
    totalprice: 0,
  });

  const handleChangeItems = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangeItemsAllClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const newSelecteds = baskets.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleDelete = (objectId: string, customerId: string) => {
    const basketObject = { id: objectId, customerId: customerId };
    dispatch(basketActions.deleteBaskets(basketObject));
  };

  const handleIncrease = (objectId: objectBasket) => {
    dispatch(basketActions.updateIncrease(objectId));
  };

  const handleDecrease = (objectId: objectBasket) => {
    if (objectId.quantity <= 1) {
      Swal.fire({
        title: "คุณแน่ใจ ?",
        text: `คุณแน่ใจว่าต้องการลบรายการ ${objectId.productId.title}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(basketActions.updateDecrease(objectId));
        }
      });
    }
  };

  const isSelected = (_id: string) => selected.indexOf(_id) !== -1;

  useEffect(() => {
    if (baskets.length > 0 && couponReducer.usecode == null) {
      const total = totalPrice(selected, baskets);
      const totalDiscounts = totalDiscount(selected, baskets);
      setSubTotal({
        total: total,
        discount: totalDiscounts,
        totalprice: total - totalDiscounts,
      });
    } else if (baskets.length > 0 && couponReducer.usecode !== null) {
      const total = totalPrice(selected, baskets);
      const totalDiscounts = totalDiscount(selected, baskets);
      const { priceSale } = couponReducer.usecode;
      let discount = priceSale + totalDiscounts;
      setSubTotal({
        total: total,
        discount: discount,
        totalprice: total - discount,
      });
    }
  }, [selected, couponReducer.usecode, baskets]);

  const renderBasket = (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper className={classes.root} elevation={3}>
          <div className={classes.boxHeader}>
            <div style={{ width: "10%" }}>
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < baskets.length
                }
                checked={
                  baskets.length > 0 && selected.length === baskets.length
                }
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                onChange={handleChangeItemsAllClick}
              />
            </div>
            <div style={{ width: "50%" }}>
              <Typography variant="body1" gutterBottom>
                สินค้า
              </Typography>
            </div>

            <div style={{ width: "10%" }}>
              <Typography variant="body1" gutterBottom>
                ราคาต่อชิ้น
              </Typography>
            </div>
            <div style={{ width: "20%" }}>
              <Typography variant="body1" gutterBottom>
                จำนวน
              </Typography>
            </div>
            <div style={{ width: "10%" }}>
              <Typography variant="body1" gutterBottom>
                ราคา
              </Typography>
            </div>

            <div style={{ width: "10%" }}>
              <Typography variant="body1" gutterBottom>
                แอคชั่น
              </Typography>
            </div>
          </div>
        </Paper>
      </Grid>
      {/* box List Products */}
      <Grid item xs={12}>
        <Paper className={classes.root} elevation={3}>
          {baskets.map((item, index) => {
            const isItemSelected = isSelected(item._id as string);
            const { productId } = item;
            return (
              <div className={classes.boxItems} key={index}>
                <div style={{ width: "10%" }}>
                  <Checkbox
                    checked={isItemSelected}
                    onClick={(event) => handleChangeItems(item._id as string)}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </div>
                <div className={classes.boxProduct} style={{ width: "50%" }}>
                  <img
                    src={`${urlApi}uploads/${
                      productId ? productId.images[0] : ""
                    } `}
                    alt={productId ? productId.title : ""}
                  />
                  <div>
                    <Typography
                      variant="body1"
                      gutterBottom
                      onClick={() =>
                        router.push({
                          pathname: `/product/${productId._id}`,
                        })
                      }
                    >
                      {productId ? productId.title : ""}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {item ? item.size : ""}
                    </Typography>
                  </div>
                </div>
                <div style={{ width: "10%" }}>
                  <Typography variant="body1" gutterBottom>
                    ฿{item.price}
                  </Typography>
                </div>
                {/* จำนวน */}
                <div style={{ width: "20%" }} className={classes.boxQuantity}>
                  <Button onClick={() => handleDecrease(item)}>
                    <RemoveIcon />
                  </Button>
                  <TextField variant="outlined" value={item.quantity} />
                  <Button onClick={() => handleIncrease(item)}>
                    <AddIcon />
                  </Button>
                </div>
                {/* จำนวน */}
                <div style={{ width: "10%" }}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{ color: "red" }}
                  >
                    ฿{numberWithCommas(item.quantity * item.price)}
                  </Typography>
                </div>

                <div style={{ width: "10%" }}>
                  <Button
                    onClick={() => handleDelete(item._id, authCustomer.user.id)}
                  >
                    ลบ
                  </Button>
                </div>
              </div>
            );
          })}
        </Paper>
      </Grid>
    </Grid>
  );

  const notBasket = (
    <div className={classes.notItems}>
      <Typography variant="body1" gutterBottom>
        ถึงเค้าจะไม่ว่าง แต่เราว่างอยู่นะ!
      </Typography>
      <Button
        variant="contained"
        style={{ background: "#AD00FF", color: "#fff" }}
        onClick={() => router.push({ pathname: "/" })}
      >
        ช็อปปิ้งกันเลย
      </Button>
    </div>
  );

  return (
    <React.Fragment>
      <div>
        <Appbar />

        {/* render Mobile */}
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {baskets.map((item, index) => {
              const isItemSelected = isSelected(item._id as string);
              const { productId } = item;
              return (
                <div className={classes.mobileBoxItems} key={index}>
                  <div style={{ width: "10%" }}>
                    <Checkbox
                      checked={isItemSelected}
                      onClick={(event) => handleChangeItems(item._id as string)}
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className={classes.boxProduct}>
                    <img
                      src={`${urlApi}uploads/${
                        productId ? productId.images[0] : ""
                      } `}
                      alt={productId ? productId.title : ""}
                    />
                  </div>
                  <div className={classes.boxDescriptionMobile}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      onClick={() =>
                        router.push({
                          pathname: `/product/${productId._id}`,
                        })
                      }
                    >
                      {productId ? productId.title : ""}
                    </Typography>
                    <div className={classes.boxpriceMobile}>
                      <Typography
                        variant="body2"
                        gutterBottom
                        style={{ color: "red", textAlign: "right" }}
                      >
                        {item.size}
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        style={{ color: "red", textAlign: "right" }}
                      >
                        ฿{numberWithCommas(item.price)}
                      </Typography>
                    </div>
                    <div className={classes.boxQuantity}>
                      <Button onClick={() => handleDecrease(item)}>
                        <RemoveIcon />
                      </Button>
                      <TextField variant="outlined" value={item.quantity} />
                      <Button onClick={() => handleIncrease(item)}>
                        <AddIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </Grid>
        </Grid>
        {/*  */}
        <Container maxWidth="lg">
          {baskets.length > 0 ? renderBasket : notBasket}
          {baskets.length > 0 ? (
            <Checkout
              {...subTotal}
              selected={selected}
              usecode={couponReducer.usecode}
            />
          ) : (
            ""
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Basket;
