import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

// Floating geometric shape component
function FloatingShape({ position, geometry, speed = 1 }) {
    const meshRef = useRef()
    const { theme } = useTheme()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.001 * speed
            meshRef.current.rotation.y += 0.002 * speed
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.5
        }
    })

    const color = new THREE.Color(theme.colors.accent)

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position}>
                {geometry === 'sphere' && <Sphere args={[0.8, 32, 32]} />}
                {geometry === 'box' && <Box args={[1, 1, 1]} />}
                {geometry === 'torus' && <Torus args={[0.6, 0.25, 16, 32]} />}
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.3}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    emissive={color}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.6}
                />
            </mesh>
        </Float>
    )
}

// Main 3D Scene
function Scene() {
    const { theme } = useTheme()
    const accentColor = new THREE.Color(theme.colors.accent)
    const accent2Color = new THREE.Color(theme.colors.accent2)

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color={accentColor} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={accent2Color} />
            <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={0.5} color={accentColor} />

            {/* Floating shapes */}
            <FloatingShape position={[-4, 2, -5]} geometry="sphere" speed={0.8} />
            <FloatingShape position={[4, -2, -6]} geometry="box" speed={1.2} />
            <FloatingShape position={[0, 3, -7]} geometry="torus" speed={0.6} />
            <FloatingShape position={[-3, -3, -8]} geometry="sphere" speed={1} />
            <FloatingShape position={[5, 1, -9]} geometry="torus" speed={0.9} />

            {/* Post-processing effects */}
            <EffectComposer>
                <Bloom
                    intensity={0.5}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                />
            </EffectComposer>
        </>
    )
}

// Main exported component
export const Scene3D = () => {
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
                camera={{ position: [0, 0, 10], fov: 50 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance',
                }}
            >
                <Scene />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.3}
                />
            </Canvas>
        </div>
    )
}
