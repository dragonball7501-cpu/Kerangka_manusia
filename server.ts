import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Helper for comprehensive anatomical fallback if Gemini key is missing or offline
function generateAnatomyFallback(boneName: string, boneLatin: string, group: string, question: string): string {
  const qLower = question.toLowerCase();

  if (qLower.includes("osifikasi") || qLower.includes("pembentukan") || qLower.includes("tumbuh")) {
    return `### 🧬 Proses Osifikasi & Pertumbuhan: **${boneName}** (${boneLatin})

1. **Jenis Osifikasi**:
   - **Osifikasi Endokondral** (kebanyakan tulang pipa/panjang seperti femur, humerus, vertebra): diawali dari model tulang rawan hialin (*hyaline cartilage*) pada masa embrio.
   - **Osifikasi Intramembranosa** (tulang pipih tengkorak/klavikula): pembentukan langsung dari diferensiasi sel mesenkim menjadi osteoblas tanpa perantara kartilago.

2. **Tahapan Osifikasi Endokondral**:
   - **Pusat Osifikasi Primer (*Diaphysis*)**: Pembuluh darah menembus perikondrium, sel mesenkim berdiferensiasi menjadi osteoblas yang mendeposit matriks osteoid dan mineral kalsium fosfat (*hidroksiapatit*).
   - **Pusat Osifikasi Sekunder (*Epiphysis*)**: Muncul di ujung tulang saat menjelang/setelah kelahiran.
   - **Lempeng Epifisis (*Cakra Epifisis*)**: Lapisan tulang rawan di antara epifisis dan diafisis yang aktif bermitosis untuk penambahan panjang tulang hingga usia remaja akhir (~18–25 tahun).

3. **Peran Hormon & Nutrisi**:
   - **Hormon Pertumbuhan (GH)** & **Tiroksin**: Menstimulasi proliferasi kondrosit.
   - **Kalsitonin** & **Parathormon (PTH)**: Menjaga homeostasis kalsium darah.
   - **Vitamin D (Kalsitriol)**: Membantu absorpsi kalsium dan fosfat di usus halus.`;
  }

  if (qLower.includes("otot") || qLower.includes("gerak") || qLower.includes("antagonis") || qLower.includes("sendi")) {
    return `### ⚡ Biomekanika & Mekanisme Kerja Otot: **${boneName}** (${boneLatin})

1. **Sistem Pengungkit (Tuas) Biomekanika**:
   - Tulang bertindak sebagai **lengan tuas (*lever*)**, sendi sebagai **titik tumpu (*fulcrum*)**, dan kontraksi otot rangka memberikan **gaya kuasa (*effort*)**.

2. **Pasangan Otot Antagonis**:
   - **Fleksi vs Ekstensi**: Contoh pada lengan (*M. Biceps brachii* kontraksi = fleksi siku, *M. Triceps brachii* relaksasi; sebaliknya saat meluruskan siku).
   - **Abduksi vs Adduksi**: Gerakan menjauhi vs mendekati sumbu tengah tubuh (misal *M. Deltoideus* vs *M. Pectoralis major*).
   - **Pronasi vs Supinasi**: Gerak memutar telapak tangan menelungkup vs menengadah (*M. Pronator teres* vs *M. Supinator*).

3. **Tipe Persendian (*Artikulasi*)**:
   - Dilengkapi cairan sinovial, membran sinovial, dan ligamen pengikat untuk memfasilitasi gerakan bebas tanpa gesekan merusak.`;
  }

  if (qLower.includes("klinis") || qLower.includes("fraktur") || qLower.includes("penyakit") || qLower.includes("kelainan")) {
    return `### 🩺 Kelainan Klinis & Patologi: **${boneName}** (${boneLatin})

1. **Jenis-Jenis Fraktur (Patah Tulang)**:
   - **Fraktur Tertutup (*Simple/Closed*)**: Tulang patah tanpa merobek kulit.
   - **Fraktur Terbuka (*Compound/Open*)**: Ujung patahan tulang menembus kulit, berisiko tinggi infeksi osteomielitis.
   - **Greenstick Fracture**: Retak parsial pada satu sisi tulang, lazim pada anak-anak karena tulangnya masih kaya kolagen dan lentur.
   - **Fraktur Kominutif**: Tulang hancur berkeping-keping menjadi beberapa fragmen kecil.

2. **Gangguan Metabolik & Postural**:
   - **Osteoporosis**: Penurunan densitas massa tulang akibat aktivitas osteoklas melebihi osteoblas (sering akibat defisiensi estrogen pada pasca-menopause).
   - **Rakitis (anak) / Osteomalasia (dewasa)**: Tulang lunak dan membengkok akibat defisiensi vitamin D atau kalsium.
   - **Kelainan Tulang Belakang**: *Skoliosis* (bengkok lateral menyerupai S/C), *Kifosis* (bungkuk torakal berlebih), *Lordosis* (lengkung lumbal terlalu ke depan).`;
  }

  if (qLower.includes("soal") || qLower.includes("utbk") || qLower.includes("snbt") || qLower.includes("latihan")) {
    return `### 📝 Simulasi Soal Tipe UTBK / SNBT: **${boneName}**

**Soal 1 (Konseptual Jaringan & Osifikasi):**
Seorang atlet remaja mengalami cedera benturan keras pada tungkai bawah. Hasil rontgen menunjukkan adanya gangguan pada daerah lempeng kartilago di antara ujung dan batang tulang. Struktur yang dimaksud beserta konsekuensinya adalah...
* **A.** Periosteum; penurunan suplai darah ke osteosit
* **B.** Cakra Epifisis; terhentinya pertumbuhan memanjang tulang
* **C.** Endosteum; pembentukan sumsum tulang merah terhambat
* **D.** Kanalis Havers; osteon kehilangan nutrisi dan kalsium
* **E.** Diafisis; produksi hormon parathormon menurun
* **Kunci & Pembahasan:** **B.** Cakra epifisis (*epiphyseal plate*) tersusun dari kartilago hialin yang bertanggung jawab atas pertumbuhan memanjang tulang sebelum menutup saat dewasa.

---

**Soal 2 (Mekanika Gerak & Persendian):**
Hubungan antartulang pada **${boneName}** memungkinkan koordinasi gerak yang presisi. Pernyataan yang TEPAT mengenai mekanisme biologisnya adalah...
* **A.** Kalsium masuk ke sarkoplasma berikatan dengan aktin langsung tanpa troponin
* **B.** Asetilkolin dilepaskan di *neuromuscular junction* memicu depolarisasi sarkolema
* **C.** Tulang keras tidak memerlukan pasokan darah karena matriksnya padat
* **D.** ATP hanya dibutuhkan saat relaksasi otot dan bukan kontraksi
* **E.** Sinartrosis memungkinkan pergerakan multi-aksial bebas
* **Kunci & Pembahasan:** **B.** Depolarisasi sarkolema oleh asetilkolin membuka kanal ion Ca²⁺ dari retikulum sarkoplasma untuk mengawali *sliding filament mechanism*.`;
  }

  return `### 📖 Penjelasan Anatomi: **${boneName}** (${boneLatin})
**Klasifikasi**: ${group}

1. **Karakteristik Struktural**:
   - ${boneName} merupakan komponen integral dalam sistem gerak rangka manusia yang tersusun dari matriks organik (serat kolagen tipe I) dan komponen anorganik mineral (*kristal hidroksiapatit* kalsium fosfat).
   - Struktur mikro terdiri atas sistem Havers (osteon) dengan osteosit di dalam lakuna yang saling terhubung lewat kanalikuli.

2. **Fungsi Fisiologis Utama**:
   - **Proteksi**: Melindungi jaringan lunak dan organ vital di sekitarnya.
   - **Penopang & Lokomosi**: Bertindak sebagai tuas pengungkit saat ditarik oleh otot rangka.
   - **Hematopoiesis**: Tempat produksi eritrosit, leukosit, dan trombosit di sumsum tulang merah.
   - **Reservoir Mineral**: Menyimpan 99% cadangan kalsium dan 85% fosfor tubuh.

3. **Korelasi Persendian**:
   - Berikatan kokoh dengan tulang tetangga melalui jaringan ligamen kolagen dan kapsul sinovial guna mendistribusikan gaya mekanis secara optimal.`;
}

// AI Anatomy Mentor & Question Endpoint
app.post("/api/gemini/ask-anatomy", async (req, res) => {
  try {
    const { boneName, boneLatin, group, question } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Pertanyaan diperlukan." });
    }

    const ai = getAIClient();

    if (ai) {
      try {
        const systemPrompt = `Anda adalah Guru Pakar Biologi dan Anatomi Sistem Gerak Rangka Manusia untuk siswa SMA/MA di Indonesia.
Gunakan Bahasa Indonesia yang edukatif, ilmiah, runtut, dan mudah dipahami siswa SMA/MA.
Sertakan istilah ilmiah/Latin jika relevan.
Fokus pada konsep biologi SMA seperti:
- Jenis tulang berdasarkan bentuk (pipa/panjang, pipih, pendek, tak beraturan, sesamoid) dan jaringan (kartilago vs osteon).
- Bagian-bagian tulang (diafisis, epifisis, cakra epifisis, periosteum, sistem Havers, sumsum merah/kuning).
- Persendian (sinartrosis, amfiartrosis, diartrosis seperti sendi peluru, engsel, putar, pelana, geser, elipsoid).
- Biomekanika gerak (otot sinergis & antagonis, fleksi, ekstensi, abduksi, adduksi, pronasi, supinasi, elevasi, depresi).
- Gangguan/penyakit rangka (fraktur, osteoporosis, rakitis, mikrosefalus, skoliosis, lordosis, kifosis, artritis).
- Soal-soal latihan UTBK/SNBT Biologi.

Konteks Tulang yang Sedang Dipelajari Siswa:
- Tulang: ${boneName || "Sistem Rangka Manusia"} (${boneLatin || "-"})
- Kelompok: ${group || "Sistem Rangka"}

Jawab secara terstruktur, ramah, dan berikan poin-poin jelas dengan format markdown yang rapi.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: question,
          config: {
            systemInstruction: systemPrompt,
          },
        });

        const answer = response.text || generateAnatomyFallback(boneName, boneLatin, group, question);
        return res.json({ answer });
      } catch (geminiError: any) {
        console.warn("Gemini API call failed, using intelligent anatomy fallback:", geminiError?.message);
        const fallbackAnswer = generateAnatomyFallback(boneName, boneLatin, group, question);
        return res.json({ answer: fallbackAnswer });
      }
    } else {
      // Offline / No API Key configured fallback
      const fallbackAnswer = generateAnatomyFallback(boneName, boneLatin, group, question);
      return res.json({ answer: fallbackAnswer });
    }
  } catch (error: any) {
    console.error("Error in ask-anatomy API:", error);
    const errorMessage = error?.message || "Terjadi kesalahan saat memproses permintaan AI.";
    return res.status(500).json({ error: errorMessage });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`3D Skeletal Explorer Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
