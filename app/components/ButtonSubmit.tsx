import React from "react";
import {
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";

const ButtonSubmit = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
    padding: theme.spacing(1, 5),
  },
}))(Button);

interface submit {
  handleSubmit: () => void;
  isUploading: boolean;
}

const ButtonSubmitComponent = ({ handleSubmit, isUploading }: submit) => {
  return (
    <React.Fragment>
      <ButtonSubmit
        variant="contained"
        color="primary"
        onClick={() => handleSubmit()}
        disabled={isUploading}
      >
        บันทึก
        {isUploading ? (
          <CircularProgress
            color="primary"
            size={18}
            style={{ marginLeft: 5 }}
          />
        ) : null}
      </ButtonSubmit>
    </React.Fragment>
  );
};

export default ButtonSubmitComponent;
