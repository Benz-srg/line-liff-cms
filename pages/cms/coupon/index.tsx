import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Formcoupon from "@/components/coupon/formcoupon";
import Loading from "@/components/Loading";
import Snackbar from "@/components/Snackbar";
import MaterialComponent from "@/components/MaterialComponent";
import Swal from "sweetalert2";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
/* redux */
import * as couponActions from "@/actions/coupon.action";
import { useSelector, useDispatch } from "react-redux";

import { parseCookies } from "@/utils/token";
import { wrapper } from "@/wapper/store";
import dayjs from "dayjs";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
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

interface couponState {
  _id: string; //objectId
  code: string; //code coupon
  percentSale: number; //discount percent
  priceSale: number; //discount price
  couponLimit: number; //limit of coupon
  productAvaliable: any[]; //tag product use coupon
  action: number; //action is mean status open or close use coupon
}

const columns = [
  { title: "รหัสคูปอง", field: "code" },
  { title: "เปิดใช้งานคูปอง", field: "statusOpen" },
  { title: "ส่วนลด", field: "priceSale" },
  { title: "สินค้าที่นำคูปองไปใช้ได้", field: "nameproductrelations" },
  { title: "จำนวนคูปองคงเหลือ", field: "couponLimit" },
  { title: "สร้างเมื่อ", field: "createdAt" },
  { title: "แก้ไข", field: "edit", sorting: false },
];

const Coupon = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, isUploading, isMessage, isStatus, coupons } = useSelector(
    ({ coupon }: any) => coupon
  );
  const { adminPermission } = useSelector(({ permission }: any) => permission);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [typeSnackbar, settypeSnackbar] = useState("error");
  const [openform, setOpenform] = useState<boolean>(false);
  const [titleform, setTitleform] = useState<string>("สร้างคูปอง");
  const [couponObject, setCouponObject] = useState<couponState>({
    _id: "",
    code: "",
    percentSale: 0,
    priceSale: 0,
    couponLimit: 0,
    productAvaliable: [],
    action: 0,
  });
  const [couponData, setCouponData] = useState<any[]>([]);
  const [exportDatas, setexportDatas] = useState([]);
  /* handle toggle form create or edit */
  const toggleCreateform = () => {
    setTitleform("สร้างคูปอง");
    setOpenform(!openform);
  };
  const toggleEditform = (itemObject: couponState) => {
    let productAvaliableItems = [];
    itemObject.productAvaliable.map((product) => {
      productAvaliableItems.push(product._id);
    });
    setCouponObject({
      _id: itemObject._id,
      code: itemObject.code,
      percentSale: itemObject.percentSale,
      priceSale: itemObject.priceSale,
      couponLimit: itemObject.couponLimit,
      productAvaliable: productAvaliableItems,
      action: itemObject.action,
    });
    setTitleform("แก้ไขคูปอง");
    setOpenform(!openform);
  };
  /*  */
  //component button edit
  const EditComponent = ({ row }) => {
    return (
      <React.Fragment>
        <IconButton onClick={() => toggleEditform(row)}>
          <EditIcon />
        </IconButton>
      </React.Fragment>
    );
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
            dispatch(couponActions.deleteCoupon(newsIdsDeleted));
          }
        }
      });
    }
  };

  const exportData = (rows) => {
    let exportsData = [];
    rows.map((item) => {
      let status = item.action == 1 ? "เปิด" : "ปิด";
      exportsData.push([
        item.code,
        status,
        item.priceSale,
        item.nameproductrelations,
        item.couponLimit,
        item.createdAt,
      ]);
    });
    var csvBuilder = new CsvBuilder("coupon_list.csv")
      .setColumns([
        "รหัสคูปอง",
        "เปิดใช้งานคูปอง",
        "ส่วนลด",
        "สินค้าที่นำคูปองไปใช้ได้",
        "จำนวนคูปองคงเหลือ",
        "สร้างเมื่อ",
      ])
      .addRows(exportsData)
      .exportFile();
  };

  useEffect(() => {
    dispatch(couponActions.feedCoupons());
  }, []);

  useEffect(() => {
    if (isStatus === 201 || isStatus === 200) {
      settypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
      setCouponObject({
        _id: "",
        code: "",
        percentSale: 0,
        priceSale: 0,
        couponLimit: 0,
        productAvaliable: [],
        action: 0,
      });
      setOpenform(false);
    } else if (isStatus == 401 || isStatus == 400) {
      settypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);

  useEffect(() => {
    if (coupons.length > 0) {
      setCouponData([]);
      coupons.map((row) => {
        let nameProduct = "";
        let icon = <CheckIcon style={{ color: "green" }} />;
        if (row.action == 0) {
          icon = <CloseIcon style={{ color: "#FF0000" }} />;
        }
        for (let index = 0; index < row.productAvaliable.length; index++) {
          nameProduct += `${row.productAvaliable[index].title} \n`;
        }
        let newdate = dayjs(row.createdAt).format("DD-MM-YYYY HH:mm:ss");
        row.edit = <EditComponent row={row} />;
        row.nameproductrelations = nameProduct;
        row.createdAt = newdate;
        row.statusOpen = icon;
        setCouponData((pre) => [...pre, row]);
      });
    }
  }, [coupons]);

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
            {adminPermission[15] ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => toggleCreateform()}
              >
                สร้างคูปอง
              </Button>
            ) : (
              ""
            )}
            <Formcoupon
              title={titleform}
              openform={openform}
              handleForm={setOpenform}
              couponObject={couponObject}
              handleSetobjectId={setCouponObject}
              isUploading={isUploading}
            />
            <br />
            <br />
          </Grid>
          <Grid item xs={12}>
            <MaterialComponent
              title={"รายการคูปอง"}
              selectionBoolean={true}
              columns={columns}
              rows={couponData}
              handleDelete={handleSelected}
              exportData={exportData}
            />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Coupon;
