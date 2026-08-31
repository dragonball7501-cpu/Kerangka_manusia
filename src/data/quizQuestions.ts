import { QuizQuestion, RankTier } from "../types/quiz";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "Manakah tulang terpanjang dan terkuat pada tubuh manusia?",
    options: [
      "Os Humerus (Tulang Lengan Atas)",
      "Os Femur (Tulang Paha)",
      "Os Tibia (Tulang Kering)",
      "Os Radius (Tulang Pengumpil)"
    ],
    correctIndex: 1,
    explanation: "Os Femur (tulang paha) adalah tulang terpanjang, terberat, dan terkuat pada tubuh manusia yang menopang sebagian besar bobot tubuh saat berdiri dan berjalan.",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "femur-r"
  },
  {
    id: "q2",
    question: "Berapakah jumlah total tulang yang menyusun tubuh manusia dewasa normal?",
    options: [
      "180 tulang",
      "206 tulang",
      "256 tulang",
      "300 tulang"
    ],
    correctIndex: 1,
    explanation: "Tubuh manusia dewasa memiliki sekitar 206 tulang setelah beberapa tulang yang terpisah saat bayi mengalami fusi/penyatuan seiring bertambahnya usia.",
    category: "Rangka Aksial",
    difficulty: "Mudah"
  },
  {
    id: "q3",
    question: "Tulang pipih di bagian tengah dada yang berfungsi melindungi jantung dan tempat melekatnya tulang rusuk sejati adalah...",
    options: [
      "Os Clavicula",
      "Os Sternum",
      "Os Scapula",
      "Os Vertebrae"
    ],
    correctIndex: 1,
    explanation: "Os Sternum (tulang dada) berbentuk seperti dasi pendek di garis tengah dada, terdiri dari Manubrium, Korpus, dan Prosessus Xiphoideus.",
    category: "Rangka Aksial",
    difficulty: "Mudah",
    relatedBoneId: "sternum"
  },
  {
    id: "q4",
    question: "Ruas tulang belakang bagian leher pada manusia berjumlah...",
    options: [
      "5 ruas (Vertebrae Lumbales)",
      "7 ruas (Vertebrae Cervicales)",
      "12 ruas (Vertebrae Thoracicae)",
      "4 ruas (Vertebrae Coccygis)"
    ],
    correctIndex: 1,
    explanation: "Ruas leher (Vertebrae Cervicales) berjumlah 7 ruas (C1-C7). Ruas pertama disebut Atlas dan ruas kedua disebut Axis yang memungkinkan rotasi kepala.",
    category: "Rangka Aksial",
    difficulty: "Mudah",
    relatedBoneId: "vertebra-cervical"
  },
  {
    id: "q5",
    question: "Sendi peluru (Ball and Socket Joint) yang memungkinkan gerakan ke segala arah dapat ditemukan pada...",
    options: [
      "Sendi siku (Humerus dan Ulna)",
      "Sendi lutut (Femur dan Tibia)",
      "Sendi panggul (Femur dan Pelvis) serta sendi bahu (Humerus dan Scapula)",
      "Sendi antartulang tengkorak (Sutura)"
    ],
    correctIndex: 2,
    explanation: "Sendi peluru memiliki ujung berbentuk bulat yang masuk ke dalam mangkok sendi, terdapat pada artikulasio humeri (gelang bahu) dan artikulasio coxae (gelang panggul).",
    category: "Persendian & Gerak",
    difficulty: "Sedang",
    relatedBoneId: "femur-r"
  },
  {
    id: "q6",
    question: "Tulang dahi pada tengkorak kepala manusia disebut dengan nama latin...",
    options: [
      "Os Occipitale",
      "Os Frontale",
      "Os Parietale",
      "Os Temporale"
    ],
    correctIndex: 1,
    explanation: "Os Frontale membentuk dahi dan bagian atas rongga mata (orbita), melindungi lobus frontal otak besar.",
    category: "Tengkorak & Wajah",
    difficulty: "Mudah",
    relatedBoneId: "cranium-frontal"
  },
  {
    id: "q7",
    question: "Penyakit penurunan massa dan kepadatan tulang yang menyebabkan tulang menjadi rapuh dan mudah patah disebut...",
    options: [
      "Skoliosis",
      "Osteoporosis",
      "Lordosis",
      "Rakitis"
    ],
    correctIndex: 1,
    explanation: "Osteoporosis ditandai dengan berkurangnya matriks tulang dan kalsium, umumnya dipengaruhi oleh faktor penuaan, hormon estrogen, dan defisiensi kalsium/vitamin D.",
    category: "Kelainan & Kesehatan Tulang",
    difficulty: "Mudah"
  },
  {
    id: "q8",
    question: "Tulang pengumpil (Radius) pada lengan bawah terletak sejajar dengan...",
    options: [
      "Jari kelingking",
      "Ibu jari (Jempol)",
      "Jari tengah",
      "Jari manis"
    ],
    correctIndex: 1,
    explanation: "Pada posisi anatomi, Os Radius (tulang pengumpil) berada di sisi lateral sejajar dengan ibu jari, sedangkan Os Ulna (tulang hasta) berada di sisi medial sejajar kelingking.",
    category: "Rangka Apendikular",
    difficulty: "Sedang",
    relatedBoneId: "radius-r"
  },
  {
    id: "q9",
    question: "Berapa pasang tulang rusuk melayang (Costa fluctuantes) pada tubuh manusia?",
    options: [
      "7 pasang",
      "3 pasang",
      "2 pasang",
      "12 pasang"
    ],
    correctIndex: 2,
    explanation: "Manusia memiliki 12 pasang rusuk: 7 pasang rusuk sejati (costa vera), 3 pasang rusuk palsu (costa spuria), dan 2 pasang rusuk melayang (costa fluctuantes, pasang ke-11 & 12).",
    category: "Rangka Aksial",
    difficulty: "Sedang",
    relatedBoneId: "ribs-cage"
  },
  {
    id: "q10",
    question: "Kelainan tulang belakang yang melengkung secara abnormal ke arah samping membentuk huruf 'S' atau 'C' disebut...",
    options: [
      "Kifosis",
      "Lordosis",
      "Skoliosis",
      "Fraktura"
    ],
    correctIndex: 2,
    explanation: "Skoliosis adalah pembengkokan tulang punggung ke arah samping lateral yang sering disebabkan oleh posisi duduk salah yang berkepanjangan atau kelainan bawaan.",
    category: "Kelainan & Kesehatan Tulang",
    difficulty: "Mudah"
  },
  {
    id: "q11",
    question: "Tulang telapak tangan dalam terminologi anatomi disebut...",
    options: [
      "Ossa Carpalia",
      "Ossa Metacarpalia",
      "Ossa Phalanges",
      "Ossa Tarsalia"
    ],
    correctIndex: 1,
    explanation: "Telapak tangan tersusun atas 5 Ossa Metacarpalia, sedangkan pergelangan tangan tersusun atas 8 Ossa Carpalia.",
    category: "Rangka Apendikular",
    difficulty: "Sedang",
    relatedBoneId: "metacarpals-r"
  },
  {
    id: "q12",
    question: "Satu-satunya tulang pada tengkorak kepala yang dapat bergerak bebas adalah...",
    options: [
      "Os Maxilla (Rahang Atas)",
      "Os Mandibula (Rahang Bawah)",
      "Os Zygomaticum (Tulang Pipi)",
      "Os Nasale (Tulang Hidung)"
    ],
    correctIndex: 1,
    explanation: "Os Mandibula (rahang bawah) dihubungkan oleh sendi temporomandibular (TMJ) sehingga dapat bergerak untuk mengunyah, menelan, dan berbicara.",
    category: "Tengkorak & Wajah",
    difficulty: "Mudah",
    relatedBoneId: "cranium-mandible"
  },
  {
    id: "q13",
    question: "Tulang tempurung lutut yang bertipe tulang sesamoid terbesar pada tubuh adalah...",
    options: [
      "Os Patella",
      "Os Fibula",
      "Os Calcaneus",
      "Os Talus"
    ],
    correctIndex: 0,
    explanation: "Os Patella (tempurung lutut) adalah tulang sesamoid yang berkembang di dalam tendon otot quadriceps femoris untuk melindungi sendi lutut dan meningkatkan efisiensi tarikan otot.",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "patella-r"
  },
  {
    id: "q14",
    question: "Tulang selangka (Clavicula) dan tulang belikat (Scapula) bersama-sama membentuk gelang...",
    options: [
      "Gelang panggul (Pelvic Girdle)",
      "Gelang bahu (Pectoral Girdle)",
      "Rangka aksial",
      "Sangkar dada (Thoracic Cage)"
    ],
    correctIndex: 1,
    explanation: "Gelang bahu (Pectoral Girdle) tersusun atas sepasang tulang selangka (Clavicula) dan sepasang tulang belikat (Scapula) yang menghubungkan lengan atas dengan rangka aksial.",
    category: "Rangka Apendikular",
    difficulty: "Sedang",
    relatedBoneId: "clavicle-r"
  },
  {
    id: "q15",
    question: "Tulang tumit yang merupakan tulang terbesar di area pergelangan kaki disebut...",
    options: [
      "Os Talus",
      "Os Naviculare",
      "Os Calcaneus",
      "Os Cuboideum"
    ],
    correctIndex: 2,
    explanation: "Os Calcaneus (tulang tumit) adalah tulang tarsal terbesar yang menerima beban berat tubuh saat menginjak dan tempat melekatnya tendo Achilles.",
    category: "Rangka Apendikular",
    difficulty: "Tantangan",
    relatedBoneId: "tarsals-r"
  },
  {
    id: "q16",
    question: "Tipe hubungan antartulang tengkorak (sutura) yang tidak memungkinkan adanya gerakan sama sekali diklasifikasikan sebagai sendi...",
    options: [
      "Diartrosis (Sendi Gerak)",
      "Amfiartrosis (Sendi Kaku)",
      "Sinartrosis (Sendi Mati)",
      "Sinovial"
    ],
    correctIndex: 2,
    explanation: "Sinartrosis adalah persendian yang dihubungkan oleh jaringan ikat fibrosa kuat sehingga tidak memungkinkan gerakan, seperti sutura pada tulang-tulang tengkorak.",
    category: "Persendian & Gerak",
    difficulty: "Sedang"
  },
  {
    id: "q17",
    question: "Sumsum tulang merah (Red Bone Marrow) yang terdapat di dalam tulang spons berfungsi utama untuk...",
    options: [
      "Menyimpan lemak cadangan",
      "Hematopoiesis (Pembentukan sel-sel darah)",
      "Menghasilkan hormon insulin",
      "Menyerap glukosa darah"
    ],
    correctIndex: 1,
    explanation: "Hematopoiesis adalah proses pembentukan sel darah merah (eritrosit), sel darah putih (leukosit), dan keping darah (trombosit) di dalam sumsum tulang merah.",
    category: "Kelainan & Kesehatan Tulang",
    difficulty: "Sedang"
  },
  {
    id: "q18",
    question: "Sendi engsel (Hinge Joint) yang memungkinkan gerakan 1 arah (fleksi dan ekstensi) contohnya terdapat pada...",
    options: [
      "Sendi ibu jari tangan (pelana)",
      "Sendi siku dan sendi lutut",
      "Sendi atlas-axis leher (putar)",
      "Sendi pergelangan tangan (luncur)"
    ],
    correctIndex: 1,
    explanation: "Sendi siku (artikulasio cubiti) dan sendi lutut (artikulasio genus) bekerja seperti engsel pintu yang memungkinkan gerakan menekuk (fleksi) dan meluruskan (ekstensi).",
    category: "Persendian & Gerak",
    difficulty: "Mudah",
    relatedBoneId: "ulna-r"
  },
  {
    id: "q19",
    question: "Tulang betis yang berada di sisi lateral tungkai bawah dan berukuran lebih ramping dari tulang kering disebut...",
    options: [
      "Os Tibia",
      "Os Fibula",
      "Os Femur",
      "Os Patella"
    ],
    correctIndex: 1,
    explanation: "Os Fibula (tulang betis) berada di lateral tungkai bawah, berfungsi sebagai tempat perlekatan otot dan penstabil sendi pergelangan kaki.",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "fibula-r"
  },
  {
    id: "q20",
    question: "Tulang pembentuk dasar dan bagian belakang tengkorak yang memiliki lubang besar (Foramen Magnum) adalah...",
    options: [
      "Os Frontale",
      "Os Occipitale",
      "Os Parietale",
      "Os Sphenoidale"
    ],
    correctIndex: 1,
    explanation: "Os Occipitale berada di belakang kepala. Foramen Magnum pada tulang ini merupakan lubang tempat lewatnya medula oblongata menghubungkan otak dengan medula spinalis.",
    category: "Tengkorak & Wajah",
    difficulty: "Tantangan",
    relatedBoneId: "cranium-occipital"
  }
];

export function calculateRankTier(score: number, accuracyPercent: number): RankTier {
  if (score >= 1200 && accuracyPercent === 100) return "Grandmaster Anatomi 👑";
  if (score >= 900) return "Dokter Spesialis Rangka 🏆";
  if (score >= 700) return "Ahli Osteologi 🥇";
  if (score >= 500) return "Peneliti Biologi 🥈";
  if (score >= 350) return "Calon Dokter 🥉";
  if (score >= 200) return "Siswa Berprestasi ⭐";
  return "Pembelajar Anatomi 📚";
}
