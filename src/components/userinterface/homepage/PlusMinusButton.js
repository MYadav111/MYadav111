import { useEffect, useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
export default function PlusMinusButton(props)
{   const [overState,setOverState]=useState('#b5b5b5')
    console.log(props.qty)
    const [value,setValue]=useState(props.qty)
    useEffect(function(){
        setValue(props.qty)
    },[props.qty])

    const handlePlus=()=>{
      
       var v=value
        v++
        setValue(v)
        props.onChange(v)
    }
    const handleMinus=()=>{
        var v=value
        v--
        setValue(v)
        props.onChange(v)
    }

    return(<div>
        {value==0?<div onClick={handlePlus} onMouseLeave={()=>setOverState('#b5b5b5')} onMouseOver={()=>setOverState('#1f3d4c')} style={{ cursor:'pointer',  marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',width:150,height:35,border:`0.7px solid ${overState}`,color:'#1f3d4c',fontSize:16,fontWeight:'bold',borderRadius:17.5
        }}>
        Add <div style={{display:'flex', justifyContent:'center', alignItems:'center', margin:5}}><AddIcon/></div>

    </div>:
    <div style={{  marginTop:8,display:'flex',justifyContent:'space-between',alignItems:'center',width:120,height:35,paddingBottom:3,color:'#1f3d4c',fontSize:16,fontWeight:'bold',borderRadius:17.5}}>

    <div onClick={handleMinus} style={{ cursor:'pointer',  marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',width:35,height:35,borderRadius:17.5,border:`0.7px solid ${overState}`,color:'#1f3d4c',fontSize:16,fontWeight:'bold',borderRadius:17.5}}><RemoveIcon/></div>
     <div>{value}</div>
     <div onClick={handlePlus} style={{ cursor:'pointer',  marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',width:35,height:35,borderRadius:17.5,border:`0.7px solid ${overState}`,color:'#1f3d4c',fontSize:16,fontWeight:'bold',borderRadius:17.5}}><AddIcon/></div>


    </div>}
    
    </div>)

}