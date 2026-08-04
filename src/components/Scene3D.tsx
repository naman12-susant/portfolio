import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Sparkles,
} from '@react-three/drei'
import { useMemo, useRef } from 'react'
import type { Group, Mesh, Points } from 'three'

function Core() {
  const mesh = useRef<Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    mesh.current.rotation.x = t * 0.16
    mesh.current.rotation.y = t * 0.26
  })

  return (
    <Float speed={1.35} rotationIntensity={0.45} floatIntensity={1.05}>
      <mesh ref={mesh} scale={1.02}>
        <icosahedronGeometry args={[1.15, 1]} />
        <MeshDistortMaterial
          color="#e8a87c"
          distort={0.38}
          speed={1.8}
          roughness={0.18}
          metalness={0.62}
          emissive="#6b3d22"
          emissiveIntensity={0.28}
        />
      </mesh>
    </Float>
  )
}

function Crystal({
  position,
  color,
  scale = 0.28,
  speed = 1,
}: {
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
}) {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.4 * speed
    ref.current.rotation.z = state.clock.elapsedTime * 0.25 * speed
  })

  return (
    <Float speed={1.8 * speed} floatIntensity={1.4} rotationIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
    </Float>
  )
}

function OrbitRing({
  radius,
  color,
  speed,
  tilt,
}: {
  radius: number
  color: string
  speed: number
  tilt: number
}) {
  const group = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.z += delta * speed
  })

  return (
    <group ref={group} rotation={[tilt, 0.35, 0.15]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.007, 12, 140]} />
        <meshBasicMaterial color={color} transparent opacity={0.32} />
      </mesh>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
      </mesh>
    </group>
  )
}

function Particles() {
  const count = 40
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 7
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return arr
  }, [])

  const ref = useRef<Points>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#f4efe6" transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 2]} intensity={1.4} color="#fff2e4" />
      <pointLight position={[-3, -2, -2]} intensity={1.2} color="#2dd4bf" />
      <pointLight position={[2.5, 1.5, 3]} intensity={0.85} color="#e8a87c" />
      <Core />
      <Crystal position={[-2.1, 1.1, 0.4]} color="#2dd4bf" scale={0.26} speed={1.1} />
      <Crystal position={[2.2, -0.7, 0.6]} color="#f0c3a0" scale={0.2} speed={0.85} />
      <Crystal position={[1.4, 1.35, -0.5]} color="#7ee8d8" scale={0.16} speed={1.3} />
      <OrbitRing radius={2.05} color="#2dd4bf" speed={0.32} tilt={0.72} />
      <OrbitRing radius={2.45} color="#e8a87c" speed={-0.2} tilt={1.05} />
      <OrbitRing radius={2.85} color="#f4efe6" speed={0.12} tilt={0.4} />
      <Particles />
      <Sparkles count={48} scale={6.5} size={2} speed={0.3} opacity={0.5} color="#f4efe6" />
      <ContactShadows position={[0, -2.1, 0]} opacity={0.35} scale={10} blur={2.6} far={4} />
      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.45}
        maxPolarAngle={Math.PI / 1.55}
        minPolarAngle={Math.PI / 3.2}
      />
    </>
  )
}

export function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.25, 5.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0b0d10']} />
      <fog attach="fog" args={['#0b0d10', 6, 14]} />
      <SceneContent />
    </Canvas>
  )
}
