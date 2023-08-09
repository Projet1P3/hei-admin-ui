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
          background: '#fffef5'
        }
      }
    },
    RaAppBar: {
      styleOverrides: {
        root: {
          '& .RaAppBar-toolbar': {
            color: 'white',
            background: '#14171C'
          }
        }
      }
    },
    RaLayout: {
      styleOverrides: {
        root: {
          background: '#fffef5'
        }
      }
    },
    RaMenu: {
      styleOverrides: {
        root: {
          background: '#14171C',
          height: '100%',
          marginTop: 0,
          position: 'fixed',
          '&.RaMenu-closed': {},
          '&.RaMenu-open': {
            paddingRight: '15px'
          }
        }
      }
    },
    RaMultiLevelMenu: {
      styleOverrides: {
        root: {
          background: '#14171c',
          padding: '0 20px 0 15px',
          color: '#fffef5',
          marginBottom: '20px',
          '& .RaMenuItemCategory-link': {
            '&:hover': {
              color: '#fffef5a3',
              '& .MuiSvgIcon-root': {
                color: '#fffef5a3'
              },
              fontWeight: '600'
            }
          },
          '& .RaMenuItemCategory-icon': {
            color: '#fffef5'
          },
          '& .RaMenuItemCategory-active': {
            color: '#dfa408',
            '&:hover': {
              color: '#fffef5a3',
              '& .MuiSvgIcon-root': {
                color: '#fffef5a3'
              }
            },
            '& .MuiSvgIcon-root': {
              color: '#dfa408'
            }
          }
        }
      }
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          color: '#fffef5',
          marginBottom: '20px',
          '&:hover': {
            color: '#14171C',
            background: '#fffef5dc',
            borderRadius: '0px 20px 20px 0px',
            borderLeft: 'solid #dfa408 3px',
            '& .MuiSvgIcon-root': {
              color: '#14171C'
            },
            fontWeight: '600'
          },
          '& .RaMenuItemLink-icon': {
            color: '#fffef5'
          },
          '&.RaMenuItemLink-active': {
            marginRight: '3px',
            fontWeight: '600',
            background: '#f7f7f7',
            borderRadius: '0px 20px 20px 0px',
            borderLeft: 'solid #dfa408 3px',
            color: '#dfa408',
            '&:hover': {
              color: '#14171C',
              '& .MuiSvgIcon-root': {
                color: '#14171C'
              },
              borderLeft: 'solid #14171C 3px'
            },
            '& .MuiSvgIcon-root': {
              color: '#dfa408'
            }
          }
        }
      }
    }
  }
})
