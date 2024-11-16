import { useState } from "react";
import React from "react";
import { Grid, TextField, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import Paper from '@mui/material/Paper';
import ClearIcon from '@mui/icons-material/Clear';
import logo from '../../../assets/logo.png'
export default function Login() {
  const theme = useTheme();
  const [mobileNumber, setMobileNumber] = useState("");
  // const matches = useMediaQuery(theme.breakpoints.up("md"));

  
  return (<div 
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <div
        style={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          width: 500,
          height: "auto",
          borderRadius: 10,
          padding: 10,
          margin:10
        }}
      >
        <Paper elevation={10}>
          <ClearIcon/>
            <div style={{ padding:10 }}>
              <div style={{fontWeigth:"bolder"}}><h2>Sign in</h2></div>

            <Grid size={6}>Verify your mobile number to access your <b>Jio Mart</b> account.</Grid>
            <Grid size={2}><img src={logo} alt="Jio Mart logo" height={60} width={60} /></Grid>
          <Grid size={12}>
            <TextField onChange={(e) => setMobileNumber(e.target.value)} label="Mobile Number"></TextField>
          </Grid>
          <Grid size={12}>
          <Button varient="contained" component="label" fullWidth>
                 Continue
                </Button>
          </Grid>

          <Grid size={12}>
            <h4>
              By continuing, you agree to our
              <a href="https://www.jiomart.com/terms-and-conditions/">Terms and Conditions of Use,</a>
              <a href="https://www.jiomart.com/privacy-policy/">Privacy Policy</a> and <a href="https://account.relianceretail.com/privacy-policy/">Retail Account Privacy Policy.</a>
            </h4>
          </Grid>
          </div>
        </Paper>
      </div>
    </div>
  );
}
