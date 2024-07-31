import { createTheme } from "@mui/material";
import { blue } from "@material-ui/core/colors";

const theme=createTheme({
   typography:{
    h5:{
        fontFamily: 'Inter', color: '#4B5768', fontSize: 20, fontWeight: 500
    },
    h4:{
        fontFamily: 'Poppins', fontWeight: 700, fontSize: 46,
    },
    h1:{
      fontFamily: 'Poppins', fontWeight: 500, fontSize: 20,
  },
    h3:{
        fontFamily: 'Inter', color: '#4B5768', fontSize: 20, fontWeight: 500,
    },
    h2:{
        fontFamily: 'Inter', color: '#4B5768', fontSize: 20, fontWeight: 500,
    },
    body1:{
        fontFamily: 'Poppins',  fontSize: 36,
    },
    body7:{
      fontFamily: 'Poppins',  fontSize: 30, color:'#FFFFFF'
  },
    body2:{
        fontFamily: 'Inter', fontSize: 16.75,fontWeight: 500
    },
    body4:{
        fontFamily: 'Inter', fontSize: 16.75,fontWeight: 500,   
    },
    body3:{
        fontFamily: 'Inter', fontWeight: 500, fontSize: 16,
    },
    body6:{
      fontFamily: 'Inter', fontWeight: 500, fontSize: 14,
  },
    body5:{
      fontFamily: 'Inter', fontWeight: 500, fontSize: 16,cursor: 'pointer', color: 'blue',textDecoration: 'underline'
  },
  body8:{
    fontFamily: 'Inter', fontWeight: 500, fontSize: 12,color:'#A9A9A9'
}
},

palette: {
    primary:{
        main:'#2f4eef'  
    },
    secondary:{
        main:'#000000'
    },
    tertiary:{
      main:'#4B5768',
    },
    quaternary:{
      main:'#5570F1',
    },
    alpha:{
      main:'#53545C',
    },
    sigma:{
      main:'#8B8D97',
    }
    
    
  },

  components: {
    MuiButton: {
      styleOverrides: {
        subvariantBig: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: 24,
          fontFamily: 'Inter',
          backgroundColor: '#2f4eef',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1d3dbf',
          },
        },
        
      },
    },
    MuiButton: {
      styleOverrides: {
        root:{
        "&.subvariantSmall": {
          padding:'4px 6px',
          borderRadius: 8,
          fontWeight: 500,
          fontSize: 12,
          fontFamily: 'Inter',
          backgroundColor: '#FEFCFF',
          color: '#000000',
          borderColor: '#000000',
          '&:hover': {
            backgroundColor: '#FEFCFF',
            borderColor: '#000000',
          },
        },
      },
      },
    },

  

   
      
    

      MuiTextField: {
        styleOverrides: {
          root: {
            "&.subvariant-hovered": {
              borderRadius: 8, 
              
            '& .MuiInputBase-input': {
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: 14,
              backgroundColor:'#F4F5FA',
             
              
            },
            '& .MuiInputBase-root': {
              fontSize: 16, 
              fontFamily: 'Poppins',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#2f4eff', 
                border:'1px solid #2f4eff'
              },
              '&:hover fieldset': {
                borderColor: '#001279', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#001279', 
              },
            },
            '& .MuiInputAdornment-root': {
              marginRight: 10, 
            },
            '& .MuiTypography-root': {
              fontSize: 18, 
              fontWeight: 'bold',
              fontFamily: 'Poppins', 
            },
            }
          },
        },
      },




      

      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#ABAFB1', 
            fontSize: '16px',
             fontFamily:'Inter', 
             fontWeight:500
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          // Custom class for select field with default icon color
          '.default-icon': {
            icon: {
              // Default icon color
              color: 'initial', // or whatever your default color is
            },
          },
          // Custom class for select field with white icon color
          '.white-icon': {
            icon: {
              // Icon color overridden to white
              color: '#FFFFFF',
            },
          },
        },
      }

      




  },


})

export default theme;