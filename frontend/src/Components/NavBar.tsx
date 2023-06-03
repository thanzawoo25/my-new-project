
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useState } from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from 'react-router-dom';



const sidebarMenuItems = [
  { id: 1, label: "Orders", icon: <LocalMallIcon />, route: "/orders" },
  { id: 2, label: "Menus", icon: <LocalDiningIcon />, route: "/menus" },
  {
    id: 3,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/menu-categories",
  },
  { id: 4, label: "Addons", icon: <LunchDiningIcon />, route: "/addons" },
  {
    id: 5,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/addon-categories",
  },
  {
    id: 6,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/locations",
  },
  { id: 7, label: "Settings", icon: <SettingsIcon />, route: "/settings" },
];

const NavBar = () => {
  const [open,setOpen] = useState(false)
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderDrawer = () => {
     return <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
         {sidebarMenuItems.slice(0, 6).map((menuItem) => (
          
           <Link to={menuItem.route}
             key={menuItem.id}
            style={{textDecoration:"none",color:"black"}}
             
           >
             <ListItem key={menuItem.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText primary={menuItem.label} />
            </ListItemButton>
          </ListItem>
           </Link>
        ))}
      </List>
      <Divider />
      <List>
        {sidebarMenuItems.slice(-1).map((menuItem) => (
          <Link to={menuItem.route}
            key={menuItem.id}
            style={{textDecoration:"none",color:"black"}}
          >
          <ListItem key={menuItem.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText primary={menuItem.label} />
            </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Foodie POS
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
       <Box>
          <Drawer
            open={open}
            onClose={()=> setOpen(false)}
          >
            {renderDrawer()}
          </Drawer>
    </Box>
    </Box>
  );
}

export default NavBar;

