import { createTheme } from '@mui/material/styles';

// Custom theme for Dorone航空管理システム
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#005288', // Deep blue for aviation professionalism
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f9a825', // Amber accent for highlights
      contrastText: '#000000',
    },
    background: {
      default: '#f0f4f8', // Light background for clean look
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 10px rgba(0, 82, 136, 0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
        },
      },
    },
  },
});

export default theme;
