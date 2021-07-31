import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Appbar from "app/layouts/Appbar";
import Typography from "@material-ui/core/Typography";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import CardItem from "@/components/Card";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "@/actions/product.action";
import Button from "@material-ui/core/Button";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Loading from "@/components/Loading";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HeightIcon from "@material-ui/icons/Height";
import * as authCustomerActions from "@/actions/authCustomer.action";
import { useRouter } from "next/router";

/*  */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1),
      height: 55,
      [theme.breakpoints.down("sm")]: {
        height: "auto",
        marginRight: theme.spacing(0),
      },
    },
    boxSelect: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    buttonIcon: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
  })
);

export default function ProductIndex() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const { products,popularproducts, isLoading } = useSelector(({ product }: any) => product);
  const [activeButton, setActiveButton] = useState("");

  const [sortPrice, setsortPrice] = useState<string | number>("None");
  const [sortIcon, setSortIcon] = useState<string | boolean>("");
  const authCustomer = useSelector((state: any) => state.authCustomer);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: string | number }>
  ) => {
    setsortPrice(event.target.value);
    if (activeButton == "" && event.target.value == 0) {
      dispatch(productActions.feedProductSort("normal", 1));
    } else if (activeButton == "" && event.target.value == 1) {
      dispatch(productActions.feedProductSort("normal", -1));
    } else if (event.target.value == 0 && activeButton != "") {
      dispatch(productActions.feedProductSort(activeButton, 1));
    } else if (event.target.value == 1 && activeButton != "") {
      dispatch(productActions.feedProductSort(activeButton, -1));
    }
  };

  const handleIcon = () => {
    if (sortIcon === "") {
      setSortIcon(true);
    } else {
      setSortIcon(!sortIcon);
    }
  };

  useEffect(() => {
    if (activeButton == "" && sortIcon === true) {
      //เป็นจริงมากไปน้อย
      dispatch(productActions.feedProductSort("normal", 1));
    } else if (activeButton == "" && sortIcon === false) {
      //ไม่เป็นจริงน้อยไปมาก
      dispatch(productActions.feedProductSort("normal", -1));
    } else if (sortIcon === true && activeButton != "") {
      dispatch(productActions.feedProductSort(activeButton, 1));
    } else if (sortIcon === false && activeButton != "") {
      dispatch(productActions.feedProductSort(activeButton, -1));
    }
  }, [sortIcon]);

  //แสดงรายการสินค้าทั้งหมด
  const doFeedProduct = () => {
    dispatch(productActions.feedProductCustomer());
  };

  //สินค้าใหม่
  const handleFeedNewProduct = () => {
    dispatch(productActions.feedNewProduct());
    setActiveButton("newproduct");
  };

  //สินค้ายอดนิยม
  const handleFeedProductPopular = () => {
    dispatch(productActions.feedProductPopular());
    setActiveButton("popular");
  };
  useEffect(() => {
    doFeedProduct();
  }, []);

  return (
    <React.Fragment>
      <div>
        <Appbar />
        <Container maxWidth="lg">
          <br />
          <Loading open={isLoading} />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                onClick={() => handleFeedProductPopular()}
                className={classes.button}
                variant={activeButton == "popular" ? "contained" : "outlined"}
              >
                ยอดนิยม
              </Button>
              <Button
                className={classes.button}
                variant={
                  activeButton == "newproduct" ? "contained" : "outlined"
                }
                onClick={() => handleFeedNewProduct()}
              >
                ล่าสุด
              </Button>
              <Button className={classes.button} variant="outlined">
                สินค้าขายดี
              </Button>
              {/*  */}
              <FormControl variant="outlined" className={classes.boxSelect}>
                <Select native value={sortPrice} onChange={handleChange}>
                  {sortPrice == "None" ? (
                    <option value={"None"}>ราคา</option>
                  ) : (
                    ""
                  )}
                  <option value={0}>ราคา:จากน้อยไปมาก</option>
                  <option value={1}>ราคา:จากมากไปน้อย</option>
                </Select>
              </FormControl>
              {/* expand mobile */}
              <Button
                variant="outlined"
                onClick={handleIcon}
                className={classes.buttonIcon}
              >
                {sortIcon === "" ? (
                  "ราคา"
                ) : sortIcon === true ? (
                  <ExpandLessIcon />
                ) : sortIcon === false ? (
                  <ExpandMoreIcon />
                ) : (
                  ""
                )}
                {sortIcon === "" ? <HeightIcon /> : ""}
              </Button>
              {/*  */}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom></Typography>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                {products
                  ? products.map((product, index) => (
                      <Grid key={index} item xs={6} sm={6} md={3}>
                        <CardItem {...product} />
                      </Grid>
                    ))
                  : ""}
              </Grid>
              <div></div>
            </Grid>
          </Grid>
          <br />
        </Container>
      </div>
    </React.Fragment>
  );
}
