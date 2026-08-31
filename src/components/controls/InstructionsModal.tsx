import { motion, AnimatePresence } from "motion/react";
import {
  X,
  MousePointer,
  RotateCw,
  Move,
  ZoomIn,
  Bone,
  Mic,
  Lightbulb,
} from "lucide-react";

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export function InstructionsModal({ isOpen, onClose, isDark }: InstructionsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="instructions-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000000] dark:border-cyan-400 dark:shadow-[6px_6px_0px_#06b6d4] overflow-hidden transition-all ${
              isDark
                ? "bg-slate-900 text-slate-100"
                : "bg-white text-slate-900"
            }`}
          >
            {/* Header */}
            <div
              className={`p-4 sm:p-5 border-b-2 border-inherit flex items-center justify-between ${
                isDark ? "bg-slate-800" : "bg-yellow-300"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-lime-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_#000]">
                  <Bone className="w-5 h-5 -rotate-45 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-anton text-lg uppercase tracking-wider text-black dark:text-white leading-none">
                    Panduan Eksplorasi 3D
                  </h3>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-300 mt-0.5">
                    Cara navigasi model rangka dan fitur interaktif
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border-2 border-black bg-white dark:bg-slate-800 text-black dark:text-white shadow-[2px_2px_0px_#000] neo-press cursor-pointer"
                aria-label="Tutup Panduan"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-3.5 text-xs max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Rotate */}
                <div
                  className={`p-3 rounded-xl border-2 shadow-[2px_2px_0px_#000] flex items-start gap-2.5 ${
                    isDark ? "bg-slate-800 border-cyan-400 text-slate-200" : "bg-yellow-50 border-black text-slate-900"
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-cyan-300 text-black border border-black shrink-0">
                    <RotateCw className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="font-anton uppercase tracking-wide text-xs text-black dark:text-white">Rotasi 360°</p>
                    <p className="text-slate-800 dark:text-slate-300 mt-0.5 leading-relaxed font-semibold">
                      <strong>Mouse:</strong> Klik kiri & geser
                      <br />
                      <strong>Layar Sentuh:</strong> Sentuh & geser
                    </p>
                  </div>
                </div>

                {/* Zoom */}
                <div
                  className={`p-3 rounded-xl border-2 shadow-[2px_2px_0px_#000] flex items-start gap-2.5 ${
                    isDark ? "bg-slate-800 border-cyan-400 text-slate-200" : "bg-lime-50 border-black text-slate-900"
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-lime-300 text-black border border-black shrink-0">
                    <ZoomIn className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="font-anton uppercase tracking-wide text-xs text-black dark:text-white">Perbesar / Perkecil</p>
                    <p className="text-slate-800 dark:text-slate-300 mt-0.5 leading-relaxed font-semibold">
                      <strong>Mouse:</strong> Scroll roda mouse
                      <br />
                      <strong>Layar Sentuh:</strong> Cubit layar
                    </p>
                  </div>
                </div>

                {/* Pan */}
                <div
                  className={`p-3 rounded-xl border-2 shadow-[2px_2px_0px_#000] flex items-start gap-2.5 ${
                    isDark ? "bg-slate-800 border-cyan-400 text-slate-200" : "bg-purple-50 border-black text-slate-900"
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-purple-300 text-black border border-black shrink-0">
                    <Move className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="font-anton uppercase tracking-wide text-xs text-black dark:text-white">Geser Kamera (Pan)</p>
                    <p className="text-slate-800 dark:text-slate-300 mt-0.5 leading-relaxed font-semibold">
                      <strong>Mouse:</strong> Klik kanan & geser, atau tahan Shift + klik kiri
                    </p>
                  </div>
                </div>

                {/* Select Bone */}
                <div
                  className={`p-3 rounded-xl border-2 shadow-[2px_2px_0px_#000] flex items-start gap-2.5 ${
                    isDark ? "bg-slate-800 border-cyan-400 text-slate-200" : "bg-amber-50 border-black text-slate-900"
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-amber-300 text-black border border-black shrink-0">
                    <MousePointer className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="font-anton uppercase tracking-wide text-xs text-black dark:text-white">Pilih & Fokus Tulang</p>
                    <p className="text-slate-800 dark:text-slate-300 mt-0.5 leading-relaxed font-semibold">
                      <strong>Klik tulang</strong> untuk memfokuskan kamera dan membuka panel informasi anatomi lengkap.
                    </p>
                  </div>
                </div>
              </div>

              {/* Voice Assistant Highlight */}
              <div
                className={`p-3 rounded-xl border-2 shadow-[2px_2px_0px_#000] flex items-start gap-2.5 ${
                  isDark ? "bg-slate-800 border-cyan-400 text-slate-200" : "bg-yellow-100 border-black text-slate-950"
                }`}
              >
                <div className="p-1.5 rounded-lg bg-yellow-300 text-black border border-black shrink-0">
                  <Mic className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <p className="font-anton uppercase tracking-wide text-xs text-black dark:text-cyan-300">Asisten Suara Pintar (Voice Control)</p>
                  <p className="text-slate-800 dark:text-slate-300 mt-0.5 leading-relaxed text-[11px] font-semibold">
                    Tekan tombol mikrofon atau shortcut <kbd className="px-1.5 py-0.5 rounded bg-white text-black border border-black font-mono font-bold text-[10px]">V</kbd>, lalu sebutkan nama tulang (contoh: <em>"Cranium"</em>, <em>"Femur"</em>, <em>"Tulang Belikat"</em>, atau <em>"Reset Posisi"</em>) untuk menyorot tulang secara instan!
                  </p>
                </div>
              </div>

              {/* Key Features Tips */}
              <div
                className={`p-3.5 rounded-xl border-2 shadow-[2px_2px_0px_#000] space-y-1.5 ${
                  isDark
                    ? "bg-slate-800 border-cyan-400 text-slate-200"
                    : "bg-white border-black text-slate-950"
                }`}
              >
                <div className="flex items-center gap-1.5 font-anton uppercase tracking-wide text-xs text-black dark:text-cyan-300">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />
                  <span>Fitur Edukasi Unggulan:</span>
                </div>
                <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-800 dark:text-slate-300 font-semibold">
                  <li>
                    <strong>Mode X-Ray (<kbd className="px-1 py-0.5 rounded bg-amber-100 text-black border border-black text-[10px]">X</kbd>):</strong> Meredupkan tulang lain menjadi transparan agar tulang terpilih tampak terisolasi.
                  </li>
                  <li>
                    <strong>Label 3D (<kbd className="px-1 py-0.5 rounded bg-amber-100 text-black border border-black text-[10px]">L</kbd>):</strong> Menampilkan pin penanda nama tulang secara dinamis pada tampilan 3D.
                  </li>
                  <li>
                    <strong>Pelafalan Audio:</strong> Klik tombol speaker di panel untuk mendengarkan pelafalan nama Latin secara akurat.
                  </li>
                  <li>
                    <strong>Pakar AI (Gemini):</strong> Tanya jawab materi osteologi & simulasi soal UTBK Biologi.
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t-2 border-inherit flex justify-end bg-slate-50 dark:bg-slate-800/50">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-anton uppercase tracking-wider text-xs border-2 border-black shadow-[3px_3px_0px_#000] neo-press cursor-pointer"
              >
                Mengerti & Mulai Belajar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

