import { useEffect, useRef, useState, useCallback, type MutableRefObject } from "react";
import { SkeletonSceneManager } from "../../three/SkeletonSceneManager";
import { BONES_DATA } from "../../data/bones";
import { CameraPreset } from "../../types/bone";

interface SkeletonCanvasProps {
  selectedBoneId: string | null;
  hoveredBoneId: string | null;
  activeGroupId: string | null;
  isDark: boolean;
  isXRayMode: boolean;
  isAutoRotate: boolean;
  showLabels: boolean;
  onSelectBone: (boneId: string | null) => void;
  onHoverBone: (boneId: string | null) => void;
  sceneManagerRef: MutableRefObject<SkeletonSceneManager | null>;
}

export function SkeletonCanvas({
  selectedBoneId,
  hoveredBoneId,
  activeGroupId,
  isDark,
  isXRayMode,
  isAutoRotate,
  showLabels,
  onSelectBone,
  onHoverBone,
  sceneManagerRef,
}: SkeletonCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [labelPositions, setLabelPositions] = useState<{
    [boneId: string]: { x: number; y: number; visible: boolean };
  }>({});

  const handleCameraMove = useCallback(
    (positions: { [boneId: string]: { x: number; y: number; visible: boolean } }) => {
      if (showLabels) {
        setLabelPositions(positions);
      }
    },
    [showLabels]
  );

  const onSelectBoneRef = useRef(onSelectBone);
  const onHoverBoneRef = useRef(onHoverBone);
  const handleCameraMoveRef = useRef(handleCameraMove);

  useEffect(() => {
    onSelectBoneRef.current = onSelectBone;
    onHoverBoneRef.current = onHoverBone;
    handleCameraMoveRef.current = handleCameraMove;
  });

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;

    const manager = new SkeletonSceneManager(containerRef.current, isDark, {
      onHoverBone: (boneId) => onHoverBoneRef.current(boneId),
      onSelectBone: (boneId) => onSelectBoneRef.current(boneId),
      onCameraMove: (positions) => handleCameraMoveRef.current(positions),
    });

    sceneManagerRef.current = manager;

    return () => {
      manager.dispose();
      sceneManagerRef.current = null;
    };
  }, []);

  // Sync Theme
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setTheme(isDark);
    }
  }, [isDark]);

  // Sync Selected Bone
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setSelectedBone(selectedBoneId, true);
    }
  }, [selectedBoneId]);

  // Sync Hovered Bone
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setHoveredBone(hoveredBoneId);
    }
  }, [hoveredBoneId]);

  // Sync Active Group
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setActiveGroup(activeGroupId);
    }
  }, [activeGroupId]);

  // Sync XRay Mode
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setXRayMode(isXRayMode);
    }
  }, [isXRayMode]);

  // Sync Auto Rotate
  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setAutoRotate(isAutoRotate);
    }
  }, [isAutoRotate]);

  return (
    <div
      ref={containerRef}
      id="three-canvas-container"
      className="relative w-full h-full overflow-hidden select-none outline-none"
      tabIndex={0}
    >
      {/* Dynamic 3D Bone Label Markers */}
      {showLabels &&
        BONES_DATA.map((bone) => {
          const pos = labelPositions[bone.id];
          if (!pos || !pos.visible) return null;

          const isSelected = selectedBoneId === bone.id;
          const isHovered = hoveredBoneId === bone.id;

          return (
            <button
              key={bone.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectBone(bone.id);
              }}
              onMouseEnter={() => onHoverBone(bone.id)}
              onMouseLeave={() => onHoverBone(null)}
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: "translate(-50%, -50%)",
              }}
              className={`absolute z-10 px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all cursor-pointer pointer-events-auto border flex items-center gap-1 shadow-sm whitespace-nowrap ${
                isSelected
                  ? "bg-amber-500 text-white border-amber-300 scale-110 shadow-lg shadow-amber-950/60"
                  : isHovered
                  ? "bg-cyan-500 text-white border-cyan-300 scale-105"
                  : isDark
                  ? "bg-slate-900/80 text-slate-300 border-slate-700/80 hover:border-cyan-400 hover:text-white"
                  : "bg-white/85 text-slate-800 border-slate-300 hover:border-sky-500"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? "bg-white" : isHovered ? "bg-amber-300" : "bg-cyan-400"
                }`}
              />
              <span>{bone.commonName}</span>
            </button>
          );
        })}
    </div>
  );
}
