"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, Sparkles, Compass, Info, Check } from "lucide-react";

type RoastProfile = {
  id: string;
  name: string;
  region: string;
  altitude: string;
  color: string;
  roughness: number;
  sheen: number;
  roastLevel: string;
  cuppingScore: string;
  notes: string;
  aroma: string[];
};

const PROFILES: RoastProfile[] = [
  {
    id: "gayo",
    name: "Sumatra Gayo Honey",
    region: "Takengon, Aceh Gayo",
    altitude: "1,600m ASL",
    color: "#6B3E26", // Warm chestnut amber
    roughness: 0.42,
    sheen: 0.3,
    roastLevel: "Light-Medium Roast",
    cuppingScore: "89.0",
    notes: "Aroma melati semerbak, keasaman sitrus segar, dan madu hutan lembut.",
    aroma: ["Floral Jasmine", "Citrus Zest", "Wild Honey"],
  },
  {
    id: "sindoro",
    name: "Java Sindoro Micro-Lot",
    region: "Lereng Gn. Sindoro, Jawa Tengah",
    altitude: "1,450m ASL",
    color: "#462214", // Rich caramel chocolate
    roughness: 0.35,
    sheen: 0.5,
    roastLevel: "Medium Roast",
    cuppingScore: "88.5",
    notes: "Karamel mentega pekat, sentuhan buah aprikot manis, dan bodi beludru.",
    aroma: ["Toffee Caramel", "Ripe Apricot", "Brown Sugar"],
  },
  {
    id: "anatomical",
    name: "Clavicula Anatomical Blend",
    region: "Slawi Roastery Lab In-House",
    altitude: "Highland Specialty Blend",
    color: "#24120A", // Deep dark roasted espresso
    roughness: 0.28,
    sheen: 0.7,
    roastLevel: "Medium-Dark Roast",
    cuppingScore: "88.8",
    notes: "Fondasi rasa signature Manubrium & Subclavius: cokelat hitam dan crema tebal.",
    aroma: ["Dark Cocoa", "Molasses", "Velvety Crema"],
  },
];

export default function InteractiveCoffeeBean3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeProfile, setActiveProfile] = useState<RoastProfile>(PROFILES[1]); // Default Sindoro
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const beanMeshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Interaction dragging state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.25, y: 0.6 });
  const currentRotation = useRef({ x: 0.25, y: 0.6 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 420;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig (Warm Specialty Coffee Studio)
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeed6, 3.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xb87333, 1.8);
    fillLight.position.set(-4, -2, -2);
    scene.add(fillLight);

    const topRimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    topRimLight.position.set(0, 6, -2);
    scene.add(topRimLight);

    // 5. Generate Procedural High-Res Texture for Bean Surface & Crevice
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Base parchment gradient
      const bgGrad = ctx.createRadialGradient(512, 512, 50, 512, 512, 512);
      bgGrad.addColorStop(0, "#ffffff");
      bgGrad.addColorStop(0.85, "#e5d5c5");
      bgGrad.addColorStop(1, "#c0a892");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Organic pores & roast mottling
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const radius = Math.random() * 2.5 + 0.5;
        const alpha = Math.random() * 0.18;
        ctx.fillStyle = `rgba(40, 20, 10, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Authentic center fissure line (silverskin remnant)
      ctx.strokeStyle = "rgba(25, 12, 5, 0.85)";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(512, 80);
      ctx.bezierCurveTo(490, 350, 534, 650, 512, 940);
      ctx.stroke();

      // Silverskin parchment golden core inside the fissure
      ctx.strokeStyle = "rgba(215, 180, 140, 0.75)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(512, 100);
      ctx.bezierCurveTo(494, 350, 530, 650, 512, 920);
      ctx.stroke();
    }

    const beanTexture = new THREE.CanvasTexture(canvas);
    beanTexture.wrapS = THREE.ClampToEdgeWrapping;
    beanTexture.wrapT = THREE.ClampToEdgeWrapping;

    // 6. Realistic Procedural Coffee Bean Geometry
    // We start from an icosphere/sphere and sculpt it using mathematical bean curvature:
    const sphereGeo = new THREE.SphereGeometry(1, 96, 96);
    const posAttr = sphereGeo.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);

      // Ellipsoid scaling: elongate Y, slim Z, round X
      let x = vertex.x * 0.95;
      const y = vertex.y * 1.45;
      let z = vertex.z * 0.72;

      // Slight natural bean curvature (banana curve along Y-axis)
      const bend = Math.sin((y / 1.45) * Math.PI) * 0.12;
      z += bend;

      // Flatten the ventral face (front side where z > 0)
      if (z > 0) {
        z *= 0.78;

        // Fissure / Crevice indentation down the vertical center line
        const fissureCenter = Math.sin(y * 2.2) * 0.05; // Natural subtle S-curve
        const distFromCenter = Math.abs(x - fissureCenter);
        const fissureWidth = 0.32;

        if (distFromCenter < fissureWidth) {
          const depthFactor = Math.cos((distFromCenter / fissureWidth) * (Math.PI / 2));
          const lengthwiseFade = Math.cos((y / 1.5) * (Math.PI / 2));
          // Carve inward
          z -= 0.38 * depthFactor * Math.max(0, lengthwiseFade);
        }
      }

      // Slightly tuck the poles/tips
      const poleFade = 1.0 - Math.pow(Math.abs(vertex.y), 3) * 0.18;
      x *= poleFade;
      z *= poleFade;

      posAttr.setXYZ(i, x, y, z);
    }
    sphereGeo.computeVertexNormals();

    // 7. Material
    const beanMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeProfile.color),
      map: beanTexture,
      roughness: activeProfile.roughness,
      metalness: 0.08,
      bumpMap: beanTexture,
      bumpScale: 0.02,
    });
    materialRef.current = beanMaterial;

    const beanMesh = new THREE.Mesh(sphereGeo, beanMaterial);
    beanMeshRef.current = beanMesh;
    scene.add(beanMesh);

    // 8. Subtle floating golden aroma motes
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 3.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 3.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 2.0;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xdfa05d,
      size: 0.045,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 9. Mouse & Touch Interaction Handlers
    const onPointerDown = (clientX: number, clientY: number) => {
      isDragging.current = true;
      previousMousePosition.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDragging.current) return;
      const deltaX = clientX - previousMousePosition.current.x;
      const deltaY = clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.008;
      targetRotation.current.x += deltaY * 0.008;

      // Clamp X rotation to prevent flipping upside-down
      targetRotation.current.x = Math.max(-1.1, Math.min(1.1, targetRotation.current.x));

      previousMousePosition.current = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    // DOM event listeners
    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => onPointerUp();

    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    domEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // 10. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating bob
      if (beanMesh) {
        beanMesh.position.y = Math.sin(elapsedTime * 1.5) * 0.06;

        // Auto-rotation when not actively being dragged
        if (isAutoRotating && !isDragging.current) {
          targetRotation.current.y += 0.006;
        }

        // Smooth damping interpolation
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;

        beanMesh.rotation.x = currentRotation.current.x;
        beanMesh.rotation.y = currentRotation.current.y;
      }

      // Rotate aroma particles slowly
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      domEl.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      domEl.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);

      sphereGeo.dispose();
      beanTexture.dispose();
      beanMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [isAutoRotating]);

  // Update material color & roughness when active profile changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.set(activeProfile.color);
      materialRef.current.roughness = activeProfile.roughness;
      materialRef.current.needsUpdate = true;
    }
  }, [activeProfile.color, activeProfile.roughness]);

  const resetOrientation = () => {
    targetRotation.current = { x: 0.25, y: 0.6 };
  };

  return (
    <div className="relative w-full rounded-[2.5rem] bg-gradient-to-b from-white to-[#F9F6F0] border border-chestnut/20 shadow-warm-card overflow-hidden p-6 sm:p-8 md:p-10">
      
      {/* Top Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-chestnut/15">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vanilla text-chestnut text-[10px] font-mono uppercase tracking-[0.2em] font-semibold border border-chestnut/20 mb-2">
            <Sparkles size={12} className="text-chestnut" />
            Interactive 3D Anatomy Lab
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-espresso">
            Eksplorasi Anatomi Biji Kopi Single Origin
          </h3>
          <p className="text-xs sm:text-sm text-espresso/70 font-serif italic mt-1">
            Sentuh, seret, dan putar 360Â° untuk menginspeksi anatomi rekahan selangka (fissure) serta profil sangrai in-house Clavicula.
          </p>
        </div>

        {/* 3D Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium border transition-all flex items-center gap-1.5 ${
              isAutoRotating
                ? "bg-chestnut text-white border-chestnut shadow-sm"
                : "bg-white text-espresso/70 border-chestnut/20 hover:text-espresso"
            }`}
          >
            <RotateCw size={12} className={isAutoRotating ? "animate-spin" : ""} />
            {isAutoRotating ? "Auto-Spin ON" : "Auto-Spin OFF"}
          </button>

          <button
            onClick={resetOrientation}
            title="Reset Sudut Pandang"
            className="p-2 rounded-full bg-white text-espresso/70 border border-chestnut/20 hover:text-chestnut hover:border-chestnut/50 transition-all shadow-sm"
          >
            <Compass size={14} />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage & Anatomy Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* 3D Canvas Box (7 cols) */}
        <div className="lg:col-span-7 relative h-[380px] sm:h-[440px] w-full rounded-3xl bg-gradient-to-b from-[#F2EAE1] via-[#FAF5ED] to-white border border-chestnut/15 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none shadow-inner group">
          
          {/* Canvas container */}
          <div ref={mountRef} className="absolute inset-0 w-full h-full" />

          {/* Floating Gesture Hint */}
          <div className="absolute bottom-4 left-4 bg-espresso/80 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/15 pointer-events-none flex items-center gap-2 opacity-85 group-hover:opacity-100 transition-opacity">
            <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-ping"></span>
            Drag to Rotate 360Â° // Geser untuk memutar
          </div>

          {/* Floating Cupping Score Tag */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border border-chestnut/20 rounded-2xl p-3 shadow-md text-right pointer-events-none">
            <span className="text-[10px] font-mono uppercase tracking-wider text-espresso/50 block">SCA Cupping</span>
            <span className="font-display font-black text-2xl text-chestnut leading-none">
              {activeProfile.cuppingScore}
            </span>
          </div>

          {/* Anatomical Feature Callout Pins */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            <button
              onClick={() => setActiveAnnotation(activeAnnotation === 0 ? null : 0)}
              className={`text-[10px] font-mono px-2.5 py-1 rounded-lg backdrop-blur-md transition-all text-left flex items-center gap-1.5 ${
                activeAnnotation === 0
                  ? "bg-chestnut text-white shadow-md font-bold"
                  : "bg-white/80 text-espresso/70 hover:bg-white border border-chestnut/15"
              }`}
            >
              <Info size={11} /> 01. Silverskin Crevice
            </button>
            <button
              onClick={() => setActiveAnnotation(activeAnnotation === 1 ? null : 1)}
              className={`text-[10px] font-mono px-2.5 py-1 rounded-lg backdrop-blur-md transition-all text-left flex items-center gap-1.5 ${
                activeAnnotation === 1
                  ? "bg-chestnut text-white shadow-md font-bold"
                  : "bg-white/80 text-espresso/70 hover:bg-white border border-chestnut/15"
              }`}
            >
              <Info size={11} /> 02. Volcanic Density
            </button>
            <button
              onClick={() => setActiveAnnotation(activeAnnotation === 2 ? null : 2)}
              className={`text-[10px] font-mono px-2.5 py-1 rounded-lg backdrop-blur-md transition-all text-left flex items-center gap-1.5 ${
                activeAnnotation === 2
                  ? "bg-chestnut text-white shadow-md font-bold"
                  : "bg-white/80 text-espresso/70 hover:bg-white border border-chestnut/15"
              }`}
            >
              <Info size={11} /> 03. Crema Oil Pores
            </button>
          </div>

          {/* Interactive Annotation Popup */}
          {activeAnnotation !== null && (
            <div className="absolute bottom-14 left-4 right-4 sm:right-auto sm:max-w-xs bg-espresso text-white p-3.5 rounded-2xl shadow-2xl border border-chestnut/30 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200 z-20">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-caramel font-semibold">
                  {activeAnnotation === 0 && "Anatomi: Rekahan Selangka Kopi"}
                  {activeAnnotation === 1 && "Kerapatan Biji (Density 1.600m)"}
                  {activeAnnotation === 2 && "Prekursor Minyak Crema"}
                </span>
                <button
                  onClick={() => setActiveAnnotation(null)}
                  className="text-white/60 hover:text-white text-xs font-mono"
                >
                  âœ•
                </button>
              </div>
              <p className="text-white/80 text-[11px] leading-relaxed">
                {activeAnnotation === 0 &&
                  "Fissure longitudinal di tengah biji adalah analogi tulang claviculaâ€”tempat menempelnya kulit perak (silverskin) yang menyimpan keasaman floral volatil unik saat disangrai."}
                {activeAnnotation === 1 &&
                  "Biji kopi dataran tinggi menghasilkan sel yang sangat padat (dense), tahan terhadap transfer panas drum roaster sehingga rasa manis karamel terdistribusi merata."}
                {activeAnnotation === 2 &&
                  "Porositas mikroskopis mengunci minyak aromatik alami yang akan diekstraksi mesin espresso menjadi crema lembut keemasan pada seri Manubrium & Costa."}
              </p>
            </div>
          )}
        </div>

        {/* Roast Profile Selector & Tasting Notes (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-chestnut font-semibold block mb-2">
              PILIH PROFIL SANGRAI // ROAST LAB
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-espresso mb-1">
              {activeProfile.name}
            </h4>
            <p className="text-xs font-mono text-espresso/60 mb-4">
              {activeProfile.region} Â· {activeProfile.altitude}
            </p>

            {/* Profile Selection Tabs */}
            <div className="flex flex-col gap-2.5 mb-6">
              {PROFILES.map((p) => {
                const isSelected = p.id === activeProfile.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveProfile(p);
                      setActiveAnnotation(null);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-white border-chestnut shadow-md ring-1 ring-chestnut/20"
                        : "bg-white/60 border-chestnut/15 hover:bg-white hover:border-chestnut/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shadow-sm shrink-0"
                        style={{ backgroundColor: p.color }}
                      />
                      <div>
                        <span className="font-display font-bold text-sm text-espresso block">
                          {p.name}
                        </span>
                        <span className="text-[11px] font-mono text-espresso/60 block">
                          {p.roastLevel}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="p-1 rounded-full bg-chestnut text-white shrink-0">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tasting Notes */}
            <div className="p-4 rounded-2xl bg-white border border-chestnut/15 shadow-sm space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-chestnut font-bold block">
                Sensory Notes Â· Karakter Rasa
              </span>
              <p className="text-xs text-espresso/80 leading-relaxed font-medium">
                {activeProfile.notes}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProfile.aroma.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-vanilla text-espresso/70 text-[10px] font-mono border border-chestnut/15"
                  >
                    âœ¦ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-chestnut/10 flex items-center justify-between text-[11px] font-mono text-espresso/60">
            <span>Tersedia di Slow Bar Slawi &amp; Guci</span>
            <span className="text-chestnut font-bold">100% Arabica Specialty</span>
          </div>
        </div>

      </div>
    </div>
  );
}
