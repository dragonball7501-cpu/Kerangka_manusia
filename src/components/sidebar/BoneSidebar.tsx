import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
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
      className={`h-full flex flex-col transition-colors border-r ${
        isDark
          ? "bg-slate-900/95 border-slate-800 text-slate-200"
          : "bg-white/95 border-slate-200 text-slate-800"
      }`}
    >
      {/* Sidebar Header & Search */}
      <div className="p-4 border-b border-inherit space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-500" />
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Daftar Tulang
            </h2>
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 rounded-md hover:bg-slate-800 text-slate-400"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="input-search-bones"
            type="text"
            placeholder="Cari tulang (Indonesia / Latin)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-8 py-2 text-xs rounded-lg border outline-none transition-all ${
              isDark
                ? "bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-cyan-500 focus:bg-slate-800"
                : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white"
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Division Filter Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-slate-950/20 dark:bg-slate-950/40 border border-inherit text-[11px] font-medium text-center">
          <button
            onClick={() => setDivisionFilter("all")}
            className={`py-1 rounded-md transition-all ${
              divisionFilter === "all"
                ? isDark
                  ? "bg-cyan-900/60 text-cyan-300 font-semibold shadow-xs"
                  : "bg-sky-100 text-sky-800 font-semibold shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Semua (28)
          </button>
          <button
            onClick={() => setDivisionFilter("axial")}
            className={`py-1 rounded-md transition-all ${
              divisionFilter === "axial"
                ? isDark
                  ? "bg-cyan-900/60 text-cyan-300 font-semibold shadow-xs"
                  : "bg-sky-100 text-sky-800 font-semibold shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Aksial
          </button>
          <button
            onClick={() => setDivisionFilter("appendicular")}
            className={`py-1 rounded-md transition-all ${
              divisionFilter === "appendicular"
                ? isDark
                  ? "bg-cyan-900/60 text-cyan-300 font-semibold shadow-xs"
                  : "bg-sky-100 text-sky-800 font-semibold shadow-xs"
                : "text-slate-400 hover:text-slate-200"
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
              className={`rounded-xl border transition-all ${
                isGroupActive
                  ? isDark
                    ? "bg-slate-800/90 border-cyan-500/80 shadow-md shadow-cyan-950/40"
                    : "bg-sky-50/80 border-sky-400 shadow-md shadow-sky-100"
                  : isDark
                  ? "bg-slate-800/40 border-slate-700/60 hover:border-slate-600"
                  : "bg-slate-50/70 border-slate-200/80 hover:border-slate-300"
              }`}
            >
              {/* Group Accordion Header */}
              <div
                onClick={() => toggleGroup(group.id)}
                className="flex items-center justify-between p-2.5 cursor-pointer select-none group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${group.colorHex}22`, color: group.colorHex }}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold truncate">{group.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700/50 text-slate-300 dark:text-slate-400 font-mono">
                        {bonesInGroup.length}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate italic">
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
                    className={`p-1 rounded-md text-[10px] font-medium transition-colors ${
                      isGroupActive
                        ? "bg-cyan-500 text-white font-semibold"
                        : "hover:bg-slate-700/60 text-slate-400 hover:text-slate-200"
                    }`}
                    title={isGroupActive ? "Batalkan Fokus Grup" : "Fokus Kamera ke Grup"}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-slate-400 group-hover:text-slate-200">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </span>
                </div>
              </div>

              {/* Bone Items in this group */}
              {isExpanded && (
                <div className="px-2 pb-2 pt-0.5 space-y-1 border-t border-inherit/40">
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
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                          isSelected
                            ? isDark
                              ? "bg-amber-500/20 border border-amber-500/80 text-amber-300 font-semibold shadow-xs"
                              : "bg-amber-50 border border-amber-400 text-amber-900 font-semibold shadow-xs"
                            : isHovered
                            ? isDark
                              ? "bg-cyan-950/60 border border-cyan-700/50 text-cyan-300"
                              : "bg-sky-50 border border-sky-300 text-sky-900"
                            : isDark
                            ? "hover:bg-slate-700/40 text-slate-300"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                            <span className="truncate">{bone.commonName}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 block truncate italic font-serif">
                            {bone.latinName}
                          </span>
                        </div>

                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-sm whitespace-nowrap shrink-0 ${
                            isDark
                              ? "bg-slate-900/60 text-slate-400"
                              : "bg-slate-200/80 text-slate-600"
                          }`}
                        >
                          {bone.shapeType.split(" ")[1] || bone.shapeType}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Info, Quiz, & Developer Button */}
      <div className="p-3 border-t border-inherit space-y-2">
        {onOpenQuiz && (
          <div className="flex gap-1.5">
            <button
              id="btn-quiz-sidebar"
              onClick={() => {
                onOpenQuiz();
                if (onCloseMobile) onCloseMobile();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 shadow-sm hover:brightness-110 active:scale-95 transition-all"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Main Kuis</span>
            </button>

            {onOpenLeaderboard && (
              <button
                id="btn-leaderboard-sidebar"
                onClick={() => {
                  onOpenLeaderboard();
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700"
                    : "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
                }`}
                title="Lihat Peringkat Leaderboard"
              >
                <Trophy className="w-4 h-4 text-amber-500" />
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
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-semibold transition-all active:scale-98 group ${
              isDark
                ? "bg-gradient-to-r from-slate-800/80 to-slate-900/90 border-slate-700 hover:border-cyan-500/80 text-slate-200 hover:text-white shadow-sm hover:shadow-cyan-950/40"
                : "bg-gradient-to-r from-slate-50 to-sky-50/50 border-slate-200 hover:border-sky-400 text-slate-700 hover:text-sky-900 shadow-xs"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                  isDark ? "bg-cyan-500/20 text-cyan-400" : "bg-sky-100 text-sky-600"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-bold">Developer Web</span>
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400 opacity-75" />
                </div>
                <span className="text-[10px] text-slate-400 font-normal leading-tight block mt-0.5">
                  by MUHAMMAD ZUBAIR AKMA
                </span>
              </div>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                isDark ? "bg-slate-800 text-cyan-400 group-hover:bg-cyan-950" : "bg-white text-sky-700 group-hover:bg-sky-100"
              }`}
            >
              Info
            </span>
          </button>
        )}

        <div
          className={`pt-1 text-[11px] flex items-center justify-between ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <span>Rangka Manusia (~206 Tulang)</span>
          <span className="font-mono text-[10px] text-cyan-500">v1.0 SMA/MA</span>
        </div>
      </div>
    </aside>
  );
}
