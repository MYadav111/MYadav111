import {
  Grid,
  TextField,
  Avatar,
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import { userStyle } from "./ProductCss";
import cart from "../../../assets/cart.png";
import logo from "../../../assets/logo.png";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import {
  currentDate,
  postData,
  getData,
} from "../../../services/FetchNodeAdminServices";

export default function Product() {
  const classes = userStyle();
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [picture, setPicture] = useState({
    bytes: "",
    fileName: cart,
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    setCategoryList(result.data);
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);

  const handleErrorMessages = (label, message) => {
    var msg = errorMessages;
    msg[label] = message;
    setErrorMessages((prev) => ({ ...prev, ...msg }));
  };

  const fillCategory = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const fillSubCategory = () => {
    return subCategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };

  const handleSubCategory = (cid) => {
    setCategoryId(cid);
    fetchAllSubCategory(cid);
  };

  const fillBrand = () => {
    return brandList.map((item) => {
      return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>;
    });
  };

  const handleBrand = (sid) => {
    setSubCategoryId(sid);
    fetchAllBrand(sid);
  };

  const fetchAllBrand = async (sid) => {
    var body = { subcategoryid: sid };
    var result = await postData("brand/get_all_brand_by_subcategoryid", body);
    setBrandList(result.data);
  };

  const fetchAllSubCategory = async (cid) => {
    var body = { categoryid: cid };
    var result = await postData(
      "subcategory/get_all_subcategory_by_categoryid",
      body
    );
    setSubCategoryList(result.data);
  };
  const validateData = () => {
    var err = false;
    if (categoryId.length == 0) {
      handleErrorMessages("categoryId", "Pls input Categoryid");
      err = true;
    }
    if (subCategoryId.length == 0) {
      handleErrorMessages("subcategoryId", "Pls input SubCategoryid");
      err = true;
    }
    if (brandId.length == 0) {
      handleErrorMessages("brandId", "Pls input Brandid");
      err = true;
    }
    if (productName.length == 0) {
      handleErrorMessages("productName", "Pls input Productname");
      err = true;
    }
    if (productDescription.length == 0) {
      handleErrorMessages(
        "productDescription",
        "Pls input Product Description"
      );
      err = true;
    }
    if (picture.bytes.length == 0) {
      handleErrorMessages("picture", "Pls upload Picture");
      err = true;
    }
    return err;
  };

  function handleImage(e) {
    handleErrorMessages("picture", null);
    setPicture({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
  }
  const resetValue = () => {
    setCategoryId("");
    setSubCategoryId("");
    setBrandId("");
    setProductName("");
    setProductDescription("");
    setPicture({ bytes: "", fileName: cart });
  };
  const handleSubmit = async () => {
    var err = validateData();
    if (err == false) {
      setLoadingStatus(true);
      var formData = new FormData();
      formData.append("categoryid", categoryId);
      formData.append("subcategoryid", subCategoryId);
      formData.append("brandid", brandId);
      formData.append("productname", productName);
      formData.append("product_description", productDescription);
      formData.append("picture", picture.bytes);
      formData.append("created_at", currentDate());
      formData.append("updated_at", currentDate());
      formData.append("user_admin", "Farzi");

      var result = await postData("product/product_submit", formData);
      if (result.status) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast: true,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast: true,
        });
      }
      setLoadingStatus(false);
      //resetValue();
    }
  };
  const handleReset = () => {
    resetValue();
  };

  return (
    <div className={classes.page}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.center}>
            <div className={classes.mainHeadingstyle}>
              <img src={logo} alt={logo} className={classes.imageStyle} />
              <div className={classes.headingStyle}>Product Register</div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Category Name</InputLabel>
              <Select
                onFocus={() => handleErrorMessages("categoryId", null)}
                error={!!errorMessages.categoryId}
                value={categoryId}
                label="CategoryId"
                onChange={(e) => handleSubCategory(e.target.value)}
              >
                {fillCategory()}
              </Select>
              <FormHelperText>
                <div className={classes.errorMessagestyle}>
                  {errorMessages?.categoryId}
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Subcategory Name</InputLabel>
              <Select
                value={subCategoryId}
                error={!!errorMessages.subCategoryId}
                onFocus={() => handleErrorMessages("subcategoryId", null)}
                label="subCategoryId"
                onChange={(e) => handleBrand(e.target.value)}
              >
                {fillSubCategory()}
              </Select>
              <FormHelperText>
                <div className={classes.errorMessagestyle}>
                  {errorMessages?.subCategoryId}
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Brand Id</InputLabel>
              <Select
                value={brandId}
                error={errorMessages?.brandId}
                onFocus={() => handleErrorMessages("brandId", null)}
                label="BrandId"
                onChange={(e) => setBrandId(e.target.value)}
              >
                {fillBrand()}
              </Select>
              <FormHelperText>
                <div className={classes.errorMessagestyle}>
                  {errorMessages?.brandId}
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              onFocus={() => handleErrorMessages("productName", null)}
              error={errorMessages?.productName}
              helperText={errorMessages?.productName}
              onChange={(e) => setProductName(e.target.value)}
              label="Product Name"
              value={productName}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onFocus={() => handleErrorMessages("productDescription", null)}
              error={errorMessages?.productDescription}
              helperText={errorMessages?.productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              label="Product Description"
              value={productDescription}
              fullWidth
            />
          </Grid>

          <Grid item xs={6} className={classes.center}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button variant="contained" component="label">
                Upload
                <input
                  onChange={handleImage}
                  hidden
                  type="file"
                  accept="image/*"
                  multiple
                />
              </Button>
              <div className={classes.errorMessagestyle}>
                {errorMessages?.picture != null ? (
                  errorMessages?.picture
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Avatar src={picture.fileName} variant="rounded"></Avatar>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <LoadingButton
              loading={loadingStatus}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={handleSubmit}
            >
              Save
            </LoadingButton>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Button onClick={handleReset} variant="contained">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
