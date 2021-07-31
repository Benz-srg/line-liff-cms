import React from "react";
import { useRouter } from "next/router";
import Layout from "@/layout";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ReportSuccess from "@/components/history/ReportSuccess";
import ReportCancel from "@/components/history/ReportCancel";

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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
}));

const History = () => {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Layout>
      <div>{router.pathname}</div>
      <Paper className={classes.root}>
        <Grid container justify="space-around">
          <Grid item xs={12}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="ประวัติการซื้อขายสำเร็จ" {...a11yProps(0)} />
                <Tab label="ประวัติการยกเลิก" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                {/* รายงานการซื้อขายสำเร็จ */}
                {value == 0 ? <ReportSuccess numofTab={value} /> : ""}
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                {/* รายงานการยกเลิก*/}
                {value == 1 ? <ReportCancel numofTab={value} /> : ""}
              </TabPanel>
            </SwipeableViews>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default History;
