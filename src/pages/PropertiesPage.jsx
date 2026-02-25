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

function PropertiesPage() {
  const navigate = useNavigate();
  const { bookings } = useBookings();

  const properties = useMemo(() => {
    const map = new Map();
    bookings.forEach((b) => {
      const key = `${b.propertyName}|${b.propertyAddress}`;
      if (!map.has(key)) {
        map.set(key, {
          name: b.propertyName,
          address: b.propertyAddress,
          bookingCount: 0,
          totalRevenue: 0,
        });
      }
      const prop = map.get(key);
      prop.bookingCount += 1;
      if (b.status === 'Confirmed') {
        prop.totalRevenue += b.totalAmount || 0;
      }
      map.set(key, prop);
    });
    return Array.from(map.values());
  }, [bookings]);

  const handlePropertyClick = (name) => {
    navigate(`/bookings?property=${encodeURIComponent(name)}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ minHeight: '62px', paddingLeft: '12px', paddingRight: '20px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '16px', fontWeight: 600 }}>
            Agoda Booking Support Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 2, mb: 8 }}>
        <Stack spacing={4}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 500, fontSize: '24px', textTransform: 'none' }}>
            Properties
          </Typography>

          <Typography variant="body2" sx={{ color: '#bbb', fontSize: '11px' }}>
            Showing {properties.length} propert(ies)
          </Typography>

          <Stack spacing={2}>
            {properties.map((prop, i) => (
              <Card
                key={`${prop.name}-${prop.address}`}
                elevation={i % 2 === 0 ? 2 : 0}
                sx={{
                  cursor: 'pointer',
                  borderRadius: i === 0 ? '12px' : '4px',
                  '&:hover': { boxShadow: 4 },
                  '&:focus': { outline: 'none' },
                }}
                onClick={() => handlePropertyClick(prop.name)}
              >
                <CardContent sx={{ padding: i % 2 === 0 ? '20px 16px' : '12px 24px' }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={5}>
                      <Typography variant="subtitle2" sx={{ color: '#ccc', fontSize: '11px' }}>Property</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{prop.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#666', fontSize: '13px', mt: 0.5 }}>
                        {prop.address}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <Typography variant="subtitle2" sx={{ color: '#888', fontSize: '12px' }}>Bookings</Typography>
                      <Typography variant="body1">{prop.bookingCount}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <Typography variant="subtitle2" sx={{ color: '#888', fontSize: '12px' }}>Revenue</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        USD {prop.totalRevenue.toFixed(2)}
                      </Typography>
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

export default PropertiesPage;
