import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar sx={{ minHeight: '48px', pl: 2, pr: 4 }}>
          <Button
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            size="small"
            sx={{ fontSize: '12px' }}
          >
            Back
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 3, fontSize: '15px', fontWeight: 300 }}>
            Page Not Found
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 6, mb: 10, textAlign: 'center', px: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, fontSize: '48px' }}>
          404
        </Typography>
        <Typography variant="h6" sx={{ color: '#999', mb: 4, fontSize: '15px' }}>
          The page you are looking for does not exist.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" component={Link} to="/">
            Go to Dashboard
          </Button>
          <Button variant="outlined" component={Link} to="/bookings">
            View Bookings
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default NotFoundPage;
