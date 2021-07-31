import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import DialogEditAddress from "@/components/profile/edit/DialogEditAddress";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/Loading";
import * as addressActions from "@/actions/address.action";
import theme from "@/utils/theme";
import Snackbars from "@/components/Snackbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    margin: {
      margin: theme.spacing(1),
    },
    paperStyle: {
      padding: "30px 20px",
      width: theme.spacing(80),
      margin: "20px auto",
    },

    headerStyle: {
      margin: 0,
    },
    avatarStyle: {
      backgroundColor: "#1bbd7e",
    },
    marginTop: {
      marginTop: 5,
    },
    paper: {
      padding: theme.spacing(2),
    },
    textfield: {
      marginBottom: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
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
interface Props {
  id: string;
}
export default function InputAdornments({ id }: Props) {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");
  const dispatch = useDispatch();
  const { addresses, isLoading, isMessage, isStatus } = useSelector(
    ({ address }: any) => address
  );
  const handleSelected = (id: string) => {
    dispatch(addressActions.updateStatus({ _id: id, addressStatus: 1 }));
  };
  const handleDelete = (id: string) => {
    dispatch(addressActions.updateStatus({ _id: id, addressStatus: 3 }));
  };
  const feedWithId = () => {
    dispatch(addressActions.getAddresses(id));
  };
  useEffect(() => {
    console.log(isStatus);
    if (isStatus === 201) {
      setTypeSnackbar("success");
      setOpenSnackbar(true);
    } else if (isStatus == 401 || isStatus == 400) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);
  useEffect(() => {
    feedWithId();
  }, []);
  return (
    <div>
      <Loading open={isLoading} />
      <Snackbars
        open={true}
        handleCloseSnakbar={setOpenSnackbar}
        message={isMessage}
        type={typeSnackbar}
      />
      <Grid container alignItems="center"
        justify="center" spacing={0} direction="column">
        <Avatar className={classes.avatarStyle}>
          <AddCircleOutlineOutlinedIcon />
        </Avatar>
        <br />
        <h2 className={classes.headerStyle}>ข้อมูลที่อยู่ </h2>
        <Typography variant="caption" gutterBottom>
          รายละเอียดข้อมูลที่อยู่
        </Typography>
        <Snackbars
          open={true}
          handleCloseSnakbar={setOpenSnackbar}
          message="test"
          type={typeSnackbar}
        />
        {addresses.map((address) => {
          return (
            <>
              <Card className={classes.root}>
                <Grid container spacing={3}
                alignItems="center"
                justify="center">
                  <Grid item xs={6}>
                    {address.addressName}
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      bgcolor="background.paper"
                    >
                      <Box>
                        {address.addressStatus == 1 && (
                          <Chip
                            style={{
                              marginRight: theme.spacing(5),
                            }}
                            size="small"
                            label="ตั้งเป็นค่าเริ่มต้น"
                            color="secondary"
                          />
                        )}
                      </Box>
                      <Box>
                        <DialogEditAddress {...address} />
                      </Box>
                      <Box>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleSelected(address._id)}
                        >
                          เลือก
                        </Button>
                      </Box>
                      <Box>
                        {address.addressStatus == 1 ? (
                          <Button
                            size="small"
                            color="primary"
                            disabled
                            onClick={() => handleDelete(address._id)}
                          >
                            ลบ
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => handleDelete(address._id)}
                          >
                            ลบ
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {address.shippingAddress}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
              <br />
            </>
          );
        })}
      </Grid>
    </div>
  );
}
