import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
// Admin components
import RoleTable from "@/components/role/roleTable";
import CreateRole from "@/components/role/createRoleForm";
import ManagePermission from "@/components/role/managePermission";

import Snackbar from "@/components/Snackbar";

import { useDispatch, useSelector } from "react-redux";
import * as roleActions from "@/actions/role.action";

//for serverside
import { wrapper } from "@/wapper/store";
import { parseCookies } from "@/utils/token";

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req }) => {
    let user = await parseCookies(req);
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/cms/signin",
        },
      };
    }
    return {
      props: { user, data: { props: { user } } },
    };
  }
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      // minHeight: "80vh",
      //color: theme.palette.text.secondary,
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

interface roleState {
  _id: string;
  roleId: string;
  roleName: string;
  permission: any;
}

interface roleNameState {
  _id: string;
  roleName: string;
}

const Role = () => {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [typeSnackbar, settypeSnackbar] = useState<string>("error");
  const [openform, setOpenform] = useState<boolean>(false);
  const [openManageForm, setOpenManageForm] = useState<boolean>(false);
  const [roleObject, setRoleObject] = useState<roleState>({
    _id: "",
    roleId: "",
    roleName: "",
    permission: [],
  });
  const { adminPermission } = useSelector(({ permission }: any) => permission);
  const [roleNameObject, setRoleNameObject] = useState<roleNameState>({
    _id: "",
    roleName: "",
  });
  const dispatch = useDispatch();

  const { roles, isLoading, isUploading, isMessage, isStatus } = useSelector(
    ({ role }: any) => role
  );

  const toggleCreateform = () => {
    setOpenform(!openform);
  };

  const toggleManageform = (objectRole: roleState) => {
    console.log(objectRole);
    setRoleObject({
      _id: objectRole._id,
      roleId: objectRole.roleId,
      roleName: objectRole.roleName,
      permission: objectRole.permission,
    });
    setOpenManageForm(!openManageForm);
  };

  useEffect(() => {
    //handle upload if return status == 201 | 200 is mean create success
    if (isStatus === 201 || isStatus === 200) {
      settypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
      setRoleNameObject({
        _id: "",
        roleName: "",
      });
      setOpenform(false);
    } else if (isStatus == 401 || isStatus == 400) {
      //handle upload if return status == 400 | 401 is mean create not success
      settypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);

  const doGetRoles = async () => {
    await dispatch(roleActions.getAllRoles());
  };

  useEffect(() => {
    doGetRoles();
  }, [isStatus]);

  return (
    <Layout>
      <Snackbar
        open={openSnackbar}
        handleCloseSnakbar={setOpenSnackbar}
        message={isMessage}
        type={typeSnackbar}
      />
      <Paper className={classes.root} elevation={4}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {adminPermission[24] ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => toggleCreateform()}
              >
                เพิ่มตำแหน่งระดับผู้ดูแลระบบ
              </Button>
            ) : (
              ""
            )}
            <CreateRole
              openform={openform}
              handleForm={setOpenform}
              setRoleObject={setRoleNameObject}
            />
            <ManagePermission
              openform={openManageForm}
              handleForm={setOpenManageForm}
              roleObject={roleObject}
              setRoleObject={setRoleObject}
            />
            <br />
            <br />
            <RoleTable handleForm={toggleManageform} roles={roles} />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Role;
