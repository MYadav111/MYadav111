import { TextField, Button, Grid } from "@mui/material";
import { useState } from "react";

function MarksheetResult({bgcolor, title, logo}) {
    const [physics, setPhysics] = useState('')
    const [chemistry, setChemistry] = useState('')
    const [maths, setMaths] = useState('')
    const [result, setResult] = useState('')
    const [division, setDivision] = useState('')

    function handleResult() {
        var r = parseInt(physics) + parseInt(chemistry) + parseInt(maths);
        setResult(r);
        if(r>=295 && r<=300)
        {
            setDivision('A+')
        }
        else if(r>=275 && r<=294)
        {
            setDivision('A')
        }
        else if(r>=255 && r<=274)
        {
            setDivision('B+')
        }
        else if(r>=225 && r<=254)
        {
            setDivision('B')
        }
        else if(r>=195 && r<=224)
        {
            setDivision('C')
        }
        else if(r>=175 && r<=194)
        {
            setDivision('D')
        }
        else if(r>=135 && r<=174)
        {
            setDivision('E')
        }
        else if(r>300)
        {
            setDivision("Wrong")
        }
        else{
            setDivision("Failed")
        }
    }

    function handleData() {
        setPhysics('')
        setChemistry('')
        setMaths('')
        setResult('')
    }
    return (<div style={{ background: bgcolor, width: 400, height: 'auto', padding: 10, margin: 10 }}>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <img src={logo} width={50} height={50} />
                    <div style={{ marginLeft: 5, fontSize: 22, fontWeight: 'bolder' }}>{title}</div>
                </div>
            </Grid>
            < Grid item xs={12}>
                <TextField value={physics} onChange={(event) => setPhysics(event.target.value)} label='"Physics"' fullWidth />
            </Grid>
            < Grid item xs={12}>
                <TextField value={chemistry} onChange={(event) => setChemistry(event.target.value)} label='"Chemistry"' fullWidth />
            </Grid>
            < Grid item xs={12}>
                <TextField value={maths} onChange={(event) => setMaths(event.target.value)} label='"Maths"' fullWidth />
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleResult} variant="contained" fullWidth>Calculate</Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleData} variant="contained" fullWidth>Clear</Button>
            </Grid>
            <Grid item xs={4}>
                <div style={{ fontWeight: "bold", fontSize: 20 }}>Total Marks</div>
            </Grid>
            <Grid item xs={4}>
                <div style={{ fontWeight: "bold", fontSize: 20 }}>{result}</div>
            </Grid>
            <Grid item xs={4}>
                <div style={{ fontWeight: "bold", fontSize: 20 }}>{division}</div>
            </Grid>
        </Grid>
    </div>)
}

export default MarksheetResult