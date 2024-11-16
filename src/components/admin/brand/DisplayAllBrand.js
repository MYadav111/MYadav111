import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { postData, getData, currentDate, createDate, serverURL } from "../../../services/FetchNodeAdminServices";
import { userStyle } from "./BrandCss";
import { FormHelperText, MenuItem, FormControl, Select, InputLabel, IconButton, Grid, TextField, Avatar, Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import cart from "../../../assets/cart.png"
import logo from "../../../assets/logo.png"
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save'

export default function DisplayAllBrand() {
    const classes = userStyle()
    const [open, setOpen] = useState(false)

    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [brandName, setBrandName] = useState('')
    const [hideUploadButton, setHideUploadButton] = useState(false)
    const [brandIcon, setBrandIcon] = useState({ bytes: '', fileName: cart })
    const [errorMessages, setErrorMessages] = useState({})
    const [brandList, setBrandList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [oldImage, setOldImage] = useState('')
    const [loadingStatus, setLoadingStatus] = useState(false)

    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategoryList(result.data)
    }
    useEffect(function () {
        fetchAllCategory()
    }, [])
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

    const handleErrorMessages = (label, message) => {
        var msg = errorMessages
        msg[label] = message
        setErrorMessages((prev) => ({ ...prev, ...msg }))

    }
    const showSaveCancelButton = () => {
        return (<div>
            <Button onClick={handleEditIcon}>Save</Button>
            <Button onClick={handleCancelIcon}>Cancel</Button>
        </div>)
    }
    const validateData = () => {
        var err = false
        if (brandName.length == 0) {
            { handleErrorMessages('BrandName', 'Pls input brand name..') }
            err = true
        }
        return err
    }

    const handleImage = (e) => {
        handleErrorMessages('subBrandIcon', null)
        setBrandIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
        setHideUploadButton(true)
    }
    const fetchAllSubCategory = async () => {
        var result = await getData('subcategory/display_all_subcategory')
        if (result.status) {
            setSubCategoryList(result.data)
        }
        else {
            alert(result.message)
        }
    }

    useEffect(function () {
        fetchAllSubCategory()
        fetchAllBrand()
    }, [])
    const fetchAllBrand = async () => {
        var result = await getData('brand/display_all_brand')
        if (result.status) {
            setBrandList(result.data)
        }
        else {
            alert(result.message)
        }
    }


    const handleCloseDialog = () => {
        setOpen(false)
    }

    const handleCancelIcon = () => {
        setBrandIcon({ bytes: '', fileName: oldImage })

        setHideUploadButton(false)
    }
    const handleOpenDialog = (rowData) => {
        setSubCategoryId(rowData.subcategoryid)
        setCategoryId(rowData.categoryid)
        setBrandId(rowData.brandid)
        setBrandName(rowData.brandname)
        setBrandIcon({ bytes: '', fileName: `${serverURL}/images/${rowData.brandicon}` })
        setBrandIcon(`${serverURL}/images/${rowData.brandicon}`)
        setOldImage(`${serverURL}/images/${rowData.brandicon}`)
        setOpen(true)
    }
    const brandForm = () => {
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
                                <Select onFocus={() => handleErrorMessages('categoryId', null)} error={!!errorMessages.categoryId} value={categoryId} label="CategoryId" onChange={(e) => setSubCategoryId(e.target.value)}>
                                    {fillCategory()}
                                </Select>
                                <FormHelperText ><div className={classes.errorMessageStyle}>{errorMessages?.categoryId}</div></FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Subcategory Name</InputLabel>
                                <Select onFocus={() => handleErrorMessages('subCategoryId', null)} error={!!errorMessages.subCategoryId} value={subCategoryId} label="subCategoryId" onChange={(e) => setBrandId(e.target.value)}>
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
                        {hideUploadButton ? <div>{showSaveCancelButton()}</div> :
                                <Button variant='contained' component='label' className={classes.center} >Upload
                                    <input onChange={handleImage} hidden type='file' accept='image/*' multiple />
                                </Button>}
                                <div className={classes.errorMessgeStyle}>{errorMessages?.brandIcon != null ? errorMessages?.brandIcon : <></>}</div>
                            </div>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Avatar src={brandIcon.fileName}
                                style={{ width: 70, height: 70 }} varient="rounded" />
                        </Grid>
                    </Grid>
                </div>
            </div>)
    }

    /***************************************************************/

    const handleEditData = async () => {
        var err = validateData()
        if (!err) {
            setLoadingStatus(true)
            var body = {
                categoryid: categoryId,
                'subcategoryid': subCategoryId,
                'brandname': brandName,
                'updated_at': currentDate(),
                'user_admin': 'Farzi',
                brandid: 'brandId'
            }

            var result = await postData('brands/edit_brand_data', body)
            if (result.status) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true
                });

            }
            else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true
                });
            }
            setLoadingStatus(false)
        }
        fetchAllBrand()
    }

    const handleEditIcon = async () => {
        setLoadingStatus(true)
        var formData = new FormData()
        formData.append('brandicon', brandIcon.bytes)
        formData.append('updated_at', currentDate())
        formData.append('user_admin', 'Farzi')
        formData.append('brandid', brandId)

        var result = await postData('brands/edit_brand_icon', formData)
        if (result.status) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast: true
            });
        }
        else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast: true
            });
        }
        setLoadingStatus(false)
        setHideUploadButton(false)
        fetchAllBrand()
    }

    const brandDelete = async () => {
        setLoadingStatus(true)
        var body = { 'brandid': brandId }

        var result = await postData('brands/delete_brand', body)

        if (result.status) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast: true
            });
        }
        else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast: true
            });
        }
        setLoadingStatus(false)
        setHideUploadButton(false)
        fetchAllBrand()
    }


    const handleDeleteBrand = async () => {
        Swal.fire({
            title: "Do you want to delete the Brand?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                brandDelete()

            } else if (result.isDenied) {
                Swal.fire("brand not deleted", "", "info");
            }
        });
    }



    const showBrandDialog = (rowData) => {
        return (<div>
            <Dialog open={open}>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                />
                <CloseIcon />
                <DialogContent>
                    {brandForm()}
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        loading={loadingStatus}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        onClick={handleEditData}
                    >
                        Edit Data
                    </LoadingButton>
                    <Button onClick={handleDeleteBrand} variant="contained">Delete</Button>
                    <Button onClick={handleCloseDialog} variant="contained">Close</Button>

                </DialogActions>
            </Dialog>
        </div>)
    }
    function brandTable() {
        return (
            <div className={classes.page}>
                <div className={classes.box}>
                    <MaterialTable
                        title="Brand List"
                        columns={[
                            { title: 'Brand Id', field: 'brandid' },
                            { title: 'Category Name', field: 'categoryname' },
                            { title: 'SubCategory Name', field: 'subcategoryname' },
                            { title: 'Brand Name', field: 'brandname' },
                            { title: 'Created At', render: (rowData) => <div style={{ display: "flex", flexDirection: 'column' }}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div> },
                            { title: 'Admin', field: 'user_admin' },
                            { title: 'Icon', render: (rowData) => <div><img src={`${serverURL}/images/${rowData.brandicon}`} style={{ width: 60, height: 60, borderRadius: 6 }} /></div> }

                        ]}

                        data={brandList}
                        options={{
                            pageSize: 3,
                            pageSizeOptions: [3, 5, 10, { value: brandList.length, label: 'All' }]
                        }}

                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Brand',
                                onClick: (event, rowData) => handleOpenDialog(rowData)
                            }
                        ]}
                    />
                </div>
            </div>
        )
    }
    /****************************/

    return (<div>
        {brandTable()}
        {showBrandDialog()}
    </div>)

}