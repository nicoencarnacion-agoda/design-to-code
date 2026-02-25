import { useState } from 'react';
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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useBookings } from '../context/BookingsContext';

function CreateBookingPage() {
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const today = new Date().toISOString().slice(0, 10);

  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    propertyName: '',
    propertyAddress: '',
    checkIn: today,
    checkOut: today,
    nights: 1,
    guests: 1,
    status: 'Pending',
    totalAmount: 0,
    currency: 'USD',
    specialRequests: '',
  });

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'checkIn' || field === 'checkOut') {
        const checkIn = field === 'checkIn' ? value : prev.checkIn;
        const checkOut = field === 'checkOut' ? value : prev.checkOut;
        if (checkIn && checkOut) {
          const nights = Math.max(0, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
          next.nights = nights;
        }
      }
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      ...formData,
      nights: formData.nights || 1,
      totalAmount: parseFloat(formData.totalAmount) || 0,
      bookingDate: today,
    };
    const id = addBooking(booking);
    navigate(`/booking/${id}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#0d47a1' }}>
        <Toolbar sx={{ paddingLeft: '8px', paddingRight: '24px', minHeight: '52px' }}>
          <Button
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/bookings')}
            size="small"
            sx={{ fontSize: '11px' }}
          >
            Back
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1, fontSize: '21px', fontWeight: 300 }}>
            Create New Booking
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 5, mb: 2, paddingLeft: '20px', paddingRight: '20px' }}>
        <Stack spacing={2}>
          <Typography variant="h4" component="h1" sx={{ fontSize: '23px', fontWeight: 800, marginBottom: '16px' }}>
            Create Booking
          </Typography>

          <Card component="form" onSubmit={handleSubmit} elevation={2} sx={{ borderRadius: '4px' }}>
            <CardContent sx={{ padding: '18px 30px' }}>
              <Stack spacing={4}>
                <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Guest Information
                </Typography>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Guest Name"
                      variant="filled"
                      value={formData.guestName}
                      onChange={handleChange('guestName')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={formData.guestEmail}
                      onChange={handleChange('guestEmail')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      variant="standard"
                      value={formData.guestPhone}
                      onChange={handleChange('guestPhone')}
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600 }}>
                  Stay Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Property Name"
                      variant="outlined"
                      value={formData.propertyName}
                      onChange={handleChange('propertyName')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Property Address"
                      variant="outlined"
                      value={formData.propertyAddress}
                      onChange={handleChange('propertyAddress')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Check-in Date"
                      type="date"
                      variant="outlined"
                      value={formData.checkIn}
                      onChange={handleChange('checkIn')}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Check-out Date"
                      type="date"
                      variant="outlined"
                      value={formData.checkOut}
                      onChange={handleChange('checkOut')}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Number of Guests"
                      type="number"
                      variant="outlined"
                      value={formData.guests}
                      onChange={handleChange('guests')}
                      inputProps={{ min: 1 }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Total Amount"
                      type="number"
                      variant="outlined"
                      value={formData.totalAmount}
                      onChange={handleChange('totalAmount')}
                      inputProps={{ min: 0, step: 0.01 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formData.status}
                        label="Status"
                        onChange={handleChange('status')}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Confirmed">Confirmed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Special Requests"
                      multiline
                      rows={3}
                      variant="outlined"
                      value={formData.specialRequests}
                      onChange={handleChange('specialRequests')}
                    />
                  </Grid>
                </Grid>

                <Stack direction="row" spacing={1} sx={{ mt: 5, justifyContent: 'flex-end', gap: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/bookings')}
                    size="medium"
                    sx={{ textTransform: 'none', borderColor: '#999', color: '#666' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}
                  >
                    Create Booking
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}

export default CreateBookingPage;
