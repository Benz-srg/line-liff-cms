import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import Button from "@material-ui/core/Button";
import ButtonBack from "@/components/ButtonBack";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
/*  */
import { GetServerSideProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import * as orderActions from "@/actions/order.action";
import { checkOrderStatus, checkPadding } from "@/utils/constans";
import FormPaidstatus from "@/components/order/FormPaidstatus";
import { numberWithCommas } from "@/utils/service";
import Snackbars from "@/components/Snackbar";

// component slip preview modal
import SlipModal from "@/components/modal/slipModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      // minHeight: "80vh",
      //color: theme.palette.text.secondary,
    },
    table: {
      minWidth: 650,
    },
    boxHeader: {
      display: "flex",
      justifyContent: "space-between",
    },
    slipButton: {
      textAlign: "right",
    },
  })
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const param = await context.query;
  return {
    props: { id: param.id },
  };
};

const OrderId = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");
  const { orders } = useSelector((state: any) => state);
  const [openFormPaid, setOpenFormPaid] = useState(false);
  const dofeed = () => {
    dispatch(orderActions.getOrdersCmswithId(id));
  };

  useEffect(() => {
    dofeed();
    return () => {};
  }, []);

  useEffect(() => {
    if (orders.isStatus == 201 || orders.isStatus == 200) {
      setTypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
      const clearTimeouts = setTimeout(() => {
        setOpenSnackbar(!openSnackbar);
        clearTimeout(clearTimeouts);
      }, 3000);
    } else if (orders.isStatus == 401 || orders.isStatus == 400) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
      const clearTimeouts = setTimeout(() => {
        setOpenSnackbar(!openSnackbar);
        clearTimeout(clearTimeouts);
      }, 3000);
    }
  }, [orders.isStatus]);
  return (
    <Layout>
      <Paper className={classes.root}>
        <Snackbars
          open={openSnackbar}
          handleCloseSnakbar={setOpenSnackbar}
          message={orders.isMessage}
          type={typeSnackbar}
        />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div className={classes.boxHeader}>
              <div>
                <ButtonBack />
              </div>
              <div>
                {orders.orders.length > 0 ? (
                  <Button
                    variant="contained"
                    color={`${
                      checkOrderStatus(orders.orders[0].orderStatus) == "รอชำระ"
                        ? "secondary"
                        : "primary"
                    }`}
                  >
                    สถานะการชำระเงิน :{" "}
                    {checkOrderStatus(orders.orders[0].orderStatus)}
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Grid>
          {orders.orders.length > 0 ? (
            <Grid item xs={12} className={classes.slipButton}>
              <SlipModal orderId={id} imgURL={orders.orders[0].slip} />
            </Grid>
          ) : (
            ""
          )}
          <Grid item xs={12}>
            <div className={classes.boxHeader}>
              <div>
                {orders.orders.length > 0 ? (
                  <FormPaidstatus
                    open={openFormPaid}
                    setOpen={setOpenFormPaid}
                    paidStatus={orders.orders[0].paidStatus}
                    objectId={orders.orders[0]._id}
                  />
                ) : (
                  ""
                )}
              </div>
              <div>
                {orders.orders.length > 0 ? (
                  <Button
                    variant="contained"
                    color={`${
                      checkPadding(orders.orders[0].paidStatus) ==
                      "กำลังเตรียมพัสดุ"
                        ? "secondary"
                        : "primary"
                    }`}
                    onClick={() => setOpenFormPaid(!openFormPaid)}
                  >
                    สถานะการจัดส่ง : {checkPadding(orders.orders[0].paidStatus)}
                    &nbsp;(แก้ไข)
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            {orders.orders.length > 0 ? (
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <div>
                    <Typography variant="body1" gutterBottom>
                      หมายเหตุ
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={orders.orders[0].note}
                      multiline
                      rows={4}
                      inputProps={{ readOnly: true }}
                    />
                  </div>
                </Grid>
                <Grid item xs={9}>
                  <div>
                    <Typography variant="body1" gutterBottom>
                      ที่อยู่จัดส่ง
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={` ${
                        orders.orders[0].customerId.fullName
                      } ${"\n"} ${orders.orders[0].customerId.tel} ${"\n"} ${
                        orders.orders[0].shippingAddress.shippingAddress
                      }`}
                      multiline
                      rows={4}
                      inputProps={{ readOnly: true }}
                    />
                  </div>
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ชื่อสินค้า</TableCell>
                    <TableCell align="right">ขนาด</TableCell>
                    <TableCell align="right">จำนวนสินค้า&nbsp;(ชิ้น)</TableCell>
                    <TableCell align="right">ส่วนลด&nbsp;(ชิ้น)</TableCell>
                    <TableCell align="right">ราคา&nbsp;(ชิ้น)</TableCell>
                    <TableCell align="right">รวม</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.orders.map((row) => (
                    <React.Fragment key={row._id}>
                      {row.products.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell component="th" scope="row">
                            {product.productId.title}
                          </TableCell>
                          <TableCell align="right">{product.size}</TableCell>
                          <TableCell align="right">
                            {product.quantity}
                          </TableCell>
                          <TableCell align="right">
                            {product.productId.saleprice * product.quantity}
                          </TableCell>
                          <TableCell align="right">{product.price}</TableCell>
                          <TableCell align="right">
                            {product.price * product.quantity}
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                  {/* footer */}
                  {orders.orders.map(({ _id, totalprice, discount, total }) => (
                    <React.Fragment key={_id}>
                      <TableRow>
                        <TableCell rowSpan={3} colSpan={4} />
                        <TableCell colSpan={1}>รวม</TableCell>
                        <TableCell align="right">
                          {numberWithCommas(total)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1}>ส่วนลด</TableCell>
                        <TableCell align="right">
                          {numberWithCommas(discount)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1}>ราคาสุทธิ</TableCell>
                        <TableCell align="right">
                          {numberWithCommas(totalprice)}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                  {/*  */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};
export default OrderId;
