import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Stack,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { mockActivityLog } from '../data/mockActivityLog';

function ActivityLogPage() {
  const navigate = useNavigate();
  const [actionFilter, setActionFilter] = useState('All');

  const filteredLog = actionFilter === 'All'
    ? mockActivityLog
    : mockActivityLog.filter((entry) => entry.action === actionFilter);

  const actions = ['All', ...Array.from(new Set(mockActivityLog.map((e) => e.action)))];

  const formatDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toLocaleString();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1565c0' }}>
        <Toolbar sx={{ minHeight: '54px', paddingLeft: '14px', paddingRight: '22px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '16px', fontWeight: 600 }}>
            Agoda Booking Support Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5, mb: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 500, fontSize: '24px', letterSpacing: '1px' }}>
            Activity Log
          </Typography>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Action</InputLabel>
            <Select
              value={actionFilter}
              label="Filter by Action"
              onChange={(e) => setActionFilter(e.target.value)}
            >
              {actions.map((a) => (
                <MenuItem key={a} value={a}>{a}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="body2" sx={{ color: '#aaa', fontSize: '12px' }}>
            Showing {filteredLog.length} entr(ies)
          </Typography>

          <TableContainer component={Paper} elevation={1} sx={{ borderRadius: '4px' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Booking ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLog.map((entry) => (
                  <TableRow key={entry.id} hover>
                    <TableCell sx={{ fontSize: '13px' }}>{formatDate(entry.timestamp)}</TableCell>
                    <TableCell>{entry.action}</TableCell>
                    <TableCell>
                      <Typography
                        component="span"
                        sx={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#1565c0' } }}
                        onClick={() => navigate(`/booking/${entry.bookingId}`)}
                      >
                        {entry.bookingId}
                      </Typography>
                    </TableCell>
                    <TableCell>{entry.userName}</TableCell>
                    <TableCell sx={{ fontSize: '13px', color: '#666' }}>{entry.details}</TableCell>
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

export default ActivityLogPage;
