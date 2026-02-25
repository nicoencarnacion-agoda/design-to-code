import { useMemo } from 'react';
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
} from '@mui/material';
import { useBookings } from '../context/BookingsContext';

function GuestsPage() {
  const navigate = useNavigate();
  const { bookings } = useBookings();

  const guests = useMemo(() => {
    const map = new Map();
    bookings.forEach((b) => {
      const key = `${b.guestName}|${b.guestEmail}`;
      if (!map.has(key)) {
        map.set(key, {
          name: b.guestName,
          email: b.guestEmail,
          phone: b.guestPhone,
          bookingCount: 0,
          bookingIds: [],
        });
      }
      const g = map.get(key);
      g.bookingCount += 1;
      g.bookingIds.push(b.id);
      map.set(key, g);
    });
    return Array.from(map.values());
  }, [bookings]);

  const handleGuestClick = (bookingIds) => {
    if (bookingIds.length === 1) {
      navigate(`/booking/${bookingIds[0]}`);
    } else {
      navigate('/bookings');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1565c0' }}>
        <Toolbar sx={{ minHeight: '54px', paddingLeft: '20px', paddingRight: '16px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '17px', fontWeight: 400 }}>
            Agoda Booking Support Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5, mb: 3, pl: 4, pr: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700, fontSize: '20px', letterSpacing: '2px' }}>
            Guests
          </Typography>

          <Typography variant="body2" sx={{ color: '#999', fontSize: '12px', mb: 1 }}>
            Showing {guests.length} guest(s)
          </Typography>

          <Stack spacing={1}>
            {guests.map((guest, idx) => (
              <Card
                key={`${guest.name}-${guest.email}`}
                elevation={idx % 3 === 0 ? 2 : 1}
                sx={{
                  cursor: 'pointer',
                  borderRadius: '8px',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
                onClick={() => handleGuestClick(guest.bookingIds)}
              >
                <CardContent sx={{ padding: idx % 2 === 0 ? '18px 22px' : '14px 18px' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle2" sx={{ color: '#aaa', fontSize: '10px' }}>Name</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{guest.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle2" sx={{ color: '#999', fontSize: '11px' }}>Email</Typography>
                      <Typography variant="body1">{guest.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle2" sx={{ color: '#bbb', fontSize: '10px' }}>Phone</Typography>
                      <Typography variant="body1">{guest.phone || '—'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle2" sx={{ color: '#888', fontSize: '13px' }}>Bookings</Typography>
                      <Typography variant="body1">{guest.bookingCount}</Typography>
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

export default GuestsPage;
