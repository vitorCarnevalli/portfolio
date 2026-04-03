import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({ position, color, speed, distort, scale }: {
  position: [number, number, number]
  color: string
  speed: number
  distort: number
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock, pointer }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.3
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.2
      // Subtle mouse follow
      meshRef.current.position.x = position[0] + pointer.x * 0.3
      meshRef.current.position.y = position[1] + pointer.y * 0.2
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

function FloatingTorus({ position, color, speed, scale }: {
  position: [number, number, number]
  color: string
  speed: number
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock, pointer }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.4
      meshRef.current.rotation.z = clock.getElapsedTime() * speed * 0.2
      meshRef.current.position.x = position[0] + pointer.x * 0.15
      meshRef.current.position.y = position[1] + pointer.y * 0.1
    }
  })

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.3}
          metalness={0.7}
          distort={0.2}
          speed={1.5}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  )
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#fbbf24" />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#fb923c" />

        <FloatingShape position={[2.5, 1, 0]} color="#f59e0b" speed={0.8} distort={0.4} scale={1.2} />
        <FloatingShape position={[-2.5, -0.5, -1]} color="#f97316" speed={0.6} distort={0.3} scale={0.9} />
        <FloatingShape position={[0.5, -1.5, -2]} color="#ea580c" speed={0.5} distort={0.5} scale={0.7} />
        <FloatingTorus position={[-1.5, 1.5, -1.5]} color="#fb923c" speed={0.4} scale={0.5} />
        <FloatingShape position={[3, -1.5, -1]} color="#d97706" speed={0.7} distort={0.2} scale={0.5} />
      </Canvas>
    </div>
  )
}
