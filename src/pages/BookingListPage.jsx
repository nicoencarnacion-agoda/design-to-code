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
import { getStatusChipSx } from '../constants/bookingStatus';

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

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, pl: 0 }}>
        <Stack spacing={3}>
          {/* Missing skip link for keyboard navigation */}
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Bookings
          </Typography>

          <Grid container spacing={1.5} sx={{ mt: '4px', mb: '4px' }}>
            <Grid item xs={12} md={8} sx={{ pl: 0 }}>
              <TextField
                fullWidth
                label="Search bookings"
                variant="outlined"
                size="medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by booking ID, guest name, or property..."
                sx={{
                  '& .MuiInputBase-input': {
                    textAlign: 'left',
                  },
                }}
                // Missing aria-label for screen readers
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ pl: 0 }}>
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
                  borderRadius: index % 2 === 0 ? '6px' : '12px', // Inconsistent border radius
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
                <CardContent sx={{ padding: index % 3 === 0 ? '12px 16px' : '16px 20px' }}> {/* Inconsistent padding */}
                  <Grid container spacing={1.5} alignItems="center" sx={{ flexWrap: { md: 'nowrap' } }}>
                    <Grid item xs={12} sm={6} md={2} sx={{ minWidth: 0 }}>
                      <Typography variant="caption" sx={{ 
                        color: index % 2 === 0 ? '#ccc' : '#bbb', // Very low contrast - fails WCAG
                        fontSize: index % 2 === 0 ? '10px' : '11px', // Inconsistent font size
                        display: 'block', 
                        marginBottom: '4px' 
                      }}>
                        Booking ID
                      </Typography>
                      <Typography variant="h6" sx={{ 
                        fontSize: index % 3 === 0 ? '14px' : index % 3 === 1 ? '16px' : '18px', // Inconsistent sizes
                        fontWeight: index % 2 === 0 ? 400 : 500, // Inconsistent weight
                        color: index % 2 === 0 ? '#aaa' : '#333' // Some rows have low contrast
                      }}>
                        {booking.id}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ 
                        color: index % 3 === 0 ? '#ddd' : index % 3 === 1 ? '#c0c0c0' : '#999', // All fail contrast
                        fontSize: index % 2 === 0 ? '11px' : '13px' // Inconsistent
                      }}>
                        Guest Name
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontSize: index % 4 === 0 ? '13px' : index % 4 === 1 ? '15px' : index % 4 === 2 ? '14px' : '16px', // Random sizes
                        lineHeight: index % 2 === 0 ? 1.2 : 1.4,
                        color: index % 3 === 0 ? '#b8b8b8' : '#333' // Some fail contrast
                      }}>
                        {booking.guestName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ 
                        color: index % 2 === 0 ? '#d0d0d0' : '#aaa', // Both fail contrast
                        fontSize: index % 2 === 0 ? '10px' : '12px',
                        fontWeight: index % 3 === 0 ? 300 : 400, // Inconsistent weight
                        textTransform: index % 2 === 0 ? 'uppercase' : 'none' // Inconsistent case
                      }}>
                        Property
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontSize: index % 3 === 0 ? '12px' : index % 3 === 1 ? '14px' : '15px',
                        color: index % 4 === 0 ? '#c5c5c5' : index % 4 === 1 ? '#777' : '#444' // Mixed contrast issues
                      }}>
                        {booking.propertyName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{
                        color: index % 2 === 0 ? '#e0e0e0' : '#bbb', // Very low contrast
                        fontSize: index % 3 === 0 ? '9px' : '11px', // Some too small
                        letterSpacing: index % 2 === 0 ? '0.5px' : 'normal' // Inconsistent
                      }}>
                        Check-in
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontSize: index % 2 === 0 ? '12px' : '14px', 
                        color: index % 3 === 0 ? '#bcbcbc' : index % 3 === 1 ? '#888' : '#333', // Inconsistent contrast
                        fontFamily: index % 2 === 0 ? 'monospace' : 'inherit' // Inconsistent font family
                      }}>
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={2}
                      sx={{
                        minWidth: { md: 0 },
                        display: { md: 'flex' },
                        justifyContent: { md: 'flex-end' },
                      }}
                    >
                      <Chip
                        label={booking.status}
                        size="medium"
                        sx={getStatusChipSx(booking.status)}
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
