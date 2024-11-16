import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../../assets/logo.png'
import TextBoxSearch from './TextBoxSearch';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MyMenuBar from './MyMenuBar';
import MyDrawer from './MyDrawer';
export default function Header() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)

  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {matches ? <div></div> : <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={handleClick} />
          </IconButton>}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="h6" component="div" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} style={{ width: 70, height: 70 }} />
              <div style={{ fontWeight: 'bold', fontSize: 24 }}>QuickComm</div>
            </Typography>
            {matches ? <TextBoxSearch /> : <div></div>}

            <div>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <ShoppingCartIcon />
              </IconButton>

              {matches?<IconButton
           
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircleIcon style={{fontSize:30}}/>
            <div style={{marginLeft:5,fontWeight:'bold',fontSize:16}} >Sign In</div>
           </IconButton>:<div></div>}
            </div>
          </div>

        </Toolbar>
      </AppBar>
      { matches?<div></div>:
      <AppBar position="static" >
        <Toolbar>
          <div style={{width:'100%',display:'flex',alignItems:'center', justifyContent:'center'}}>
          <TextBoxSearch width="85%"/>
          </div>
        </Toolbar>
      </AppBar>
     }

      { matches?
     <MyMenuBar/>:<div></div>}
      <MyDrawer open={open} setOpen={setOpen} />
    </Box>
  );
}