import express from "express";
import path from "path";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
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

// AI Anatomy Mentor & Question Endpoint
app.post("/api/gemini/ask-anatomy", async (req, res) => {
  try {
    const { boneName, boneLatin, group, question } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Pertanyaan diperlukan." });
    }

    const ai = getAIClient();

    const systemPrompt = `Anda adalah Guru Pakar Biologi dan Anatomi Sistem Gerak Rangka Manusia untuk siswa SMA/MA di Indonesia.
Gunakan Bahasa Indonesia yang edukatif, ilmiah namun mudah dipahami siswa SMA/MA.
Sertakan istilah ilmiah/Latin jika relevan.
Fokus pada konsep biologi SMA seperti:
- Jenis tulang berdasarkan bentuk (pipa/panjang, pipih, pendek, tak beraturan, sesamoid) dan jaringan (tulang rawan/kartilago vs tulang keras/osteon).
- Bagian-bagian tulang (diafisis, epifisis, cakra epifisis, periosteum, sumsum merah/kuning).
- Persendian (sinartrosis/sendi mati, amfiartrosis/sendi kaku, diartrosis/sendi gerak seperti peluru, engsel, putar, pelana, geser, elipsoid).
- Hubungan antartulang dan biomekanika gerak (otot sinergis & antagonis, fleksi, ekstensi, abduksi, adduksi, pronasi, supinasi).
- Gangguan/penyakit sistem rangka (fraktur, fisura, osteoporosis, rakitis, mikrosefalus, skoliosis, lordosis, kifosis, artritis).
- Tips mudah mengingat untuk ujian/SNBT.

Konteks Tulang yang Sedang Dipelajari Siswa:
- Tulang: ${boneName || "Sistem Rangka Manusia"} (${boneLatin || "-"})
- Kelompok: ${group || "Sistem Rangka"}

Jawab secara terstruktur, ramah, dan berikan poin-poin jelas dengan format markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: question,
      config: {
        systemInstruction: systemPrompt,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    const answer = response.text || "Tidak ada jawaban yang dihasilkan.";
    return res.json({ answer });
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
