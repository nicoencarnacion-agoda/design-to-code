import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Stack,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const STORAGE_KEYS = {
  currency: 'agoda-dashboard-currency',
  dateFormat: 'agoda-dashboard-dateFormat',
};

function SettingsPage() {
  const [currency, setCurrency] = useState('USD');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedCurrency = localStorage.getItem(STORAGE_KEYS.currency);
    const storedDateFormat = localStorage.getItem(STORAGE_KEYS.dateFormat);
    if (storedCurrency) setCurrency(storedCurrency);
    if (storedDateFormat) setDateFormat(storedDateFormat);
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEYS.currency, currency);
    localStorage.setItem(STORAGE_KEYS.dateFormat, dateFormat);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ minHeight: '52px', paddingLeft: '24px', paddingRight: '10px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '16px', fontWeight: 700 }}>
            Agoda Booking Support Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 2, mb: 6, pl: 3, pr: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 400, fontSize: '28px', textTransform: 'none' }}>
            Settings
          </Typography>

          <Card elevation={2} sx={{ borderRadius: '12px' }}>
            <CardContent sx={{ padding: '20px 28px 24px' }}>
              <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 500, marginBottom: '20px', color: '#555' }}>
                Display Preferences
              </Typography>
              <Stack spacing={3}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={currency}
                    label="Currency"
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="THB">THB</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Date Format</InputLabel>
                  <Select
                    value={dateFormat}
                    label="Date Format"
                    onChange={(e) => setDateFormat(e.target.value)}
                  >
                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  {saved ? 'Saved!' : 'Save Preferences'}
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Typography variant="body2" sx={{ color: '#aaa', fontSize: '12px' }}>
            Settings are stored in your browser. This is a training app with no backend.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default SettingsPage;
