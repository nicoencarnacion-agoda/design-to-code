import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BookingListPage from './pages/BookingListPage';
import BookingDetailsPage from './pages/BookingDetailsPage';
import ModifyBookingPage from './pages/ModifyBookingPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    // Missing error, warning, success, info colors in theme but used in components
  },
  // Missing typography customization - inconsistent font sizes across app
  // Missing spacing customization - using mixed px and theme spacing
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<BookingListPage />} />
          <Route path="/booking/:id" element={<BookingDetailsPage />} />
          <Route path="/booking/:id/edit" element={<ModifyBookingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
