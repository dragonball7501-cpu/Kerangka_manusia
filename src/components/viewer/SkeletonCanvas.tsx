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
              className={`absolute z-10 px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer pointer-events-auto border-2 flex items-center gap-1 shadow-sm whitespace-nowrap ${
                isSelected
                  ? isDark
                    ? "bg-amber-400 text-black border-amber-200 scale-110 shadow-[2px_2px_0px_#d97706]"
                    : "bg-amber-300 text-black border-black scale-110 shadow-[2px_2px_0px_#000]"
                  : isHovered
                  ? isDark
                    ? "bg-cyan-400 text-black border-cyan-200 scale-105 shadow-[2px_2px_0px_#06b6d4]"
                    : "bg-lime-300 text-black border-black scale-105 shadow-[2px_2px_0px_#000]"
                  : isDark
                  ? "bg-slate-900/90 text-slate-200 border-slate-700 hover:border-cyan-400 hover:text-white"
                  : "bg-white text-black border-black hover:bg-yellow-100 shadow-[1.5px_1.5px_0px_#000]"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full border border-black ${
                  isSelected ? "bg-black dark:bg-white" : isHovered ? "bg-amber-400" : "bg-cyan-400"
                }`}
              />
              <span className="text-black dark:text-inherit">{bone.commonName}</span>
            </button>
          );
        })}
    </div>
  );
}
