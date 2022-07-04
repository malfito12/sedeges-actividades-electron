import React, { createContext } from 'react'
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'
import '../../../index.css'

const theme = createTheme({
    typography: {
        fontFamily: "Roboto Condensed",
        fontSize: 12,
    }
})
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={theme}>{children}</AuthContext.Provider>
        </ThemeProvider>
    )
}

