import { createTheme, ThemeOptions } from '@mui/material/styles'

let theme = createTheme({
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
      styleOverrides: {
        root: {
          border: '1px solid',
          // @ts-ignore
          borderColor: theme.palette.accent4.main,
          '&:not(:last-child)': {
            marginBottom: '1rem',
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
  },
} as ThemeOptions)

export default theme
