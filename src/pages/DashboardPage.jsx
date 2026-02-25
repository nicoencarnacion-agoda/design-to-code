import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Stack,
  Box,
  Grid,
  Button,
} from '@mui/material';
import { useBookings } from '../context/BookingsContext';
import { getStatusChipSx } from '../constants/bookingStatus';

function DashboardPage() {
  const navigate = useNavigate();
  const { bookings } = useBookings();

  const total = bookings.length;
  const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
  const pending = bookings.filter((b) => b.status === 'Pending').length;
  const cancelled = bookings.filter((b) => b.status === 'Cancelled').length;
  const totalRevenue = bookings
    .filter((b) => b.status === 'Confirmed')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
    .slice(0, 5);

  const statCards = [
    { label: 'Total Bookings', value: total, color: '#1976d2' },
    { label: 'Confirmed', value: confirmed, color: '#4caf50' },
    { label: 'Pending', value: pending, color: '#ff9800' },
    { label: 'Cancelled', value: cancelled, color: '#f44336' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ minHeight: '56px', paddingLeft: '16px', paddingRight: '16px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '18px', fontWeight: 500 }}>
            Agoda Booking Support Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 2, mb: 6, pl: 2, pr: 5 }}>
        <Stack spacing={4}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 800, fontSize: '22px', textTransform: 'none', letterSpacing: '-0.5px' }}>
            Dashboard
          </Typography>

          <Grid container spacing={3}>
            {statCards.map((card, i) => (
              <Grid item xs={12} sm={6} md={3} key={card.label}>
                <Card elevation={i % 2 === 0 ? 2 : 0} sx={{ borderRadius: i === 0 ? '12px' : i === 1 ? '4px' : '8px' }}>
                  <CardContent sx={{ padding: i % 2 === 0 ? '24px 20px' : '16px 28px' }}>
                    <Typography variant="body2" sx={{ color: '#bbb', fontSize: i === 0 ? '11px' : '13px', marginBottom: '6px' }}>
                      {card.label}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: i === 1 ? 500 : 700, color: card.color, fontSize: i === 2 ? '28px' : '32px' }}>
                      {card.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Card elevation={1} sx={{ borderRadius: '6px' }}>
            <CardContent sx={{ padding: '24px 24px 22px 24px' }}>
              <Typography variant="h6" sx={{ fontSize: '17px', fontWeight: 500, marginBottom: '12px', color: '#555' }}>
                Total Revenue (Confirmed)
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1565c0', fontSize: '26px' }}>
                USD {totalRevenue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 1 }}>
            <Box
              component="span"
              onClick={() => navigate('/bookings')}
              sx={{
                display: 'inline-block',
                padding: '12px',
                margin: '-12px',
                cursor: 'pointer',
              }}
            >
              <Button variant="contained" sx={{ fontSize: '15px', px: 4 }}>
                View All Bookings
              </Button>
            </Box>
            <Box
              component="span"
              onClick={() => navigate('/booking/new')}
              sx={{
                display: 'inline-block',
                padding: '12px',
                margin: '-12px',
                cursor: 'pointer',
              }}
            >
              <Button variant="outlined" sx={{ fontSize: '15px', px: 4 }}>
                Create New Booking
              </Button>
            </Box>
            <Button variant="text" onClick={() => navigate('/reports')} sx={{ fontSize: '12px', color: '#999' }}>
              View Reports
            </Button>
          </Box>

          <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 700, marginTop: '24px', letterSpacing: '1px' }}>
            Recent Bookings
          </Typography>
          <Stack spacing={2}>
            {recentBookings.map((booking, i) => (
              <Card
                key={booking.id}
                elevation={i % 2 === 0 ? 2 : 1}
                sx={{
                  cursor: 'pointer',
                  borderRadius: i % 3 === 0 ? '4px' : '10px',
                  '&:hover': { boxShadow: 4 },
                  '&:focus': { outline: 'none' },
                }}
                onClick={() => navigate(`/booking/${booking.id}`)}
              >
                <CardContent sx={{ padding: i === 0 ? '20px' : '14px 24px' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle2" sx={{ color: '#888', fontSize: '12px' }}>Booking ID</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{booking.id}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle2" sx={{ color: '#888', fontSize: '12px' }}>Guest</Typography>
                      <Typography variant="body1">{booking.guestName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle2" sx={{ color: '#888', fontSize: '12px' }}>Check-in</Typography>
                      <Typography variant="body1">{new Date(booking.checkIn).toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Box
                        component="span"
                        sx={{
                          ...getStatusChipSx(booking.status),
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '16px',
                          fontSize: '13px',
                          fontWeight: 500,
                        }}
                      >
                        {booking.status}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default DashboardPage;
