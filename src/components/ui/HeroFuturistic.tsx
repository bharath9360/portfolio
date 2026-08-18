"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three/webgpu";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";
import { Mesh } from "three";

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add,
} from "three/tsl";

const TEXTUREMAP = { src: "https://i.postimg.cc/XYwvXN8D/img-4.png" };
const DEPTHMAP   = { src: "https://i.postimg.cc/2SHKQh2q/raw-4.webp" };

extend(THREE as any);

// ─── Post Processing — uses RenderPipeline (replaces deprecated PostProcessing) ─
const PostFX = ({
  strength = 1.2,
  threshold = 0.9,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef({ value: 0 });
  const timeRef     = useRef(0);

  const render = useMemo(() => {
    // Use RenderPipeline if available, fall back to PostProcessing for older builds
    const PipeClass =
      (THREE as any).RenderPipeline ?? (THREE as any).PostProcessing;
    const pipeline   = new PipeClass(gl as any);
    const scenePass  = pass(scene, camera);
    const passColor  = scenePass.getTextureNode("output");
    const bloomPass  = bloom(passColor, strength, 0.5, threshold);

    const uScan     = uniform(0);
    progressRef.current = uScan;

    const uvY      = uv().y;
    const scanW    = float(0.05);
    const scanLine = smoothstep(0, scanW, abs(uvY.sub(float(uScan.value))));
    const overlay  = vec3(0, 0.95, 1).mul(oneMinus(scanLine)).mul(0.22);
    const blended  = mix(
      passColor,
      add(passColor, overlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    );

    pipeline.outputNode = blended.add(bloomPass);
    return pipeline;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    timeRef.current = clock.getElapsedTime();
    progressRef.current.value = Math.sin(timeRef.current * 0.35) * 0.5 + 0.5;
    render.render();
  }, 1);

  return null;
};

// ─── 3D depth-map plane ───────────────────────────────────────────────────────
const WIDTH  = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const meshRef   = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => { if (rawMap && depthMap) setVisible(true); }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer  = uniform(new (THREE as any).Vector2(0));
    const uProgress = uniform(0);
    const strength  = 0.012;

    const tDepth = texture(depthMap);
    const tMap   = texture(rawMap, uv().add((tDepth.r as any).mul(uPointer).mul(strength)));

    const aspect  = float(WIDTH).div(HEIGHT);
    const tUv     = vec2(uv().x.mul(aspect), uv().y);
    const tiling  = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);

    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist       = float(tiledUv.length());
    const dot        = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
    const depth      = tDepth;
    const flow       = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));

    const mask  = dot.mul(flow).mul(vec3(0, 9, 10));
    const final = blendScreen(tMap, mask);

    const mat = new (THREE as any).MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return { material: mat, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock, pointer }) => {
    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.4) * 0.5 + 0.5;
    uniforms.uPointer.value  = pointer;
    if (meshRef.current?.material) {
      const mat = meshRef.current.material as any;
      if ("opacity" in mat) {
        mat.opacity = (THREE as any).MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.06);
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={[w * 0.42, h * 0.42, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

// ─── Props ────────────────────────────────────────────────────────────────────
export interface HeroFuturisticProps {
  children?: React.ReactNode;
  heightClass?: string;
  className?: string;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function HeroFuturistic({
  children,
  heightClass = "h-svh",
  className = "",
}: HeroFuturisticProps) {
  const [webgpuSupported, setWebgpuSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgpuSupported(!!(navigator as any).gpu);
  }, []);

  // Loading state — show children immediately, no flash
  if (webgpuSupported === null) {
    return (
      <div className={`${heightClass} relative flex items-center justify-center ${className}`}
        style={{ background: "#04050a" }}>
        {children}
      </div>
    );
  }

  // Graceful fallback for WebGL-only browsers
  if (!webgpuSupported) {
    return (
      <div
        className={`${heightClass} relative flex items-center justify-center overflow-hidden ${className}`}
        style={{ background: "radial-gradient(ellipse at 50% 55%, #0d1a3a 0%, #04050a 70%)" }}
      >
        {/* Animated dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,242,254,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(127,82,255,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  }

  // Full WebGPU 3D experience
  return (
    <div className={`${heightClass} relative overflow-hidden ${className}`}>
      {children && (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          {children}
        </div>
      )}
      <Canvas
        flat
        gl={async (props) => {
          const renderer = new (THREE as any).WebGPURenderer(props as any);
          await renderer.init();
          return renderer;
        }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <PostFX fullScreenEffect strength={1.2} threshold={0.9} />
        <Scene />
      </Canvas>
    </div>
  );
}
