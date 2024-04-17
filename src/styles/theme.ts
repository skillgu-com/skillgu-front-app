import {createTheme} from "@mui/material";

declare module '@mui/material/styles' {
    interface TypographyVariants {
        buttonLg: React.CSSProperties;
        buttonMd: React.CSSProperties;
        buttonSm: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        buttonLg: React.CSSProperties;
        buttonMd: React.CSSProperties;
        buttonSm: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        buttonLg: true;
        buttonMd: true;
        buttonSm: true;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            dark: '#f44813',
            main: '#ff6a3c',
            light: '#ffa88d',
        },
        secondary: {
            dark: '#0f1c3f',
            main: '#242b61',
            light: '#303669',
            contrastText: '#ffffff',
        },
        text: {
            primary: '#212B36',
        }
    },
    typography: {
        fontFamily: "Montserrat, sans-serif",
        fontWeightBold: 700,
        fontWeightMedium: 500,
        fontWeightRegular: 400,
        // TODO use rem if html font size wont be set 10 px
        h1: {
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: '150%',
            letterSpacing: '-2px',
        },
        h2: {
            fontSize: '32px',
            fontWeight: 700,
            lineHeight: '150%',
            letterSpacing: '-1px',
        },
        h3: {
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: '150%',
            letterSpacing: '-1px',
        },
        subtitle1: {
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '130%',
        },
        subtitle2: {
            fontSize: '20px',
            fontWeight: 600,
            lineHeight: '150%',
        },
        body1: {
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '180%',
        },
        body2: {
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '180%',
        },
        caption: {
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: '180%',
        },
        buttonLg: {
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '180%',
        },
        buttonMd: {
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '180%',
        },
        buttonSm: {
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: '180%',
        },
    }
});

export default theme;