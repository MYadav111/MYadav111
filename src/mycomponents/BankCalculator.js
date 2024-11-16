import { TextField,Button, Grid} from "@mui/material";
import { useState } from "react";
function BankCalculator({bgcolor,title,logo})
{const [amount, setAmount] = useState('')
const [rate, setRate] = useState('')
const [time, setTime] = useState('')
const [result,setResult]= useState('')

function handleClear()
{
    setAmount('')
    setTime('')
    setRate('')
    setResult('')
}
function handleGetAmount()
{
    var t = amount*rate*time/100
    setResult(t)
}
function handleRateChange(event)
{
    setRate(event.target.value)
}
    return(<div style={{background:bgcolor,width:400,height:'auto',padding:10,margin:10}} >
        <Grid container spacing={1} >
            <Grid item xs={12}>
                <div style={{display:'flex',alignItems:'center', marginBottom:10}} >
                <img src={logo}  width={50} height={50}/>
                <div style={{marginLeft:5,fontSize:22,fontWeight:'bolder'}}> {title}</div>
                </div>
            </Grid>
            <Grid item xs={12}>
            <TextField value={amount} onChange = {(event)=>setAmount(event.target.value)} variant="outlined" label="Enter Amount" fullWidth/>
            </Grid>
            <Grid item xs={12}>
            <TextField value={rate} onChange={handleRateChange} variant="outlined" label="Enter Rate" fullWidth/>            
            </Grid>
            <Grid item xs={12}>
            <TextField value={time} onChange={(event)=>setTime(event.target.value)} variant="outlined" label="Enter Time" fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <Button onClick ={handleGetAmount} fullWidth variant='contained'>Calculate</Button>
            </Grid>

            <Grid item xs={6}>
                <Button onClick ={handleClear} fullWidth variant='contained'>Clear</Button>
            </Grid>
            <Grid item xs={6}>
                <div style={{fontSize:20,fontWeight:'bold'}}>Amount</div>
            </Grid>
            <Grid item xs={6}>
                <div style={{fontSize:20,fontWeight:'bold'}}>{result}</div>
            </Grid>
        </Grid>
        
       
       
    </div>)
}

export default BankCalculator