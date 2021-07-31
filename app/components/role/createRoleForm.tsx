import React, { Dispatch, SetStateAction, useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useDispatch } from "react-redux";
import * as roleActions from "@/actions/role.action";

interface props {
  openform: boolean;
  handleForm: Dispatch<SetStateAction<boolean>>;
  setRoleObject: Dispatch<SetStateAction<object>>;
}

const FormDialog = ({ openform, handleForm, setRoleObject }: props) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ roleName: "" });
  const handleClose = () => {
    setRoleObject({
      _id: "",
      roleName: "",
    });
    handleForm(false);
  };

  const onChangeHandle = (e: any) => {
    setForm({
      roleName: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(form);
    await dispatch(roleActions.createRole(form));
    handleClose();
    setRoleObject({
      _id: "",
      roleName: "",
    });
    setForm({ roleName: "" });
  };

  return (
    <React.Fragment>
      <Dialog
        open={openform}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">เพิ่มตำแหน่งผู้ดูแล</DialogTitle>
        <DialogContent>
          <DialogContentText>
            กรุณากรอกชื่อตำแหน่งผู้ดูแลที่ท่านต้องการสร้าง
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="roleName"
            label="ชื่อตำแหน่งผู้ดูแล"
            type="email"
            value={form.roleName}
            fullWidth
            onChange={onChangeHandle}
          />
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
