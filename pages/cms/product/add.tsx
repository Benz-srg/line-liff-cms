import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
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
import * as productAction from "@/actions/product.action";
import Snackbars from "@/components/Snackbar";
import Loading from "@/components/Loading";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ButtonBack from "@/components/ButtonBack";
import FormEditer from "../../../app/components/product/FormEditer";
import MultipleSelect from "@/components/product/MultipleSelect";
import InputText from "@/components/InputText";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
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
    dropZone: {
      padding: theme.spacing(0, 5),
    },
  })
);

interface newProduct {
  title: string;
  price: number | string;
  saleprice: number | string;
  quantity: number | string;
  images: any[];
  categoriesId: string;
  relatedIds: any[];
  ispopulated: number | string;
  description: string;
  averageRating: number | string;
  size: string;
  sku: string;
  openNewproduct: number | string;
}

const Addproduct = () => {
  const router = useRouter();
  const classes = useStyles();
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
    openNewproduct: 0,
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
  const { isMessage, isStatus, products, isUploading } = productReducer;
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

  const handleChangeOpenNewproduct = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setProduct({ ...product, openNewproduct: event.target.value as number });
  };

  //change populated bool 0 or 1
  const handleIspopulated = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProduct({ ...product, ispopulated: event.target.value as number });
  };

  //change images files limit 3
  const handleChangeFiles = (files: File[]) => {
    for (let i = 0; i < files.length; i++) {
      setProduct({
        ...product,
        images: [...product.images, ...files],
      });
    }
  };

  const handleDeleteFiles = (files) => {
    setProduct({
      ...product,
      images: [],
    });
    for (let i = 0; i < files.length; i++) {
      setProduct({
        ...product,
        images: [...product.images, ...files],
      });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    let errorMessage = "";
    if (product.images.length <= 0) {
      errorMessage = "กรุณาเลือกรูปภาพ";
    } else if (product.title == "") {
      errorMessage = "กรุณาใส่ชื่อสินค้า";
    } else if (product.price == 0 || product.price <= 0) {
      errorMessage = "ราคาไม่ถูกต้อง หรือ ราคาต้องมีค่ามาก 0";
    } else if (product.saleprice > product.price) {
      errorMessage = "ราคาส่วนลดต้องน้อยกว่าราคาขาย";
    } else if (product.categoriesId == "") {
      errorMessage = "กรุณาเลือกประเภทสินค้า";
    } else if (product.sku == "") {
      errorMessage = "กรุณาใส่รหัสสินค้า";
    }

    if (errorMessage != "") {
      return Swal.fire({
        icon: "error",
        title: "ตรวจสอบข้อมูล",
        text: errorMessage,
      });
    }

    let newSize: string[];
    const formData = new FormData();
    if (product.size != "") {
      let { size } = product;
      const newArray = size.split(",");
      newSize = newArray;
      for (const siz of newSize) {
        formData.append("size", siz);
      }
    }
    formData.append("title", product.title);
    formData.append("price", product.price as string);
    formData.append("saleprice", product.saleprice as string);
    formData.append("quantity", product.quantity as string);
    formData.append("categoriesId", product.categoriesId);
    formData.append("ispopulated", product.ispopulated as string);
    formData.append("averageRating", product.averageRating as string);
    formData.append("statusNewProduct", product.openNewproduct as string);
    formData.append("description", JSON.stringify(editorState));
    formData.append("sku", product.sku);
    for (let index = 0; index < product.images.length; index++) {
      formData.append(`images`, product.images[index]);
    }
    //append relation ความสัมพันสินค้า
    if (product.relatedIds.length <= 0) {
      formData.append(`relatedIds`, "");
    } else {
      for (let index = 0; index < product.relatedIds.length; index++) {
        formData.append(`relatedIds`, product.relatedIds[index]._id);
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
        openNewproduct: 0,
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
      <Loading open={isLoading || isUploading} />
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
            <InputText
              type="text"
              id="title"
              label="*ชื่อสินค้า"
              classes={classes.textfield}
              value={product.title}
              SetonChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              error={false}
              helperText={""}
            />
            {/*  */}
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="demo-simple-select-outlined-label">
                หมวดหมู่สินค้า
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={categoriesv}
                onChange={handleChangeCategories}
                label="หมวดหมู่สินค้า"
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
            {/* เปิดเป็นสินค้าไหม */}
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="open-newproduct">เปิดเป็นสินค้าใหม่</InputLabel>
              <Select
                labelId="open-newproduct"
                id="item-open-newproduct"
                value={product.openNewproduct}
                onChange={handleChangeOpenNewproduct}
                label="เปิดเป็นสินค้าใหม่"
                className={classes.textfield}
              >
                <MenuItem value={0}>ไม่เปิด</MenuItem>
                <MenuItem value={1}>เปิด</MenuItem>
              </Select>
            </FormControl>
            {/* ให้ดาวสินค้า  */}
            <InputText
              type="number"
              id="rating"
              label="คะแนนสินค้า"
              classes={classes.textfield}
              value={product.averageRating}
              SetonChange={(e) =>
                setProduct({ ...product, averageRating: e.target.value })
              }
              error={false}
              helperText={""}
            />
            {/*  */}
            <DropzoneArea
              dropzoneClass={classes.dropZone}
              initialFiles={product.images}
              acceptedFiles={["image/*"]}
              onChange={handleChangeFiles.bind(this)}
              onDelete={handleDeleteFiles.bind(this)}
              showFileNames
              dropzoneText="เพิ่มรูปภาพ"
              showAlerts={true}
              filesLimit={5}
              maxFileSize={3000000}
              getFileLimitExceedMessage={(filesLimit) => {
                return `สามารถเพิ่มรูปได้ ${filesLimit} รูปเท่านั้น `;
              }}
              alertSnackbarProps={{
                anchorOrigin: { vertical: "bottom", horizontal: "center" },
              }}
              getDropRejectMessage={(reject: File) => {
                return `ขนาดไฟล์รูปต้องไม่เกิน 3mb  `;
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <InputText
              type="text"
              id="sku"
              label="*รหัสสินค้า"
              classes={classes.textfield}
              value={product.sku}
              SetonChange={(e) =>
                setProduct({ ...product, sku: e.target.value })
              }
              error={false}
              helperText={""}
            />
            <InputText
              type="number"
              id="quantity"
              label="*จำนวนสินค้า"
              classes={classes.textfield}
              value={product.quantity}
              SetonChange={(e) =>
                setProduct({ ...product, quantity: Number(e.target.value) })
              }
              error={false}
              helperText={""}
            />
            <InputText
              type="number"
              id="price"
              label="ราคา"
              classes={classes.textfield}
              value={product.price}
              SetonChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
              error={false}
              helperText={""}
            />
            <InputText
              type="number"
              id="saleprice"
              label="ราคาส่วนลด"
              classes={classes.textfield}
              value={product.saleprice}
              SetonChange={(e) =>
                setProduct({ ...product, saleprice: Number(e.target.value) })
              }
              error={false}
              helperText={""}
            />
            {/*select multiple items  */}
            <FormControl fullWidth>
              <MultipleSelect
                products={products.length ? products : []}
                title="สินค้าแนะนำ"
                value={product}
                setValue={setProduct}
                className={classes.textfield}
              />
            </FormControl>
            {/*end select multiple items */}
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="demo-simple-select-outlined-label">
                กำหนดเป็นสินค้ายอดนิยม
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={product.ispopulated}
                onChange={handleIspopulated}
                label="กำหนดเป็นสินค้ายอดนิยม"
                className={classes.textfield}
              >
                <MenuItem value="0">ปกติ</MenuItem>
                <MenuItem value="1">นิยม</MenuItem>
              </Select>
            </FormControl>
            {/* ขนาดสินค้า , สี */}
            <InputText
              type="text"
              id="size"
              label="ประเภทสินค้า"
              classes={classes.textfield}
              value={product.size}
              SetonChange={(e) =>
                setProduct({ ...product, size: e.target.value as string })
              }
              error={false}
              helperText={
                "ประเภทสินค้า ยกตัวอย่างเช่นสี กรณีมีหลายสีให้ใส่ , ด้านหลังเช่น ดำ, ขาว, น้ำเงิน "
              }
            />
            <FormControl fullWidth>
              <FormEditer content={editorState} handleEditor={handleEditor} />
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
