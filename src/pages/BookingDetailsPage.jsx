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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { mockBookings } from '../data/mockBookings';
import { getStatusChipSx } from '../constants/bookingStatus';

function BookingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [modifyDialogOpen, setModifyDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('');

  const booking = mockBookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Button
              color="inherit"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              size="small"
              sx={{ fontSize: '13px' }}
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

  const handleActionClick = (type) => {
    setActionType(type);
    if (type === 'confirm') {
      setConfirmDialogOpen(true);
    } else if (type === 'cancel') {
      setCancelDialogOpen(true);
    } else if (type === 'modify') {
      navigate(`/booking/${id}/edit`);
    }
  };

  const handleConfirmAction = () => {
    console.log(`Action confirmed: ${actionType} for booking ${id}`);
    setConfirmDialogOpen(false);
    setCancelDialogOpen(false);
    setModifyDialogOpen(false);
  };

  const handleCancelAction = () => {
    setConfirmDialogOpen(false);
    setCancelDialogOpen(false);
    setModifyDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ minHeight: '64px' }}>
          <Button
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            size="small"
            sx={{ fontSize: '13px' }}
            aria-label="Go back to bookings list"
          >
            Back
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2, fontSize: '20px' }}>
            Booking Details
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5, mb: 5, paddingLeft: '24px', paddingRight: '24px' }}>
        <Stack spacing={4}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, fontSize: '28px' }}>
              Booking {booking.id}
            </Typography>
            <Chip
              label={booking.status}
              size="medium"
              sx={getStatusChipSx(booking.status)}
            />
          </Box>

          <Card elevation={2} sx={{ borderRadius: '8px' }}>
            <CardContent sx={{ padding: '20px 24px' }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
                Booking Summary
              </Typography>
              <Divider sx={{ my: 2, borderColor: '#e0e0e0' }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" sx={{ color: '#888', fontSize: '12px', marginBottom: '6px' }}>
                    Booking Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '15px', color: '#333' }}>
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '12px' }}>
                    Total Amount
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '16px', color: '#1976d2' }}>
                    {booking.currency} {booking.totalAmount.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Nights
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '14px' }}>{booking.nights}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Guests
                  </Typography>
                  <Typography variant="body1">{booking.guests}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ border: '1px solid #ddd', borderRadius: '4px' }}>
            <CardContent sx={{ padding: '18px' }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '17px', fontWeight: 500 }}>
                Guest Information
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1">{booking.guestName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{booking.guestEmail}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{booking.guestPhone}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card elevation={1} sx={{ borderRadius: '12px', backgroundColor: '#fafafa' }}>
            <CardContent sx={{ padding: '24px 20px' }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '18px', fontWeight: 600 }}>
                Stay Details
              </Typography>
              <Divider sx={{ my: 2, borderWidth: '1px' }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Property Name
                  </Typography>
                  <Typography variant="body1">{booking.propertyName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1">{booking.propertyAddress}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Check-in
                  </Typography>
                  <Typography variant="body1">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Check-out
                  </Typography>
                  <Typography variant="body1">
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
              {booking.specialRequests && (
                <Box sx={{ mt: 2, padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                  <Typography variant="subtitle2" sx={{ color: '#888', fontSize: '12px', marginBottom: '6px' }}>
                    Special Requests
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#555', fontSize: '14px', lineHeight: 1.5 }}>
                    {booking.specialRequests}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          <Stack direction="row" spacing={2} sx={{ marginTop: '8px' }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={() => handleActionClick('confirm')}
              disabled={booking.status === 'Confirmed' || booking.status === 'Cancelled'}
              sx={{ 
                fontSize: '14px',
                padding: '10px 24px',
                '&:disabled': {
                  backgroundColor: '#bdbdbd',
                  color: '#fff',
                },
                '&:focus': {
                  outline: '2px solid #4caf50',
                  outlineOffset: '1px',
                },
              }}
              // Missing aria-label
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="medium"
              onClick={() => handleActionClick('cancel')}
              disabled={booking.status === 'Cancelled'}
              sx={{ 
                fontSize: '13px',
                '&:disabled': {
                  borderColor: '#e0e0e0',
                  color: '#bdbdbd',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="text"
              color="primary"
              size="small"
              onClick={() => handleActionClick('modify')}
              disabled={booking.status === 'Cancelled'}
              sx={{ 
                fontSize: '13px',
                textTransform: 'none',
                '&:disabled': {
                  color: '#bdbdbd',
                },
              }}
            >
              Modify
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Dialog 
        open={confirmDialogOpen} 
        onClose={handleCancelAction}
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: '8px',
          }
        }}
      >
        <DialogTitle sx={{ fontSize: '20px', paddingBottom: '8px' }}>Confirm Booking</DialogTitle>
        <DialogContent sx={{ paddingTop: '16px' }}>
          <DialogContentText sx={{ color: '#666', fontSize: '14px', lineHeight: 1.6 }}>
            Are you sure you want to confirm booking {booking.id}? This action will change the status to Confirmed.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px', gap: '8px' }}>
          <Button 
            onClick={handleCancelAction}
            variant="text"
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmAction} 
            variant="contained" 
            color="success" 
            autoFocus
            size="medium"
            sx={{ fontSize: '14px' }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={cancelDialogOpen} 
        onClose={handleCancelAction}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: '4px',
          }
        }}
      >
        <DialogTitle sx={{ padding: '20px 24px 12px' }}>Cancel Booking</DialogTitle>
        <DialogContent sx={{ padding: '0 24px' }}>
          <DialogContentText sx={{ color: '#333' }}>
            Are you sure you want to cancel booking {booking.id}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '20px 24px', justifyContent: 'flex-end' }}>
          <Button 
            onClick={handleCancelAction}
            variant="outlined"
            size="small"
          >
            No
          </Button>
          <Button 
            onClick={handleConfirmAction} 
            variant="contained" 
            color="error" 
            autoFocus
            size="large"
          >
            Yes, Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BookingDetailsPage;
