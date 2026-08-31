import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Code2, Sparkles, UserCheck, Heart } from "lucide-react";

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export function DeveloperModal({ isOpen, onClose, isDark }: DeveloperModalProps) {
  const instagramUrl = "https://www.instagram.com/wo_rtell?igsi=MTkxaG5zNGY0dHZnbQ==";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="developer-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            id="developer-modal-content"
            initial={{ opacity: 0, scale: 0.93, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 18 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-md rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000000] dark:border-cyan-400 dark:shadow-[6px_6px_0px_#06b6d4] overflow-hidden transition-all ${
              isDark
                ? "bg-slate-900 text-slate-100"
                : "bg-amber-50 text-slate-900"
            }`}
          >
            {/* Header top bar */}
            <div className="h-3.5 w-full bg-yellow-300 dark:bg-cyan-400 border-b-2 border-inherit" />

            {/* Close Button */}
            <button
              id="btn-close-developer-modal"
              onClick={onClose}
              className={`absolute top-5 right-5 p-1.5 rounded-lg border-2 border-black font-bold shadow-[2px_2px_0px_#000000] dark:border-cyan-400 dark:shadow-[2px_2px_0px_#06b6d4] neo-press cursor-pointer ${
                isDark
                  ? "bg-slate-800 text-slate-100"
                  : "bg-white text-black"
              }`}
              aria-label="Tutup Popup Pengembang"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="p-6 sm:p-7">
              {/* Avatar and Developer Badge */}
              <div className="flex flex-col items-center text-center space-y-3.5">
                <div className="relative">
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_#000000] ${
                      isDark
                        ? "bg-cyan-400 text-black dark:border-cyan-200 dark:shadow-[4px_4px_0px_#06b6d4]"
                        : "bg-yellow-300 text-black"
                    }`}
                  >
                    <Code2 className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-2 border-black flex items-center justify-center text-black shadow-[1px_1px_0px_#000]">
                    <UserCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border-2 border-black text-xs font-anton tracking-wider uppercase mb-1.5 bg-yellow-300 text-black shadow-[2px_2px_0px_#000] dark:bg-cyan-400 dark:border-cyan-200 dark:shadow-[2px_2px_0px_#06b6d4]">
                    <Code2 className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                    <span>Developer Web</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-300 font-bold">Kreator & Pengembang Aplikasi</p>
                  <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-wider mt-1 text-black dark:text-white leading-none">
                    MUHAMMAD ZUBAIR AKMA
                  </h3>
                </div>

                <p
                  className={`text-xs sm:text-sm leading-relaxed max-w-xs font-semibold ${
                    isDark ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  Pengembang media pembelajaran interaktif 3D Skeletal Explorer untuk eksplorasi anatomi rangka manusia Biologi SMA/MA.
                </p>

                {/* Instagram Link Button */}
                <div className="w-full pt-2">
                  <a
                    id="btn-developer-instagram"
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-black text-sm text-black border-3 border-black shadow-[4px_4px_0px_#000000] transition-all neo-press bg-pink-400 hover:bg-pink-300 cursor-pointer dark:border-cyan-200 dark:shadow-[4px_4px_0px_#06b6d4]"
                  >
                    {/* Instagram Camera SVG Icon */}
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Kunjungi Instagram (@wo_rtell)</span>
                    <ExternalLink className="w-4 h-4 ml-0.5 stroke-[2.5]" />
                  </a>
                </div>

                {/* Footer notice */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 pt-1">
                  <span>Dibuat dengan dedikasi untuk edukasi</span>
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline stroke-[2.5]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

