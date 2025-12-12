import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import './MagneticCursor.css'

export const MagneticCursor = () => {
    const cursorRef = useRef(null)
    const cursorDotRef = useRef(null)
    const [isHovering, setIsHovering] = useState(false)
    const { theme } = useTheme()

    const cursorX = useMotionValue(0)
    const cursorY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const handleMouseEnter = () => setIsHovering(true)
        const handleMouseLeave = () => setIsHovering(false)

        // Add magnetic effect to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .card, .pill, input, textarea, .project'
        )

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter)
            el.addEventListener('mouseleave', handleMouseLeave)

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect()
                const x = e.clientX - rect.left - rect.width / 2
                const y = e.clientY - rect.top - rect.height / 2

                // Magnetic pull effect
                const pullStrength = 0.3
                cursorX.set(e.clientX + x * pullStrength)
                cursorY.set(e.clientY + y * pullStrength)
            })
        })

        window.addEventListener('mousemove', moveCursor)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter)
                el.removeEventListener('mouseleave', handleMouseLeave)
            })
        }
    }, [cursorX, cursorY])

    return (
        <>
            <motion.div
                ref={cursorRef}
                className="magnetic-cursor"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    scale: isHovering ? 1.5 : 1,
                    borderColor: theme.colors.accent,
                }}
            />
            <motion.div
                ref={cursorDotRef}
                className="magnetic-cursor-dot"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    scale: isHovering ? 0 : 1,
                    backgroundColor: theme.colors.accent2,
                }}
            />
        </>
    )
}
