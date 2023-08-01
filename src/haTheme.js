import { createTheme } from '@mui/material/styles'
import { amber, indigo } from '@mui/material/colors'
import { defaultTheme } from 'react-admin'

export const mainTheme = createTheme({
  defaultTheme,
  palette: {
    primary: {
      main: indigo[800]
    },
    secondary: {
      main: amber[500]
    }
  },
  typography: {
    fontFamily: ['Quicksand', 'sans-serif'].join(','),
    fontSize: 15
  },
  components: {
    RaSidebar: {
      styleOverrides: {
        root: {
          marginRight: '10px',
          background: 'white',
        }
      }
    },

    RaAppBar: {
      styleOverrides: {
        root: {
          '& .RaAppBar-toolbar': {
            color: 'white',
            background: '#001948'
          }
        }
      }


    },
    RaLayout: {
      styleOverrides: {
        root: {
          background: '#f7f7f7',
         /* position: 'relative',
          '& .RaLayout-appFrame': {
            '&::before': {
              background: '#001948',
              content: '" "',
              
              height: '264px',
              left: '0',
              position: 'absolute',
              top: '0',
              width: '100%',
              zIndex: -1,
            },
          
          },
          '& .RaLayout-content': {
            background: 'transparent',
            color: 'white'
          },*/
          
        }, 
        
      }
    },
    RaMenu: {
      styleOverrides: {
        root: {
          marginTop: '50px',
          '&.RaMenu-closed': {
          },
          '&.RaMenu-open': {
            padding: '0 15px 0 0',
          },
        }
      }
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          marginBottom: '20px',
          '&:hover': {
            color: '#001948',
            '& .MuiSvgIcon-root': {
              color: '#001948',
            },
            fontWeight: '600',
            borderLeft: 'solid #001948 3px',
            borderRadius: '0px 20px 20px 0px',
          },
          '&.RaMenuItemLink-active': {
            marginRight: '3px',
            fontWeight: '600',
            background: '#f7f7f7',
            borderRadius: '0px 20px 20px 0px',
            borderLeft: 'solid #dfa408 3px',
            color: '#dfa408',
            '&:hover': {
              color: '#001948',
              '& .MuiSvgIcon-root': {
                color: '#001948',
              },
              borderLeft: 'solid #001948 3px',
            },
            '& .MuiSvgIcon-root': {
              color: '#dfa408',
            },
          },
        }
      }
    },

  }

  //shadows: Array(25).fill('none')
})
