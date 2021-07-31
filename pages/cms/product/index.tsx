import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout";
import DataTable from "@/components/product/datatable";
import Loading from "@/components/Loading";
import * as productAction from "@/actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import Snackbars from "@/components/Snackbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
    },
    textfield: {
      marginBottom: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

const List = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { product } = useSelector((state: any) => state);
  const { products, isLoading, isMessage, isStatus } = product;
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");
  const { adminPermission } = useSelector(({ permission }: any) => permission);
  useEffect(() => {
    dispatch(productAction.feedProduct());
  }, []);

  useEffect(() => {
    if (isStatus === 201) {
      setTypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
    } else if (isStatus == 401 || isStatus == 400) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);

  return (
    <Layout>
      <Loading open={isLoading} />
      <Snackbars
        open={openSnackbar}
        handleCloseSnakbar={setOpenSnackbar}
        message={isMessage}
        type={typeSnackbar}
      />
      <div>{router.pathname}</div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper elevation={1} className={classes.root}>
            {adminPermission[12] ? (
              <Button
                color="primary"
                variant="contained"
                onClick={() => router.push({ pathname: "/cms/product/add" })}
              >
                เพิ่มสินค้า
              </Button>
            ) : (
              ""
            )}
            <br />
            {products ? (
              <DataTable products={products ? products : []} />
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default List;
