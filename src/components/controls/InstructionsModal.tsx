import {
  X,
  MousePointer,
  RotateCw,
  Move,
  ZoomIn,
  Touchpad,
  Hand,
  CheckCircle,
  Bone,
  Sparkles,
} from "lucide-react";

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export function InstructionsModal({ isOpen, onClose, isDark }: InstructionsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isDark
            ? "bg-slate-900 border-slate-700 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-inherit flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-600 text-white">
              <Bone className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <h3 className="text-base font-bold">Panduan Eksplorasi 3D</h3>
              <p className="text-xs text-slate-400">
                Cara berinteraksi dengan model rangka 3D dan panel anatomi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Rotate */}
            <div
              className={`p-3 rounded-xl border flex items-start gap-3 ${
                isDark ? "bg-slate-800/60 border-slate-700/80" : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                <RotateCw className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-200 dark:text-slate-100">Rotasi 360°</p>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  <strong>Mouse:</strong> Klik kiri & geser
                  <br />
                  <strong>Layar Sentuh:</strong> Sentuh 1 jari & geser
                </p>
              </div>
            </div>

            {/* Zoom */}
            <div
              className={`p-3 rounded-xl border flex items-start gap-3 ${
                isDark ? "bg-slate-800/60 border-slate-700/80" : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                <ZoomIn className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-200 dark:text-slate-100">Perbesar / Perkecil</p>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  <strong>Mouse:</strong> Scroll roda mouse
                  <br />
                  <strong>Layar Sentuh:</strong> Cubit layar (pinch to zoom)
                </p>
              </div>
            </div>

            {/* Pan */}
            <div
              className={`p-3 rounded-xl border flex items-start gap-3 ${
                isDark ? "bg-slate-800/60 border-slate-700/80" : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                <Move className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-200 dark:text-slate-100">Geser Kamera (Pan)</p>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  <strong>Mouse:</strong> Klik kanan & geser, atau tahan Shift + klik kiri
                </p>
              </div>
            </div>

            {/* Select Bone */}
            <div
              className={`p-3 rounded-xl border flex items-start gap-3 ${
                isDark ? "bg-slate-800/60 border-slate-700/80" : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <MousePointer className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-200 dark:text-slate-100">Pilih & Fokus Tulang</p>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  <strong>Klik tulang</strong> untuk memfokuskan kamera dan membuka panel informasi anatomi lengkap.
                </p>
              </div>
            </div>
          </div>

          {/* Voice Assistant Highlight */}
          <div
            className={`p-3 rounded-xl border flex items-start gap-3 ${
              isDark ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-100" : "bg-emerald-50 border-emerald-200 text-emerald-900"
            }`}
          >
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-emerald-300 dark:text-emerald-300">Asisten Suara Pintar (Voice Control)</p>
              <p className="text-slate-300 dark:text-slate-300 mt-0.5 leading-relaxed text-[11px]">
                Tekan tombol mikrofon atau tombol shortcut <kbd className="px-1 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-mono">V</kbd>, lalu sebutkan nama tulang (contoh: <em>"Cranium"</em>, <em>"Femur"</em>, <em>"Tulang Belikat"</em>, atau perintah <em>"Reset Posisi"</em>) untuk menyorot secara otomatis!
              </p>
            </div>
          </div>

          {/* Key Features Tips */}
          <div
            className={`p-3.5 rounded-xl border space-y-1.5 ${
              isDark
                ? "bg-cyan-950/30 border-cyan-800/50 text-cyan-200"
                : "bg-sky-50 border-sky-200 text-sky-900"
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs text-cyan-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Fitur Edukasi Unggulan:</span>
            </div>
            <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-300 dark:text-slate-300">
              <li>
                <strong>Mode X-Ray (<kbd className="px-1 py-0.5 rounded bg-slate-800 text-cyan-300 text-[10px]">X</kbd>):</strong> Meredupkan tulang lain menjadi transparan agar tulang yang dipilih terlihat jelas.
              </li>
              <li>
                <strong>Label 3D (<kbd className="px-1 py-0.5 rounded bg-slate-800 text-cyan-300 text-[10px]">L</kbd>):</strong> Menampilkan pin penanda nama tulang secara dinamis pada tampilan 3D.
              </li>
              <li>
                <strong>Pelafalan Audio:</strong> Klik ikon speaker di samping nama Latin tulang untuk mendengarkan cara pelafalan medis yang benar.
              </li>
              <li>
                <strong>Pakar AI (Gemini 3.1 Pro):</strong> Fitur tanya jawab materi anatomi dan simulasi soal UTBK/SNBT Biologi.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-inherit flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-all"
          >
            Mengerti & Mulai Belajar
          </button>
        </div>
      </div>
    </div>
  );
}
