import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { urlApi } from "@/context/urlapi";
import {
  createStyles,
  makeStyles,

  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import ButtonSubmit from "@/components/ButtonSubmit";
//call redux
import { useSelector, useDispatch } from "react-redux";
import * as allbankActions from "@/actions/allbank.action";
import * as aboutActions from "@/actions/about.action";


interface About {
  title: string;
  detail: string;
  image: File;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    paper: {
      marginTop: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: theme.spacing(50),
    },
  })
);

export default function EditAbout({data}) {
  //useState
  const { isUploading, allbanks } = useSelector(({ allbank }: any) => allbank);
  const dispatch = useDispatch();
  const feedWithId = () => {
    dispatch(allbankActions.getAllbanks());
  };
  
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [about, setAbout] = React.useState<About>({
    title: data.title,
    detail:data.detail,
    image: data.image,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAbout({ ...about, title: e.target.value });
  };
  const handleDetail = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAbout({ ...about, detail: e.target.value });
  };
  const handlePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAbout({ ...about, image: event.currentTarget.files[0] });
    var reader = new FileReader();
    var url = reader.readAsDataURL(event.currentTarget.files[0]);
    reader.onloadend = function (e) {
      setPreviewPhoto(reader.result);
    }.bind(this);
  };
  const handleSubmit = () => {
    // return console.log(about);
    if (about.image == null) {
      return alert(about);
    } else {
      const form = new FormData();
      form.append("image", about.image);
      form.append("title", about.title);
      form.append("detail", about.detail);
      dispatch(aboutActions.createAbout(form));
      setOpen(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {

    feedWithId();
  }, []);

  return (
    <div>
      <Button color="primary"
        variant="contained" onClick={handleClickOpen}>
        แก้ไข
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"ข้อมูลบัญชี"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="aboutTitle"
                      name="aboutTitle"
                      variant="outlined"
                      required
                      fullWidth
                      onChange={handleTitle}
                      id="aboutTitle"
                      value={about.title}
                      label={`หัวข้อบทความ`}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="aboutDetail"
                      name="aboutDetail"
                      variant="outlined"
                      required
                      fullWidth
                      value={about.detail}
                      onChange={handleDetail}
                      id={`aboutDetail`}
                      label="รายละเอียดบทความ"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl className={classes.formControl}>
                      <Button
                        variant="contained"
                        color="primary"
                        component="label"
                      >
                        Upload File
                        <input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={handlePicture.bind(this)}
                          hidden
                        />
                      </Button>
                    </FormControl>

                    {
                      previewPhoto
                        ?
                        <img src={`${previewPhoto}`} width="400" height="400" />
                        : <img src={`${urlApi}uploads/aboutus/${data.image}`} width="400" height="400" />
                    }
                  </Grid>
                </Grid>
              </form>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonSubmit handleSubmit={handleSubmit} isUploading={isUploading} />
          <Button autoFocus onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
