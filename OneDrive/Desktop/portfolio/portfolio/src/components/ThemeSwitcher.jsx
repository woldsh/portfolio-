import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import './ThemeSwitcher.css'

export const ThemeSwitcher = () => {
    const { currentTheme, themes, changeTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const themeList = Object.values(themes)

    return (
        <div className="theme-switcher">
            <motion.button
                className="theme-toggle"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Change theme"
            >
                <span className="theme-icon">🎨</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="theme-menu"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <p className="theme-menu-title">Choose Theme</p>
                        <div className="theme-options">
                            {themeList.map((theme) => (
                                <motion.button
                                    key={theme.id}
                                    className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
                                    onClick={() => {
                                        changeTheme(theme.id)
                                        setIsOpen(false)
                                    }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div
                                        className="theme-preview"
                                        style={{
                                            background: theme.colors.buttonGradient
                                        }}
                                    />
                                    <span>{theme.name}</span>
                                    {currentTheme === theme.id && (
                                        <motion.div
                                            className="active-indicator"
                                            layoutId="activeTheme"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        >
                                            ✓
                                        </motion.div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
