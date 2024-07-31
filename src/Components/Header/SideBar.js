import React from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MiniDrawer = () => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [activeIcon, setActiveIcon] = React.useState(null);

  const getIconForIndex = (index) => {
    const icons = [
      <HomeOutlinedIcon />,
      <CalendarMonthOutlinedIcon />,
      <ShoppingCartIcon />,
      <InventoryIcon />,
    ];
    return icons[index % icons.length];
  };

  const handleIconClick = (index) => {
    setActiveIcon(index);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', position: 'relative' }}>
      <IconButton
        color="inherit"
        aria-label="toggle sidebar"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: theme.zIndex.drawer + 1,
          padding: '3px',
        }}
      >
        {isSidebarOpen ? <MenuOpenIcon style={{ color: '#000000' }} /> : <MenuIcon style={{ color: '#000000' }} />}
      </IconButton>
      <Paper
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: isSidebarOpen ? drawerWidth : 0,
          height: '100vh',
          zIndex: theme.zIndex.drawer,
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          backgroundColor: isSidebarOpen ? theme.palette.background.paper : 'transparent',
          boxShadow: isSidebarOpen ? theme.shadows[5] : 'none',
        }}
      >
        {isSidebarOpen && (
          <List style={{ marginTop: '20px' }}>
            {['Home', 'Calendar', 'Add Task', 'Inventory'].map((text, index) => (
              <Link to={`/${text.toLowerCase().replace(' ', '-')}`} style={{ textDecoration: 'none', color: 'inherit' }} key={text}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: 'flex-start',
                    px: 1,
                    alignItems: 'center',
                    mt: 2,
                  }}
                  onClick={() => {
                    setIsSidebarOpen(false);
                    handleIconClick(index);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 1,
                      color: 'inherit',
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: '25%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: activeIcon === index ? theme.palette.primary.light : 'transparent',
                      }}
                    >
                      {getIconForIndex(index)}
                    </Box>
                  </ListItemIcon>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: 'inherit',
                      mr: '150px',
                    }}
                  >
                    {text}
                  </Typography>
                </ListItemButton>
              </Link>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default MiniDrawer;
