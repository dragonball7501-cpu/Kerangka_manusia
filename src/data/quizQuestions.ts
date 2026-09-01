import { QuizQuestion, RankTier } from "../types/quiz";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "Berapakah jumlah total tulang yang menyusun tubuh manusia dewasa normal?",
    options: [
      "180 tulang",
      "206 tulang",
      "256 tulang",
      "300 tulang"
    ],
    correctIndex: 1,
    explanation: "Tubuh manusia dewasa normal tersusun atas 206 tulang yang saling terhubung membentuk rangka pelindung dan penopang tubuh.",
    category: "Rangka Aksial",
    difficulty: "Mudah"
  },
  {
    id: "q2",
    question: "Manakah tulang terpanjang dan terkuat pada tubuh manusia?",
    options: [
      "Os Humerus (Tulang Lengan Atas)",
      "Os Femur (Tulang Paha)",
      "Os Tibia (Tulang Kering)",
      "Os Radius (Tulang Pengumpil)"
    ],
    correctIndex: 1,
    explanation: "Os Femur (tulang paha) adalah tulang terpanjang, terberat, dan terkuat di tubuh manusia yang menopang berat badan saat berdiri dan berjalan.",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "femur-r"
  },
  {
    id: "q3",
    question: "Tulang tengkorak yang berfungsi membungkus dan melindungi jaringan otak adalah...",
    options: [
      "Tempurung Kepala (Cranium)",
      "Tulang Belikat (Scapula)",
      "Tulang Selangka (Clavicula)",
      "Tulang Panggul (Pelvis)"
    ],
    correctIndex: 0,
    explanation: "Cranium (tempurung kepala) tersusun atas 8 tulang kranial yang membentuk kubah kokoh untuk melindungi otak dari cedera dan trauma fisik.",
    category: "Tengkorak & Wajah",
    difficulty: "Mudah",
    relatedBoneId: "cranium"
  },
  {
    id: "q4",
    question: "Satu-satunya tulang tengkorak yang dapat digerakkan secara bebas untuk mengunyah dan berbicara adalah...",
    options: [
      "Os Maxilla (Rahang Atas)",
      "Os Mandibula (Rahang Bawah)",
      "Os Nasale (Tulang Hidung)",
      "Os Frontale (Tulang Dahi)"
    ],
    correctIndex: 1,
    explanation: "Os Mandibula (rahang bawah) dihubungkan oleh sendi temporomandibular (TMJ) sehingga dapat digerakkan naik-turun dan maju-mundur saat mengunyah dan bicara.",
    category: "Tengkorak & Wajah",
    difficulty: "Mudah",
    relatedBoneId: "mandible"
  },
  {
    id: "q5",
    question: "Tulang pipih di bagian tengah dada yang melindungi jantung dan tempat melekatnya tulang rusuk sejati adalah...",
    options: [
      "Os Clavicula",
      "Os Sternum (Tulang Dada)",
      "Os Scapula",
      "Os Vertebrae"
    ],
    correctIndex: 1,
    explanation: "Os Sternum (tulang dada) berada di garis tengah dada, berbentuk menyerupai dasi pendek yang melindungi organ vital jantung dan paru-paru.",
    category: "Rangka Aksial",
    difficulty: "Mudah",
    relatedBoneId: "sternum"
  },
  {
    id: "q6",
    question: "Ruas tulang belakang bagian leher (Vertebrae Cervicales) pada manusia berjumlah...",
    options: [
      "5 ruas",
      "7 ruas",
      "12 ruas",
      "4 ruas"
    ],
    correctIndex: 1,
    explanation: "Ruas leher (Vertebrae Cervicales) berjumlah 7 ruas (C1-C7). Ruas pertama disebut Atlas dan ruas kedua disebut Axis yang memungkinkan kepala menggeleng.",
    category: "Rangka Aksial",
    difficulty: "Mudah",
    relatedBoneId: "vertebra-cervical"
  },
  {
    id: "q7",
    question: "Tulang tempurung lutut yang berfungsi melindungi persendian lutut disebut...",
    options: [
      "Os Patella",
      "Os Fibula",
      "Os Calcaneus",
      "Os Radius"
    ],
    correctIndex: 0,
    explanation: "Os Patella (tempurung lutut) adalah tulang berbentuk segitiga pipih (sesamoid) yang melindungi sendi lutut dan memperkuat daya ungkit otot paha.",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "patella-r"
  },
  {
    id: "q8",
    question: "Tulang pada lengan bawah yang posisinya sejajar dengan ibu jari (jempol) tangan adalah...",
    options: [
      "Os Radius (Tulang Pengumpil)",
      "Os Ulna (Tulang Hasta)",
      "Os Humerus (Tulang Lengan Atas)",
      "Os Femur (Tulang Paha)"
    ],
    correctIndex: 0,
    explanation: "Os Radius (tulang pengumpil) berada di sisi luar lengan bawah dan sejajar lurus dengan ibu jari (jempol).",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "radius-r"
  },
  {
    id: "q9",
    question: "Tulang pada lengan bawah yang posisinya sejajar dengan jari kelingking adalah...",
    options: [
      "Os Radius (Tulang Pengumpil)",
      "Os Ulna (Tulang Hasta)",
      "Os Clavicula (Tulang Selangka)",
      "Os Scapula (Tulang Belikat)"
    ],
    correctIndex: 1,
    explanation: "Os Ulna (tulang hasta) berada di sisi dalam lengan bawah sejajar dengan jari kelingking.",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "ulna-r"
  },
  {
    id: "q10",
    question: "Tulang tungkai bawah yang berukuran lebih besar dan berfungsi sebagai penopang beban utama (tulang kering) adalah...",
    options: [
      "Os Tibia (Tulang Kering)",
      "Os Fibula (Tulang Betis)",
      "Os Patella (Tempurung Lutut)",
      "Os Ulna (Tulang Hasta)"
    ],
    correctIndex: 0,
    explanation: "Os Tibia (tulang kering) adalah tulang besar di tungkai bawah bagian dalam yang menopang sebagian besar beban tubuh dari paha ke kaki.",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "tibia-r"
  },
  {
    id: "q11",
    question: "Tulang tungkai bawah yang lebih ramping dan terletak di sebelah luar tulang kering (tulang betis) adalah...",
    options: [
      "Os Tibia",
      "Os Fibula (Tulang Betis)",
      "Os Femur",
      "Os Humerus"
    ],
    correctIndex: 1,
    explanation: "Os Fibula (tulang betis) berukuran lebih ramping di sisi luar tungkai bawah, berfungsi sebagai tempat melekatnya otot betis dan penstabil pergelangan kaki.",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "fibula-r"
  },
  {
    id: "q12",
    question: "Tulang selangka (Clavicula) dan tulang belikat (Scapula) bersama-sama membentuk...",
    options: [
      "Gelang Bahu (Pectoral Girdle)",
      "Gelang Panggul (Pelvic Girdle)",
      "Sangkar Dada (Thorax)",
      "Ruas Tulang Belakang"
    ],
    correctIndex: 0,
    explanation: "Gelang Bahu (Pectoral Girdle) tersusun dari sepasang tulang selangka dan sepasang tulang belikat yang menghubungkan lengan atas ke rangka tubuh.",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "clavicle-r"
  },
  {
    id: "q13",
    question: "Berapa pasang jumlah tulang rusuk sejati (Costa Vera) yang menempel langsung ke tulang dada?",
    options: [
      "5 pasang",
      "7 pasang",
      "10 pasang",
      "12 pasang"
    ],
    correctIndex: 1,
    explanation: "Manusia memiliki 7 pasang tulang rusuk sejati (pasang ke-1 sampai 7) yang tulang rawannya menempel langsung ke tulang dada (sternum).",
    category: "Rangka Aksial",
    difficulty: "Mudah",
    relatedBoneId: "ribs-true"
  },
  {
    id: "q14",
    question: "Berapa pasang jumlah tulang rusuk melayang (Costa Fluctuantes) yang ujung depannya tidak menempel pada tulang dada?",
    options: [
      "1 pasang",
      "2 pasang",
      "3 pasang",
      "4 pasang"
    ],
    correctIndex: 1,
    explanation: "Tulang rusuk melayang berjumlah 2 pasang (pasang ke-11 dan 12) yang ujung depannya bebas dan tidak menempel ke sternum maupun rusuk lainnya.",
    category: "Rangka Aksial",
    difficulty: "Mudah",
    relatedBoneId: "ribs-floating"
  },
  {
    id: "q15",
    question: "Sendi pada siku dan lutut yang bekerja membuka dan menutup satu arah seperti engsel pintu disebut...",
    options: [
      "Sendi Peluru",
      "Sendi Engsel",
      "Sendi Putar",
      "Sendi Pelana"
    ],
    correctIndex: 1,
    explanation: "Sendi engsel memungkinkan gerakan satu arah (menekuk dan meluruskan), contohnya pada sendi siku dan sendi lutut.",
    category: "Persendian & Gerak",
    difficulty: "Mudah"
  },
  {
    id: "q16",
    question: "Sendi yang memungkinkan gerakan bebas ke segala arah (terdapat pada bahu dan panggul) disebut...",
    options: [
      "Sendi Peluru (Ball and Socket)",
      "Sendi Engsel",
      "Sendi Geser",
      "Sendi Kaku"
    ],
    correctIndex: 0,
    explanation: "Sendi peluru menghubungkan ujung tulang membulat ke mangkok sendi, menghasilkan ruang gerak paling leluasa ke segala arah (seperti sendi paha-panggul dan bahu-lengan).",
    category: "Persendian & Gerak",
    difficulty: "Mudah"
  },
  {
    id: "q17",
    question: "Tulang lengan atas yang memanjang dari bahu sampai siku disebut...",
    options: [
      "Os Humerus",
      "Os Femur",
      "Os Radius",
      "Os Ulna"
    ],
    correctIndex: 0,
    explanation: "Os Humerus adalah tulang tunggal yang membentuk lengan bagian atas, bersendi di atas dengan skapula dan di bawah dengan radius serta ulna.",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "humerus-r"
  },
  {
    id: "q18",
    question: "Tulang tumit yang merupakan tulang terbesar di pergelangan kaki manusia adalah...",
    options: [
      "Os Calcaneus",
      "Os Talus",
      "Os Naviculare",
      "Os Cuboid"
    ],
    correctIndex: 0,
    explanation: "Os Calcaneus (tulang tumit) adalah tulang pergelangan kaki terbesar yang menopang tumpuan kaki saat berjalan dan tempat melekatnya tendon Achilles.",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "tarsals-r"
  },
  {
    id: "q19",
    question: "Kelainan tulang belakang yang melengkung ke arah samping sehingga punggung tampak miring membentuk huruf S disebut...",
    options: [
      "Lordosis",
      "Kifosis",
      "Skoliosis",
      "Osteoporosis"
    ],
    correctIndex: 2,
    explanation: "Skoliosis adalah pembengkokan abnormal tulang belakang ke arah samping lateral, sering diakibatkan oleh kebiasaan posisi duduk miring yang berkepanjangan.",
    category: "Kelainan & Kesehatan Tulang",
    difficulty: "Mudah"
  },
  {
    id: "q20",
    question: "Kelainan tulang yang ditandai dengan penurunan kepadatan kalsium sehingga tulang menjadi keropos dan rapuh disebut...",
    options: [
      "Osteoporosis",
      "Rakitis",
      "Artritis",
      "Fraktura"
    ],
    correctIndex: 0,
    explanation: "Osteoporosis terjadi ketika massa dan kepadatan tulang menurun drastis sehingga struktur tulang keropos dan mudah mengalami patah tulang.",
    category: "Kelainan & Kesehatan Tulang",
    difficulty: "Mudah"
  },
  {
    id: "q21",
    question: "Tulang dahi yang berada di bagian depan tengkorak kepala disebut...",
    options: [
      "Os Frontale",
      "Os Parietale",
      "Os Occipitale",
      "Os Temporale"
    ],
    correctIndex: 0,
    explanation: "Os Frontale (tulang dahi) membentuk kening bagian depan kepala dan atap rongga mata.",
    category: "Tengkorak & Wajah",
    difficulty: "Mudah",
    relatedBoneId: "cranium"
  },
  {
    id: "q22",
    question: "Tulang telapak tangan dalam istilah biologi anatomi dinamakan...",
    options: [
      "Karpal (Carpals)",
      "Metakarpal (Metacarpals)",
      "Tarsal (Tarsals)",
      "Falang (Phalanges)"
    ],
    correctIndex: 1,
    explanation: "Metakarpal adalah 5 batang tulang pipa mini yang membentuk telapak tangan, terletak di antara pergelangan tangan (karpal) dan jari-jari (falang).",
    category: "Rangka Apendikular",
    difficulty: "Mudah",
    relatedBoneId: "metacarpals-r"
  },
  {
    id: "q23",
    question: "Ruas tulang belakang bagian pinggang (Vertebrae Lumbales) yang memiliki badan tulang paling tebal berjumlah...",
    options: [
      "3 ruas",
      "5 ruas",
      "7 ruas",
      "12 ruas"
    ],
    correctIndex: 1,
    explanation: "Ruas pinggang (Vertebrae Lumbales) berjumlah 5 ruas (L1-L5) dengan struktur tulang paling tebal dan kokoh karena menahan bobot tubuh bagian atas.",
    category: "Rangka Aksial",
    difficulty: "Mudah",
    relatedBoneId: "vertebra-lumbar"
  },
  {
    id: "q24",
    question: "Persendian antartulang tengkorak yang saling mengunci rapat dan tidak dapat digerakkan sama sekali disebut sendi...",
    options: [
      "Sinartrosis (Sendi Mati)",
      "Amfiartrosis (Sendi Kaku)",
      "Diartrosis (Sendi Gerak)",
      "Sinovial"
    ],
    correctIndex: 0,
    explanation: "Sinartrosis (sendi mati) adalah hubungan antartulang yang disatukan jaringan fibrosa rapat tanpa celah gerak, seperti sutura pada tengkorak kepala.",
    category: "Persendian & Gerak",
    difficulty: "Mudah"
  },
  {
    id: "q25",
    question: "Fungsi utama sumsum tulang merah yang berada di dalam rongga tulang spons adalah...",
    options: [
      "Membentuk sel-sel darah (Hematopoiesis)",
      "Menyimpan cadangan lemak",
      "Menghasilkan hormon insulin",
      "Menyaring udara pernapasan"
    ],
    correctIndex: 0,
    explanation: "Sumsum tulang merah memproduksi sel darah merah (eritrosit), sel darah putih (leukosit), dan keping darah (trombosit) melalui proses hematopoiesis.",
    category: "Kelainan & Kesehatan Tulang",
    difficulty: "Mudah"
  }
];

export function calculateRankTier(score: number, accuracyPercent: number): RankTier {
  if (score >= 1000 && accuracyPercent === 100) return "Grandmaster Anatomi 👑";
  if (score >= 800) return "Dokter Spesialis Rangka 🏆";
  if (score >= 600) return "Ahli Osteologi 🥇";
  if (score >= 450) return "Peneliti Biologi 🥈";
  if (score >= 300) return "Calon Dokter 🥉";
  if (score >= 150) return "Siswa Berprestasi ⭐";
  return "Pembelajar Anatomi 📚";
}

