import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout";
import Loading from "@/components/Loading";
import { useDispatch, useSelector } from "react-redux";
import Snackbars from "@/components/Snackbar";
import ManageShipping from "@/components/shipping/manage";
import Grid from "@material-ui/core/Grid";
import * as shippingActions from "@/actions/shipping.action";

const Shipping = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { shippingcost, isLoading, isMessage, isStatus } = useSelector(({ shipping }: any) => shipping);

  const feedWithShipping = async () => {
    await dispatch(shippingActions.getShipping());
  };
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");
  useEffect(() => {
    feedWithShipping();
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
          {
            shippingcost
              ?
              <ManageShipping {...shippingcost} />
              : ""
          }
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Shipping;


