import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormAdmin from "@/components/admin/formadmin";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@/components/Snackbar";
import Loading from "@/components/Loading";
import * as adminActions from "@/actions/admin.action";

import { parseCookies } from "@/utils/token";
import { wrapper } from "@/wapper/store";
import MaterialComponent from "@/components/MaterialComponent";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { CsvBuilder } from "filefy";

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

interface adminState {
  _id: string;
  fullName: string;
  userName: string;
  passWord: string;
  role: string;
  email: string;
  tel: string;
}

const AdminIndex = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [typeSnackbar, settypeSnackbar] = useState<string>("error");
  const [openform, setOpenform] = useState<boolean>(false);
  const [titleform, setTitleform] = useState<string>("เพิ่มผู้ดูแลระบบ");
  const [adminObject, setAdminObject] = useState<adminState>({
    _id: "",
    fullName: "",
    userName: "",
    passWord: "",
    role: "",
    email: "",
    tel: "",
  });
  const [adminData, setAdminData] = useState<any[]>([]);

  const { isLoading, isUploading, isMessage, isStatus, admins } = useSelector(
    ({ admin }: any) => admin
  );
  const { adminPermission } = useSelector(({ permission }: any) => permission);

  const toggleCreateform = () => {
    setTitleform("เพิ่มผู้ดูแลระบบ");
    setOpenform(!openform);
  };

  const toggleEditform = (objectAdmin: adminState) => {
    setAdminObject({
      _id: objectAdmin._id,
      fullName: objectAdmin.fullName,
      userName: objectAdmin.userName,
      passWord: objectAdmin.passWord,
      role: objectAdmin.role,
      email: objectAdmin.email,
      tel: objectAdmin.tel,
    });
    setTitleform("แก้ไขผู้ดูแลระบบ");
    setOpenform(!openform);
  };

  const handleSelected = (rows) => {
    if (rows.length > 0) {
      Swal.fire({
        title: "คุณแน่ใจ?",
        text: "คุณแน่ใจว่าต้องการลบรายการที่เลือกทั้งหมด!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          let newsIdsDeleted = [];
          for (let index = 0; index < rows.length; index++) {
            newsIdsDeleted.push(rows[index]._id);
          }
          dispatch(adminActions.deletedAdmin(newsIdsDeleted));
        }
      });
    }
  };

  const dofeed = async () => {
    await dispatch(adminActions.feedAdmins());
  };

  const EditComponent = ({ row }) => {
    return (
      <React.Fragment>
        <IconButton onClick={() => toggleEditform(row)}>
          <EditIcon />
        </IconButton>
      </React.Fragment>
    );
  };

  const columns = [
    { title: "ชื่อ-นามสกุล", field: "fullName" },
    { title: "ชื่อผู้ใช้", field: "userName" },
    { title: "อีเมล์", field: "email" },
    { title: "เบอร์โทรศัพท์", field: "tel" },
    { title: "ระดับ", field: "role" },
    { title: "สร้างเมื่อ", field: "createdAt" },
    { title: "แก้ไข", field: "edit" },
  ];

  const exportData = (rows) => {
    let exportsData = [];
    rows.map((item) => {
      exportsData.push([
        item.fullName,
        item.userName,
        item.email,
        item.role,
        item.tel,
        item.createdAt,
      ]);
    });

    var csvBuilder = new CsvBuilder("admin_list.csv")
      .setColumns([
        "ชื่อ-นามสกุล",
        "ชื่อผู้ใช้",
        "อีเมล์",
        "เบอร์โทรศัพท์",
        "ระดับ",
        "สร้างเมื่อ",
      ])
      .addRows(exportsData)
      .exportFile();
  };

  useEffect(() => {
    dofeed();
  }, []);

  useEffect(() => {
    //handle upload if return status == 201 | 200 is mean create success
    if (isStatus === 201 || isStatus === 200) {
      settypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
      setAdminObject({
        _id: "",
        fullName: "",
        userName: "",
        passWord: "",
        role: "",
        email: "",
        tel: "",
      });
      setOpenform(false);
    } else if (isStatus == 401 || isStatus == 400) {
      //handle upload if return status == 400 | 401 is mean create not success
      settypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);

  useEffect(() => {
    if (admins.length > 0) {
      setAdminData([]);
      admins.map((row) => {
        let newDate = dayjs(row.createdAt).format("DD-MM-YYYY HH:mm:ss");
        row.createdAt = newDate;
        row.edit = <EditComponent row={row} />;
        setAdminData((pre) => [...pre, row]);
      });
    }
  }, [admins]);
  return (
    <Layout>
      <Loading open={isLoading || isUploading} />
      <Snackbar
        open={openSnackbar}
        handleCloseSnakbar={setOpenSnackbar}
        message={isMessage}
        type={typeSnackbar}
      />
      <Paper className={classes.root} elevation={4}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {adminPermission[21] ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => toggleCreateform()}
              >
                เพิ่มผู้ดูแลระบบ
              </Button>
            ) : (
              ""
            )}
            <FormAdmin
              title={titleform}
              openform={openform}
              handleForm={setOpenform}
              adminObject={adminObject}
              setAdminObject={setAdminObject}
              isUploading={isUploading}
            />
            <br />
            <br />
          </Grid>
          <Grid item xs={12}>
            <MaterialComponent
              title={"รายการผู้ดูแลระบบ"}
              selectionBoolean={true}
              columns={columns}
              rows={adminData}
              handleDelete={handleSelected}
              exportData={exportData}
            />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default AdminIndex;
