import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useBookings } from '../context/BookingsContext';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CalendarPage() {
  const navigate = useNavigate();
  const { bookings } = useBookings();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = useMemo(() => {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const firstDayOfWeek = first.getDay();
    const lastDateNum = last.getDate();
    const list = [];
    for (let i = 0; i < firstDayOfWeek; i++) list.push(null);
    for (let d = 1; d <= lastDateNum; d++) list.push(d);
    while (list.length < 42) list.push(null);
    return list;
  }, [year, month]);

  const getBookingsForDay = (dayNum) => {
    if (!dayNum) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    return bookings.filter((b) => {
      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);
      const d = new Date(dateStr);
      return d >= checkIn && d <= checkOut;
    });
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const goPrev = () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1));
  const goNext = () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ minHeight: '50px', paddingLeft: '20px', paddingRight: '14px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '17px', fontWeight: 600 }}>
            Agoda Booking Support Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3, mb: 6, pl: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 4 }}>
          <IconButton onClick={goPrev}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 400, minWidth: 180, textAlign: 'center', fontSize: '20px' }}>
            {monthName}
          </Typography>
          <IconButton onClick={goNext}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            border: '2px solid #d0d0d0',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {DAYS.map((d) => (
            <Box key={d} sx={{ p: 1.5, backgroundColor: '#e8e8e8', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
              <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '11px', color: '#666' }}>{d}</Typography>
            </Box>
          ))}
          {days.map((day, i) => {
            const dayBookings = getBookingsForDay(day);
            return (
              <Box
                key={i}
                sx={{
                  minHeight: i % 7 === 0 ? 95 : 105,
                  p: i % 2 === 0 ? 0.5 : 0.75,
                  borderRight: (i + 1) % 7 !== 0 ? '1px solid #ddd' : 'none',
                  borderBottom: '1px solid #eee',
                  backgroundColor: i % 14 === 0 ? '#fafafa' : '#fff',
                }}
              >
                {day && (
                  <>
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>{day}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {dayBookings.slice(0, 3).map((b) => (
                        <Chip
                          key={b.id}
                          label={b.id}
                          size="small"
                          sx={{ fontSize: '10px', height: 22, cursor: 'pointer' }}
                          onClick={() => navigate(`/booking/${b.id}`)}
                        />
                      ))}
                      {dayBookings.length > 3 && (
                        <Typography variant="caption" sx={{ color: '#888' }}>+{dayBookings.length - 3} more</Typography>
                      )}
                    </Box>
                  </>
                )}
              </Box>
            );
          })}
        </Box>

        <Typography variant="body2" sx={{ color: '#999', mt: 3, fontSize: '12px' }}>
          Click a booking ID to view details.
        </Typography>
      </Container>
    </Box>
  );
}

export default CalendarPage;
