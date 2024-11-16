import Header from '../homepage/Header'
import Footer from '../homepage/Footer'
import ProductDetailsCategory from './ProductDetailsCategory'
import { getData,postData } from '../../../services/FetchNodeAdminServices'
import {useState,useEffect} from 'react'
import { useMediaQuery } from '@mui/material'
import {useTheme} from "@mui/material/styles"
export default function PageCategoryDisplay()
{   
    const[popularProducts,setPopularProducts]=useState([])
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    
    return(<div style={{display:'flex', flexDirection:'column',justifyContent:'center'}}>
        <div><Header /></div>

        <div><ProductDetailsCategory/></div>
        {matches?<div style={{width:'82%',alignSelf:'center',marginTop:40}} >
        <Footer />
        </div>:<></>}

    </div>)
}