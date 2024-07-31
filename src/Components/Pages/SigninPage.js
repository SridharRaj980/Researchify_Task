import React from 'react';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';

const SigninOption = () => {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user); // User info
    } catch (error) {
      console.error(error);
    }
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4', // Google blue
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#357ae8', // Darker Google blue on hover
  };

  const iconStyle = {
    marginRight: '8px',
    fontSize: '20px',
  };

  const [hover, setHover] = React.useState(false);

  return (
    <button
      style={hover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleSignIn}
    >
      <FaGoogle style={iconStyle} /> Sign in with Google
    </button>
  );
};

export default SigninOption;
