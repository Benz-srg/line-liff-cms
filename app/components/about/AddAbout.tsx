import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
  withStyles
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ButtonSubmit from "@/components/ButtonSubmit";
import CardActionArea from "@material-ui/core/CardActionArea";
//call redux
import { grey } from "@material-ui/core/colors";
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
const CardArea = withStyles((theme: Theme) => ({
  spaceWidth: {
    maxWidth: 345,
  },
  root: {
    color: "#fff",
    backgroundColor: grey[500],
    "&:hover": {
      backgroundColor: grey[700],
    },
    padding: theme.spacing(1, 5),
  },
}))(Card);
export default function DialogEditPayment() {
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
    title: "",
    detail:
      "",
    image: null,
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
      form.append("image", about.image[0]);
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
    // setProductObject(productReducer.products[0]);
    feedWithId();
  }, []);

  return (
    <div>
      <Button color="primary"
        variant="contained" onClick={handleClickOpen}>
        เพิ่มบทความ
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"เพิ่มบทความ"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <TextField
                    required={true}
                    autoFocus
                    margin="dense"
                    id="code"
                    label="หัวข้อบทความ"
                    helperText="ชื่อที่อยู่ เช่น บ้าน อพาร์ทเม้นท์"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    value={about.title}
                    onChange={handleTitle}
                    inputProps={{
                      maxLength: 8,
                    }}
                    style={{ width: "90%" }}
                  />
                  <TextField
                    required={true}
                    autoFocus
                    multiline
                    rows={5}
                    rowsMax={5}
                    margin="dense"
                    id="code"
                    label="รายละเอียดบทความ"
                    placeholder="เพิ่มรายละเอียดบทความ"
                    type="number"
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    value={about.detail}
                    onChange={handleDetail}
                    inputProps={{
                      maxLength: 10,
                    }}
                    style={{ width: "90%" }}
                  />

                </Grid>
                <br />

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
                        <img src={previewPhoto} width="400" height="400" />
                        : ""
                    }
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
