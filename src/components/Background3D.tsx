import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Float, MeshReflectorMaterial, Sparkles } from '@react-three/drei'
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import type { Group, Mesh } from 'three'
import { Color } from 'three'

type SceneProps = {
  scrollProgress: MutableRefObject<number>
  mouse: MutableRefObject<{ x: number; y: number }>
  sectionIndex: MutableRefObject<number>
}

const SECTION_COLORS = [
  new Color('#e8a87c'),
  new Color('#2dd4bf'),
  new Color('#e8a87c'),
  new Color('#7ee8d8'),
  new Color('#f0c3a0'),
  new Color('#2dd4bf'),
  new Color('#e8a87c'),
]

function MorphCore({ scrollProgress, sectionIndex }: SceneProps) {
  const mesh = useRef<Mesh>(null)
  const color = useMemo(() => new Color('#e8a87c'), [])

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    const p = scrollProgress.current
    const idx = sectionIndex.current

    mesh.current.rotation.x = t * 0.12 + p * 1.2
    mesh.current.rotation.y = t * 0.2 + p * 0.8
    mesh.current.position.y = Math.sin(t * 0.6) * 0.15 - p * 0.35
    mesh.current.scale.setScalar(1.05 + Math.sin(t * 0.5) * 0.04 + p * 0.15)

    color.lerp(SECTION_COLORS[idx] ?? SECTION_COLORS[0], 0.04)
    const material = mesh.current.material as unknown as { color: Color; emissive: Color }
    material.color.copy(color)
    material.emissive.copy(color).multiplyScalar(0.22)
  })

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.7}>
      <mesh ref={mesh} position={[1.6, 0.1, -0.4]} castShadow>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshPhysicalMaterial
          color="#e8a87c"
          roughness={0.14}
          metalness={0.78}
          clearcoat={0.68}
          clearcoatRoughness={0.14}
          reflectivity={0.86}
          emissive="#6b3d22"
          emissiveIntensity={0.22}
          transmission={0.12}
          thickness={0.7}
        />
      </mesh>
    </Float>
  )
}

function OrbitField({ scrollProgress }: SceneProps) {
  const group = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.z += delta * (0.12 + scrollProgress.current * 0.2)
    group.current.rotation.x = 0.55 + scrollProgress.current * 0.4
  })

  return (
    <group ref={group} position={[1.5, 0, -0.6]}>
      {[2.1, 2.7, 3.35].map((r, i) => (
        <group key={r} rotation={[0.2 * i, 0.4 * i, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[r, 0.01, 16, 160]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#2dd4bf' : '#e8a87c'}
              transparent
              opacity={0.22}
              roughness={0.32}
              metalness={0.15}
              emissive={i % 2 === 0 ? '#2dd4bf' : '#e8a87c'}
              emissiveIntensity={0.1}
            />
          </mesh>
          <mesh position={[r, 0, 0]} castShadow>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#2dd4bf' : '#e8a87c'}
              emissive={i % 2 === 0 ? '#2dd4bf' : '#e8a87c'}
              emissiveIntensity={0.8}
              roughness={0.22}
              metalness={0.65}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function DriftCrystals({ scrollProgress }: SceneProps) {
  const items = useMemo(
    () =>
      [
        { pos: [-2.4, 1.2, -1] as const, color: '#2dd4bf', s: 0.28, sp: 1.1 },
        { pos: [-1.5, -1.3, 0.2] as const, color: '#f0c3a0', s: 0.2, sp: 0.8 },
        { pos: [3.2, 1.4, -1.2] as const, color: '#7ee8d8', s: 0.18, sp: 1.3 },
        { pos: [0.2, 1.8, -2] as const, color: '#e8a87c', s: 0.15, sp: 0.95 },
        { pos: [-3.1, 0.1, -2.2] as const, color: '#2dd4bf', s: 0.22, sp: 1.15 },
      ] as const,
    [],
  )

  return (
    <>
      {items.map((item, i) => (
        <Crystal key={i} {...item} scrollProgress={scrollProgress} index={i} />
      ))}
    </>
  )
}

function Crystal({
  pos,
  color,
  s,
  sp,
  scrollProgress,
  index,
}: {
  pos: readonly [number, number, number]
  color: string
  s: number
  sp: number
  scrollProgress: MutableRefObject<number>
  index: number
}) {
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const p = scrollProgress.current
    ref.current.rotation.x = t * 0.35 * sp
    ref.current.rotation.y = t * 0.25 * sp
    ref.current.position.y = pos[1] + Math.sin(t * sp + index) * 0.25 - p * (0.4 + index * 0.08)
    ref.current.position.x = pos[0] + Math.cos(t * 0.2 * sp + index) * 0.15
  })

  return (
    <mesh ref={ref} position={[...pos]} scale={s} castShadow>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.22}
        metalness={0.7}
        emissive={color}
        emissiveIntensity={0.35}
        clearcoat={0.25}
        clearcoatRoughness={0.35}
      />
    </mesh>
  )
}

function GlassAccent() {
  const mesh = useRef<Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    mesh.current.rotation.x = t * 0.34
    mesh.current.rotation.y = t * 0.22
    mesh.current.position.y = -0.25 + Math.sin(t * 0.6) * 0.04
  })

  return (
    <mesh ref={mesh} position={[-1.25, -0.4, 0.4]} castShadow>
      <torusKnotGeometry args={[0.45, 0.14, 160, 20]} />
      <meshPhysicalMaterial
        color="#7ee8d8"
        roughness={0.12}
        metalness={0.22}
        transmission={0.7}
        thickness={0.9}
        clearcoat={0.55}
        clearcoatRoughness={0.1}
        reflectivity={0.8}
        attenuationDistance={1.9}
        attenuationColor="#0b2735"
      />
    </mesh>
  )
}

function CameraRig({ scrollProgress, mouse }: SceneProps) {
  const { camera } = useThree()

  useFrame(() => {
    const p = scrollProgress.current
    const targetX = mouse.current.x * 0.45 + Math.sin(p * Math.PI) * 0.25
    const targetY = 0.22 + mouse.current.y * 0.25 - p * 0.7
    const targetZ = 5.8 - p * 1.1

    camera.position.x += (targetX - camera.position.x) * 0.045
    camera.position.y += (targetY - camera.position.y) * 0.045
    camera.position.z += (targetZ - camera.position.z) * 0.045
    camera.lookAt(0.8, -p * 0.5, 0)
  })

  return null
}

function SceneContent(props: SceneProps) {
  return (
    <>
      <color attach="background" args={['#0b0d10']} />
      <fog attach="fog" args={['#0b0d10', 7, 18]} />
      <ambientLight intensity={0.28} />
      <hemisphereLight args={[ '#ffffff', '#0b1a2a', 0.18 ]} />
      <directionalLight
        position={[5.3, 6.8, 3.2]}
        intensity={1.4}
        color="#fff7e6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0007}
      />
      <spotLight
        position={[-2.2, 5.6, 3.8]}
        angle={0.26}
        penumbra={0.32}
        intensity={0.92}
        color="#f3efd8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, -1, -2]} intensity={1.05} color="#2dd4bf" />
      <pointLight position={[3, 2, 2]} intensity={0.9} color="#e8a87c" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.15, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <MeshReflectorMaterial
          blur={[450, 120]}
          resolution={1024}
          mixBlur={0.78}
          mixStrength={0.9}
          roughness={0.9}
          depthScale={0.8}
          minDepthThreshold={0.8}
          maxDepthThreshold={1.4}
          color="#09121a"
          metalness={0.2}
        />
      </mesh>
      <MorphCore {...props} />
      <OrbitField {...props} />
      <DriftCrystals {...props} />
      <GlassAccent />
      <Sparkles
        count={70}
        scale={[14, 10, 8]}
        size={2}
        speed={0.35}
        opacity={0.45}
        color="#f4efe6"
      />
      <ContactShadows position={[0, -2.05, 0]} opacity={0.45} scale={12} blur={2.5} far={3} />
      <Environment preset="studio" />
      <CameraRig {...props} />
    </>
  )
}

const SECTION_IDS = ['home', 'about', 'projects', 'skills', 'education', 'awards', 'contact']

export function Background3D() {
  const scrollProgress = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })
  const sectionIndex = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.current = max > 0 ? window.scrollY / max : 0

      let active = 0
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const el = document.getElementById(SECTION_IDS[i])
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.45) active = i
      }
      sectionIndex.current = active
    }

    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="bg3d" aria-hidden>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <SceneContent
          scrollProgress={scrollProgress}
          mouse={mouse}
          sectionIndex={sectionIndex}
        />
      </Canvas>
      <div className="bg3d__vignette" />
    </div>
  )
}
