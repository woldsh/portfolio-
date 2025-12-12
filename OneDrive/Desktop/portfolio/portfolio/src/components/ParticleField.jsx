import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

function Particles({ count = 2000 }) {
    const meshRef = useRef()
    const { theme } = useTheme()

    // Mouse position
    const mouse = useRef({ x: 0, y: 0 })

    // Generate particle positions
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20
            const y = (Math.random() - 0.5) * 20
            const z = (Math.random() - 0.5) * 20
            temp.push(x, y, z)
        }
        return new Float32Array(temp)
    }, [count])

    // Handle mouse movement
    const handleMouseMove = (event) => {
        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    // Attach mouse listener
    useMemo(() => {
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Animate particles
    useFrame((state) => {
        if (meshRef.current) {
            const positions = meshRef.current.geometry.attributes.position.array

            for (let i = 0; i < positions.length; i += 3) {
                // Wave animation
                const x = positions[i]
                const y = positions[i + 1]

                positions[i + 2] = Math.sin(x * 0.3 + state.clock.elapsedTime * 0.5) *
                    Math.cos(y * 0.3 + state.clock.elapsedTime * 0.5) * 2

                // Mouse interaction
                const dx = mouse.current.x * 10 - x
                const dy = mouse.current.y * 10 - y
                const mouseDistance = Math.sqrt(dx * dx + dy * dy)

                if (mouseDistance < 3) {
                    positions[i] += dx * 0.02
                    positions[i + 1] += dy * 0.02
                } else {
                    // Return to original position
                    positions[i] += (particles[i] - positions[i]) * 0.02
                    positions[i + 1] += (particles[i + 1] - positions[i + 1]) * 0.02
                }
            }

            meshRef.current.geometry.attributes.position.needsUpdate = true
            meshRef.current.rotation.y += 0.0005
        }
    })

    const particleColor = new THREE.Color(theme.colors.particleColor)

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color={particleColor}
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

export const ParticleField = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'none',
        }}>
            <Canvas
                camera={{ position: [0, 0, 15], fov: 75 }}
                gl={{
                    alpha: true,
                    antialias: false,
                    powerPreference: 'high-performance',
                }}
            >
                <Particles count={1000} />
            </Canvas>
        </div>
    )
}
