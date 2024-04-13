import * as React  from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import SideBar from './SideBar';
import { Drawer } from '@mui/material';
import { SIDEBAR_LINKS } from '../../constants'
import { makeStyles}  from '@mui/styles';

import './toolbar.css';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  drawer: {
    width: '400px',
  }
}))

export default function ButtonAppBar() {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState(false);
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <button onClick={() => setOpen(!isOpen)}>
            App
          </button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Drawer open={isOpen} anchor={"left"} className={classes.drawer}>
      <div className="side-bar">
        {SIDEBAR_LINKS.map((link) => (
          <a href={link.to} key={link.text}>{link.text}</a>
        ))}
      </div>
    </Drawer>
    </>
  );
}