import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';
import SignupForm from './components/SignupForm';
import ChatWindow from './components/ChatWindow';
import { useState, useEffect } from 'react';

// Create a custom theme with navy blue, black, white, and light grey
const theme = createTheme({
  palette: {
    primary: {
      main: '#0A192F', // Navy blue
      light: '#112240',
      dark: '#020C1B',
    },
    secondary: {
      main: '#64FFDA', // Teal accent
    },
    background: {
      default: '#0A192F',
      paper: '#112240',
    },
    text: {
      primary: '#E6F1FF',
      secondary: '#8892B0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/chat" /> : <SignupForm />} 
          />
          <Route 
            path="/chat" 
            element={isAuthenticated ? <ChatWindow /> : <Navigate to="/" />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 