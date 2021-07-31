import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PreviewPromotion from "@/components/home/PreviewPromotion";
import * as promotionActions from "@/actions/promotion.action";
import Loading from "@/components/Loading";
import { urlApi } from "@/context/urlapi";
import Snackbars from "@/components/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import ImageSlider from "@/components/home/ImageSlider";

import { useSelector, useDispatch } from "react-redux";
import * as bannerActions from "@/actions/banner.action";

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
    boxImageRoot: {
      flexGrow: 1,
      display: "flex",
    },
    boxImage: {
      width: "100%",
      height: 200,
      background: "#A9A9A9",
    },
    boxImages: {
      width: "100%",
      height: 200,
      position: "relative",
    },
    imageinside: {
      width: "100%",
      height: 200,
      cursor: "pointer",
    },
    removeImage: {
      position: "absolute",
      right: 1,
      color: "red",
      cursor: "pointer",
      "& :hover": {
        color: "red",
      },
    },
    addImage: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 200,
    },
  })
);

const BannerIndex = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bannerReducer = useSelector((state: any) => state.banner);
  const [photos, setPhotos] = useState<any>([]);

  //upload new photo banner
  const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesImage = event.currentTarget.files[0];
    if (filesImage) {
      const formData = new FormData();
      formData.append("photo", filesImage);
      dispatch(bannerActions.uploadImage(formData));
    }
  };

  //decrease photo banner
  const handleDelete = (objectId: string) => {
    dispatch(bannerActions.deleteImage(objectId));
  };

  //fetch banner
  const handleDofeedBanner = () => {
    dispatch(bannerActions.feedBanner());
  };

  useEffect(() => {
    handleDofeedBanner();
  }, []);

  useEffect(() => {
    if (bannerReducer.photos.length >= 0) {
      if (bannerReducer.photos.length < 5) {
        let newPhoto = [];
        newPhoto = bannerReducer.photos;
        const payload = {
          photo: "add Image",
        };
        let countPhoto = newPhoto.length;
        for (let index = countPhoto; index < 5; index++) {
          newPhoto.push(payload);
        }
        setPhotos(newPhoto);
      } else {
        setPhotos(bannerReducer.photos);
      }
    }
  }, [bannerReducer.photos]);
  return (
    <Layout>
      <Paper className={classes.root}>
        <Loading open={bannerReducer.isLoading || bannerReducer.isUploading} />
        <Grid container justify="space-around">
          {photos.map((row, index) => (
            <Grid item xs={2} key={index}>
              <Paper className={classes.boxImage}>
                {row.photo !== "add Image" ? (
                  <div className={classes.boxImages}>
                    <IconButton
                      className={classes.removeImage}
                      onClick={() => handleDelete(row._id)}
                    >
                      <CancelIcon />
                    </IconButton>

                    <img
                      src={`${urlApi}uploads/banner/${row.photo}`}
                      //alt={productObject.title}
                      className={classes.imageinside}
                    />
                  </div>
                ) : (
                  <div className={classes.addImage}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                      //
                      onChange={handleChangePhoto}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <AddIcon />
                      </IconButton>
                    </label>
                  </div>
                )}
              </Paper>
            </Grid>
          ))}
          {/* preview Slider */}
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <Typography variant="h3" component="h4">
                ตัวอย่าง Banner
              </Typography>
              <ImageSlider photos={bannerReducer.photos} />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default BannerIndex;
