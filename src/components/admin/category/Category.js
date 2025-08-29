import { Button, Grid, TextField, Avatar } from '@mui/material'
import { LoadingButton } from "@mui/lab"
import Divider from '@mui/material/Divider'
import logo from '../../../assets/logo.png'
import list from '../../../assets/list.png'
import { userStyle } from './CategoryCss'
import cart from '../../../assets/cart.png'
import SaveIcon from '@mui/icons-material/Save'
import { useState } from "react"
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'
import { postData, currentDate } from '../../../services/FetchNodeAdminServices';


export default function Category() {
    var classes = userStyle()
    var navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('')
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [categoryIcon, setCategoryIcon] = useState({ bytes: '', fileName: cart })
    const [errorMessages, setErrorMessages] = useState({})


    const handleErrorMessages = (label, message) => {
      var msg = errorMessages
      msg[label] = message
      setErrorMessages((prev)=>({...prev,...msg}))
    }

    const validateData = () => {
        var err = false
        if (categoryName.length==0) {
            {handleErrorMessages('categoryName','Pls input categoryname..')}
            err = true
        }
        if(categoryIcon.bytes.length==0)
        {
            {handleErrorMessages('categoryIcon','Pls input categoryIcon..')}

        }
        return err
    }

    const handleImage = (e) => {
        handleErrorMessages('categoryIcon',null)
        setCategoryIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
    }
    
    const resetValue = () => {
        setCategoryName('')
        setCategoryIcon({ bytes: '', fileName: cart })
    }

    const handleSubmit=async()=>{
        var err=validateData()
        if(err==false)
        {
        setLoadingStatus(true)
        var formData=new FormData()
        formData.append('categoryname',categoryName)
        formData.append('categoryicon',categoryIcon.bytes)
        formData.append('created_at',currentDate())
        formData.append('updated_at',currentDate())
        formData.append('user_admin','Farzi')
        
        var result=await postData('category/category_submit',formData)
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

    return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.mainHeadingStyle}>
                        <img src={logo} alt={logo} className={classes.imageStyle} />
                        <div className={classes.headingStyle}>Category Register</div>
                        <img src={list} alt={list} style={{width:25,height:25,marginLeft:'50%'}} onClick={() => navigate("/dashboard/displayallcategory")}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField onFocus={() => handleErrorMessages('categoryName', null)} error={errorMessages?.categoryName} helperText={errorMessages?.categoryName} value={categoryName} onChange={(e) => setCategoryName(e.target.value)} label="Category Name" fullWidth />
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
                    <Avatar src={categoryIcon.fileName} varient="rounded" />
                </Grid>
                <Grid item xs={12} className={classes.center}>
                    <Divider component="li" />
                </Grid>
                <Grid item xs={6} className={classes.center} fullWidth>
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
                <Grid item xs={6} className={classes.center} fullWidth>
                    <Button onClick={handleReset} variant="contained">Reset</Button>
                </Grid>
            </Grid>
        </div>
    </div>)
}
