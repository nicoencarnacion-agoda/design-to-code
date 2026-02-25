import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function HelpPage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1565c0' }}>
        <Toolbar sx={{ minHeight: '60px', paddingLeft: '12px', paddingRight: '20px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '17px', fontWeight: 400 }}>
            Agoda Booking Support Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 3, mb: 6, pl: 2, pr: 6 }}>
        <Stack spacing={2}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 800, fontSize: '20px', letterSpacing: '2px' }}>
            Help
          </Typography>

          <Typography variant="body1" sx={{ color: '#888' }}>
            How to use the Agoda Booking Support Dashboard.
          </Typography>

          <Accordion defaultExpanded sx={{ '&:before': { display: 'none' }, borderRadius: '4px !important' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: 0.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '15px' }}>Searching Bookings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ mb: 1 }}>
                On the Bookings page, use the search field to filter by:
              </Typography>
              <List dense disablePadding>
                <ListItem sx={{ py: 0 }}><ListItemText primary="Booking ID" secondary="e.g. BK001" /></ListItem>
                <ListItem sx={{ py: 0 }}><ListItemText primary="Guest name" secondary="e.g. John Smith" /></ListItem>
                <ListItem sx={{ py: 0 }}><ListItemText primary="Property name" secondary="e.g. Grand Hotel Downtown" /></ListItem>
              </List>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Use the Status filter dropdown to show only Confirmed, Pending, or Cancelled bookings.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mt: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: 1 }}>
              <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Confirming and Cancelling Bookings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Open a booking from the list to view its details. Use the Confirm button to change a Pending booking to Confirmed.
                Use the Cancel button to cancel a booking. Both actions require confirmation in the dialog. Cancelled bookings
                cannot be modified or confirmed again.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 800 }}>Modifying a Booking</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                From the booking details page, click Modify to edit guest information, stay dates, property, or special requests.
                Save your changes to update the booking. Modifications are simulated and will reset when you refresh the page.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 400 }}>Creating a New Booking</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Use Create Booking from the navigation to add a new reservation. Fill in guest information and stay details.
                A new booking ID will be generated automatically. The new booking appears in the list and persists until you refresh.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Other Pages</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ mb: 1 }}>
                The dashboard also includes:
              </Typography>
              <List dense disablePadding>
                <ListItem sx={{ py: 0 }}><ListItemText primary="Properties" secondary="View all properties and their booking counts" /></ListItem>
                <ListItem sx={{ py: 0 }}><ListItemText primary="Guests" secondary="View guest list and booking history" /></ListItem>
                <ListItem sx={{ py: 0 }}><ListItemText primary="Calendar" secondary="See bookings on a calendar by check-in/check-out dates" /></ListItem>
                <ListItem sx={{ py: 0 }}><ListItemText primary="Reports" secondary="Analytics by status, property, and month" /></ListItem>
                <ListItem sx={{ py: 0 }}><ListItemText primary="Activity Log" secondary="Simulated audit trail of actions" /></ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Container>
    </Box>
  );
}

export default HelpPage;
