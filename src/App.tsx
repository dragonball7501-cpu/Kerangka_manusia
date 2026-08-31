import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Header } from "./components/layout/Header";
import { BoneSidebar } from "./components/sidebar/BoneSidebar";
import { BoneInfoPanel } from "./components/bone-info/BoneInfoPanel";
import { MobileBottomSheet } from "./components/bone-info/MobileBottomSheet";
import { SceneControls } from "./components/controls/SceneControls";
import { InstructionsModal } from "./components/controls/InstructionsModal";
import { DeveloperModal } from "./components/layout/DeveloperModal";
import { QuizModal } from "./components/quiz/QuizModal";
import { LeaderboardModal } from "./components/quiz/LeaderboardModal";
import { SkeletonCanvas } from "./components/viewer/SkeletonCanvas";
import { BoneFocusHatchHUD } from "./components/viewer/BoneFocusHatchHUD";
import { VoiceFloatingHUD } from "./components/voice/VoiceFloatingHUD";
import { VoiceAssistantModal } from "./components/voice/VoiceAssistantModal";
import { SkeletonSceneManager } from "./three/SkeletonSceneManager";
import { useTheme } from "./hooks/useTheme";
import { useVoiceAssistant } from "./hooks/useVoiceAssistant";
import { BONES_DATA } from "./data/bones";
import { BoneGroupId, CameraPreset } from "./types/bone";

export function App() {
  const { theme, isDark, toggleTheme } = useTheme();

  // Explorer State
  const [selectedBoneId, setSelectedBoneId] = useState<string | null>(null);
  const [showDefinition, setShowDefinition] = useState<boolean>(false);
  const [hoveredBoneId, setHoveredBoneId] = useState<string | null>(null);
  const [activeGroupId, setActiveGroupId] = useState<BoneGroupId | null>(null);
  const [isXRayMode, setIsXRayMode] = useState<boolean>(false);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);

  // Scene manager ref for triggering direct actions
  const sceneManagerRef = useRef<SkeletonSceneManager | null>(null);

  // Selected & Hovered Bone data
  const selectedBone = useMemo(
    () => BONES_DATA.find((b) => b.id === selectedBoneId) || null,
    [selectedBoneId]
  );

  const hoveredBone = useMemo(
    () => BONES_DATA.find((b) => b.id === hoveredBoneId) || null,
    [hoveredBoneId]
  );

  // Handlers
  const handleSelectBone = useCallback((boneId: string | null) => {
    if (!boneId) {
      setSelectedBoneId(null);
      setShowDefinition(false);
      return;
    }

    if (selectedBoneId === boneId) {
      // Second click on the SAME selected & hatched bone -> open single definition view!
      setShowDefinition(true);
    } else {
      // First click on this bone -> zoom + apply arsiran (definition opens on second click)
      setSelectedBoneId(boneId);
      setShowDefinition(false);
      setActiveGroupId(null);
    }
  }, [selectedBoneId]);

  const handleSelectGroup = useCallback((groupId: BoneGroupId | null) => {
    setActiveGroupId(groupId);
    if (groupId) {
      setSelectedBoneId(null);
      setShowDefinition(false);
    }
  }, []);

  const handleResetView = useCallback(() => {
    setSelectedBoneId(null);
    setShowDefinition(false);
    setActiveGroupId(null);
    setIsAutoRotate(false);
    if (sceneManagerRef.current) {
      sceneManagerRef.current.applyCameraPreset("reset");
    }
  }, []);

  const handleSelectPreset = useCallback((preset: CameraPreset) => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.applyCameraPreset(preset);
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.zoom(-0.5);
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.zoom(0.5);
    }
  }, []);

  const handlePanUp = useCallback(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.panVertical(0.4);
    }
  }, []);

  const handlePanDown = useCallback(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.panVertical(-0.4);
    }
  }, []);

  const handleFocusRegion = useCallback((region: "full" | "head" | "torso" | "pelvis" | "legs" | "feet") => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.focusOnAnatomicalRegion(region);
    }
  }, []);

  // Voice Assistant Hook with comprehensive callbacks
  const {
    isListening,
    isSupported,
    transcript,
    interimTranscript,
    feedback,
    language,
    setLanguage,
    enableTtsFeedback,
    setEnableTtsFeedback,
    toggleListening,
    testVoiceCommand,
    clearFeedback,
  } = useVoiceAssistant({
    onSelectBone: (boneId) => handleSelectBone(boneId),
    onResetView: handleResetView,
    onToggleXRay: () => setIsXRayMode((prev) => !prev),
    onToggleAutoRotate: () => setIsAutoRotate((prev) => !prev),
    onToggleLabels: () => setShowLabels((prev) => !prev),
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
    onPanUp: handlePanUp,
    onPanDown: handlePanDown,
    onSelectPreset: handleSelectPreset,
    onFocusRegion: handleFocusRegion,
  });

  // Keyboard Shortcuts (v for voice toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "Escape") {
        handleResetView();
      } else if (e.key === "r" || e.key === "R") {
        handleResetView();
      } else if (e.key === "x" || e.key === "X") {
        setIsXRayMode((prev) => !prev);
      } else if (e.key === "l" || e.key === "L") {
        setShowLabels((prev) => !prev);
      } else if (e.key === "v" || e.key === "V") {
        toggleListening();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsAutoRotate((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleResetView, toggleListening]);

  return (
    <div
      className={`relative w-full h-screen flex flex-col overflow-hidden font-sans ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* 1. Header Bar */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenHelp={() => setIsHelpOpen(true)}
        onResetView={handleResetView}
        onToggleSidebar={() => setIsMobileSidebarOpen(true)}
        selectedBoneName={selectedBone?.commonName}
        isVoiceListening={isListening}
        onOpenVoiceAssistant={() => setIsVoiceModalOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* 2. Main Workspace */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Desktop Left Navigation Sidebar */}
        <div className="hidden lg:block w-80 shrink-0 h-full">
          <BoneSidebar
            selectedBoneId={selectedBoneId}
            hoveredBoneId={hoveredBoneId}
            activeGroupId={activeGroupId}
            onSelectBone={handleSelectBone}
            onHoverBone={setHoveredBoneId}
            onSelectGroup={handleSelectGroup}
            onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
            isDark={isDark}
          />
        </div>

        {/* Mobile Left Sidebar Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
            <div className="w-80 max-w-[85vw] h-full shadow-2xl">
              <BoneSidebar
                selectedBoneId={selectedBoneId}
                hoveredBoneId={hoveredBoneId}
                activeGroupId={activeGroupId}
                onSelectBone={handleSelectBone}
                onHoverBone={setHoveredBoneId}
                onSelectGroup={handleSelectGroup}
                onCloseMobile={() => setIsMobileSidebarOpen(false)}
                onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
                onOpenQuiz={() => setIsQuizOpen(true)}
                onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
                isDark={isDark}
              />
            </div>
            <div
              className="flex-1 h-full cursor-pointer"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        )}

        {/* Center 3D Interactive Stage */}
        <main
          id="main-3d-stage"
          className="relative flex-1 h-full overflow-hidden bg-gradient-to-b from-transparent to-black/10"
        >
          {/* Realtime Floating Voice HUD over 3D Stage */}
          <VoiceFloatingHUD
            isListening={isListening}
            transcript={transcript}
            interimTranscript={interimTranscript}
            feedback={feedback}
            onToggleListening={toggleListening}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onCloseFeedback={clearFeedback}
            isDark={isDark}
          />

          {/* Floating Bone Focus & Hatch HUD (Only shown on Phase 1: zoom & arsiran, before 2nd click definition) */}
          {!showDefinition && selectedBone && (
            <BoneFocusHatchHUD
              bone={selectedBone}
              onOpenDefinition={() => setShowDefinition(true)}
              onClose={() => {
                setSelectedBoneId(null);
                setShowDefinition(false);
                if (sceneManagerRef.current) {
                  sceneManagerRef.current.applyCameraPreset("reset");
                }
              }}
              isDark={isDark}
            />
          )}

          {/* Three.js Canvas */}
          <SkeletonCanvas
            selectedBoneId={selectedBoneId}
            hoveredBoneId={hoveredBoneId}
            activeGroupId={activeGroupId}
            isDark={isDark}
            isXRayMode={isXRayMode}
            isAutoRotate={isAutoRotate}
            showLabels={showLabels}
            onSelectBone={handleSelectBone}
            onHoverBone={setHoveredBoneId}
            sceneManagerRef={sceneManagerRef}
          />

          {/* Floating HUD & 3D Controls */}
          <SceneControls
            onSelectPreset={handleSelectPreset}
            onResetView={handleResetView}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onPanUp={handlePanUp}
            onPanDown={handlePanDown}
            onFocusRegion={handleFocusRegion}
            isXRayMode={isXRayMode}
            onToggleXRay={() => setIsXRayMode((prev) => !prev)}
            showLabels={showLabels}
            onToggleLabels={() => setShowLabels((prev) => !prev)}
            isAutoRotate={isAutoRotate}
            onToggleAutoRotate={() => setIsAutoRotate((prev) => !prev)}
            hoveredBoneName={hoveredBone?.commonName}
            hoveredBoneLatin={hoveredBone?.latinName}
            isDark={isDark}
            isBoneSelected={Boolean(selectedBoneId)}
          />
        </main>

        {/* Desktop Right Info Panel - Single definition view on desktop */}
        <div className="hidden lg:block w-[360px] xl:w-[420px] shrink-0 h-full">
          <BoneInfoPanel
            bone={showDefinition ? selectedBone : null}
            focusedBone={selectedBone}
            onOpenDefinition={() => setShowDefinition(true)}
            onClose={() => {
              setShowDefinition(false);
              setSelectedBoneId(null);
              if (sceneManagerRef.current) {
                sceneManagerRef.current.applyCameraPreset("reset");
              }
            }}
            onSelectConnectedBone={handleSelectBone}
            isDark={isDark}
          />
        </div>
      </div>

      {/* Mobile / Tablet Bottom Sheet - Single definition view on mobile */}
      {showDefinition && selectedBone && (
        <MobileBottomSheet
          bone={selectedBone}
          onClose={() => {
            setShowDefinition(false);
            setSelectedBoneId(null);
            if (sceneManagerRef.current) {
              sceneManagerRef.current.applyCameraPreset("reset");
            }
          }}
          isDark={isDark}
        />
      )}

      {/* Voice Assistant Modal & Quick Vocabulary Guide */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        isListening={isListening}
        isSupported={isSupported}
        transcript={transcript}
        interimTranscript={interimTranscript}
        feedback={feedback}
        language={language}
        enableTtsFeedback={enableTtsFeedback}
        onToggleListening={toggleListening}
        onSelectLanguage={setLanguage}
        onToggleTtsFeedback={() => setEnableTtsFeedback((prev) => !prev)}
        onTestCommand={testVoiceCommand}
        isDark={isDark}
      />

      {/* Instructions & Help Modal */}
      <InstructionsModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        isDark={isDark}
      />

      {/* Developer Web Modal */}
      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
        isDark={isDark}
      />

      {/* Quiz Game Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onHighlightBone={(boneId) => {
          setSelectedBoneId(boneId);
          if (sceneManagerRef.current) {
            sceneManagerRef.current.focusBone(boneId);
          }
        }}
        isDark={isDark}
      />

      {/* Persistent Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        onStartQuiz={() => setIsQuizOpen(true)}
        isDark={isDark}
      />
    </div>
  );
}

export default App;
