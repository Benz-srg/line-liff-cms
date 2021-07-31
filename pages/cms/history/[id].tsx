import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import * as historyActions from "@/actions/history.action";
import { checkOrderStatus, checkPadding } from "@/utils/constans";
import { numberWithCommas } from "@/utils/service";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ButtomSubmit from "@/components/ButtonSubmit";
import Snackbars from "@/components/Snackbar";
import Loading from "@/components/Loading";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    boxHeader: {
      display: "flex",
      justifyContent: "space-between",
    },
    btnError: {
      background: "#b71c1c",
      color: "#fff",
      "&:hover": {
        background: "#b71c1c",
      },
    },
    btnSuccess: {
      background: "#43a047",
      color: "#fff",
      "&:hover": {
        background: "#43a047",
      },
    },
    btnWait: {},
  })
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const param = await context.query;
  return {
    props: { id: param.id },
  };
};

const HistoryId = ({ id }) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const historyReducer = useSelector((state: any) => state.history);
  const [formEditTacking, setFormEditTacking] = useState(false);
  const [shipping, setShipping] = useState({
    id: "",
    shippingName: "",
    tackingNo: "",
  });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");
  const dofeed = () => {
    dispatch(historyActions.feedHistoriesWithId(id));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormEditTacking(event.target.checked);
  };

  const handleSubmit = () => {
    if (shipping.shippingName == "" && shipping.tackingNo == "")
      return alert("กรุณากรอก");
    dispatch(historyActions.editTrackingNo(shipping));
  };

  const handleDestroy = () => {
    dispatch(historyActions.destroy());
    router.push({ pathname: `/cms/history` });
  };

  useEffect(() => {
    dofeed();
    return () => {};
  }, []);

  useEffect(() => {
    if (historyReducer.histories.length > 0) {
      const { shippingName, tackingNo, _id } = historyReducer.histories[0];
      setShipping({
        id: _id,
        shippingName: shippingName,
        tackingNo: tackingNo,
      });
      setFormEditTacking(false);
    }
    if (historyReducer.status == 200 || historyReducer.status == 201) {
      const { shippingName, tackingNo, _id } = historyReducer.histories[0];
      setShipping({
        id: _id,
        shippingName: shippingName,
        tackingNo: tackingNo,
      });
      setFormEditTacking(false);
      setTypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
    } else if (historyReducer.status == 401 || historyReducer.status == 400) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [historyReducer.histories]);

  return (
    <Layout>
      <Paper className={classes.root}>
        <Loading open={historyReducer.isLoading} />
        <Snackbars
          open={openSnackbar}
          handleCloseSnakbar={setOpenSnackbar}
          message={historyReducer.message}
          type={typeSnackbar}
        />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div className={classes.boxHeader}>
              <div>
                <Button onClick={() => handleDestroy()}>
                  <ArrowBackIcon /> กลับ
                </Button>
              </div>
              <div>
                {historyReducer.histories.length > 0 ? (
                  <Button
                    variant="contained"
                    className={`${
                      historyReducer.histories[0].orderStatus == 2
                        ? classes.btnSuccess
                        : classes.btnError
                    }`}
                  >
                    สถานะการชำระเงิน :{" "}
                    {checkOrderStatus(historyReducer.histories[0].orderStatus)}
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            {historyReducer.histories.length > 0 ? (
              <div className={classes.boxHeader}>
                <div></div>
                <div>
                  <Button
                    variant="contained"
                    className={`${
                      historyReducer.histories[0].paidStatus == 1
                        ? classes.btnSuccess
                        : classes.btnError
                    }`}
                  >
                    สถานะการจัดส่ง :{" "}
                    {checkPadding(historyReducer.histories[0].paidStatus)}
                  </Button>
                </div>
              </div>
            ) : (
              ""
            )}
          </Grid>
          {historyReducer.histories.length > 0 ? (
            <Grid item xs={12}>
              <Paper elevation={1} style={{ padding: 10 }}>
                <form>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formEditTacking}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="แก้ไข"
                  />

                  <TextField
                    fullWidth
                    variant={formEditTacking ? "outlined" : "filled"}
                    value={shipping.shippingName}
                    label="ชื่อขนส่ง"
                    style={{ marginBottom: 10 }}
                    InputProps={{
                      readOnly: !formEditTacking,
                    }}
                    onChange={(e) =>
                      setShipping({ ...shipping, shippingName: e.target.value })
                    }
                  />
                  <TextField
                    fullWidth
                    variant={formEditTacking ? "outlined" : "filled"}
                    value={shipping.tackingNo}
                    label="TackingNo"
                    style={{ marginBottom: 10 }}
                    InputProps={{
                      readOnly: !formEditTacking,
                    }}
                    onChange={(e) =>
                      setShipping({ ...shipping, tackingNo: e.target.value })
                    }
                  />
                  {formEditTacking ? (
                    <ButtomSubmit
                      handleSubmit={handleSubmit}
                      isUploading={historyReducer.isLoading}
                    />
                  ) : (
                    ""
                  )}
                </form>
              </Paper>
            </Grid>
          ) : (
            ""
          )}
          <Grid item xs={12}>
            {historyReducer.histories.length > 0 ? (
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <div>
                    <Typography variant="body1" gutterBottom>
                      ที่อยู่จัดส่ง
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={` ${
                        historyReducer.histories[0].customerId.fullName
                      } ${"\n"} ${
                        historyReducer.histories[0].customerId.tel
                      } ${"\n"} ${
                        historyReducer.histories[0].shippingAddress
                          .shippingAddress
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
                  {historyReducer.histories.map((row) => (
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
                  {historyReducer.histories.map(
                    ({ _id, totalprice, discount, total }) => (
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
                    )
                  )}
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

export default HistoryId;
