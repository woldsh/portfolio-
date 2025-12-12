import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import './LiquidBackground.css'

export const LiquidBackground = () => {
    const { theme } = useTheme()

    return (
        <div className="liquid-background">
            <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={theme.colors.accent} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={theme.colors.accent2} stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={theme.colors.accent2} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={theme.colors.accent3} stopOpacity="0.3" />
                    </linearGradient>
                </defs>

                {/* Blob 1 */}
                <motion.path
                    fill="url(#gradient1)"
                    initial={{ d: "M500,300 Q600,200 700,300 T900,500 Q800,700 600,700 T300,500 Q400,300 500,300 Z" }}
                    animate={{
                        d: [
                            "M500,300 Q600,200 700,300 T900,500 Q800,700 600,700 T300,500 Q400,300 500,300 Z",
                            "M500,250 Q650,150 750,250 T950,450 Q850,750 550,750 T250,450 Q350,250 500,250 Z",
                            "M500,300 Q600,200 700,300 T900,500 Q800,700 600,700 T300,500 Q400,300 500,300 Z",
                        ],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="liquid-blob liquid-blob-1"
                />

                {/* Blob 2 */}
                <motion.path
                    fill="url(#gradient2)"
                    initial={{ d: "M700,400 Q800,300 900,400 T1100,600 Q1000,800 800,800 T500,600 Q600,400 700,400 Z" }}
                    animate={{
                        d: [
                            "M700,400 Q800,300 900,400 T1100,600 Q1000,800 800,800 T500,600 Q600,400 700,400 Z",
                            "M700,350 Q850,250 950,350 T1150,550 Q1050,850 750,850 T450,550 Q550,350 700,350 Z",
                            "M700,400 Q800,300 900,400 T1100,600 Q1000,800 800,800 T500,600 Q600,400 700,400 Z",
                        ],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="liquid-blob liquid-blob-2"
                />

                {/* Blob 3 */}
                <motion.path
                    fill="url(#gradient1)"
                    initial={{ d: "M300,600 Q400,500 500,600 T700,800 Q600,1000 400,1000 T100,800 Q200,600 300,600 Z" }}
                    animate={{
                        d: [
                            "M300,600 Q400,500 500,600 T700,800 Q600,1000 400,1000 T100,800 Q200,600 300,600 Z",
                            "M300,550 Q450,450 550,550 T750,750 Q650,1050 350,1050 T50,750 Q150,550 300,550 Z",
                            "M300,600 Q400,500 500,600 T700,800 Q600,1000 400,1000 T100,800 Q200,600 300,600 Z",
                        ],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="liquid-blob liquid-blob-3"
                />
            </svg>
        </div>
    )
}
