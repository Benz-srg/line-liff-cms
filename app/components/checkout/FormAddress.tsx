import React, { Dispatch, SetStateAction } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import * as customerActions from "@/actions/customer.action";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  customer: any;
}

const FormAddress = ({ open, setOpen, customer }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = React.useState<any>({});
  const [activeAddress, setActiveAddress] = React.useState<any>("");

  const handleChangeActiveAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActiveAddress((event.target as HTMLInputElement).value);
  };

  const handleSetAddress = () => {
    //set data customer.address
    dispatch(customerActions.setAddress(activeAddress));
    handleClose();
  };

  React.useEffect(() => {
    if (customer) {
      setNewAddress(customer);
      setActiveAddress(customer.shippingAddress);
    }
  }, [customer]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">เปลี่ยนที่อยู่</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={activeAddress}
                  onChange={handleChangeActiveAddress}
                >
                  {Object.entries(customer).length > 0
                    ? customer.address.map((address) => (
                        <FormControlLabel
                          key={address._id}
                          value={address._id}
                          control={<Radio />}
                          label={address.shippingAddress}
                        />
                      ))
                    : ""}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: "8px 24px" }}>
          <Button onClick={handleClose} color="primary">
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            onClick={handleSetAddress}
            color="primary"
          >
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormAddress;
