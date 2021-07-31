import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import EditProfile from "@/components/profile/EditProfile";
import EditPayment from "@/components/profile/EditPayment";
import EditAddress from "@/components/profile/EditAddress";
import DialogAddAddress from "@/components/profile/DialogAddAddress";
import DialogAddPayment from "@/components/profile/DialogAddPayment";
// import DialogAddProfile from "@/components/profile/DialogAddProfile";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
  withStyles,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Appbar from "app/layouts/Appbar";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const param = await context.query;
  return {
    props: { id: param.id },
  };
};

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
    textfield: {
      marginBottom: theme.spacing(1),
    },
    TabsDetail: {
      marginTop: theme.spacing(10),
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
  })
);

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

const Edit = ({ id }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  // const productReducer = useSelector(({ product }: any) => product);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  useEffect(() => {
    // setProductObject(productReducer.products[0]);
    // feedWithId();
  }, []);

  return (
    <>
      <Appbar />
      <Paper className={classes.root} elevation={2}>
        <Grid container spacing={10} alignItems="center" justify="center">

          <Grid item xs={12}>
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
                  <Tab label="ข้อมูลส่วนตัว" {...a11yProps(2)} />
                  <Tab label="ข้อมูลบัญชี" {...a11yProps(0)} />
                  <Tab label="ที่อยู่" {...a11yProps(1)} />

                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                className={classes.TabsDetail}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                    {id ? <EditProfile id={id} /> : ""}
                      
                    </Grid>
                  </Grid>



                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Box
                        display="flex"
                        flexDirection="row-reverse"
                        p={1}
                        m={1}
                        bgcolor="background.paper"
                      >
                        <DialogAddPayment id={id} />
                      </Box>
                      <Grid item xs={12} className={classes.TabsDetail}>
                        <EditPayment id={id} />
                      </Grid>
                    </Grid>
                  </Grid>

                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Box
                        display="flex"
                        flexDirection="row-reverse"
                        p={1}
                        m={1}
                        bgcolor="background.paper"
                      >
                        <Box p={1}>
                          <DialogAddAddress id={id} />
                        </Box>
                      </Box>
                      <Grid item xs={12}>
                        <EditAddress id={id} />
                      </Grid>
                    </Grid>
                  </Grid>
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
