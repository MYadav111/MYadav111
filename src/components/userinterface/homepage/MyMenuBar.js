import {useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {postData,getData} from '../../../services/FetchNodeAdminServices' 
import { Button,Menu, MenuBar, MenuItem } from '@mui/material';
export default function MyMenuBar(){
const [category,setCategory]=useState([])   
const [subCategory,setSubCategory]=useState([])  
const [brand,setBrand]=useState([])  

const [anchorEl, setAnchorEl] = useState(null)
const open = Boolean(anchorEl)
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  fetchAllSubCategory(event.currentTarget.value)
};
const handleClose = () => {
  setAnchorEl(null);
};

const fetchAllSubCategory=async(categoryid)=>{
  var result=await postData('userinterface/user_get_all_subcategory_by_categoryid',{categoryid})
  setSubCategory(result.data)
}

const fetchAllCategory=async()=>{
  var result=await postData('userinterface/user_display_all_category',{status:'limit'})
  setCategory(result.data)
}

useEffect(()=>{
    fetchAllCategory()
},[])

const showCategoryMenu=()=>{
  return category.map((item)=>{
        return(<Button value={item.categoryid} onMouseMove={handleClick} onMouseDown={handleClose}  style={{color:'#fff',fontWeight:'bold',marginLeft:10}}>{item.categoryname}</Button>)


    })
}


const showSubCategoryMenu=()=>{
  return subCategory.map((item)=>{
        return(<MenuItem onMouseLeave={handleClose} >{item.subcategoryname}</MenuItem>)
    })
}

  return(<div>
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{height:50,background:'#0c5273'}}>
        <Toolbar style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          
          {showCategoryMenu()}
          <Button  style={{color:'#fff',fontWeight:'bold',marginLeft:10}}>All Category</Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onMouseLeave={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {showSubCategoryMenu()}
          </Menu>
          
        </Toolbar>
      </AppBar>
    </Box>
  </div>)

}