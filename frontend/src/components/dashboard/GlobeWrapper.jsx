import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import './GlobeWrapper.css'

const AnimatedGlobe = ({ animationsEnabled }) => {
    return (
        <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial
                color="#4f46e5"
                attach="material"
                distort={0.3}
                speed={animationsEnabled ? 1.5 : 0}
                roughness={0.2}
            />
        </Sphere>
    )
}

const GlobeWrapper = ({ animationsEnabled }) => {
    return (
        <div className="globe-wrapper">
            <div className="globe-container">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <pointLight position={[-10, -10, -5]} intensity={0.5} />

                    <Suspense fallback={null}>
                        <AnimatedGlobe animationsEnabled={animationsEnabled} />
                    </Suspense>

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate={animationsEnabled}
                        autoRotateSpeed={0.5}
                    />
                </Canvas>
            </div>

            <div className="globe-info">
                <h3>🌍 Global Alumni Network</h3>
                <div className="globe-stats">
                    <div className="stat">
                        <span className="stat-value">50+</span>
                        <span className="stat-label">Countries</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">2,847</span>
                        <span className="stat-label">Active Alumni</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">156</span>
                        <span className="stat-label">Cities</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobeWrapper
