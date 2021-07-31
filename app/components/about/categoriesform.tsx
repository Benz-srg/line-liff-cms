import React, { Dispatch, SetStateAction } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import * as categoriesAction from "@/actions/categories.action";
import Snackbars from "../Snackbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    width: 600,
  },
  boxcard: {
    display: "flex",
    alignItems: "center",
  },
  firstItem: {
    flexGrow: 1,
  },
  boxEdit: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

interface Open {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

export default function FormCategoriesDialog({ open, handleClose }: Open) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [categoriesName, setCategoriesName] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackBartype, setSnackBartype] = React.useState("error");
  const [editCategories, setEditCategories] = React.useState({
    id: "",
    categoriesName: "",
    edit: false,
  });
  const { categorie } = useSelector((state: any) => state);
  const { categories, isMessage, isUploading, isStatus } = categorie;
  const handleCloseDialog = () => {
    handleCancleEdit();
    handleClose(!open);
  };

  const handleCreatecategories = () => {
    let action = "create";
    if (editCategories.edit === true) action = "edit";
    //setBlockButton(!blockButton);
    switch (action) {
      case "create":
        if (categoriesName == "" || categoriesName == undefined) {
          return alert("กรุณาใส่ชื่อประเภทสินค้า");
        }
        dispatch(categoriesAction.createCategories(categoriesName));
        break;

      case "edit":
        dispatch(
          categoriesAction.updateCategories(
            editCategories.id,
            editCategories.categoriesName
          )
        );

      default:
        break;
    }
  };

  const handleDelete = (categoriesId) => {
    dispatch(categoriesAction.deleteCategories(categoriesId));
  };

  const handleCancleEdit = () => {
    setEditCategories({
      ...editCategories,
      id: "",
      categoriesName: "",
      edit: !editCategories.edit,
    });
  };

  React.useEffect(() => {
    if (isStatus == 201) {
      setSnackBartype("success");
      setCategoriesName("");
      setOpenSnackbar(!openSnackbar);
      /*  setTimeout(() => {
        setOpenSnackbar(!openSnackbar);
      }, 3000); */
      if (editCategories.edit === true) handleCancleEdit();
    } else if (isStatus == 401 || isStatus == 400) {
      setCategoriesName("");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        fullWidth
      >
        <DialogTitle id="form-dialog-title">ประเภทรายการสินค้า</DialogTitle>
        <DialogContent>
          <Snackbars
            open={openSnackbar}
            handleCloseSnakbar={setOpenSnackbar}
            message={isMessage}
            type={snackBartype}
          />
          {!editCategories.edit ? (
            <div>
              <Card style={{ marginBottom: 2 }}>
                <CardContent className={classes.boxcard}>
                  <Typography
                    className={classes.firstItem}
                    variant="body2"
                    gutterBottom
                  >
                    ประเภทสินค้า
                  </Typography>
                  <Button>จัดการ</Button>
                </CardContent>
              </Card>
              {categories
                ? categories.map((cate) => (
                    <Card key={cate._id} style={{ marginBottom: 2 }}>
                      <CardContent className={classes.boxcard}>
                        <Typography
                          className={classes.firstItem}
                          variant="body2"
                          gutterBottom
                        >
                          {cate.categoriesName}
                        </Typography>
                        <Button
                          onClick={() =>
                            setEditCategories({
                              ...editCategories,
                              id: cate._id,
                              categoriesName: cate.categoriesName,
                              edit: !editCategories.edit,
                            })
                          }
                        >
                          แก้ไข
                        </Button>
                        <Button onClick={() => handleDelete(cate._id)}>
                          ลบ
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                : "ไม่พบรายการประเภทสินค้า"}
              <TextField
                autoFocus
                margin="dense"
                id="categoriesName"
                label="รายการสินค้า"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={categoriesName}
                onChange={(e) => setCategoriesName(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <div className={classes.boxEdit}>
                <h3>แก้ไขรายการ</h3>
                <Button
                  style={{ color: "#fff", background: "#FF4500" }}
                  onClick={() => handleCancleEdit()}
                >
                  กลับ
                </Button>
              </div>
              <TextField
                autoFocus
                margin="dense"
                id="categoriesName"
                label="รายการสินค้า"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={editCategories.categoriesName}
                onChange={(e) =>
                  setEditCategories({
                    ...editCategories,
                    categoriesName: e.target.value,
                  })
                }
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isUploading}
            onClick={() => handleCloseDialog()}
            color="primary"
          >
            ยกเลิก
          </Button>
          <Button
            disabled={isUploading}
            style={{ background: "#00e676", color: "#fff" }}
            onClick={() => handleCreatecategories()}
          >
            บันทึก{" "}
            {isUploading ? (
              <CircularProgress style={{ marginLeft: 10 }} size={18} />
            ) : null}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
