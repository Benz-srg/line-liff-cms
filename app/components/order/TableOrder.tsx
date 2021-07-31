import React, { useEffect, useState, forwardRef } from "react";
import MaterialTable from "material-table";
import { checkOrderStatus, checkPadding } from "@/utils/constans";
import dayjs from "dayjs";
import Button from "@material-ui/core/Button";
/*  */
import { useRouter } from "next/router";
/*  */
import { tableIcons } from "@/utils/icons";

/*  */

const TableOrder = ({ orders }) => {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (orders.length > 0) {
      setTableData([]);
      orders.map((row) => {
        console.log(row);
        let rows = {
          name: row.customerId.fullName,
          note: row.note,
          orderStatus: checkOrderStatus(row.orderStatus),
          paidStatus: checkPadding(row.paidStatus),
          total: row.total,
          discount: row.total,
          totalPrice: row.totalprice,
          createdAt: dayjs(row.createdAt).format("DD-MM-YYYY H:m:s"),
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
  }, [orders]);

  const handleChangeDescription = (id) => {
    if (id) {
      router.push({ pathname: `/cms/order/${id}` });
    }
  };

  const columns = [
    { title: "ชื่อไลน์", field: "name" },
    { title: "หมายเหตุ", field: "note", sorting: false },
    { title: "สถานะการชำระ", field: "orderStatus" },
    { title: "สถานะการจัดส่ง", field: "paidStatus" },
    { title: "รวม", field: "total" },
    { title: "ส่วนลด", field: "discount" },
    { title: "ราคาสุทธิ", field: "totalPrice" },
    { title: "สร้างเมื่อ", field: "createdAt" },
    { title: "รายละเอียด", field: "button", sorting: false },
  ];

  return (
    <React.Fragment>
      <MaterialTable
        icons={tableIcons}
        title="รายการสั่งซื้อ"
        data={tableData}
        columns={columns}
        options={{
          selection: false,
          exportButton: { csv: true, pdf: true },
          exportAllData: true,
        }}
      />
    </React.Fragment>
  );
};

export default TableOrder;
