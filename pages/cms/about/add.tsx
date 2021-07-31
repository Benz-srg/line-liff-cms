import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import * as categoriesAction from "@/actions/categories.action";
import FormCategoriesDialog from "@/components/product/categoriesform";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import * as productAction from "@/actions/product.action";
import Snackbars from "@/components/Snackbar";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ButtonBack from "@/components/ButtonBack";
import FormEditer from "../../../app/components/product/FormEditer";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(title: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(title) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface newProduct {
  title: string;
  price: number | string;
  saleprice: number | string;
  quantity: number | string;
  images: any[];
  categoriesId: string;
  relatedIds: any[];
  ispopulated: number | string;
  description: string | string;
  averageRating: number | string;
  size: string;
  sku: string;
}

const Addproduct = () => {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [categoriesv, setCategories] = React.useState("0");
  const [product, setProduct] = useState<newProduct>({
    title: "",
    price: 1,
    saleprice: 0,
    quantity: 0,
    images: [],
    categoriesId: "",
    relatedIds: [],
    ispopulated: 0,
    description: "",
    averageRating: 0,
    size: "",
    sku: "",
  });
  const [openformCategories, setOpenformCategories] = useState(false);

  /* Editor */
  const [editorState, setEditorState] = useState<any>(null);

  const handleEditor = (state) => {
    setEditorState(state);
  };

  /*  */

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");

  const { categorie } = useSelector((state: any) => state);
  const productReducer = useSelector(({ product }: any) => product);
  const { categories, isLoading } = categorie;
  const productLoading: boolean = productReducer.isLoading;
  const { isMessage, isStatus, products } = productReducer;
  /* handle function  */

  //handleChange categories or create categories
  const handleChangeCategories = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategories(event.target.value as string);
    setProduct({ ...product, categoriesId: event.target.value as string });
    if (event.target.value === "openform")
      return setOpenformCategories(!openformCategories);
  };

  const handleRelatedId = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProduct({ ...product, relatedIds: event.target.value as string[] });
  };

  //change populated bool 0 or 1
  const handleIspopulated = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProduct({ ...product, ispopulated: event.target.value as number });
  };

  //change images files limit 3
  const handleChangeFiles = (files: File[]) => {
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      setProduct({
        ...product,
        images: [...product.images, ...files],
      });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price as string);
    formData.append("saleprice", product.saleprice as string);
    formData.append("quantity", product.quantity as string);
    formData.append("categoriesId", product.categoriesId);
    formData.append("ispopulated", product.ispopulated as string);
    formData.append("averageRating", product.averageRating as string);
    formData.append("description", JSON.stringify(editorState));
    formData.append("sku", product.sku);
    formData.append("size", product.size);
    for (let index = 0; index < product.images.length; index++) {
      formData.append(`images`, product.images[index]);
    }
    //append relation ความสัมพันสินค้า
    if (product.relatedIds.length <= 0) {
      formData.append(`relatedIds`, "");
    } else {
      for (let index = 0; index < product.relatedIds.length; index++) {
        formData.append(`relatedIds`, product.relatedIds[index]);
      }
    }

    dispatch(productAction.createProduct(formData));
  };
  useEffect(() => {
    dispatch(categoriesAction.feedCategoreis());
    dispatch(productAction.feedProduct());
  }, []);

  useEffect(() => {
    if (isStatus === 201) {
      setProduct({
        title: "",
        price: 1,
        saleprice: 0,
        quantity: 0,
        images: [],
        categoriesId: "",
        relatedIds: [],
        ispopulated: 0,
        description: "",
        averageRating: 0,
        size: "",
        sku: "",
      });
      setCategories("0");
      setTypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
    } else if (isStatus == 401 || isStatus == 400) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);

  return (
    <Layout>
      <div> {router.pathname} </div>
      <Loading open={isLoading || productLoading} />
      <Snackbars
        open={openSnackbar}
        handleCloseSnakbar={setOpenSnackbar}
        message={isMessage}
        type={typeSnackbar}
      />
      <Paper className={classes.paper}>
        <FormCategoriesDialog
          open={openformCategories}
          handleClose={setOpenformCategories}
        />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <ButtonBack />
            <br />
            <Typography variant="h5" component="h2" gutterBottom>
              เพิ่มรายการสินค้า
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              {" "}
              <TextField
                id="title"
                label="ชื่อสินค้า"
                variant="outlined"
                className={classes.textfield}
                size="small"
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
                required
                autoComplete="off"
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="demo-simple-select-outlined-label">
                ประเภทสินค้า
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={categoriesv}
                onChange={handleChangeCategories}
                label="Category"
                className={classes.textfield}
              >
                <MenuItem value="0">โปรดเลือกรายการ</MenuItem>
                <MenuItem value="openform">เพิ่มประเภทรายการสินค้า</MenuItem>
                {categories
                  ? categories.map((cate) => (
                      <MenuItem key={cate._id} value={cate._id}>
                        {cate.categoriesName}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <DropzoneArea
              acceptedFiles={["image/*", "video/*", "application/*"]}
              onChange={handleChangeFiles.bind(this)}
              showFileNames
              dropzoneText="Drop product images"
              showAlerts={true}
              filesLimit={5}
              getFileLimitExceedMessage={(filesLimit) => {
                return `สามารถเพิ่มรูปได้ ${filesLimit} รูปเท่านั้น `;
              }}
              alertSnackbarProps={{
                anchorOrigin: { vertical: "bottom", horizontal: "center" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <TextField
                id="sku"
                label="รหัสสินค้า"
                variant="outlined"
                className={classes.textfield}
                size="small"
                placeholder="ABC0001"
                value={product.sku}
                onChange={(e) =>
                  setProduct({ ...product, sku: e.target.value })
                }
                autoComplete="off"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="price"
                label="ราคา"
                variant="outlined"
                className={classes.textfield}
                size="small"
                placeholder="0"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: Number(e.target.value) })
                }
                type="number"
                autoComplete="off"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="saleprice"
                label="ราคาส่วนลด"
                variant="outlined"
                className={classes.textfield}
                size="small"
                value={product.saleprice}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    saleprice: Number(e.target.value),
                  })
                }
                type="number"
                autoComplete="off"
              />
            </FormControl>
            {/* select multiple items */}
            <FormControl fullWidth>
              <InputLabel id="demo-mutiple-chip-label">
                สินค้าอิ่นๆที่เกี่ยวข้อง
              </InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={product.relatedIds}
                onChange={handleRelatedId}
                className={classes.textfield}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {(selected as string[]).map((value) => {
                      const val = products.find((item) => value == item._id);
                      return (
                        <Chip
                          key={value}
                          label={val ? val.title : value}
                          className={classes.chip}
                        />
                      );
                    })}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {products.length > 0
                  ? products.map((product) => (
                      <MenuItem
                        key={product._id}
                        value={product._id}
                        style={getStyles(
                          product.title,
                          product.relatedIds,
                          theme
                        )}
                      >
                        {product.title}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="demo-simple-select-outlined-label">
                กำหนดเป็นสินค้ายอดนิยม
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={product.ispopulated}
                onChange={handleIspopulated}
                label="Category"
                className={classes.textfield}
              >
                <MenuItem value="0">ปกติ</MenuItem>
                <MenuItem value="1">นิยม</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="size"
                label="ขนาดสินค้า"
                variant="outlined"
                className={classes.textfield}
                size="small"
                placeholder="x,m,l"
                value={product.size}
                onChange={(e) =>
                  setProduct({ ...product, size: e.target.value })
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <FormEditer
                content={editorState}
                handleEditor={handleEditor}
               
              />
            </FormControl>
            <FormControl fullWidth>
              <Button onClick={onSubmit} variant="contained" color="primary">
                บันทึก
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Addproduct;
