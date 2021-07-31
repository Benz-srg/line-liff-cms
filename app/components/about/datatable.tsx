import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as aboutAction from "@/actions/about.action";

import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
interface Props {
  _id: string;
  title: string;
  detail: string;
  image: string;
  status: string;
}
interface About {
  _id: string;
  title: string;
  detail: string;
  image: string;
  status: string;
}
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function datatable({
  _id,
  title,
  detail,
  image,
  status,
}: Props) {
  //useState
  const { isUploading, allbanks } = useSelector(({ allbank }: any) => allbank);
  const dispatch = useDispatch();
  const feedWithId = () => {
    dispatch(aboutAction.feedAbout());
  };
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [newPayment, setNewPayment] = useState<About>({
    _id: _id,
    title: title,
    detail: detail,
    image: image,
    status: status,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const setData = async () => {
    await setNewPayment({
      ...newPayment, 
      _id: _id,
      title: title,
      detail: detail,
      image: image,
      status: status,
    });
    console.log("testttttt");
    console.log(newPayment);
  }

  useEffect(() => {
    // setProductObject(productReducer.products[0]);
    feedWithId();
    
  }, []);
  useEffect(() => {
    // setProductObject(productReducer.products[0]);
    setData();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g {newPayment._id} serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}