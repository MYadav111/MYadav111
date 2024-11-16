import { Grid, TextField, Avatar, Button,FormHelperText, FormControl,InputLabel,Select, MenuItem } from "@mui/material"
import { useState,useEffect } from "react"
import cart from '../../../assets/cart.png'
import logo from '../../../assets/logo.png'
import SaveIcon from '@mui/icons-material/Save'
import { userStyle } from "./SubCategoryCss"
import Swal from "sweetalert2"
import { LoadingButton } from "@mui/lab"
import { postData ,getData,currentDate} from "../../../services/FetchNodeAdminServices"


export default function SubCategory(){
    const classes = userStyle()
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryName, setSubCategoryName] = useState('')
    const [loadingStatus,setLoadingStatus] = useState(false)
    const [subCategoryIcon,setSubCategoryIcon] = useState({bytes:"", fileName:cart})
    const [errorMessages, setErrorMessages] = useState({})
    const [categoryList, setCategoryList]=useState([])
    
    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        setCategoryList(result.data)
    }
    
    useEffect(function(){
        fetchAllCategory()
    },[])

    const fillCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleErrorMessages = (label, message)=>{
        var msg = errorMessages
        msg[label] = message
        setErrorMessages((prev)=>({...prev,...msg}))
    }

    const validateData=()=>{
        var err=false

        if(subCategoryName.length==0)
        {
            {handleErrorMessages('subCategoryName','Pls input Sub category Name')}
            err=true
        }
        if(subCategoryIcon.bytes.length==0)
        {
            {handleErrorMessages('subCategoryIcon','Pls Upload Icon')}
        }
        return err
    }

    const handleImage=(e)=>{
        {handleErrorMessages('subCategoryIcon',null)
            setSubCategoryIcon({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
        }
    }

    const resetValue=()=>{
        setCategoryId('')
        setSubCategoryName('')
        setSubCategoryIcon({bytes:'',fileName:cart})
    }

    const handleSubmit=async()=>{
        var err= validateData()
        if(err==false)
        {
        setLoadingStatus(true)
        var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryname',subCategoryName)
        formData.append('subcategoryicon',subCategoryIcon.bytes)
        formData.append('created_at',currentDate())
        formData.append('updated_at',currentDate())
        formData.append('user_admin','Farzi')
        
        var result=await postData('subcategory/subcategory_submit',formData)
        if(result.status)
        {
            Swal.fire({
                //position: "top-end",
                icon: "success",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast:false
              });
           }
           else
           {
            Swal.fire({
              //  position: "top-end",
                icon: "error",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast:true
              });
           }
           setLoadingStatus(false)
           resetValue()
        }
    }

    const handleReset=()=>{
        resetValue()
    }

    return(<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>
            <Grid item xs={12} className={classes.center}>
                <div className={classes.mainHeadingStyle}>
                <img src={logo} alt={logo} className={classes.imageStyle} />
                <div className={classes.headingStyle}>SubCategory Register</div>
                </div>
            </Grid>
            <Grid item xs={12} className={classes.center}>
                {/* <TextField onFocus={()=> handleErrorMessages('categoryId',null)} error={errorMessages?.categoryId} helperText={errorMessages?.categoryId} onChange={(e)=>setErrorMessages(e.target.value)} value={categoryId} label="Category Id " fullWidth/> */}
                <FormControl fullWidth>
                    <InputLabel>Category Id</InputLabel>
                    <Select onFocus={()=> handleErrorMessages('categoryId',null)} error={!!errorMessages.categoryId}  value={categoryId} label="Category Id"   onChange={(e)=>setCategoryId(e.target.value)}>
                    {fillCategory()}
                    </Select>
                    <FormHelperText ><div className={classes.errorMessageStyle}>{errorMessages?.categoryId}</div></FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField onFocus={() => handleErrorMessages('subCategoryName', null)} error={errorMessages?.subCategoryName} helperText={errorMessages?.subCategoryName} value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} label="subCategory Name" fullWidth />
            </Grid>
            <Grid item xs={6} className={classes.center}>
                <div  style={{display:'flex',flexDirection:'column'}}>
                    <Button variant='contained' component='label' className={classes.center} >Upload
                        <input onChange={handleImage} hidden type='file' accept='image/*' multiple />
                    </Button>
                    <div className={classes.errorMessgeStyle}>{errorMessages?.categoryIcon!=null?errorMessages?.categoryIcon:<></> }</div>
                </div>
            </Grid>
            <Grid item xs={6} className={classes.center}>
                <Avatar src={subCategoryIcon.fileName} varient="rounded"/>
            </Grid>
            <Grid item xs={6} className={classes.center} fullWidth>
                <LoadingButton
                    loading={loadingStatus}
                    loadingPosition="start"
                    startIcon={<SaveIcon/>}
                    varient="contained"
                    onClick={handleSubmit}
                >Save</LoadingButton>

            </Grid>
            <Grid item xs={6} className={classes.center} >
                <Button onClick={handleReset} variant="contained" fullWidth>Reset</Button>
            </Grid>
            </Grid>
        </div>
    </div>)
}