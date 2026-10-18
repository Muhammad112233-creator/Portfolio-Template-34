'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';

class QuietBoundary extends Component<
  { children: ReactNode; onFail?: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail?.();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Field() {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const [positions, seeds] = useMemo(() => {
    const n = 11200,
      positions = new Float32Array(n * 3),
      seeds = new Float32Array(n);
    // A sculpted, turning bust — deliberately not a downloaded model.
    for (let i = 0; i < n; i++) {
      const v = (i + 0.5) / n,
        a = i * 2.399963;
      const y = (v * 2 - 1) * 1.25;
      const head = Math.exp(-Math.pow((y - 0.48) / 0.68, 4));
      const shoulder = Math.exp(-Math.pow((y + 0.65) / 0.45, 2));
      const radius = 0.29 + head * 0.48 + shoulder * 0.65;
      const x = Math.cos(a) * radius;
      const z = Math.sin(a) * (0.36 + head * 0.26);
      positions.set([x, y, z], i * 3);
      seeds[i] = (((Math.sin(i * 127.1) * 43758.5453) % 1) + 1) % 1;
    }
    return [positions, seeds];
  }, []);
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      pointer: { value: new THREE.Vector2() },
      color: { value: new THREE.Color('#f69b2b') },
      size: { value: 2.1 },
    }),
    [],
  );
  useFrame((state, delta) => {
    if (!points.current || !material.current) return;
    const t = state.clock.elapsedTime;
    material.current.uniforms.time.value = t;
    material.current.uniforms.pointer.value.lerp(state.pointer, 0.05);
    points.current.rotation.y = THREE.MathUtils.damp(
      points.current.rotation.y,
      -0.16 + Math.sin(t * 0.12) * 0.15 + state.pointer.x * 0.2,
      3,
      delta,
    );
    points.current.rotation.z = Math.sin(t * 0.15) * 0.025;
    const light = document.documentElement.dataset.theme === 'light';
    material.current.uniforms.color.value.set(light ? '#be5b0a' : '#f69b2b');
  });
  return (
    <points ref={points} position={[0, -0.04, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-seed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        vertexShader={`uniform float time; uniform vec2 pointer; uniform float size; attribute float seed; varying float alpha;
      void main(){ vec3 p=position; float wave=sin(p.y*5.0+time*.65+seed*6.0); p.x+=wave*.027; p.z+=cos(p.x*6.0+time*.35)*.04;
      float dist=distance(p.xy,pointer*1.65); float repel=exp(-dist*dist*4.0)*.16; p.xy+=normalize(p.xy-pointer*1.65+.001)*repel;
      vec4 mv=modelViewMatrix*vec4(p,1.0); gl_Position=projectionMatrix*mv; gl_PointSize=size*(3.0/-mv.z); alpha=.52+seed*.42; }`}
        fragmentShader={`uniform vec3 color; varying float alpha; void main(){ float d=length(gl_PointCoord-.5); if(d>.5) discard; gl_FragColor=vec4(color,alpha*(1.0-smoothstep(.2,.5,d))); }`}
      />
    </points>
  );
}

export default function HeroScene() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      if (motion.matches) {
        setReady(false);
        return;
      }
      try {
        const test = document.createElement('canvas');
        const gl = test.getContext('webgl2');
        if (gl) {
          gl.getExtension('WEBGL_lose_context')?.loseContext();
          setReady(true);
        }
      } catch {
        // The SVG field remains as a no-WebGL fallback.
        setReady(false);
      }
    };
    updateMotion();
    motion.addEventListener('change', updateMotion);
    const observer = new IntersectionObserver((entries) => setVisible(entries[0].isIntersecting), {
      rootMargin: '120px',
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', updateMotion);
    };
  }, []);
  return (
    <div className={`point-field ${ready ? 'webgl-ready' : ''}`} ref={ref} aria-hidden="true">
      <svg className="point-field-fallback" viewBox="0 0 600 600">
        <defs>
          <pattern id="field-dots" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".7" fill="var(--primary)" />
          </pattern>
        </defs>
        <path
          d="M302 54C176 43 170 148 190 229C207 281 155 287 118 323C33 386 42 497 98 552C227 582 438 583 509 532C557 434 484 319 421 293C378 274 394 227 410 195C449 104 386 52 302 54Z"
          fill="url(#field-dots)"
        />
      </svg>
      {ready && (
        <QuietBoundary onFail={() => setReady(false)}>
          <Canvas
            frameloop={visible ? 'always' : 'never'}
            camera={{ position: [0, 0, 4], fov: 42 }}
            dpr={[1, 1.25]}
            gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
          >
            <Field />
          </Canvas>
        </QuietBoundary>
      )}
    </div>
  );
}
