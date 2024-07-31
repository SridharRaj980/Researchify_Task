import React, { useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import theme from '../../Theme';
import { auth, googleProvider } from '../../firebase';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';

const WelcomePage = () => {
  const handleSignIn = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedirect = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        console.log(result.user); // User info
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  const iconStyle = {
    marginRight: '8px',
    fontSize: '20px',
    marginBottom: '3px'
  };

  return (
    <ThemeProvider theme={theme}>
      <style>{`body { background-color: #F4F5FA; }`}</style>
      <Grid container justifyContent="center">
        <Grid item xs={10} sm={4} container justifyContent="center" direction="column">
          <Typography variant="h4" style={{ marginTop: '76px' }}>
            Welcome to Task Manager
          </Typography>
          <Typography variant="body1" style={{ color: theme.palette.quaternary.main, marginTop: '100px' }}>
            Login into your account
          </Typography>
          <Typography variant="body2" style={{ color: theme.palette.tertiary.main, marginTop: '20px' }}>
            Let us make the circle bigger!
          </Typography>
          <Button
            onClick={handleSignIn}
            variant="contained"
            color="primary"
            sx={{ marginTop: '100px' }}
          >
            <FaGoogle style={iconStyle} /> Sign in with Google
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default WelcomePage;
