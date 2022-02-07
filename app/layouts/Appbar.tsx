import React, { useState, useEffect } from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Divider from "@material-ui/core/Divider";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import * as basketActions from "@/actions/basket.action";
import DrawerMobile from "./Drawer";
import * as authCustomerActions from "@/actions/authCustomer.action";
import _ from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    offset: theme.mixins.toolbar,
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      display: "none",
      color: "#39b549",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    active: {
      color: "#000D",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    divider: {
      color: "#fff",
      background: "#fff",
    },
    toolbar: {
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },
    },
    iconColor: {
      color: "#d3d3d3",
    },
    activeIcon: {
      color: "#fff",
    },
    colorAppbar: {
      backgroundColor: "#fff",
    },
  })
);

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openMenubar, setOpenMenubar] = React.useState<boolean>(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [activeLink, setActiveLink] = useState(null);

  let path = router.pathname;
  let splitactive;
  useEffect(() => {
    splitactive = path.split("/");
    let newLink = `/${splitactive[1]}`;
    setActiveLink(newLink);
  }, []);

  /* redux */
  const dispatch = useDispatch();
  const { baskets } = useSelector(({ basket }: any) => basket);
  const authCustomer = useSelector((state: any) => state.authCustomer);

  const doFeed = () => {
    if (authCustomer.user.id !== "" && authCustomer.user.id != undefined) {
      dispatch(basketActions.getBaskets(authCustomer.user.id));
    }
  };

  React.useEffect(() => {
    if (authCustomer.user.id != undefined) {
      doFeed();
    }
  }, [authCustomer.user]);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = async () => {
    const liff = (await import("@line/liff")).default;
    if (liff.isLoggedIn()) {
      liff.logout();
      dispatch(authCustomerActions.signoutCustomer(router));
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          if (authCustomer.user.id != undefined) {
            router.push({ pathname: `/profile/edit/${authCustomer.user.id}` });
          } else {
            router.push({ pathname: `/login` });
          }
        }}
      >
        My account
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const menuItems = [
    { title: "HOME", pathname: "/" },
    { title: "PRODUCT", pathname: "/product" },
    { title: "ABOUT US", pathname: "/aboutus" },
    { title: "ORDER", pathname: "/order" },
  ];

  return (
    <React.Fragment>
      <div className={classes.grow}>
        <AppBar position="fixed" className={classes.colorAppbar}>
          <Container maxWidth="lg">
            <Toolbar className={classes.toolbar}>
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => router.push({ pathname: "/" })}
                >
                  <Avatar src="/shoplogo.png" />
                </IconButton>
                {menuItems.map((menu, index) => (
                  <Button
                    key={index}
                    color="inherit"
                    className={`${classes.title} ${
                      activeLink == menu.pathname ? classes.active : ""
                    }`}
                    onClick={() => {
                      handleMenuClose();
                      if (menu.pathname == "/order") {
                        if (authCustomer.user.id != undefined) {
                          router.push({ pathname: menu.pathname });
                        } else {
                          router.push({ pathname: "/login" });
                        }
                      } else {
                        router.push({ pathname: menu.pathname });
                      }
                    }}
                  >
                    {menu.title}
                  </Button>
                ))}
              </div>
              {/* mobile menu Toggole */}
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="toggle Drawer"
                  aria-haspopup="true"
                  onClick={() => setOpenMenubar(!openMenubar)}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </div>

              {/*  */}

              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Divider
                  orientation="vertical"
                  flexItem
                  light
                  className={classes.divider}
                />
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={() => router.push({ pathname: "/cart" })}
                >
                  <Badge
                    badgeContent={baskets ? baskets.length : 0}
                    color="secondary"
                  >
                    <ShoppingCartIcon
                      className={`${classes.title} ${
                        activeLink == "/cart"
                          ? classes.activeIcon
                          : classes.iconColor
                      }`}
                    />
                  </Badge>
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={() => router.push({ pathname: "/cart" })}
                >
                  <Badge
                    badgeContent={baskets ? baskets.length : 0}
                    color="secondary"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </div>
            </Toolbar>
          </Container>
        </AppBar>

        {renderMenu}
        <DrawerMobile
          open={openMenubar}
          setOpen={setOpenMenubar}
          pathActive={activeLink}
        />
      </div>
      <div className={classes.offset} />
    </React.Fragment>
  );
}
