import React, { useState, useEffect } from "react";
import Layout from "@/layout/";
import ChartIncome from "@/components/dashboard/LineChart";
import Chartproduct from "app/components/dashboard/Chartproduct";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CardDetails from "@/components/dashboard/Card";
import GroupIcon from "@material-ui/icons/Group";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AssessmentIcon from "@material-ui/icons/Assessment";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { parseCookies } from "@/utils/token";
import { wrapper } from "@/wapper/store";
import { useSelector, useDispatch } from "react-redux";
import * as dashboardActions from "@/actions/dashboard.action";
import { numberWithCommas } from "@/utils/service";
import Loading from "@/components/Loading";

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req }) => {
    let user = await parseCookies(req);
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/cms/signin",
        },
      };
    }
    return {
      props: { user, data: { props: { user } } },
    };
  }
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: "#fff",
  },
  paper__inner: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
    textAlign: "left",
    marginBottom: 10,
  },
  box__productinMonth: {},
}));

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dashboard = useSelector((state: any) => state.dashboard);
  const doFeed = () => {
    dispatch(dashboardActions.feedDayofMonth(activeButton));
  };
  const [activeButton, setActiveButton] = useState("Month");

  const newArrays = [
    {
      name: "ยอดคำสั่งซื้อประจำวัน",
      icon: <ShoppingCartIcon />,
      path: "",
      total: dashboard.countSale,
    },
    {
      name: "ยอดขายประจำวัน",
      icon: <AssessmentIcon />,
      path: "",
      total: numberWithCommas(dashboard.sumdays),
    },
    {
      name: "ยอดขาย 7 วันที่ผ่านมา",
      icon: <TrendingUpIcon />,
      path: "",
      total: numberWithCommas(dashboard.lastsale7day),
    },

    {
      name: "ลูกค้าหน้าใหม่ในเดือนนี้",
      icon: <GroupIcon />,
      path: "",
      total: dashboard.totalCustomer,
    },
  ];

  let chartButtons = ["Day", "Week", "Month", "Year"];

  useEffect(() => {
    doFeed();
  }, [activeButton]);
  return (
    <Layout>
      <Loading open={dashboard.isLoading} />
      <Grid container spacing={2}>
        {newArrays.map((row, index) => {
          return (
            <Grid key={index} item xs={12} sm={3}>
              <CardDetails detail={row} />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>
            <div className={classes.paper__inner}>
              <div>
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                >
                  {chartButtons.map((button, index) => (
                    <Button
                      key={index}
                      variant={
                        activeButton == button ? "contained" : "outlined"
                      }
                      onClick={() => setActiveButton(button)}
                    >
                      {button}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
            </div>
            {dashboard.dashboards.length > 0 ? (
              <ChartIncome charts={dashboard.dashboards} label={activeButton} />
            ) : (
              ""
            )}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Dashboard;
