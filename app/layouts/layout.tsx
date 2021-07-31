import React, { useEffect } from "react";
// import { GetServerSideProps } from "next";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useRouter } from "next/router";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonIcon from "@material-ui/icons/Person";
/*  */
import { useSelector, useDispatch } from "react-redux";
import * as authAdminActions from "@/actions/authAdmin.action";
import * as permissionActions from "@/actions/permission.action";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import AssessmentIcon from "@material-ui/icons/Assessment";
import HistoryIcon from "@material-ui/icons/History";
import ContactlessIcon from "@material-ui/icons/Contactless";
import ControlCameraIcon from "@material-ui/icons/ControlCamera";
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
/*  */
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    iconMene: {
      flexGrow: 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    titleStore: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      "& p": {
        marginLeft: theme.spacing(1),
      },
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    activeList: {
      background: "lightgray",
    },
  })
);

export default function PersistentDrawerLeft({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openProduct, setProduct] = React.useState(false);
  const authAdmin = useSelector((state: any) => state.authAdmin);
  const { adminPermission } = useSelector(({ permission }: any) => permission);
  const { user } = useSelector(({ authAdmin }: any) => authAdmin);

  const menubars = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/cms/dashboard",
    },
    {
      name: "รายการสั่งซื้อ",
      icon: <AssessmentIcon />,
      path: "/cms/order",
    },
    {
      name: "ประวัติการซื้อขาย",
      icon: <HistoryIcon />,
      path: "/cms/history",
    },
    {
      name: "รายการสินค้า",
      icon: <ShoppingCartIcon />,
      path: "/cms/product",
    },
    {
      name: "คูปอง",
      icon: <CardGiftcardIcon />,
      path: "/cms/coupon",
    },
    {
      name: "โปรโมชั่น",
      icon: <ContactlessIcon />,
      path: "/cms/promotion",
    },
    {
      name: "ลูกค้า",
      icon: <PersonIcon />,
      path: "/cms/customer",
    },
    {
      name: "ผู้ดูแล",
      icon: <SupervisorAccountIcon />,
      path: "/cms/admin",
    },
    {
      name: "สิทธิ์การเข้าถึง",
      icon: <LockIcon />,
      path: "/cms/role",
    },
    {
      name: "บทความ",
      icon: <ViewQuiltIcon />,
      path: "/cms/about",
    },
    {
      name: "แบรนเนอร์",
      icon: <ControlCameraIcon />,
      path: "/cms/banner",
    },
    {
      name: "จัดการค่าส่งสินค้า",
      icon: <LocalShippingIcon />,
      path: "/cms/shipping",
    },
    {
      name: "Help Center",
      icon: <ContactMailIcon />,
      path: "/cms/product/list",
    },
  ];
  const router = useRouter();

  const [activeLink, setActiveLink] = React.useState(null);

  const feedPermissionById = () => {
    dispatch(permissionActions.getPermissionByUserId(user.id));
  };

  useEffect(() => {
    feedPermissionById();
  }, []);

  let path = router.pathname;
  let splitactive;
  React.useEffect(() => {
    splitactive = path.split("/");
    let newLink = `/${splitactive[1]}/${splitactive[2]}`;
    setActiveLink(newLink);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            className={classes.iconMene}
          ></Typography>
          <Typography variant="body1" component="p">
           {/* {authAdmin.user.fullName} */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <div className={classes.titleStore}>
            <Avatar
              alt="Cindy Baker"
              src="/firstshoplogo08.png"
            />
            <Typography>FIRST SHOP</Typography>
          </div>
        </div>
        <Divider />
        <List>
          {menubars.map((text, index) => {
            if (index > 0 && index < 10) {
              if (adminPermission[index - 1]) {
                return (
                  <ListItem
                    button
                    key={index}
                    onClick={() => router.push({ pathname: text.path })}
                    className={`${
                      activeLink == text.path ? classes.activeList : ""
                    }`}
                  >
                    <ListItemIcon>{text.icon}</ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItem>
                );
              } else {
                return "";
              }
            }
            return (
              <ListItem
                button
                key={index}
                onClick={() => router.push({ pathname: text.path })}
                className={`${
                  activeLink == text.path ? classes.activeList : ""
                }`}
              >
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItem>
            );
          })}
          {/* ออกจากระบบ */}
          <ListItem
            button
            onClick={() => dispatch(authAdminActions.signoutAdmin(router))}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="ออกจากระบบ" />
          </ListItem>
          {/*  */}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
