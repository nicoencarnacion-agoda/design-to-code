import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useBookings } from '../context/BookingsContext';

function ModifyBookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, updateBooking } = useBookings();
  const booking = bookings.find((b) => b.id === id);

  const [formData, setFormData] = useState({
    guestName: booking?.guestName || '',
    guestEmail: booking?.guestEmail || '',
    guestPhone: booking?.guestPhone || '',
    propertyName: booking?.propertyName || '',
    checkIn: booking?.checkIn || '',
    checkOut: booking?.checkOut || '',
    guests: booking?.guests || 1,
    status: booking?.status || 'Pending',
    specialRequests: booking?.specialRequests || '',
  });

  if (!booking) {
    return (
      <Box>
        <AppBar position="static" sx={{ backgroundColor: '#333' }}>
          <Toolbar sx={{ minHeight: '50px' }}>
            <Button
              color="inherit"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(`/booking/${id}`)}
            >
              Back
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
              Booking Not Found
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h6">Booking with ID {id} not found.</Typography>
        </Container>
      </Box>
    );
  }

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.max(0, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
    updateBooking(id, {
      guestName: formData.guestName,
      guestEmail: formData.guestEmail,
      guestPhone: formData.guestPhone,
      propertyName: formData.propertyName,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      nights,
      guests: parseInt(formData.guests, 10),
      status: formData.status,
      specialRequests: formData.specialRequests || null,
    });
    navigate(`/booking/${id}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ paddingLeft: '16px', paddingRight: '8px', minHeight: '58px' }}>
          <Button
            color="inherit"
            startIcon={<ArrowBackIcon sx={{ fontSize: '20px' }} />}
            onClick={() => navigate(`/booking/${id}`)}
            size="medium"
            sx={{ fontSize: '14px' }}
          >
            Back
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 4, fontSize: '17px', fontWeight: 300 }}>
            Modify Booking {booking.id}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 2, mb: 5, paddingLeft: '24px', paddingRight: '12px' }}>
        <Stack spacing={3}>
          <Typography variant="h4" component="h1" sx={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Edit Booking
          </Typography>

          <Card component="form" onSubmit={handleSubmit} elevation={1} sx={{ borderRadius: '10px' }}>
            <CardContent sx={{ padding: '20px 28px 24px 18px' }}>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 700, textTransform: 'lowercase', letterSpacing: '1px' }}>Guest Information</Typography>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Guest Name"
                      variant="outlined"
                      size="medium"
                      value={formData.guestName}
                      onChange={handleChange('guestName')}
                      required
                      sx={{
                        '& .MuiInputLabel-root': {
                          fontSize: '14px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email *"
                      type="email"
                      variant="standard"
                      value={formData.guestEmail}
                      onChange={handleChange('guestEmail')}
                      required
                      placeholder="Enter email address"
                      sx={{
                        '& .MuiInputLabel-root': {
                          fontSize: '13px',
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: '#bbb',
                          opacity: 1,
                        },
                      }}
                      // Missing error state handling
                      // Missing helper text
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      variant="filled"
                      size="small"
                      value={formData.guestPhone}
                      onChange={handleChange('guestPhone')}
                      required
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '13px',
                          padding: '12px',
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 500 }}>Stay Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Property Name"
                      variant="outlined"
                      value={formData.propertyName}
                      onChange={handleChange('propertyName')}
                      required
                      sx={{
                        '& .MuiInputBase-root': {
                          fontSize: '14px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Check-in Date"
                      type="date"
                      variant="outlined"
                      size="small"
                      value={formData.checkIn}
                      onChange={handleChange('checkIn')}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '15px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ fontSize: '14px' }}>Status</InputLabel>
                      <Select
                        value={formData.status}
                        label="Status"
                        onChange={handleChange('status')}
                        size="small"
                        sx={{
                          fontSize: '14px',
                        }}
                      >
                        <MenuItem value="Pending" sx={{ fontSize: '14px' }}>Pending</MenuItem>
                        <MenuItem value="Confirmed" sx={{ fontSize: '14px' }}>Confirmed</MenuItem>
                        <MenuItem value="Cancelled" sx={{ fontSize: '14px' }}>Cancelled</MenuItem>
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
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '14px',
                          lineHeight: 1.5,
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Stack direction="row" spacing={4} sx={{ mt: 4, justifyContent: 'flex-end', gap: '8px' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/booking/${id}`)}
                    size="medium"
                    sx={{
                      fontSize: '14px',
                      padding: '8px 20px',
                      textTransform: 'none',
                      borderColor: '#999',
                      color: '#666',
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    size="large"
                    sx={{
                      fontSize: '15px',
                      padding: '10px 28px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Save Changes
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

export default ModifyBookingPage;
