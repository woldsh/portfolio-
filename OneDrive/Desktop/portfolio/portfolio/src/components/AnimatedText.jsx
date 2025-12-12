import { motion } from 'framer-motion'

export const AnimatedText = ({
    text,
    className = '',
    delay = 0,
    type = 'reveal' // 'reveal' or 'glitch'
}) => {
    const letters = Array.from(text)

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: delay
            },
        }),
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -90,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    }

    const glitchVariant = {
        visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.2,
            },
        },
        hidden: {
            opacity: 0,
            x: Math.random() * 4 - 2,
            filter: 'blur(2px)',
            transition: {
                duration: 0.2,
            },
        },
    }

    return (
        <motion.div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                perspective: '1000px',
            }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={type === 'glitch' ? glitchVariant : child}
                    style={{
                        display: letter === ' ' ? 'inline' : 'inline-block',
                        marginRight: letter === ' ' ? '0.3em' : '0',
                        transformOrigin: '50% 50%',
                    }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    )
}
