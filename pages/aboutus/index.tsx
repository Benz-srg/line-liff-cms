import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Appbar from "app/layouts/Appbar";
import { urlApi } from "@/context/urlapi";
import { useSelector, useDispatch } from "react-redux";
import * as aboutAction from "@/actions/about.action";
import { useRouter } from "next/router";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Fadeinsection from "@/components/aboutus/Fadeinsection";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(0, "auto"),
    },
    contentCon: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: theme.spacing(3),
      "&:first-child &:last-child": { padding: "5rem 0" },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        "&:nth-child(2)": {
          order: 1,
        },
      },
    },
    contentLeft: {
      width: "50%",
      "& img": {
        width: "100%",
        objectFit: "contain",
        borderRadius: 5,
      },
    },
    contentRight: {
      padding: theme.spacing(2),
      textAlign: "left",
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        order: 1,
      },
    },
  })
);

const RenderLeft = ({ classes, photo, detail, title }) => {
  return (
    <Fadeinsection>
      <section className={classes.contentCon}>
        <div className={classes.contentLeft}>
          <img
            src={`${urlApi}uploads/aboutus/${photo}`}
            alt={photo}
            height="300"
          />
        </div>
        <div className={classes.contentRight}>
          <h2>{title}</h2>
          <p>{detail}</p>
        </div>
      </section>
    </Fadeinsection>
  );
};

const RenderRight = ({ classes, photo, detail, title }) => {
  return (
    <section className={classes.contentCon}>
      <div className={classes.contentRight}>
        <h2>{title}</h2>
        <p>{detail}</p>
      </div>
      <div className={classes.contentLeft}>
        <img
          src={`${urlApi}uploads/aboutus/${photo}`}
          alt={photo}
          height="300"
        />
      </div>
    </section>
  );
};

export default function Aboutus() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { about } = useSelector((state: any) => state);
  const { abouts, isLoading, isMessage, isStatus } = about;
  useEffect(() => {
    dispatch(aboutAction.feedAbout());
  }, []);

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <div>
        <Appbar />
        <Container maxWidth="lg">
          <br />
          {abouts.length > 0
            ? abouts.map((about, index) => {
                return (
                  <React.Fragment key={index}>
                    <Fadeinsection>
                      {(index + 1) % 2 == 0 ? (
                        <RenderRight
                          classes={classes}
                          photo={about.image}
                          detail={about.detail}
                          title={about.title}
                        />
                      ) : (
                        <RenderLeft
                          classes={classes}
                          photo={about.image}
                          detail={about.detail}
                          title={about.title}
                        />
                      )}
                    </Fadeinsection>
                  </React.Fragment>
                );
              })
            : ""}

          <br />
        </Container>
      </div>
    </React.Fragment>
  );
}
