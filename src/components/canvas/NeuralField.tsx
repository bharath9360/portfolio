"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasFallback from "./CanvasFallback";
import { useTheme } from "@/context/ThemeContext";

function NeuralNodes({ count = 220, theme = "dark" }: { count?: number; theme?: string }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const { positions, colors, connections } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    let colorA = new THREE.Color("#00f2fe"); // Cyan
    let colorB = new THREE.Color("#7f52ff"); // Violet
    let colorC = new THREE.Color("#2575fc"); // Deep Blue

    if (theme === "light") {
      colorA = new THREE.Color("#0284c7"); // Sapphire
      colorB = new THREE.Color("#6366f1"); // Indigo
      colorC = new THREE.Color("#0d9488"); // Teal
    } else if (theme === "emerald") {
      colorA = new THREE.Color("#00ff9d"); // Neon Emerald
      colorB = new THREE.Color("#00e5ff"); // Turquoise
      colorC = new THREE.Color("#10b981"); // Spring Green
    }

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      const rand = Math.random();
      const mixedColor =
        rand < 0.5
          ? colorA.clone().lerp(colorB, rand * 2)
          : colorB.clone().lerp(colorC, (rand - 0.5) * 2);

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    const linePos: number[] = [];
    const threshold = 2.6;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          linePos.push(
            pos[i * 3],
            pos[i * 3 + 1],
            pos[i * 3 + 2],
            pos[j * 3],
            pos[j * 3 + 1],
            pos[j * 3 + 2]
          );
        }
      }
    }

    return {
      positions: pos,
      colors: col,
      connections: new Float32Array(linePos),
    };
  }, [count, theme]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.08;

      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        state.pointer.x * 1.2,
        0.04
      );
      pointsRef.current.position.y = THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        state.pointer.y * 1.2,
        0.04
      );
    }
    if (linesRef.current && pointsRef.current) {
      linesRef.current.rotation.copy(pointsRef.current.rotation);
      linesRef.current.position.copy(pointsRef.current.position);
    }
  });

  const lineMatColor =
    theme === "light"
      ? "#6366f1"
      : theme === "emerald"
      ? "#00ff9d"
      : "#7f52ff";

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          vertexColors
          transparent
          opacity={theme === "light" ? 0.95 : 0.85}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineMatColor}
          transparent
          opacity={theme === "light" ? 0.22 : 0.16}
        />
      </lineSegments>
    </group>
  );
}

export default function NeuralField() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webGLFailed, setWebGLFailed] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMounted || webGLFailed) {
    return <CanvasFallback />;
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <CanvasFallback />

      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 60 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          onCreated={({ gl }) => {
            if (!gl) setWebGLFailed(true);
          }}
          className="absolute inset-0"
        >
          <ambientLight intensity={0.6} />
          <NeuralNodes count={isMobile ? 120 : 220} theme={theme} />
        </Canvas>
      </Suspense>
    </div>
  );
}
