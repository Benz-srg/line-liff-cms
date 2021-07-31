import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Appbar from "app/layouts/Appbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import PinDropIcon from "@material-ui/icons/PinDrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CheckoutMobile from "@/components/checkout/CheckoutMobile";
import CheckoutProcress from "@/components/checkout/CheckoutProcress";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import * as checkoutActions from "@/actions/checkout.action";
import * as customerActtions from "@/actions/customer.action";
import * as couponActions from "@/actions/coupon.action";
import { filterAddress } from "@/utils/service";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootAddress: {
      flexGrow: 1,
      padding: theme.spacing(2, 4),
      background: "#F1F0F0",
    },
    addressInside: {
      display: "flex",
      alignItems: "center",
      color: "#AD00FF",
      marginBottom: theme.spacing(1),
    },
    inputAddress: {
      marginBottom: theme.spacing(1),
    },
    rootProduct: {
      flexGrow: 1,
      marginTop: theme.spacing(1),
      padding: theme.spacing(2, 2),
      background: "#F1F0F0",
    },
    rootCause: {
      flexGrow: 1,
      padding: theme.spacing(2, 2),
      background: "#F9F9F9",
      " & div": {
        display: "flex",
        alignItems: "center",
        "& p": {
          marginRight: 3,
        },
      },
    },
    inputCause: {
      width: "100%",
      display: "flex",
      "& p": {
        width: "7%",
      },
    },
  })
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const param = await context.query;
  return {
    props: { id: param.state, code: param.code },
  };
};

const Checkout = ({ id, code }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { checkouts } = useSelector(({ checkout }: any) => checkout);
  const { customers } = useSelector(({ customer }: any) => customer);
  const authCustomer = useSelector((state: any) => state.authCustomer);
  const [note, setNote] = useState<string>("");
  const [openFormAddress, setOpenFormAddress] = useState(false);

  const router = useRouter();
  const doFeedCheckout = async () => {
    //feed data in baskets in data
    const objectIds = JSON.parse(id);
    dispatch(checkoutActions.getIteminBaskets(objectIds));
    dispatch(customerActtions.queryCustomerWithId(authCustomer.user.id));
    if (code != "") {
      //get coupon items
      dispatch(couponActions.getCouponWithInputCode(code));
    }
  };
  useEffect(() => {
    doFeedCheckout();
  }, []);

  useEffect(() => {
    if (customers) {
      if (customers.shippingAddress == "") {
        Swal.fire({
          title: "คุณยังไม่ได้เพิ่มที่อยู่?",
          text: "ต้องการเพิ่มที่อยู่หรือไม่ ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่",
        }).then(async (result) => {
          if (result.isConfirmed) {
            router.push({ pathname: `/profile/edit/60f54f56f13b0d0015512be3` });
          } else {
            router.push({ pathname: `/cart` });
          }
        });
      } 
      else if (customers.tel == "") {
        const r = confirm("กรุณาเพิ่มเบอร์โทรศัพท์!");
        if (r == true) {
          router.push({ pathname: `/profile/edit/${customers._id}` });
        } else {
          router.push({ pathname: `/profile/edit/${customers._id}` });
        }
      }
    }
  }, [customers]);

  return (
    <React.Fragment>
      <div>
        <Appbar />
        <br />
        <Container maxWidth="lg">
          <Paper className={classes.rootAddress}>
            <div className={classes.addressInside}>
              <PinDropIcon />
              <h4>ที่อยู่</h4>
            </div>
            <div className={classes.inputAddress}>
              {Object.entries(customers).length > 0 ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={` ${customers.fullName} ${"\n"} ${
                    customers.tel
                  } ${"\n"} ${filterAddress(
                    customers.address,
                    customers.shippingAddress
                  )}`}
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  rows={4}
                />
              ) : (
                ""
              )}
            </div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenFormAddress(!openFormAddress)}
              >
                เปลียนที่อยู่
              </Button>
            </div>
          </Paper>
          {/* renderMobile  */}
          <Paper elevation={3} className={classes.rootProduct}>
            {checkouts.map((item) => (
              <React.Fragment key={item._id}>
                <CheckoutMobile {...item} />
              </React.Fragment>
            ))}
          </Paper>
          {/* end renderMobile */}
          <Paper elevation={3} className={classes.rootCause}>
            <div className={classes.inputCause}>
              <Typography variant="body1" gutterBottom>
                หมายเหตุ :
              </Typography>
              <TextField
                fullWidth
                placeholder="ระบบหมายเหตุถึงผู้ขาย"
                value={note}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNote(e.target.value)
                }
              />
            </div>
          </Paper>
          <br />
          <CheckoutProcress
            checkouts={checkouts}
            note={note}
            openFormAddress={openFormAddress}
            setOpenFormAddress={setOpenFormAddress}
            customer={customers}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
