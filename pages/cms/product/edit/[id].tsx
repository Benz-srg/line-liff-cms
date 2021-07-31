import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
  withStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import * as productAction from "@/actions/product.action";
import { useSelector, useDispatch } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as categoriesAction from "@/actions/categories.action";
import * as productActions from "@/actions/product.action";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import Snackbars from "@/components/Snackbar";
import Loading from "@/components/Loading";
import Chip from "@material-ui/core/Chip";
import { urlApi } from "@/context/urlapi";
import ButtonBack from "@/components/ButtonBack";
import FormEditer from "../../../../app/components/product/FormEditer";
import InputText from "@/components/InputText";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const param = await context.query;
  return {
    props: { id: param.id },
  };
};

const ButtonSubmit = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

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
      marginBottom: theme.spacing(1),
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
    boxImageRoot: {
      flexGrow: 1,
      display: "flex",
    },
    boxImage: {
      width: "100%",
      height: 200,
      background: "#A9A9A9",
    },
    boxImages: {
      width: "100%",
      height: 200,
      position: "relative",
    },
    imageinside: {
      width: "100%",
      height: 200,
      cursor: "pointer",
    },
    removeImage: {
      position: "absolute",
      right: 1,
      color: "#0057D9",
      cursor: "pointer",
      "& :hover": {
        color: "red",
      },
    },
    addImage: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 200,
    },
    input: {
      display: "none",
    },
  })
);

interface editProduct {
  _id: string;
  title: string;
  price: number;
  saleprice: number;
  quantity: number | string;
  images: any[];
  categoriesId: string | number;
  relatedIds: string[];
  ispopulated: number;
  description: any;
  averageRating: number;
  size: string;
  sku: string; 
  statusNewProduct: number;
}

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

const Edit = ({ id }) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { categories } = useSelector(({ categorie }: any) => categorie);
  const { productId, products, isStatus, isMessage, isUploading, isLoading } =
    useSelector(({ product }: any) => product);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");
  const [productObject, setProductObject] = useState<editProduct>({
    _id: "",
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
    statusNewProduct: 0,
  });

  const handleUpdateProduct = () => {
    const parseJson = JSON.stringify(productObject.description);
    setProductObject({ ...productObject, description: parseJson });
    dispatch(productActions.updateProduct(productObject));
  };

  const handleFeedProduct = async () => {
    dispatch(categoriesAction.feedCategoreis());
    await dispatch(productAction.queryProductWithId(id));
    await dispatch(productAction.feedProduct());
  };

  const handleChangeCategories = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setProductObject({
      ...productObject,
      categoriesId: event.target.value as string,
    });
  };

  const handleChangeOpenNewproduct = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setProductObject({
      ...productObject,
      statusNewProduct: event.target.value as number,
    });
  };

  //เลือกเป็นสินค้านิยม
  const handleIspopulated = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProductObject({
      ...productObject,
      ispopulated: event.target.value as number,
    });
  };
  //สินค้าเกี่ยวข้อง
  const handleRelatedId = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProductObject({
      ...productObject,
      relatedIds: event.target.value as string[],
    });
  };
  //ลบรูปภาพ
  const handleDeleteImage = (objectId: string, pathName: string) => {
    dispatch(productActions.deleteImage(objectId, pathName));
  };
  //เพิ่มรูปภาพ
  const handleCreateImage = (event: any, id: string) => {
    const imagefile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", imagefile);
    formData.append("id", id);
    dispatch(productActions.increaseImage(formData));
  };

  //แก้ไข Editer
  const handleEditor = (newState) => {
    setProductObject({ ...productObject, description: newState });
  };

  useEffect(() => {
    //feed product
    handleFeedProduct();
  }, []);

  useEffect(() => {
    //ถ้า productId มีค่า ให้ทำการอัพเดท และ รีเรนเดอ ดาต้า
    if (productId.length > 0) {
      //setProductObject(productId[0]);
      const {
        _id,
        title,
        price,
        saleprice,
        quantity,
        images,
        categoriesId,
        relatedIds,
        ispopulated,
        description,
        averageRating,
        size,
        sku,
        statusNewProduct
      } = productId[0];
      const parserDescription = JSON.parse(description);
      setProductObject({
        _id: _id,
        title: title,
        price: price,
        saleprice: saleprice,
        quantity: quantity,
        images: images,
        categoriesId: categoriesId,
        relatedIds: relatedIds,
        ispopulated: ispopulated,
        description: parserDescription,
        averageRating: averageRating,
        size: size,
        sku: sku,
        statusNewProduct: statusNewProduct,
      });
      let imagesLen = productId[0].images.length;
      if (imagesLen < 5) {
        for (let index = imagesLen; index < 5; index++) {
          productId[0].images.push("add Image");
        }
      }
    }
  }, [productId]);

  useEffect(() => {
    //toggle แจ้งเตือน
    if (isStatus === 201) {
      setTypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
    } else if (isStatus == 401 || isStatus == 400) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus, categories]);

  return (
    <Layout>
      <Paper className={classes.root} elevation={2}>
        <Loading open={isLoading || isUploading} />
        <Snackbars
          open={openSnackbar}
          handleCloseSnakbar={setOpenSnackbar}
          message={isMessage}
          type={typeSnackbar}
        />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <ButtonBack />
            <br />
            <Typography variant="h5" component="h2" gutterBottom>
              แก้ไขรายการสินค้า
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <InputText
              type="text"
              id="title"
              label="ชื่อสินค้า"
              classes={classes.textfield}
              value={productObject.title}
              SetonChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductObject({ ...productObject, title: e.target.value })
              }
              error={false}
              helperText={""}
            />
            <InputText
              type="text"
              id="sku-outlined"
              label="รหัสสินค้า"
              classes={classes.textfield}
              value={productObject.sku}
              SetonChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductObject({ ...productObject, sku: e.target.value })
              }
              error={false}
              helperText={""}
            />
            <InputText
              type="number"
              id="quantity"
              label="จำนวนสินค้า"
              classes={classes.textfield}
              value={productObject.quantity}
              SetonChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductObject({ ...productObject, quantity: e.target.value })
              }
              error={false}
              helperText={""}
            />

            <InputText
              type="number"
              id="price"
              label="ราคา"
              classes={classes.textfield}
              value={productObject.price}
              SetonChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductObject({
                  ...productObject,
                  price: Number(e.target.value),
                })
              }
              error={false}
              helperText={""}
            />

            <InputText
              type="number"
              id="priceSale"
              label="ราคาส่วนลด"
              classes={classes.textfield}
              value={productObject.saleprice}
              SetonChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductObject({
                  ...productObject,
                  saleprice: Number(e.target.value),
                })
              }
              error={false}
              helperText={""}
            />

            <InputText
              type="text"
              id="size"
              label="ประเภทสินค้า"
              classes={classes.textfield}
              value={productObject.size}
              SetonChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductObject({
                  ...productObject,
                  size: e.target.value as string,
                })
              }
              error={false}
              helperText={
                "ประเภทสินค้า ยกตัวอย่างเช่นสี กรณีมีหลายสีให้ใส่ , ด้านหลังเช่น ดำ, ขาว, น้ำเงิน "
              }
            />
            <InputText
              type="number"
              id="rating"
              label="คะแนนสินค้า"
              classes={classes.textfield}
              value={productObject.averageRating}
              SetonChange={(e) =>
                setProductObject({
                  ...productObject,
                  averageRating: e.target.value,
                })
              }
              error={false}
              helperText={""}
            />

            {/* ประเภทสินค้า */}
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="categories">หมวดหมู่สินค้า</InputLabel>
              <Select
                labelId="categories"
                id="categories"
                value={productObject.categoriesId}
                onChange={handleChangeCategories}
                label="หมวดหมู่สินค้า"
                className={classes.textfield}
              >
                {categories
                  ? categories.map((cate, index) => (
                      <MenuItem key={index} value={cate._id}>
                        {cate.categoriesName}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            {/*  */}
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="demo-simple-select-outlined-label">
                กำหนดเป็นสินค้ายอดนิยม
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={productObject.ispopulated}
                onChange={handleIspopulated}
                label="กำหนดเป็นสินค้ายอดนิยม"
                className={classes.textfield}
              >
                <MenuItem value="0">ปกติ</MenuItem>
                <MenuItem value="1">นิยม</MenuItem>
              </Select>
            </FormControl>
            {/*  */}
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="open-newproduct">เปิดเป็นสินค้าใหม่</InputLabel>
              <Select
                labelId="open-newproduct"
                id="item-open-newproduct"
                value={productObject.statusNewProduct}
                onChange={handleChangeOpenNewproduct}
                label="เปิดเป็นสินค้าใหม่"
                className={classes.textfield}
              >
                <MenuItem value={0}>ไม่เปิด</MenuItem>
                <MenuItem value={1}>เปิด</MenuItem>
              </Select>
            </FormControl>
            {/*  */}
          </Grid>
          {/* สินค้าเกี่ยวข้อง || relationsIds */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-mutiple-chip-label">
                สินค้าอิ่นๆที่เกี่ยวข้อง
              </InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={productObject.relatedIds}
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
                          productObject.relatedIds,
                          theme
                        )}
                      >
                        {product.title}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Grid>
          {/* image */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {productObject.images.map((row, index) => (
                <Grid item xs={2} key={index}>
                  <Paper className={classes.boxImage}>
                    {row !== "add Image" ? (
                      <div className={classes.boxImages}>
                        <IconButton
                          className={classes.removeImage}
                          onClick={() => handleDeleteImage(id, row)}
                        >
                          <CancelIcon />
                        </IconButton>

                        <img
                          src={`${urlApi}uploads/${row}`}
                          alt={productObject.title}
                          className={classes.imageinside}
                        />
                      </div>
                    ) : (
                      <div className={classes.addImage}>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="icon-button-file"
                          type="file"
                          //
                          onChange={(e) => handleCreateImage(e, id)}
                        />
                        <label htmlFor="icon-button-file">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                          >
                            <AddIcon />
                          </IconButton>
                        </label>
                      </div>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* Editor */}
          {productObject.description != "" ? (
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <FormEditer
                  content={productObject.description}
                  handleEditor={handleEditor}
                />
              </FormControl>
            </Grid>
          ) : (
            ""
          )}

          {/*  */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <ButtonSubmit
                variant="contained"
                color="primary"
                onClick={() => handleUpdateProduct()}
              >
                บันทึก
              </ButtonSubmit>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Edit;
