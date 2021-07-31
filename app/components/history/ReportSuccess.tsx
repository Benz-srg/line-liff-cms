import React, { useEffect, useState, forwardRef } from "react";
import MaterialTable from "material-table";
import { checkOrderStatus, checkPadding } from "@/utils/constans";
import dayjs from "dayjs";
import Loading from "../Loading";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import th from "dayjs/locale/th";
import DayjsUtils from "@date-io/dayjs";
/*  */
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as historiesActions from "@/actions/history.action";
/*  */

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Icons } from "material-table";

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

/*  */

interface Props {
  numofTab: number;
}
const ReportSuccess = ({ numofTab }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const historyReducer = useSelector((state: any) => state.history);
  const [tableData, setTableData] = useState([]);
  const doFeed = () => {
    dispatch(historiesActions.feedHistoriesSuccess());
  };

  useEffect(() => {
    if (numofTab === 0) {
      doFeed();
    }
  }, [numofTab]);

  useEffect(() => {
    if (historyReducer.histories.length > 0) {
      setTableData([]);
      historyReducer.histories.map((row) => {
        let textdescription: string = "";
        row.products.forEach((item) => {
          textdescription += `${item.productId.title} (${item.quantity}) \n`;
        });
        let rows = {
          name: row.customerId.fullName,
          products: textdescription,
          orderStatus: checkOrderStatus(row.orderStatus),
          paidStatus: checkPadding(row.paidStatus),
          total: row.total,
          discount: row.total,
          totalPrice: row.totalprice,
          updatedAt: dayjs(row.updatedAt).format("DD-MM-YYYY H:m:s"),
          button: (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleChangeDescription(row._id)}
            >
              รายละเอียด
            </Button>
          ),
        };
        setTableData((old) => [...old, rows]);
      });
    }
  }, [historyReducer.histories]);

  const handleChangeDescription = (id) => {
    if (id) {
      router.push({ pathname: `/cms/history/${id}` });
    }
  };

  const columns = [
    { title: "ชื่อ-นามสกุล", field: "name" },
    { title: "รายละเอียดสินค้า", field: "products", sorting: false },
    { title: "สถานะการชำระ", field: "orderStatus" },
    { title: "สถานะการจัดส่ง", field: "paidStatus" },
    { title: "รวม", field: "total" },
    { title: "ส่วนลด", field: "discount" },
    { title: "ราคาสุทธิ", field: "totalPrice" },
    { title: "รายละเอียด", field: "button", sorting: false },
  ];
  const [dateStart, setDateStart] = React.useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );

  const [dateEnd, setDateEnd] = React.useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );

  const handleDateChange = (date, value) => {
    setDateStart(dayjs(date).format("YYYY-MM-DD"));
  };

  const handleDateEnd = (date) => {
    setDateEnd(dayjs(date).format("YYYY-MM-DD"));
  };

  const handleSearchDate = () => {
    const convertDateStart = dayjs(dateStart).format("YYYY-MM-DD");
    const convertDateEnd = dayjs(dateEnd).format("YYYY-MM-DD");
    const dateStartIso = dayjs(convertDateStart).toISOString();
    const dateEndIso = dayjs(convertDateEnd).toISOString();
    dispatch(
      historiesActions.feedHistoriesWithTypeAndDate(4, dateStartIso, dateEndIso)
    );
  };

  return (
    <React.Fragment>
      <Loading open={historyReducer.isLoading} />
      <MuiPickersUtilsProvider locale={th} utils={DayjsUtils}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={4}>
            <KeyboardDatePicker
              autoOk
              className="dateTimeModalPicker"
              inputVariant="outlined"
              label={"เริ่มต้น"}
              format="DD-MM-YYYY"
              value={dateStart}
              onChange={handleDateChange}
              cancelLabel="ยกเลิก"
            />
          </Grid>
          <Grid item xs={4}>
            <KeyboardDatePicker
              autoOk
              className="dateTimeModalPicker"
              inputVariant="outlined"
              label={"ถึงวันที่"}
              format="DD-MM-YYYY"
              value={dateEnd}
              onChange={handleDateEnd}
              cancelLabel="ยกเลิก"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={handleSearchDate}
              fullWidth
              variant="contained"
              color="primary"
            >
              ค้นหา
            </Button>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
      <br />
      <MaterialTable
        icons={tableIcons}
        title="ประวัติการซื้อขายสำเร็จ"
        data={tableData}
        columns={columns}
        options={{
          selection: true,
          exportButton: { csv: true, pdf: false },
          exportAllData: true,
        }}
      />
    </React.Fragment>
  );
};

export default ReportSuccess;
