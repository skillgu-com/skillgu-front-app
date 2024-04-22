import React from 'react';
import {Components, createTheme, PaletteOptions, Theme} from "@mui/material";
import {TypographyOptions} from "@mui/material/styles/createTypography";
import CloseIcon from '@mui/icons-material/Close';

declare module '@mui/material/styles' {
    interface Palette {
        base: {
            "0": string,
            "20": string,
            "40": string,
            "60": string,
            "80": string,
            "100": string,
        };
    }

    interface PaletteOptions {
        base: {
            "0": string,
            "20": string,
            "40": string,
            "60": string,
            "80": string,
            "100": string,
        };
    }

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

const palette: PaletteOptions = {
    primary: {
        dark: '#f44813',
        main: '#ff6a3c',
        light: '#ffa88d',
        contrastText: '#ffffff',
    },
    secondary: {
        dark: '#0f1c3f',
        main: '#242b61',
        light: '#303669',
        contrastText: '#ffffff',
    },
    error: {
      main: '#e72749',
    },
    success: {
        main: '#34c759',
    },
    text: {
        primary: '#242b61',
    },
    base: {
        "0": "#ffffff",
        "20": "#F8F8F8",
        "40": "#E2E9FC",
        "60": "#8E9ABB",
        "80": "#56658F",
        "100": "#000000",
    },
    grey: {
        "100": "#F9FAFB",
        "200": "#F3F4F6",
        "300": "#F2F4F8",
    }
};

const typography: TypographyOptions = {
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
        color: palette.base["80"],
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
};

const components: Components<Omit<Theme, "components">> = {
    MuiButton: {
        styleOverrides: {
            containedPrimary: {
                // @ts-ignore
                color: palette.primary?.contrastText,
            },
            root: {
                textTransform: 'none',
                borderRadius: '100px',
                fontSize: typography.buttonMd.fontSize,
                boxShadow: 'none',
                padding: '12px 20px',

                '&:hover': {
                    boxShadow: 'none',
                }
            },
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
              borderRadius: '10px'
            },
            notchedOutline: {
                borderColor: palette.base["40"],
            }
        }
    },
    MuiChip: {
        defaultProps: {
            deleteIcon: <CloseIcon fontSize='small' />
        },
        styleOverrides: {
            label: {
                fontSize: typography.caption?.fontSize,
                fontWeight: typography.caption?.fontWeight,
                padding: '20px',
            },
            deleteIcon: {
                background: 'none'
            }
        }
    }
}

const theme = createTheme({
    palette,
    typography,
    components
});

export default theme;