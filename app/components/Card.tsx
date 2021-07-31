import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import Rating from "@material-ui/lab/Rating";
import { numberWithCommas } from "@/utils/service";
import { urlApi } from "@/context/urlapi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      height: "auto",
      [theme.breakpoints.down("sm")]: {
        height: 291,
      },
    },
    media: {
      width: 345,
      height: 345,
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
        height: "auto",
      },
    },
    image: {
      width: "100%",
      height: 345,
      objectFit: "cover",
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
        width: 178,
        objectFit: "cover",
        height: 178,
      },
    },
    title: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
      },
    },
    boxdescription: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    boxdescriptionMobile: {
      [theme.breakpoints.up("sm")]: {
        display: "block",
        fontSize: 14,
      },
    },
    boxPriceAndstart: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

const CardItem = (props) => {
  const classes = useStyles();
  const router = useRouter();

  const handlePush = () => {
    router.push({ pathname: `/product/${props._id}` });
  };

  return (
    <Card className={classes.root} onClick={handlePush}>
      <CardActionArea>
        <LazyLoadImage
          effect="blur"
          src={`${urlApi}uploads/${props.images[0]}`}
          className={`${classes.media} ${classes.image}`}
          alt={props.title}
          width="100%"
          height="345"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            className={classes.title}
          >
            {props.title.length > 31
              ? `${props.title.slice(0, 31)}...`
              : props.title}
          </Typography>
          <div className={classes.boxPriceAndstart}>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ color: "red" }}
            >
              ฿{numberWithCommas(props.price)}
            </Typography>
            <Rating
              name={props.title}
              defaultValue={props.averageRating}
              precision={0.5}
              readOnly
            />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
