import { useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Stack,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useBookings } from '../context/BookingsContext';

function ReportsPage() {
  const { bookings } = useBookings();

  const byStatus = useMemo(() => {
    const map = {};
    bookings.forEach((b) => {
      map[b.status] = (map[b.status] || 0) + 1;
    });
    return Object.entries(map).map(([status, count]) => ({ status, count }));
  }, [bookings]);

  const byProperty = useMemo(() => {
    const map = {};
    bookings.forEach((b) => {
      map[b.propertyName] = (map[b.propertyName] || 0) + 1;
    });
    return Object.entries(map)
      .map(([property, count]) => ({ property, count }))
      .sort((a, b) => b.count - a.count);
  }, [bookings]);

  const byMonth = useMemo(() => {
    const map = {};
    bookings.forEach((b) => {
      const key = b.checkIn.slice(0, 7);
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [bookings]);

  const totalRevenue = useMemo(
    () => bookings.filter((b) => b.status === 'Confirmed').reduce((sum, b) => sum + (b.totalAmount || 0), 0),
    [bookings]
  );

  const avgBookingValue = useMemo(() => {
    const confirmed = bookings.filter((b) => b.status === 'Confirmed');
    if (confirmed.length === 0) return 0;
    return confirmed.reduce((sum, b) => sum + (b.totalAmount || 0), 0) / confirmed.length;
  }, [bookings]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ minHeight: '58px', paddingLeft: '18px', paddingRight: '18px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '19px', fontWeight: 400 }}>
            Agoda Booking Support Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 2, mb: 8, pl: 5, pr: 3 }}>
        <Stack spacing={4}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700, fontSize: '22px', textTransform: 'lowercase' }}>
            Reports
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Card elevation={2} sx={{ minWidth: 220, borderRadius: '4px' }}>
              <CardContent sx={{ p: '16px 24px 20px' }}>
                <Typography variant="body2" sx={{ color: '#bbb', fontSize: '11px' }}>Total Revenue</Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0d47a1', fontSize: '20px' }}>USD {totalRevenue.toFixed(2)}</Typography>
              </CardContent>
            </Card>
            <Card elevation={0} sx={{ minWidth: 180, borderRadius: '12px', border: '1px solid #e0e0e0' }}>
              <CardContent sx={{ padding: '24px 16px' }}>
                <Typography variant="body2" sx={{ color: '#888', fontSize: '13px' }}>Avg Booking Value</Typography>
                <Typography variant="h5" sx={{ fontWeight: 500 }}>USD {avgBookingValue.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Box>

          <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 700 }}>Bookings by Status</Typography>
          <TableContainer component={Paper} elevation={1} sx={{ borderRadius: '6px' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {byStatus.map((row) => (
                  <TableRow key={row.status}>
                    <TableCell>{row.status}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" sx={{ fontSize: '17px', fontWeight: 500 }}>Bookings by Property</Typography>
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '10px', border: '1px solid #eee' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Property</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Bookings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {byProperty.map((row) => (
                  <TableRow key={row.property}>
                    <TableCell>{row.property}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 800 }}>Bookings by Month (Check-in)</Typography>
          <TableContainer component={Paper} elevation={2} sx={{ borderRadius: '4px' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Month</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Bookings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {byMonth.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    </Box>
  );
}

export default ReportsPage;
