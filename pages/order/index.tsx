import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ProductDelivery from "@/components/order/check_order/ProductDelivery";
import RecieveProduct from "@/components/order/check_order/RecieveProduct";
import CancelOrder from "@/components/order/check_order/cancelOrder";
import Appbar from "app/layouts/Appbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 0,
    },
    paper: {
      padding: theme.spacing(2),
      // minHeight: "80vh",
      //color: theme.palette.text.secondary,
    },
    textfield: {
      marginBottom: theme.spacing(1),
    },
    TabsDetail: {
      marginTop: theme.spacing(3),
    },
    formControl: {
      marginBottom: theme.spacing(1),
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
    contentGrid: {
      padding: "22px !important",
    },
  })
);

interface editProduct {
  title: string;
  price: number;
  saleprice: number;
  quantity: number;
  images: any[];
  categoriesId: string;
  relatedIds: string[];
  ispopulated: number;
  description: string;
  averageRating: number;
  size: string;
  sku: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Card>
          <Typography>{children}</Typography>
        </Card>
      )}
    </div>
  );
}
function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const Edit = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [id, setId] = useState("60dc8456b6acdf24d0a806d2");
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const [productObject, setProductObject] = useState<editProduct>({
    title: "",
    price: 1,
    saleprice: 0,
    quantity: 0,
    images: [],
    categoriesId: "",
    relatedIds: [],
    ispopulated: 0,
    description: "",
    averageRating: 0,
    size: "",
    sku: "",
  });

  return (
    <>
      <Appbar />
      <Paper className={classes.root} elevation={2}>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} className={classes.contentGrid}>
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="รอชำระ" {...a11yProps(0)} />
                  <Tab label="ชำระแล้ว" {...a11yProps(1)} />
                  <Tab label="คำสั่งซื้อที่ยกเลิก" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                className={classes.TabsDetail}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Grid item xs={12}>
                    {/* <EditProfile id={id} /> */}
                    <ProductDelivery id={id} />
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <RecieveProduct id={id} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <CancelOrder />
                </TabPanel>
              </SwipeableViews>
            </div>
          </Grid>
          
        </Grid>
      </Paper>
    </>
  );
};

export default Edit;
