import React, { useEffect, useState } from "react";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
/* redux */
import { useSelector, useDispatch } from "react-redux";
import * as customerActions from "@/actions/customer.action";
/*  */
import MaterialComponent from "@/components/MaterialComponent";

import { parseCookies } from "@/utils/token";
import { wrapper } from "@/wapper/store";
import { filterAddress } from "@/utils/service";
import Swal from "sweetalert2";
import Snackbars from "@/components/Snackbar";
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
    button: {
      marginBottom: theme.spacing(1),
    },
  })
);

const Customer = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, customers, isUploading, isMessage, isStatus } =
    useSelector(({ customer }: any) => customer);
  const [customerData, setCustomerData] = useState([]);

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
          dispatch(customerActions.deleteCustomer(newsIdsDeleted));
        }
      });
    }
  };

  const columns = [
    { title: "ชื่อ", field: "fullName" },
    { title: "เบอร์โทรศัพท์", field: "tel" },
    { title: "อีเมล์", field: "email" },
    { title: "ระดับ", field: "role" },
    { title: "เพศ", field: "sex" },
    { title: "อายุ", field: "age" },
    { title: "ที่อยู่สำหรับจัดส่ง", field: "shippingAddress" },
    { title: "แก้ไข", field: "edit", sorting: false },
  ];

  const exportData = (rows) => {
    let exportsData = [];
    rows.map((item) => {
      exportsData.push([
        item.liffName,
        item.fullName,
        item.tel,
        item.email,
        item.row,
        item.sex,
        item.age,
        item.shippingAddress,
      ]);
    });

    var csvBuilder = new CsvBuilder("customer_list.csv")
      .setColumns([
        "ชื่อไลน์",
        "ชื่อ-นามสกุล",
        "เบอร์โทรศัพท์",
        "อีเมล์",
        "ระดับ",
        "เพศ",
        "อายุ",
        "ที่อยู่สำหรับจัดส่ง",
      ])
      .addRows(exportsData)
      .exportFile();
  };

  useEffect(() => {
    dispatch(customerActions.feedCustomers());
  }, []);

  useEffect(() => {
    if (customers.length > 0) {
      setCustomerData([]);
      customers.map((row) => {
        if (row.role == "customer") row.role = "ลูกค้า";
        if (row.sex) {
          row.sex = "ชาย";
        }
        if (row.shippingAddress != "") {
          row.shippingAddress = filterAddress(row.address, row.shippingAddress);
        }
        row.edit = <EditComponent id={row._id} />;
        setCustomerData((pre) => [...pre, row]);
      });
    }
  }, [customers]);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");

  useEffect(() => {
    if (isStatus === 201) {
      setTypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
    } else if (isStatus == 401 || isStatus == 400) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);

  const handleEdit = (id: string) => {
    router.push({ pathname: `customer/edit/${id}` });
  };

  const EditComponent = ({ id }) => {
    return (
      <React.Fragment>
        <IconButton onClick={() => handleEdit(id)}>
          <EditIcon />
        </IconButton>
      </React.Fragment>
    );
  };

  return (
    <Layout>
      <Loading open={isLoading || isUploading} />
      <Paper className={classes.root} elevation={4}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Snackbars
              open={openSnackbar}
              handleCloseSnakbar={setOpenSnackbar}
              message={isMessage}
              type={typeSnackbar}
            />
            <MaterialComponent
              title={"รายการลูกค้า"}
              selectionBoolean={true}
              columns={columns}
              rows={customerData}
              handleDelete={handleSelected}
              exportData={exportData}
            />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Customer;
