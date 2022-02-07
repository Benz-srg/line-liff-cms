import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Appbar from "app/layouts/Appbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardItem from "@/components/Card";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "@/actions/product.action";
import * as authCustomerActions from "@/actions/authCustomer.action";
import { useRouter } from "next/router";
import ImageSlider from "@/components/home/ImageSlider";
import Promotion from "@/components/home/Promotion";
import * as promotionActions from "@/actions/promotion.action";
import * as bannerActions from "@/actions/banner.action";
import ContentLoader from "react-content-loader";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { products, newproducts, popularproducts, isLoading } = useSelector(
    ({ product }: any) => product
  );
  const promotionReducer = useSelector((state: any) => state.promotion);
  const bannerReducer = useSelector((state: any) => state.banner);
  const authCustomer = useSelector((state: any) => state.authCustomer);

  const doFeedProduct = () => {
    dispatch(bannerActions.feedBanner());
    dispatch(productActions.feedProductCustomer());
    dispatch(promotionActions.feed());
  };

  useEffect(() => {
    doFeedProduct();
  }, []);

  const getUserProfile = async (liff) => {
    await liff
      .getProfile()
      .then(async (profile) => {
        const payload = {
          liffId: profile.userId,
          liffName: profile.displayName,
          email: "",
        };
        if (payload.liffId !== undefined) {
          dispatch(authCustomerActions.signinCustomer(payload, router));
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const loginLiff = async () => {
    //e.preventDefault();
    const liff = (await import("@line/liff")).default;
    try {
      await liff.init({ liffId: "1656870964-3j6xxkBb" });
    } catch (error) {
      console.error("liff init error", error.message);
    }
    if (liff.isLoggedIn()) {
      console.log(authCustomer.user);
      getUserProfile(liff);
    }
  };

  const MyLoaderBanner = (props) => (
    <ContentLoader
      speed={2}
      width={1200}
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="5" ry="5" width="1200" height="600" />
    </ContentLoader>
  );

  const MyLoader = (props) => (
    <ContentLoader
      speed={2}
      width={345}
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="5" ry="5" width="345" height="70" />
      <rect x="0" y="72" rx="3" ry="3" width="345" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    </ContentLoader>
  );

  useEffect(() => {
    loginLiff();
  }, []);

  return (
    <React.Fragment>
      <div>
        <Appbar />
        <Container maxWidth="lg">
          <br />
          {promotionReducer.photos.photo !== "" &&
          promotionReducer.photos.statusPromotion === true ? (
            <Promotion photo={promotionReducer.photos.photo} />
          ) : (
            ""
          )}

          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* <ImageSlider /> */}
              {bannerReducer.isLoading ? (
                <MyLoaderBanner />
              ) : (
                <ImageSlider photos={bannerReducer.photos} />
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                สินค้ายอดนิยม
              </Typography>
              {isLoading ? (
                <MyLoader />
              ) : (
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  {popularproducts.map((product, index) => (
                    <Grid key={index} item xs={6} sm={6} md={3}>
                      <CardItem {...product} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
            {/*  */}
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                สินค้าใหม่
              </Typography>
              {isLoading ? (
                <MyLoader />
              ) : (
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  {newproducts.map((product, index) => (
                    <Grid key={index} item xs={6} sm={6} md={3}>
                      <CardItem {...product} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                สินค้าทั้งหมด
              </Typography>
              {isLoading ? (
                <MyLoader />
              ) : (
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  {products.map((product, index) => (
                    <Grid key={index} item xs={6} sm={6} md={3}>
                      <CardItem {...product} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
            {/*  */}
          </Grid>

          <br />
        </Container>
      </div>
    </React.Fragment>
  );
}
