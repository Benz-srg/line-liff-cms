import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout";
import DataTable from "@/components/about/datatable";
import Loading from "@/components/Loading";
import DeleteIcon from '@material-ui/icons/Delete';
import * as productAction from "@/actions/product.action";
import * as aboutAction from "@/actions/about.action";
import { useDispatch, useSelector } from "react-redux";
import Snackbars from "@/components/Snackbar";
import { urlApi } from "@/context/urlapi";
import Typography from "@material-ui/core/Typography";
import AddAbout from "@/components/about/AddAbout";
import EditAbout from "@/components/about/EditAbout";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Swal from 'sweetalert2'
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    table: {
      minWidth: 650,
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

const List = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  // const { product } = useSelector((state: any) => state);
  const { about } = useSelector((state: any) => state);
  const { abouts, isLoading, isMessage, isStatus } = about;
  // const { abouts } = about;

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");

  const handleDelAbout = (id: string) => {

    Swal.fire({
      title: 'คุณต้องการที่จะลบบทความนี้หรือไม่',
      showCancelButton: true,
      confirmButtonText: `ใช่`,
      cancelButtonText: `ยกเลิก`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(`คุณได้ลบบทความแล้ว`, '', 'success')
        dispatch(aboutAction.deleteAbout(id));

      }
    })

  }

  useEffect(() => {
    // dispatch(productAction.feedProduct());
    dispatch(aboutAction.feedAbout());

  }, []);

  useEffect(() => {
    if (isStatus === 201) {
      setTypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
    } else if (isStatus == 401 || isStatus == 400) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);

  return (
    <Layout>
      <Loading open={isLoading} />
      <Snackbars
        open={openSnackbar}
        handleCloseSnakbar={setOpenSnackbar}
        message={isMessage}
        type={typeSnackbar}
      />
      <div>{router.pathname}</div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
        
          <Paper elevation={1} className={classes.root}>
            <AddAbout />
            <br />
            <Typography
          variant="h6"
          id="tableTitle"
          component="div"
        >
          จัดการบทความ
        </Typography>
        <br/>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">หัวข้อเรื่อง</TableCell>
                    <TableCell align="left">รายละเอียด</TableCell>
                    <TableCell align="center">รูปภาพ</TableCell>
                    <TableCell colSpan={2} align="center">จัดการ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {abouts.map((about) => (
                    <TableRow key={about.name}>
                      <TableCell component="th" scope="row">
                        {about.title}
                      </TableCell>
                      <TableCell align="left">{about.detail}</TableCell>
                      <TableCell align="left"><img src={`${urlApi}uploads/aboutus/${about.image}`} width="400" height="400" /></TableCell>

                      <TableCell align="center">
                        <EditAbout data={about} />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelAbout(about._id)}
                          startIcon={<DeleteIcon />}
                        >
                          ลบ
                        </Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default List;
