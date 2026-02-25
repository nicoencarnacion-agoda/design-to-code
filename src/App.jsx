import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BookingsProvider } from './context/BookingsContext';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import BookingListPage from './pages/BookingListPage';
import BookingDetailsPage from './pages/BookingDetailsPage';
import ModifyBookingPage from './pages/ModifyBookingPage';
import CreateBookingPage from './pages/CreateBookingPage';
import PropertiesPage from './pages/PropertiesPage';
import GuestsPage from './pages/GuestsPage';
import CalendarPage from './pages/CalendarPage';
import ReportsPage from './pages/ReportsPage';
import ActivityLogPage from './pages/ActivityLogPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BookingsProvider>
        <Router basename="/design-to-code">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/bookings" element={<BookingListPage />} />
              <Route path="/booking/new" element={<CreateBookingPage />} />
              <Route path="/booking/:id" element={<BookingDetailsPage />} />
              <Route path="/booking/:id/edit" element={<ModifyBookingPage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/guests" element={<GuestsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/activity" element={<ActivityLogPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </BookingsProvider>
    </ThemeProvider>
  );
}

export default App;
