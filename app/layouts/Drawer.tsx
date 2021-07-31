import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  list: {
    width: "100vw",
    height: "100vh",
  },
  boxListMenu: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
  active: {
    color: "#fff",
    background: "#000",
  },
  listitem: {
    textAlign: "center",
  },
});

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pathActive: string;
}

const menuItems = [
  { title: "HOME", pathname: "/" },
  { title: "PRODUCT", pathname: "/product" },
  { title: "ABOUT US", pathname: "/aboutus" },
  { title: "ORDER", pathname: "/order" },
  { title: "CART", pathname: "/cart" },
];

export default function DrawerMobile({ open, setOpen, pathActive }: Props) {
  const classes = useStyles();
  const router = useRouter();
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setOpen(open);
    };

  

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className={classes.boxListMenu}>
        <ListItem
          button
          style={{ textAlign: "center", background: "#3f51b5", color: "#fff" }}
        >
          {/*  <ListItemIcon>{menu.title}</ListItemIcon> */}
          <ListItemText primary={"บริษัท อิไตคิมูจิ จำกัด"} />
        </ListItem>
        {menuItems.map((menu, index) => (
          <ListItem
            button
            key={index}
            className={`${classes.listitem} ${
                pathActive == menu.pathname ? classes.active : ""
            }`}
            onClick={() => router.push({ pathname: menu.pathname })}
          >
            {/*  <ListItemIcon>{menu.title}</ListItemIcon> */}
            <ListItemText primary={menu.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <React.Fragment>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
