import { createTheme, ThemeOptions } from '@mui/material/styles'

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
  shape: {
    borderRadius: 12,
  },
  palette: {
    text: {
      secondary: 'var(--accents-6)',
      disabled: 'var(--accents-6)',
    },
    background: {
      default: 'var(--primary)',
      paper: 'var(--primary)',
    },
    // @ts-ignore
    accent4: {
      main: 'var(--accents-4)',
    },
  },
  typography: {
    fontFamily: 'var(--font-sans)',
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          textAlign: 'justify',
          fontSize: '0.75rem',
        },
      },
    },
  },
})

theme = createTheme(theme, {
  components: {
    MuiTooltip: {
      styleOverrides: {},
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          '& fieldset': {
            // @ts-ignore
            borderColor: theme.palette.accent4.main,
          },
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: '1px solid',
          // @ts-ignore
          borderColor: theme.palette.accent4.main,
          '&:not(:last-child)': {
            marginBottom: '0rem',
            borderBottom: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          '&.Mui-expanded': {
            margin: '12px 0',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
          borderRadius: '0.25rem',
          '&:before, &:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
          },
        },
        input: {
          padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)}`,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(0.5),
        },
      },
    },
  },
} as ThemeOptions)

export default theme
