import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { defaultPermission } from "@/utils/constans";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//SelectId
import Switch from "@material-ui/core/Switch";

// import Loading from "@/components/Loading";

import { useDispatch, useSelector } from "react-redux";
import * as permissionActions from "@/actions/permission.action";

interface permissionState {
  _id: string;
  roleId: string;
  roleName: string;
  permission: any;
}

interface props {
  openform: boolean;
  handleForm: Dispatch<SetStateAction<boolean>>;
  roleObject: permissionState;
  setRoleObject: Dispatch<SetStateAction<object>>;
}

const useStyles = makeStyles({
  table: {
    minWidth: 1024,
  },
  modal: {
    maxWidth: "100% !important",
  },
});

const FormDialog = ({
  openform,
  handleForm,
  roleObject,
  setRoleObject,
}: props) => {
  //use Import module
  const dispatch = useDispatch();
  const classes = useStyles();
  //constructor
  const { permissions } = useSelector(({ permission }: any) => permission);
  const [permissionDetail, setPermissionDetail] = useState({});
  useEffect(() => {
    if (
      Object.keys(permissions).length != 0 &&
      Object.keys(permissionDetail).length == 0
    ) {
      setPermissionDetail(permissions.permission[0]);
    }
  }, [permissionDetail, permissions]);
  useEffect(() => {
    if (Object.keys(permissions).length != 0) {
      setPermissionDetail(permissions.permission[0]);
    }
  }, [permissions]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(
      permissionActions.updatePermission(permissions._id, permissionDetail)
    );
    handleClose();
  };

  const onChangeHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPermissionDetail({
      ...permissionDetail,
      [e.target.name]: e.target.checked,
    });
  };

  const handleClose = () => {
    setRoleObject({
      _id: "",
      roleId: "",
      permission: [],
    });
    setPermissionDetail({});
    handleForm(false);
  };

  return (
    <React.Fragment>
      {/* <Loading open={isLoading || isUploading} /> */}
      <Dialog
        open={openform}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        className={classes.modal}
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">
          จัดการสิทธิ์ผู้ดูแล ตำแหน่ง: {roleObject.roleName}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ลำดับ</TableCell>
                  <TableCell align="right">สิทธิ์</TableCell>
                  <TableCell align="right">การอนุญาต</TableCell>
                  <TableCell align="right">ตัวเลือก</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permissions.length != 0
                  ? Object.keys(permissionDetail).map(function (key, index) {
                      return (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {index}
                          </TableCell>
                          <TableCell align="right">
                            {defaultPermission[index]}
                          </TableCell>
                          <TableCell align="right">
                            {permissions.permission[0][key]}
                          </TableCell>
                          <TableCell align="right">
                            <Switch
                              checked={permissionDetail[index]}
                              onChange={onChangeHandle}
                              name={`${index}`}
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            />
                          </TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      );
                    })
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={handleSubmit} color="primary">
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FormDialog;
