import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PreviewPromotion from "@/components/home/PreviewPromotion";
import * as promotionActions from "@/actions/promotion.action";
import { useSelector, useDispatch } from "react-redux";
import Loading from "@/components/Loading";
import { urlApi } from "@/context/urlapi";
import ButtonSubmitComponent from "@/components/ButtonSubmit";
import Snackbars from "@/components/Snackbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    input: {
      display: "none",
    },
    icon: {
      color: "#fff",
      marginLeft: theme.spacing(2),
    },
  })
);

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}


interface Props extends SwitchProps {
  classes: Styles;
}
const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const Promotion = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openPromotion, setOpenPromotion] = useState<boolean>(false);
  const [photos, setPhotos] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const promotionReducer = useSelector((state: any) => state.promotion);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenPromotion(event.target.checked);
  };

  const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhotos(event.currentTarget.files[0]);
    var reader = new FileReader();
    var url = reader.readAsDataURL(event.currentTarget.files[0]);
    reader.onloadend = function (e) {
      setPreviewPhoto(reader.result);
    }.bind(this);
  };

  const handleFeed = () => {
    dispatch(promotionActions.feed());
  };

  const handleSubmit = () => {
    if (photos == null) {
      return alert("กรุณาเลือกรูปภาพ หรือเปลี่ยนภาพที่ต้องการบันทึก");
    } else {
      const form = new FormData();
      form.append("photo", photos);
      form.append("statusPromotion", JSON.stringify(openPromotion));
      dispatch(promotionActions.uploadPromotion(form));
    }
  };

  useEffect(() => {
    if (
      promotionReducer.photos.photo !== "" &&
      promotionReducer.photos.statusPromotion !== ""
    ) {
      if (promotionReducer.photos.statusPromotion === true) {
        setOpenPromotion(promotionReducer.photos.statusPromotion);
        let url = `${urlApi}uploads/promotion/${promotionReducer.photos.photo}`;
        setPreviewPhoto(url);
      }
    } else {
      handleFeed();
    }
  }, [promotionReducer.photos]);

  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState<string>("error");

  useEffect(() => {
    if (promotionReducer.isStatus == 201) {
      setTypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
    } else if (
      promotionReducer.isStatus == 401 ||
      promotionReducer.isStatus == 400
    ) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [promotionReducer.isStatus]);

  return (
    <Layout>
      <Paper className={classes.root}>
        <Loading open={promotionReducer.isLoading} />
        <Snackbars
          open={openSnackbar}
          handleCloseSnakbar={setOpenSnackbar}
          message={promotionReducer.isMessage}
          type={typeSnackbar}
        />
        <Grid container>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <IOSSwitch
                  checked={openPromotion}
                  onChange={handleChange}
                  name="checkedPromotion"
                />
              }
              label="เปิดใช้งานแสดงโปรโมชั่น"
            />
          </Grid>
          <Grid item xs={12}>
            <div>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleChangePhoto.bind(this)}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload <PhotoCamera className={classes.icon} />
                </Button>
              </label>
            </div>
          </Grid>
          <Grid item xs={12}>
            {/* preview */}
            <div style={{ marginTop: 5 }}>
              <img src={previewPhoto} width="400" height="400" />
            </div>
            <PreviewPromotion
              open={openPreview}
              setOpen={setOpenPreview}
              photo={previewPhoto}
            />
            <br />
            <ButtonSubmitComponent
              isUploading={promotionReducer.isUploading}
              handleSubmit={handleSubmit}
            />
            {previewPhoto && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenPreview(true)}
                style={{ marginLeft: 5 }}
              >
                ตัวอย่างโปรโมชั่น
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Promotion;
