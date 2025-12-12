import { createContext, useContext, useState, useEffect } from 'react'
import { themes, defaultTheme } from '../utils/themes'

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        // Load theme from localStorage or use default
        const saved = localStorage.getItem('portfolio-theme')
        return saved || defaultTheme
    })

    const theme = themes[currentTheme]

    useEffect(() => {
        // Save to localStorage
        localStorage.setItem('portfolio-theme', currentTheme)

        // Apply CSS custom properties
        const root = document.documentElement
        const colors = theme.colors

        root.style.setProperty('--bg', colors.bg)
        root.style.setProperty('--panel', colors.panel)
        root.style.setProperty('--panel-muted', colors.panelMuted)
        root.style.setProperty('--border', colors.border)
        root.style.setProperty('--text', colors.text)
        root.style.setProperty('--muted', colors.muted)
        root.style.setProperty('--accent', colors.accent)
        root.style.setProperty('--accent-2', colors.accent2)
        root.style.setProperty('--accent-3', colors.accent3)
        root.style.setProperty('--gradient-text', colors.gradientText)
        root.style.setProperty('--button-gradient', colors.buttonGradient)
        root.style.setProperty('--ambient-1', colors.ambient1)
        root.style.setProperty('--ambient-2', colors.ambient2)
        root.style.setProperty('--particle-color', colors.particleColor)
        root.style.setProperty('--particle-glow', colors.particleGlow)
        root.style.setProperty('--shadow-tint', colors.shadowTint)

        // Apply background gradient
        document.body.style.background = colors.bgGradient
    }, [currentTheme, theme])

    const changeTheme = (themeId) => {
        setCurrentTheme(themeId)
    }

    const value = {
        currentTheme,
        theme,
        themes,
        changeTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
