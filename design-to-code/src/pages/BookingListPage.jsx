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
  Stack,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

          <TableContainer
            component={Paper}
            elevation={1}
            sx={{ borderRadius: '8px', overflow: 'hidden' }}
          >
            <Table aria-label="Bookings list">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Booking ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Guest Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Property</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Check-in</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow
                    key={booking.id}
                    hover
                    sx={{
                      cursor: 'pointer',
                      '&:focus': {
                        outline: '1px solid #1976d2',
                        outlineOffset: '-1px',
                      },
                    }}
                    onClick={() => handleBookingClick(booking.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleBookingClick(booking.id);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                  >
                    <TableCell sx={{ fontSize: '14px' }}>{booking.id}</TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>{booking.guestName}</TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>{booking.propertyName}</TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        color={statusColors[booking.status]}
                        size="small"
                        variant="filled"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
