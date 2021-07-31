import React from "react";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { numberWithCommas } from "@/utils/service";
import { urlApi } from "@/context/urlapi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxListProduct: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      borderBottom: "2px solid #000",
      marginBottom: 5,
    },
    photo: {
      width: 80,
      height: 80,
    },
    boxDetails: {
      width: "100%",
      marginLeft: 10,
    },
    priceAndqty: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

interface Props {
  _id: string;
  price: number;
  quantity: number;
  productId: any;
}

const CheckoutMobile = ({ _id, price, quantity, productId }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.boxListProduct}>
      <div className="div">
        <img
          className={classes.photo}
          src={`${urlApi}uploads/${productId.images[0]}`}
          alt=""
        />
      </div>
      <div className={classes.boxDetails}>
        <div>
          <Typography variant="body1" gutterBottom>
            {productId.title}
          </Typography>
        </div>
        <div>ราคา : {numberWithCommas(price)}฿</div>
        <div className={classes.priceAndqty}>
          <Typography variant="body1" gutterBottom>
            จำนวน : x {quantity}
          </Typography>
          <Typography variant="body1" gutterBottom style={{ color: "red" }}>
            รวม : {numberWithCommas(price * quantity)}฿
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CheckoutMobile;
