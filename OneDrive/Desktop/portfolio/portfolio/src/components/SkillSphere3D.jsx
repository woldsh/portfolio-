import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

const skills = [
    { label: 'React', position: [2, 2, 0] },
    { label: 'Node.js', position: [-2, 2, 0] },
    { label: 'Next.js', position: [0, 2, 2] },
    { label: 'Firebase', position: [0, 2, -2] },
    { label: 'TypeScript', position: [2, 0, 2] },
    { label: 'JavaScript', position: [-2, 0, 2] },
    { label: 'HTML', position: [2, 0, -2] },
    { label: 'CSS', position: [-2, 0, -2] },
    { label: 'MySQL', position: [0, -2, 2] },
    { label: 'SQL', position: [2, -2, 0] },
    { label: 'PHP', position: [-2, -2, 0] },
    { label: 'Java', position: [0, -2, -2] },
]

function SkillNode({ label, position }) {
    const meshRef = useRef()
    const textRef = useRef()
    const { theme } = useTheme()
    const color = new THREE.Color(theme.colors.accent)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
        }
        if (textRef.current) {
            textRef.current.lookAt(state.camera.position)
        }
    })

    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            <Text
                ref={textRef}
                position={[0, 0.4, 0]}
                fontSize={0.25}
                color={theme.colors.text}
                anchorX="center"
                anchorY="middle"
            >
                {label}
            </Text>
        </group>
    )
}

function SphereFrame() {
    const { theme } = useTheme()
    const color = new THREE.Color(theme.colors.accent2)

    return (
        <mesh>
            <sphereGeometry args={[3, 32, 32]} />
            <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.1}
            />
        </mesh>
    )
}

function Scene3DSkills() {
    const { theme } = useTheme()
    const lightColor = new THREE.Color(theme.colors.accent)

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={lightColor} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <SphereFrame />

            {skills.map((skill) => (
                <SkillNode key={skill.label} label={skill.label} position={skill.position} />
            ))}

            <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={5}
                maxDistance={12}
                autoRotate
                autoRotateSpeed={1}
            />
        </>
    )
}

export const SkillSphere3D = () => {
    return (
        <div style={{
            width: '100%',
            height: '500px',
            borderRadius: '18px',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Scene3DSkills />
            </Canvas>
        </div>
    )
}
