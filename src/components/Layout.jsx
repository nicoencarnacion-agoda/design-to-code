import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

const DRAWER_WIDTH = 240;

const navItems = [
  { path: '/', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/bookings', label: 'Bookings', icon: <ListAltIcon /> },
  { path: '/booking/new', label: 'Create Booking', icon: <AddIcon /> },
  { path: '/properties', label: 'Properties', icon: <ApartmentIcon /> },
  { path: '/guests', label: 'Guests', icon: <PeopleIcon /> },
  { path: '/calendar', label: 'Calendar', icon: <CalendarMonthIcon /> },
  { path: '/reports', label: 'Reports', icon: <AssessmentIcon /> },
  { path: '/activity', label: 'Activity Log', icon: <HistoryIcon /> },
  { path: '/settings', label: 'Settings', icon: <SettingsIcon /> },
  { path: '/help', label: 'Help', icon: <HelpIcon /> },
];

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const drawerContent = (
    <Box sx={{ pt: 1.5, pb: 3, px: 0 }}>
      <Typography variant="h6" sx={{ px: 2, mb: 2, fontSize: '13px', fontWeight: 800, color: '#888', textTransform: 'uppercase' }}>
        Navigation
      </Typography>
      <List>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <ListItem key={item.path} disablePadding sx={{ px: 1 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                selected={isActive}
                onClick={() => isMobile && setMobileOpen(false)}
                sx={{
                  borderRadius: '4px',
                  mx: 1.5,
                  my: 0.25,
                  py: 1.2,
                  '&.Mui-selected': {
                    backgroundColor: '#e0e0e0',
                  },
                  '&:focus': { outline: 'none' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '13px', fontWeight: isActive ? 400 : 700 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                borderRight: '1px solid rgba(0,0,0,0.12)',
              },
            }}
            open
          >
            {drawerContent}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        {isMobile && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 3,
              py: 0.5,
              borderBottom: '2px solid #ccc',
              backgroundColor: '#f9f9f9',
            }}
          >
            <IconButton onClick={() => setMobileOpen(true)} edge="start">
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" sx={{ ml: 2, fontWeight: 300, fontSize: '15px', color: '#777' }}>
              Agoda Dashboard
            </Typography>
          </Box>
        )}
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
