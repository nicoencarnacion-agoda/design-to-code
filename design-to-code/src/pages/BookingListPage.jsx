import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Card,
  CardContent,
  Stack,
  Box,
  Grid,
} from '@mui/material';
import { mockBookings } from '../data/mockBookings';

// Theme palette keys for filled chips (solid bg + contrast text, same style as Cancelled)
const statusColors = {
  Confirmed: 'success',
  Pending: 'warning',
  Cancelled: 'error',
};

function BookingListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredBookings = useMemo(() => {
    return mockBookings.filter((booking) => {
      const matchesSearch =
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const handleBookingClick = (bookingId) => {
    navigate(`/booking/${bookingId}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ minHeight: '56px', paddingLeft: '16px', paddingRight: '16px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '18px', fontWeight: 500 }}>
            Agoda Booking Support Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Stack spacing={3}>
          {/* Missing skip link for keyboard navigation */}
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Bookings
          </Typography>

          <Grid container spacing={1.5} sx={{ mt: '4px', mb: '4px' }}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Search bookings"
                variant="outlined"
                size="medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by booking ID, guest name, or property..."
                // Missing aria-label for screen readers
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status Filter</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status Filter"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  size="medium"
                  // Missing aria-label
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Confirmed">Confirmed</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Typography variant="body2" sx={{ color: '#999999', fontSize: '13px', marginTop: '8px', lineHeight: 1.2 }}>
            Showing {filteredBookings.length} booking(s)
          </Typography>

          <Stack spacing={1.5}>
            {filteredBookings.map((booking, index) => (
              <Card
                key={booking.id}
                elevation={1}
                sx={{
                  cursor: 'pointer',
                  borderRadius: '8px',
                  '&:hover': {
                    boxShadow: 3,
                    backgroundColor: '#fafafa',
                  },
                  '&:focus': {
                    outline: '1px solid #1976d2',
                    outlineOffset: '2px',
                  },
                }}
                onClick={() => handleBookingClick(booking.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleBookingClick(booking.id);
                  }
                }}
                tabIndex={0}
              >
                <CardContent sx={{ padding: '16px 20px' }}>
                  <Grid container spacing={1.5} alignItems="center">
                    <Grid item xs={12} sm={6} md={2} sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ 
                        color: 'text.secondary',
                        display: 'block', 
                        marginBottom: '4px' 
                      }}>
                        Booking ID
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '14px' }}>
                        {booking.id}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Guest Name
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '14px' }}>
                        {booking.guestName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Property
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '14px' }}>
                        {booking.propertyName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Check-in
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '14px' }}>
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} sx={{ flexShrink: 0 }}>
                      <Chip
                        label={booking.status}
                        color={statusColors[booking.status]}
                        size="medium"
                        variant="filled"
                        sx={{
                          minWidth: 'fit-content',
                          '& .MuiChip-label': {
                            overflow: 'visible',
                            textOverflow: 'clip',
                            whiteSpace: 'nowrap',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {filteredBookings.length === 0 && (
            <Box sx={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
              <Typography variant="body1" sx={{ color: '#999' }}>
                No bookings found matching your criteria.
              </Typography>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default BookingListPage;
