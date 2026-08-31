import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ChevronDown,
  Brain,
  Activity,
  Shield,
  Feather,
  Hand,
  CircleDot,
  Footprints,
  Eye,
  CheckCircle2,
  X,
  Layers,
  Filter,
  Bone,
  Code2,
  Sparkles,
  Trophy,
  BrainCircuit,
} from "lucide-react";
import { BONE_GROUPS } from "../../data/groups";
import { BONES_DATA } from "../../data/bones";
import { BoneGroupId, SkeletonDivision } from "../../types/bone";

interface BoneSidebarProps {
  selectedBoneId: string | null;
  hoveredBoneId: string | null;
  activeGroupId: string | null;
  onSelectBone: (boneId: string | null) => void;
  onHoverBone: (boneId: string | null) => void;
  onSelectGroup: (groupId: BoneGroupId | null) => void;
  onCloseMobile?: () => void;
  onOpenDeveloperModal?: () => void;
  onOpenQuiz?: () => void;
  onOpenLeaderboard?: () => void;
  isDark: boolean;
}

const GROUP_ICONS: Record<string, any> = {
  Brain,
  Activity,
  Shield,
  Feather,
  Hand,
  CircleDot,
  Footprints,
};

export function BoneSidebar({
  selectedBoneId,
  hoveredBoneId,
  activeGroupId,
  onSelectBone,
  onHoverBone,
  onSelectGroup,
  onCloseMobile,
  onOpenDeveloperModal,
  onOpenQuiz,
  onOpenLeaderboard,
  isDark,
}: BoneSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [divisionFilter, setDivisionFilter] = useState<"all" | SkeletonDivision>("all");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    skull: true,
    "vertebral-column": true,
    "rib-cage": true,
    "shoulder-girdle": true,
    "upper-limb": true,
    "pelvic-girdle": true,
    "lower-limb": true,
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  // Filtered Bones based on search query and division
  const filteredBones = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return BONES_DATA.filter((bone) => {
      const matchSearch =
        !query ||
        bone.commonName.toLowerCase().includes(query) ||
        bone.latinName.toLowerCase().includes(query) ||
        bone.shapeType.toLowerCase().includes(query);

      const matchDivision = divisionFilter === "all" || bone.division === divisionFilter;
      return matchSearch && matchDivision;
    });
  }, [searchQuery, divisionFilter]);

  // Group bones
  const bonesByGroup = useMemo(() => {
    const map: Record<string, typeof BONES_DATA> = {};
    BONE_GROUPS.forEach((g) => {
      map[g.id] = [];
    });
    filteredBones.forEach((bone) => {
      if (map[bone.group]) {
        map[bone.group].push(bone);
      }
    });
    return map;
  }, [filteredBones]);

  return (
    <aside
      id="bone-navigation-sidebar"
      className={`h-full flex flex-col transition-colors border-r-2 sm:border-r-3 ${
        isDark
          ? "bg-slate-900 border-cyan-400 text-slate-100 shadow-[3px_0_0_0_#06b6d4]"
          : "bg-amber-50/90 border-black text-slate-900 shadow-[3px_0_0_0_#000000]"
      }`}
    >
      {/* Sidebar Header & Search */}
      <div className="p-3.5 sm:p-4 border-b-2 border-inherit space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-yellow-300 border-2 border-black flex items-center justify-center text-black font-black shadow-[1.5px_1.5px_0px_#000]">
              <Layers className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider">
              Daftar Tulang Rangka
            </h2>
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className={`lg:hidden p-1 rounded-lg border-2 font-bold neo-press cursor-pointer ${
                isDark
                  ? "border-cyan-400 bg-slate-800 text-cyan-300 shadow-[2px_2px_0px_#06b6d4]"
                  : "border-black bg-white text-black shadow-[2px_2px_0px_#000000]"
              }`}
              aria-label="Tutup Menu"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold" />
          <input
            id="input-search-bones"
            type="text"
            placeholder="Cari tulang (Indonesia / Latin)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-8 py-2 text-xs font-semibold rounded-lg border-2 outline-none transition-all ${
              isDark
                ? "bg-slate-800 border-cyan-400 text-slate-100 placeholder-slate-400 focus:bg-slate-700 shadow-[2px_2px_0px_#06b6d4]"
                : "bg-white border-black text-slate-900 placeholder-slate-500 focus:bg-yellow-50 shadow-[2px_2px_0px_#000000]"
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Division Filter Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border-2 border-black dark:border-cyan-400 text-[11px] font-black text-center shadow-[2px_2px_0px_#000000] dark:shadow-[2px_2px_0px_#06b6d4]">
          <button
            onClick={() => setDivisionFilter("all")}
            className={`py-1 rounded-lg transition-all border font-black uppercase text-[10px] sm:text-[11px] cursor-pointer ${
              divisionFilter === "all"
                ? isDark
                  ? "bg-cyan-400 text-slate-950 border-cyan-200 shadow-[1.5px_1.5px_0px_#06b6d4]"
                  : "bg-yellow-300 text-black border-black shadow-[1.5px_1.5px_0px_#000000]"
                : "border-transparent text-slate-800 dark:text-slate-300 font-bold hover:text-black dark:hover:text-white"
            }`}
          >
            Semua (28)
          </button>
          <button
            onClick={() => setDivisionFilter("axial")}
            className={`py-1 rounded-lg transition-all border font-black uppercase text-[10px] sm:text-[11px] cursor-pointer ${
              divisionFilter === "axial"
                ? isDark
                  ? "bg-cyan-400 text-slate-950 border-cyan-200 shadow-[1.5px_1.5px_0px_#06b6d4]"
                  : "bg-lime-300 text-black border-black shadow-[1.5px_1.5px_0px_#000000]"
                : "border-transparent text-slate-800 dark:text-slate-300 font-bold hover:text-black dark:hover:text-white"
            }`}
          >
            Aksial
          </button>
          <button
            onClick={() => setDivisionFilter("appendicular")}
            className={`py-1 rounded-lg transition-all border font-black uppercase text-[10px] sm:text-[11px] cursor-pointer ${
              divisionFilter === "appendicular"
                ? isDark
                  ? "bg-cyan-400 text-slate-950 border-cyan-200 shadow-[1.5px_1.5px_0px_#06b6d4]"
                  : "bg-pink-300 text-black border-black shadow-[1.5px_1.5px_0px_#000000]"
                : "border-transparent text-slate-800 dark:text-slate-300 font-bold hover:text-black dark:hover:text-white"
            }`}
          >
            Apendikular
          </button>
        </div>
      </div>

      {/* Accordion Group List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
        {BONE_GROUPS.map((group) => {
          const bonesInGroup = bonesByGroup[group.id] || [];
          if (bonesInGroup.length === 0) return null;

          const isExpanded = expandedGroups[group.id] ?? true;
          const isGroupActive = activeGroupId === group.id;
          const IconComp = GROUP_ICONS[group.iconName] || Bone;

          return (
            <div
              key={group.id}
              id={`group-card-${group.id}`}
              className={`rounded-xl border-2 transition-all ${
                isGroupActive
                  ? isDark
                    ? "bg-slate-800 border-cyan-400 shadow-[3px_3px_0px_#06b6d4]"
                    : "bg-yellow-100 border-black shadow-[3px_3px_0px_#000000]"
                  : isDark
                  ? "bg-slate-800/80 border-slate-700 hover:border-cyan-400 shadow-[2px_2px_0px_#000000]"
                  : "bg-white border-black hover:bg-slate-50 shadow-[2.5px_2.5px_0px_#000000]"
              }`}
            >
              {/* Group Accordion Header */}
              <div
                onClick={() => toggleGroup(group.id)}
                className="flex items-center justify-between p-2.5 cursor-pointer select-none group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border-2 border-black shadow-[1px_1px_0px_#000000] dark:border-white"
                    style={{ backgroundColor: group.colorHex, color: "#000000" }}
                  >
                    <IconComp className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black truncate">{group.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-yellow-300 text-black border border-black dark:bg-cyan-400 dark:text-black font-mono font-extrabold shadow-[1px_1px_0px_#000]">
                        {bonesInGroup.length}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-800 dark:text-slate-300 truncate italic font-bold">
                      {group.latinName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (activeGroupId === group.id) {
                        onSelectGroup(null);
                      } else {
                        onSelectGroup(group.id);
                      }
                    }}
                    className={`p-1.5 rounded-lg text-[10px] font-bold border-2 transition-all neo-press cursor-pointer ${
                      isGroupActive
                        ? "bg-cyan-400 text-black border-black shadow-[1.5px_1.5px_0px_#000000]"
                        : isDark
                        ? "bg-slate-700 border-slate-600 text-slate-300 hover:text-white"
                        : "bg-slate-100 border-black text-black shadow-[1.5px_1.5px_0px_#000000]"
                    }`}
                    title={isGroupActive ? "Batalkan Fokus Grup" : "Fokus Kamera ke Grup"}
                  >
                    <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>

                  <span className={`text-black dark:text-slate-300 transition-transform duration-300 ${isExpanded ? "rotate-0" : "-rotate-90"}`}>
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </span>
                </div>
              </div>

              {/* Bone Items in this group with smooth animation */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key={`content-${group.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 pb-2 pt-1 space-y-1.5 border-t-2 border-inherit">
                      {bonesInGroup.map((bone) => {
                        const isSelected = selectedBoneId === bone.id;
                        const isHovered = hoveredBoneId === bone.id;

                        return (
                          <button
                            key={bone.id}
                            id={`btn-bone-item-${bone.id}`}
                            onClick={() => {
                              onSelectBone(bone.id);
                              if (onCloseMobile) onCloseMobile();
                            }}
                            onMouseEnter={() => onHoverBone(bone.id)}
                            onMouseLeave={() => onHoverBone(null)}
                            className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-center justify-between border-2 cursor-pointer font-bold ${
                              isSelected
                                ? isDark
                                ? "bg-amber-400 border-black text-slate-950 shadow-[2px_2px_0px_#000000]"
                                : "bg-amber-300 border-black text-black shadow-[2px_2px_0px_#000000]"
                              : isHovered
                              ? isDark
                                ? "bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[2px_2px_0px_#06b6d4]"
                                : "bg-sky-100 border-black text-black shadow-[2px_2px_0px_#000000]"
                              : isDark
                              ? "bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500"
                              : "bg-white border-slate-300 text-slate-900 hover:border-black hover:shadow-[1.5px_1.5px_0px_#000000]"
                            }`}
                          >
                            <div className="min-w-0 pr-2">
                              <div className="flex items-center gap-1.5">
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3] shrink-0" />}
                                <span className="truncate">{bone.commonName}</span>
                              </div>
                              <span className="text-[10px] text-slate-700 dark:text-slate-300 block truncate italic font-serif font-bold">
                                {bone.latinName}
                              </span>
                            </div>

                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded-md font-extrabold uppercase whitespace-nowrap shrink-0 border border-black ${
                                isDark
                                  ? "bg-slate-800 text-cyan-300 border-cyan-400"
                                  : "bg-yellow-200 text-black border-black"
                              }`}
                            >
                              {bone.shapeType.split(" ")[1] || bone.shapeType}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Info, Quiz, & Developer Button */}
      <div className="p-3 border-t-2 border-inherit space-y-2">
        {onOpenQuiz && (
          <div className="flex gap-1.5">
            <button
              id="btn-quiz-sidebar"
              onClick={() => {
                onOpenQuiz();
                if (onCloseMobile) onCloseMobile();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-amber-300 hover:bg-amber-400 border-2 border-black shadow-[2.5px_2.5px_0px_#000000] dark:border-cyan-200 dark:shadow-[2.5px_2.5px_0px_#06b6d4] neo-press cursor-pointer"
            >
              <BrainCircuit className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Main Kuis</span>
            </button>

            {onOpenLeaderboard && (
              <button
                id="btn-leaderboard-sidebar"
                onClick={() => {
                  onOpenLeaderboard();
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`p-2 rounded-xl border-2 flex items-center justify-center font-bold neo-press cursor-pointer ${
                  isDark
                    ? "bg-slate-800 border-cyan-400 text-amber-400 shadow-[2px_2px_0px_#06b6d4]"
                    : "bg-yellow-100 border-black text-black shadow-[2px_2px_0px_#000000]"
                }`}
                title="Lihat Peringkat Leaderboard"
              >
                <Trophy className="w-4 h-4 text-amber-500 stroke-[2.5]" />
              </button>
            )}
          </div>
        )}

        {onOpenDeveloperModal && (
          <button
            id="btn-developer-sidebar"
            onClick={() => {
              onOpenDeveloperModal();
              if (onCloseMobile) onCloseMobile();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border-2 text-xs font-bold neo-press cursor-pointer group ${
              isDark
                ? "bg-slate-800 border-cyan-400 text-slate-100 shadow-[2.5px_2.5px_0px_#06b6d4]"
                : "bg-white border-black text-slate-900 shadow-[2.5px_2.5px_0px_#000000]"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-md border border-black flex items-center justify-center font-black ${
                  isDark ? "bg-cyan-400 text-black" : "bg-lime-400 text-black"
                }`}
              >
                <Code2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-black">Developer Web</span>
                  <Sparkles className="w-2.5 h-2.5 text-amber-500 fill-current" />
                </div>
                <span className="text-[10px] text-slate-700 dark:text-slate-300 font-bold leading-tight block mt-0.5">
                  by MUHAMMAD ZUBAIR AKMA
                </span>
              </div>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-md font-black uppercase border border-black ${
                isDark ? "bg-cyan-400 text-black" : "bg-yellow-300 text-black"
              }`}
            >
              Info
            </span>
          </button>
        )}

        <div
          className={`pt-1 text-[11px] font-extrabold flex items-center justify-between ${
            isDark ? "text-slate-300" : "text-slate-800"
          }`}
        >
          <span>Rangka Manusia (~206 Tulang)</span>
          <span className="font-mono text-[10px] font-extrabold text-cyan-600 dark:text-cyan-400 bg-black/10 dark:bg-cyan-950/60 px-1.5 py-0.5 rounded">v1.0 SMA</span>
        </div>
      </div>
    </aside>
  );
}
