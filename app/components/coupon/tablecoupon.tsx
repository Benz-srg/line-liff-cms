import React, { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { green, red } from "@material-ui/core/colors";
import DoneIcon from "@material-ui/icons/Done";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import * as couponActions from "@/actions/coupon.action";
import _ from "lodash";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "_id",
    numeric: false,
    disablePadding: true,
    label: "รหัสคูปอง",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "เปิดใช้งานคูปอง",
  },
  {
    id: "percentSale",
    numeric: true,
    disablePadding: false,
    label: "กำหนดส่วนลดเป็น %",
  },
  {
    id: "priceSale",
    numeric: true,
    disablePadding: false,
    label: "ส่วนลด",
  },
  {
    id: "productAvaliable",
    numeric: true,
    disablePadding: false,
    label: "สินค้าที่นำคูปองไปใช้ได้",
  },
  {
    id: "couponLimit",
    numeric: true,
    disablePadding: false,
    label: "จำนวนคูปองคงเหลือ",
  },
  {
    id: "createdAt",
    numeric: true,
    disablePadding: false,
    label: "สร้างเมื่อ",
  },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  })
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  deleted: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected, deleted } = props;
  const dispatch = useDispatch();
  const [visibleFilter, setVisibleFilter] = React.useState(false);
  const couponReducer = useSelector((state: any) => state.coupon);
  const { adminPermission } = useSelector(({ permission }: any) => permission);
  const handleFilter = () => {
    setVisibleFilter(!visibleFilter);
  };

  const handleFilterText = (input) => {
    const text = input.toUpperCase();
    const result = _.filter(couponReducer.filterCoupons, (fill) => {
      if (fill.code.includes(text)) {
        return true;
      }
      return false;
    });
    dispatch(couponActions.filterCoupon(result));
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <React.Fragment>
          {!visibleFilter ? (
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              รายการลูกค้า
            </Typography>
          ) : (
            <div className={classes.title}>
              <TextField
                fullWidth
                variant="outlined"
                label="ค้นหา คูปอง"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFilterText(e.target.value)
                }
                style={{ width: "80%" }}
              />
            </div>
          )}
        </React.Fragment>
      )}
      {numSelected > 0 && adminPermission[16] ? (
        <Tooltip title="Delete" onClick={() => deleted()}>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <React.Fragment>
          <Tooltip title="Filter list">
            {!visibleFilter ? (
              <IconButton aria-label="filter list" onClick={handleFilter}>
                <SearchIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="cancel list" onClick={handleFilter}>
                <CancelIcon />
              </IconButton>
            )}
          </Tooltip>
        </React.Fragment>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    open: {
      background: green[600],
      color: "white",
    },
    close: {
      background: red[600],
      color: "white",
    },
  })
);

interface Data {
  _id: string;
  code: string;
  action: number;
  percentSale: number;
  priceSale: number;
  productAvaliable: any; // objectId ของสินค้า
  couponLimit: number;
  createdAt: string;
  active: string;
}

interface data {
  handleForm: Dispatch<SetStateAction<object>>;
  coupons: Data[];
}

export default function CouponTable({ handleForm, coupons }: data) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("createdAt");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const { adminPermission } = useSelector(({ permission }: any) => permission);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = coupons.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    dispatch(couponActions.deleteCoupon(selected));
    setSelected([]);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, coupons.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          deleted={handleDelete}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={coupons.length}
            />
            <TableBody>
              {stableSort(coupons, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id as string);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) =>
                            handleClick(event, row._id as string)
                          }
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.code}
                      </TableCell>
                      <TableCell
                        align="right"
                        className={
                          row.action === 1 ? classes.open : classes.close
                        }
                      >
                        {row.action === 1 ? <DoneIcon /> : <CancelIcon />}
                      </TableCell>
                      <TableCell align="right">{row.percentSale}</TableCell>
                      <TableCell align="right">{row.priceSale}</TableCell>
                      <TableCell align="right">
                        {row.productAvaliable.length > 0
                          ? row.productAvaliable.map((product, ip) => (
                              <Typography key={ip}>{product.title}</Typography>
                            ))
                          : ""}
                      </TableCell>
                      <TableCell align="right">{row.couponLimit}</TableCell>
                      <TableCell align="right">
                        {dayjs(row.createdAt).format("DD/MM/YYYY HH:mm:s")}
                      </TableCell>
                      <TableCell align="right">
                        {adminPermission[17] ? (
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleForm(row as object)}
                          >
                            <EditIcon />
                          </IconButton>
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 40, 80, 100]}
          component="div"
          count={coupons.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
