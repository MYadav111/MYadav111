import { Grid, TextField, Avatar, Button, FormHelperText, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import cart from '../../../assets/cart.png'
import logo from '../../../assets/logo.png'
import Swal from "sweetalert2"
import SaveIcon from '@mui/icons-material/Save'
import { useState, useEffect } from "react";
import { userStyle } from "./BrandCss";
import { postData, getData, currentDate } from "../../../services/FetchNodeAdminServices"



export default function Brand() {
    const classes = userStyle()
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [errorMessages, setErrorMessages] = useState({})
    const [brandName, setBrandName] = useState('')
    const [brandIcon, setBrandIcon] = useState({ bytes: "", fileName: cart })
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [loadingStatus, setLoadingStatus] = useState(false)

    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategoryList(result.data)
        setSubCategoryList(result.data)
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const handleErrorMessages = (label, message) => {
        var msg = errorMessages
        msg[label] = message
        setErrorMessages((prev) => ({ ...prev, ...msg }))
    }

    const fillCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const fillSubCategory = () => {
        return subCategoryList.map((item) => {
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    const handleSubcategory = (cid) => {
        setCategoryId(cid);
        fetchAllSubCategory(cid);
    };

    const fetchAllSubCategory = async (cid) => {
        var body = { categoryid: cid };
        var result = await postData("subcategory/get_all_subcategory_by_categoryid", body);
        setSubCategoryList(result.data);
    }

    const validateData = () => {
        var err = false

        if (brandName.length == 0) {
            { handleErrorMessages('brandName', 'Pls input Brand Name') }
            err = true
        }
        if (brandIcon.bytes.length == 0) {
            { handleErrorMessages('brandIcon', 'Pls Upload Icon') }
            err = true
        }
        return err
    }

    const handleImage = (e) => {
        handleErrorMessages('brandIcon', null)
        setBrandIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
    }
    const resetValue = () => {
        setCategoryId('')
        setSubCategoryId('')
        setBrandName('')
        setBrandIcon({ bytes: '', fileName: cart })
    }
    const handleSubmit = async () => {
        var err = validateData()
        if (err == false) {
            setLoadingStatus(true)
            var formData = new FormData()
            formData.append('categoryid', categoryId)
            formData.append('subcategoryid', subCategoryId)
            formData.append('brandname', brandName)
            formData.append('brandicon', brandIcon.bytes)
            formData.append('created_at', currentDate())
            formData.append('updated_at', currentDate())
            formData.append('user_admin', 'Farzi')

            var result = await postData('brand/brand_submit', formData)
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: false
                });
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true
                });
            }
            setLoadingStatus(false)
            // resetValue()
        }
    }

    const handleReset = () => {
        resetValue()
    }

    return (
        <div className={classes.page}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.center}>
                        <div className={classes.mainHeadingStyle}>
                            <img src={logo} alt={logo} className={classes.imageStyle} />
                            <div className={classes.headingStyle} >Brand Register</div>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Category Name</InputLabel>
                            <Select onFocus={() => handleErrorMessages('categoryId', null)} error={!!errorMessages.categoryId} value={categoryId} label="CategoryId" onChange={(e) => handleSubcategory(e.target.value)}>
                                {fillCategory()}
                            </Select>
                            <FormHelperText ><div className={classes.errorMessageStyle}>{errorMessages?.categoryId}</div></FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Subcategory Name</InputLabel>
                            <Select onFocus={() => handleErrorMessages('subCategoryId', null)} error={!!errorMessages.subCategoryId} value={subCategoryId} label="subCategoryId" onChange={(e) => setSubCategoryId(e.target.value)}>
                                {fillSubCategory()}
                            </Select>
                            <FormHelperText ><div className={classes.errorMessageStyle}>{errorMessages?.subCategoryId}</div></FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onFocus={() => handleErrorMessages('brandName', null)} error={errorMessages?.brandName} helperText={errorMessages?.brandName} value={brandName} onChange={(e) => setBrandName(e.target.value)} label="BrandName" fullWidth></TextField>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button variant='contained' component='label'  >Upload
                                <input onChange={handleImage} hidden type='file' accept='image/*' multiple />
                            </Button>
                            <div className={classes.errorMessgeStyle}>{errorMessages?.brandIcon != null ? errorMessages?.brandIcon : <></>}</div>
                        </div>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar src={brandIcon.fileName} varient="rounded" />
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <LoadingButton loading={loadingStatus} loadingPosition="start" startIcon={<SaveIcon />} varient="contained" fullWidth onClick={handleSubmit}>Save</LoadingButton>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Button onClick={handleReset} varient="contained" fullWidth>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>)

}