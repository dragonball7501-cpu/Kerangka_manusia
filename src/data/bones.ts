import { BoneData } from "../types/bone";

export const BONES_DATA: BoneData[] = [
  // ================= SKULL / TENGKORAK =================
  {
    id: "cranium",
    commonName: "Tempurung Kepala",
    latinName: "Cranium / Neurocranium",
    group: "skull",
    division: "axial",
    shapeType: "Tulang Pipih",
    countDescription: "8 tulang kranial yang saling bertaut (Frontal, 2 Parietal, Occipital, 2 Temporal, Sphenoid, Ethmoid)",
    location: "Bagian superior tengkorak",
    summary: "Kubah tulang kokoh yang membungkus dan melindungi jaringan otak serta meninges dari trauma fisik.",
    functions: [
      "Melindungi otak besar (serebrum), otak kecil (serebelum), dan batang otak",
      "Memberikan tempat perlekatan bagi otot-otot kepala dan leher",
      "Menyediakan foramen magnum sebagai jalur keluar-masuk medula spinalis",
      "Mempertahankan rongga intrakranial dengan volume dan tekanan yang stabil",
    ],
    anatomyFacts: [
      "Tulang-tulang kranium disatukan oleh persendian mati bergerigi yang disebut sutura (Sutura Koronalis, Sagitalis, Lambdoidea, dan Skuamosa).",
      "Pada bayi baru lahir, terdapat celah membran lunak antartulang yang dinamakan fontanela (ubun-ubun), memungkinkan kompresi saat kelahiran dan ekspansi cepat volume otak.",
      "Tulang sfenoid berbentuk seperti sayap kupu-kupu dan menjadi pasak penyatu yang mengunci hampir seluruh tulang kranium.",
    ],
    characteristics: [
      "Terdiri dari dua lempeng tulang kompakta (tabula eksterna dan interna) yang mengapit lapisan tulang spons berisi sumsum (diploe)",
      "Struktur melengkung kubah memberikan kekuatan mekanik tinggi untuk mendistribusikan gaya impak",
      "Memiliki impresi sulkus vaskular pada permukaan dalam untuk arteri meningea",
    ],
    articulations: [
      {
        jointName: "Sutura Kranialis (Sinartrosis Sinfibrosis)",
        connectedTo: "Antara lempeng tulang kranial dan tulang fasial",
        movementType: "Tidak dapat digerakkan sama sekali (sendi mati)",
      },
      {
        jointName: "Articulatio Atlantooccipitalis (Sendi Elipsoid)",
        connectedTo: "Kondilus oksipitalis bertaut dengan Facies articularis superior Atlas (C1)",
        movementType: "Gerakan mengangguk 'ya' (fleksi-ekstensi kepala)",
      },
    ],
    clinicalNotes: [
      "Fraktur basis kranii dapat menyebabkan kebocoran cairan serebrospinal (CSF) melalui hidung atau telinga.",
      "Kraniosinostosis adalah penutupan prematur sutura pada bayi yang membatasi pertumbuhan otak.",
    ],
    model: {
      meshName: "Cranium",
      focusPoint: [0, 2.38, 0],
      preferredDistance: 1.0,
      labelPosition: [0, 2.5, 0.2],
    },
  },
  {
    id: "facial-bones",
    commonName: "Tulang Wajah",
    latinName: "Ossa Faciei / Viscerocranium",
    group: "skull",
    division: "axial",
    shapeType: "Tulang Tak Beraturan",
    countDescription: "14 tulang (2 Maksila, 2 Zigomatikum, 2 Nasal, 2 Lakrimal, 2 Palatina, 2 Konka Nasalis Inferior, 1 Vomer)",
    location: "Bagian anterior-inferior tengkorak",
    summary: "Rangkaian tulang yang membentuk fitur wajah, rongga mata (orbita), rongga hidung, dan palatum mulut.",
    functions: [
      "Membentuk rongga mata (orbita) untuk bola mata dan apparatus lakrimal",
      "Membentuk kavitas hidung untuk penyaringan, penghangatan, dan penciuman udara",
      "Memegang gigi rahang atas (arkus alveolaris maksila)",
      "Tempat perlekatan otot-otot ekspresi wajah dan pengunyahan",
    ],
    anatomyFacts: [
      "Maksila memiliki rongga sinus paranasalis terbesar (Sinus Maksilaris) yang meringankan berat kepala dan memberi resonansi suara.",
      "Tulang zigomatikum membentuk tonjolan pipi yang menyatu dengan prosesus temporalis membentuk arkus zigomatikus.",
    ],
    characteristics: [
      "Bentuk bervariasi dari lempeng tipis (nasal, lakrimal) hingga kuboid berongga (maksila)",
      "Dilengkapi foramen (lubang) halus untuk keluarnya cabang-cabang Nervus Trigeminus (CN V)",
    ],
    articulations: [
      {
        jointName: "Sutura Fasialis (Sinartrosis)",
        connectedTo: "Bertaut erat dengan tulang kranial frontal, etmoid, dan sfenoid",
        movementType: "Sendi mati tanpa pergerakan",
      },
    ],
    clinicalNotes: [
      "Sinusitis sering terjadi pada sinus maksilaris akibat infeksi saluran pernapasan atas.",
      "Deviasi septum nasi terjadi ketika tulang vomer dan kartilago hidung bengkok, mengganggu aliran udara.",
    ],
    model: {
      meshName: "FacialBones",
      focusPoint: [0, 2.25, 0.2],
      preferredDistance: 0.95,
      labelPosition: [0, 2.3, 0.35],
    },
  },
  {
    id: "mandible",
    commonName: "Rahang Bawah",
    latinName: "Mandibula",
    group: "skull",
    division: "axial",
    shapeType: "Tulang Tak Beraturan",
    countDescription: "1 tulang tunggal berbentuk tapal kuda",
    location: "Bagian paling inferior pada tengkorak wajah",
    summary: "Satu-satunya tulang pada tengkorak yang dapat bergerak bebas, esensial untuk proses mastikasi (mengunyah) dan berbicara.",
    functions: [
      "Menopang arkus alveolaris bawah yang memegang 16 gigi permanen bawah",
      "Memungkinkan proses mastikasi makanan melalui gerak elevasi, depresi, protraksi, dan retraksi",
      "Tempat insersi otot pengunyah kuat (M. Masseter, M. Temporalis, M. Pterygoideus)",
      "Membantu artikulasi fonetik dalam pembentukan suara bahasa",
    ],
    anatomyFacts: [
      "Mandibula adalah tulang terbesar, terkuat, dan terpadat di seluruh area kepala.",
      "Kondilus mandibula berartikulasi dengan fossa mandibularis os temporale membentuk Sendi Temporomandibular (TMJ).",
    ],
    characteristics: [
      "Memiliki Korpus (badan melengkung) dan dua Ramus tegak yang membentuk Angulus Mandibulae (sudut rahang)",
      "Terdapat Foramen Mentale di kanan-kiri dagu tempat keluarnya pembuluh darah dan saraf mentalis",
    ],
    articulations: [
      {
        jointName: "Articulatio Temporomandibularis / TMJ (Sendi Modifikasi Sinovial Ginglymoarthrodial)",
        connectedTo: "Fossa mandibularis dan tuberkulum artikulare os temporale",
        movementType: "Kombinasi gerak engsel (buka-tutup) dan gerak geser/luncur (maju-mundur & lateral)",
      },
    ],
    clinicalNotes: [
      "Dislokasi TMJ terjadi ketika kondilus melompat ke depan tuberkulum artikular saat menguap terlalu lebar.",
      "Fraktur simfisis mandibula sering terjadi akibat trauma benturan langsung pada dagu.",
    ],
    model: {
      meshName: "Mandible",
      focusPoint: [0, 2.12, 0.18],
      preferredDistance: 0.85,
      labelPosition: [0, 2.12, 0.35],
    },
  },

  // ================= VERTEBRAL COLUMN / TULANG BELAKANG =================
  {
    id: "cervical-vertebrae",
    commonName: "Tulang Leher",
    latinName: "Vertebrae Cervicales (C1 - C7)",
    group: "vertebral-column",
    division: "axial",
    shapeType: "Tulang Tak Beraturan",
    countDescription: "7 ruas vertebra leher (C1: Atlas, C2: Axis, C3–C7)",
    location: "Regio servikalis antara kranium dan toraks",
    summary: "Ruas-ruas tulang leher dengan mobilitas tertinggi yang menopang kepala dan melindungi medula spinalis leher.",
    functions: [
      "Menyangga kepala (bobot 4.5–5.5 kg) dengan stabilitas dan fleksibilitas optimal",
      "Memberikan rentang rotasi, fleksi, ekstensi, dan fleksi lateral leher yang luas",
      "Melindungi serabut saraf spinalis dan jalur pembuluh darah arteri vertebralis menuju otak",
    ],
    anatomyFacts: [
      "C1 (Atlas) tidak memiliki korpus tulang dan berbentuk cincin; dinamai dari tokoh mitologi Yunani yang memikul bola bumi.",
      "C2 (Axis) memiliki tonjolan vertikal seperti pasak yang disebut Dens (Prosesus Odontoideus) yang menjadi poros rotasi kepala menggeleng 'tidak'.",
      "C7 (Vertebra Prominens) memiliki prosesus spinosus panjang yang mudah teraba di pangkal leher belakang.",
    ],
    characteristics: [
      "Memiliki Foramen Transversarium pada tiap prosesus transversus untuk dilewati A. Vertebralis",
      "Prosesus spinosus pada C2–C6 umumnya bercabang dua (bifid)",
      "Korpus berukuran relatif kecil dibandingkan vertebra torakal dan lumbal",
    ],
    articulations: [
      {
        jointName: "Articulatio Atlantoaxialis (Sendi Putar / Trochoid)",
        connectedTo: "Dens axis (C2) dengan fovea dentis atlas (C1)",
        movementType: "Rotasi kepala ke kiri dan kanan menggeleng 'tidak' (sekitar 50°)",
      },
      {
        jointName: "Diskus Intervertebralis (Amfiartrosis Simfisis)",
        connectedTo: "Antara korpus C2 hingga C7",
        movementType: "Fleksi, ekstensi, dan lentur ringan teredam bantalan fibrokartilago",
      },
    ],
    clinicalNotes: [
      "Whiplash injury: cedera hiperekstensi-hiperfleksi leher mendadak akibat tabrakan kendaraan.",
      "Hernia Nukleus Pulposus (HNP) servikal dapat menekan saraf radiks servikalis menyebabkan nyeri menjalar ke bahu dan lengan.",
    ],
    model: {
      meshName: "CervicalVertebrae",
      focusPoint: [0, 1.95, -0.05],
      preferredDistance: 0.9,
      labelPosition: [0, 1.95, 0.25],
    },
  },
  {
    id: "thoracic-vertebrae",
    commonName: "Tulang Punggung",
    latinName: "Vertebrae Thoracicae (T1 - T12)",
    group: "vertebral-column",
    division: "axial",
    shapeType: "Tulang Tak Beraturan",
    countDescription: "12 ruas vertebra punggung yang berartikulasi dengan 12 pasang tulang rusuk",
    location: "Regio posterior rongga toraks / dada",
    summary: "Segmen tulang belakang bagian tengah yang membentuk dinding belakang sangkar dada dan tempat melekatnya seluruh tulang rusuk.",
    functions: [
      "Membentuk jangkar persendian kokoh untuk 12 pasang iga (rusuk)",
      "Melindungi medula spinalis segmen torakalis",
      "Membatasi hiperekstensi tulang belakang demi melindungi jantung dan paru-paru",
    ],
    anatomyFacts: [
      "Satu-satunya kelompok vertebra yang memiliki fovea kostalis (faset artikular rusuk) pada korpus dan prosesus transversusnya.",
      "Prosesus spinosusnya berbentuk panjang miring ke bawah seperti genteng, membatasi gerakan membungkuk ke belakang berlebihan.",
    ],
    characteristics: [
      "Korpus berbentuk seperti jantung (heart-shaped) pada potongan aksial",
      "Foramen vertebrale berbentuk bulat dan relatif lebih kecil dari segmen servikal/lumbal",
    ],
    articulations: [
      {
        jointName: "Articulatio Costovertebralis & Costotransversaria (Sendi Geser Sinovial)",
        connectedTo: "Kaput dan tuberkulum iga (rusuk)",
        movementType: "Gerak meluncur halus mengikuti irama ekspansi kembang kempis dada saat bernapas",
      },
    ],
    clinicalNotes: [
      "Kifosis (Hyperkyphosis) adalah kelainan lengkung tulang punggung yang terlalu membungkuk ke belakang.",
      "Skoliosis sering berkembang pada segmen torakal dengan deviasi lengkung lateral membentuk kurva 'S' atau 'C'.",
    ],
    model: {
      meshName: "ThoracicVertebrae",
      focusPoint: [0, 1.45, -0.08],
      preferredDistance: 1.3,
      labelPosition: [0, 1.45, -0.25],
    },
  },
  {
    id: "lumbar-vertebrae",
    commonName: "Tulang Pinggang",
    latinName: "Vertebrae Lumbales (L1 - L5)",
    group: "vertebral-column",
    division: "axial",
    shapeType: "Tulang Tak Beraturan",
    countDescription: "5 ruas vertebra masif penopang beban tubuh atas",
    location: "Regio lumbalis antara rongga dada dan panggul",
    summary: "Ruas tulang belakang terbesar dan tertebal yang memikul seluruh berat badan tubuh bagian atas.",
    functions: [
      "Menopang mayoritas berat tubuh saat berdiri, duduk, mengangkat beban, dan berjalan",
      "Memberikan fleksibilitas fleksi (membungkuk ke depan) dan ekstensi punggung bawah",
      "Menjadi titik anchor bagi otot erector spinae, iliopsoas, dan kuadratus lumborum",
    ],
    anatomyFacts: [
      "Korpus vertebra lumbal berbentuk menyerupai ginjal (kidney-shaped) dengan ukuran paling masif.",
      "Medula spinalis berakhir setinggi L1-L2 (Konus Medularis), di bawahnya berlanjut sebagai kumpulan serabut saraf Kauda Ekuina (ekor kuda).",
      "Prosedur pungsi lumbal (lumbar puncture) untuk mengambil cairan serebrospinal aman dilakukan di sela L3-L4 atau L4-L5.",
    ],
    characteristics: [
      "Prosesus spinosus tebal, tumpul, dan mengarah horizontal ke belakang seperti kapak",
      "Pedikel dan lamina sangat kokoh untuk menahan tekanan kompresi aksial tinggi",
    ],
    articulations: [
      {
        jointName: "Diskus Intervertebralis L1–L5 & L5–S1 (Amfiartrosis)",
        connectedTo: "Antara lempeng ujung vertebra lumbar dan sakrum",
        movementType: "Fleksi dan ekstensi utama punggung; rotasi sangat terbatas",
      },
    ],
    clinicalNotes: [
      "Lordosis adalah kelainan kelengkungan lumbal yang melengkung berlebihan ke depan.",
      "Hernia Nukleus Pulposus (HNP L4-L5 / L5-S1) sering memicu skiatika (nyeri saraf kejepit menjalar ke bokong hingga telapak kaki).",
    ],
    model: {
      meshName: "LumbarVertebrae",
      focusPoint: [0, 0.95, -0.06],
      preferredDistance: 1.1,
      labelPosition: [0, 0.95, -0.2],
    },
  },
  {
    id: "sacrum",
    commonName: "Tulang Kelangkang",
    latinName: "Os Sacrum",
    group: "vertebral-column",
    division: "axial",
    shapeType: "Tulang Tak Beraturan / Pipih",
    countDescription: "1 tulang masif berbentuk baji (hasil fusi 5 ruas vertebra S1 - S5)",
    location: "Bagian posterior panggul, di antara kedua tulang usus (ilium)",
    summary: "Tulang segitiga masif yang menjadi pilar transmisi beban tubuh dari kolumna vertebralis ke sabuk panggul dan tungkai.",
    functions: [
      "Mentransmisikan beban aksial tubuh dari L5 menuju kedua tulang koksa (ilium)",
      "Membentuk dinding posterior rongga pelvis yang kokoh dan melindungi organ panggul",
      "Tempat perlekatan otot-otot gluteus maksimus dan piriformis",
    ],
    anatomyFacts: [
      "Kata 'Sacrum' berasal dari bahasa Latin 'Os Sacrum' yang bermakna 'tulang suci / sakral'.",
      "Memiliki Foramina Sacralia anterior dan posterior sebagai jalur keluarnya pleksus sakralis (saraf skiatik).",
    ],
    characteristics: [
      "Basis sakralis menghadap ke kranial dengan tonjolan anterior Promontorium Sakralis",
      "Facies auricularis di sisi lateral membentuk persendian dengan tulang ilium panggul",
    ],
    articulations: [
      {
        jointName: "Articulatio Sacroiliaca / SI Joint (Sendi Sinovial Planar Diartro-Amfiartrosis)",
        connectedTo: "Facies auricularis os ilium kanan dan kiri",
        movementType: "Nutasi dan kontra-nutasi (gerak mikro penggeseran beberapa milimeter saat melahirkan dan berjalan)",
      },
      {
        jointName: "Articulatio Lumbosacralis",
        connectedTo: "Diskus intervertebralis L5-S1",
        movementType: "Distribusi beban dan fleksi-ekstensi lumbosakral",
      },
    ],
    clinicalNotes: [
      "Sakroiliitis: inflamasi pada sendi sakroiliaka yang sering terkait dengan ankylosing spondylitis.",
      "Promontorium sakralis merupakan penanda anatomis penting dalam obstetri untuk mengukur diameter panggul jalan lahir.",
    ],
    model: {
      meshName: "Sacrum",
      focusPoint: [0, 0.58, -0.08],
      preferredDistance: 0.9,
      labelPosition: [0, 0.58, -0.22],
    },
  },
  {
    id: "coccyx",
    commonName: "Tulang Ekor",
    latinName: "Os Coccygis",
    group: "vertebral-column",
    division: "axial",
    shapeType: "Tulang Tak Beraturan",
    countDescription: "1 tulang segitiga kecil (fusi 3 hingga 5 ruas koksigeal vestigial)",
    location: "Ujung paling inferior kolumna vertebralis di bawah sakrum",
    summary: "Segmen tulang paling ujung pada tulang belakang yang menjadi jangkar bagi otot-otot dasar panggul.",
    functions: [
      "Titik jangkar penting bagi ligamen sakrotuberosum dan otot levator ani (dasar panggul)",
      "Membantu menyangga berat tubuh saat posisi duduk bersandar ke belakang (tripod dengan tuberositas iskii)",
      "Menopang posisi anatomis sfingter ani eksternus untuk kontinensia fekal",
    ],
    anatomyFacts: [
      "Merupakan struktur vestigial sisa evolusi ekor mamalia.",
      "Nama 'Coccyx' diambil dari bahasa Yunani 'kokkyx' yang berarti burung kukuk (cuckoo) karena bentuknya menyerupai paruh burung.",
    ],
    characteristics: [
      "Bentuk kerucut kecil runcing ke bawah",
      "Dapat mengalami sedikit fleksibilitas ke posterior pada wanita saat proses persalinan",
    ],
    articulations: [
      {
        jointName: "Articulatio Sacrococcygea (Sendi Kartilaginosa Simfisis)",
        connectedTo: "Apeks sakrum",
        movementType: "Gerak lentur pasif minor saat persalinan atau defekasi",
      },
    ],
    clinicalNotes: [
      "Koksidinia (coccydynia) adalah nyeri hebat pada tulang ekor akibat jatuh terduduk atau trauma persalinan.",
    ],
    model: {
      meshName: "Coccyx",
      focusPoint: [0, 0.42, -0.06],
      preferredDistance: 0.75,
      labelPosition: [0, 0.42, -0.18],
    },
  },

  // ================= RIB CAGE / RANGKA DADA =================
  {
    id: "sternum",
    commonName: "Tulang Dada",
    latinName: "Sternum",
    group: "rib-cage",
    division: "axial",
    shapeType: "Tulang Pipih",
    countDescription: "1 lempeng tulang pipih memanjang yang terdiri dari 3 segmen: Manubrium, Korpus, dan Prosesus Xifoideus",
    location: "Garis tengah anterior dinding rongga dada",
    summary: "Tulang pipih seperti dasi di bagian tengah dada yang mengunci sangkar dada dan melindungi jantung.",
    functions: [
      "Titik jangkar utama bagi klavikula (tulang selangka) dan kartilago kosta 7 pasang iga sejati",
      "Melindungi organ vital jantung, aorta asendens, dan timus tepat di belakangnya",
      "Mengandung sumsum tulang merah aktif sepanjang usia dewasa untuk hematopoiesis (pembentukan sel darah)",
    ],
    anatomyFacts: [
      "Pertemuan antara Manubrium dan Korpus membentuk tonjolan Angulus Sterni (Sudut Louis), penanda klinis penting untuk menghitung sela iga ke-2.",
      "Prosesus Xifoideus awalnya berupa tulang rawan pada masa anak-anak dan mengalami osifikasi penuh pada usia sekitar 40 tahun.",
    ],
    characteristics: [
      "Memiliki Incisura Jugularis pada apeks atas yang mudah diraba di pangkal leher",
      "Memiliki lekukan (Incisura Costalis) di kedua sisi lateral untuk artikulasi kartilago kosta",
    ],
    articulations: [
      {
        jointName: "Articulatio Sternoclavicularis (Sendi Pelana Sinovial)",
        connectedTo: "Ekstremitas sternalis tulang selangka (klavikula)",
        movementType: "Satu-satunya sendi tulang sejati yang menghubungkan anggota gerak atas dengan rangka aksial!",
      },
      {
        jointName: "Articulatio Sternocostalis (Sinkondrosis & Sinovial Planar)",
        connectedTo: "Kartilago kosta I hingga VII",
        movementType: "Gerakan elastis pernapasan mengangkat dada (pump-handle movement)",
      },
    ],
    clinicalNotes: [
      "Sternal puncture (aspirasi sumsum tulang) sering dilakukan pada korpus sternum untuk diagnosis leukemia dan anemia aplastik.",
      "Pada CPR (Resusitasi Jantung Paru), kompresi dada dilakukan pada setengah bawah sternum di atas prosesus xifoideus.",
    ],
    model: {
      meshName: "Sternum",
      focusPoint: [0, 1.42, 0.18],
      preferredDistance: 0.9,
      labelPosition: [0, 1.42, 0.28],
    },
  },
  {
    id: "true-ribs",
    commonName: "Tulang Rusuk Sejati",
    latinName: "Costae Verae (I - VII)",
    group: "rib-cage",
    division: "axial",
    shapeType: "Tulang Pipih Melengkung",
    countDescription: "7 pasang (14 buah) tulang rusuk teratas",
    location: "Dinding anterior-lateral-posterior rongga dada atas",
    summary: "Tujuh pasang rusuk atas yang masing-masing melekat langsung pada sternum melalui kartilago kostalis mandiri.",
    functions: [
      "Melindungi organ jantung, paru-paru, esofagus, dan pembuluh darah besar toraks",
      "Mekanisme pompa dada (gerakan gagang ember / bucket-handle movement) yang memperluas volume rongga dada saat inspirasi",
      "Tempat insersi otot pernapasan utama (M. Intercostalis externus & internus)",
    ],
    anatomyFacts: [
      "Rusuk I adalah yang paling pendek, paling lebar, paling melengkung tajam, dan paling terlindung di bawah klavikula.",
      "Sulcus costae di tepi bawah tiap rusuk menjadi jalur aman terlindung bagi berkas Neurovaskular Interkostal (Vena, Arteri, Saraf).",
    ],
    characteristics: [
      "Memiliki Kaput (kepala) dengan dua faset artikular, Kolum (leher), Tuberkulum, dan Korpus melengkung",
      "Kartilago kostalis hialin elastis menghubungkan ujung anterior rusuk langsung ke sternum",
    ],
    articulations: [
      {
        jointName: "Articulatio Costovertebralis",
        connectedTo: "Korpus vertebra T1 - T7",
        movementType: "Rotasi aksial mikro saat inspirasi dan ekspirasi",
      },
      {
        jointName: "Articulatio Sternocostalis",
        connectedTo: "Lekukan faset sternum via kartilago kosta",
        movementType: "Elevasi dan depresi elastis saat bernapas",
      },
    ],
    clinicalNotes: [
      "Fraktur kosta multipel pada 2 atau lebih rusuk berdekatan dapat memicu 'Flail Chest' yang mengancam nyawa dengan pernapasan paradoksal.",
      "Tindakan torakosentesis atau insersi selang dada (WSD) selalu diarahkan di tepi atas rusuk untuk menghindari berkas neurovaskular di tepi bawah.",
    ],
    model: {
      meshName: "TrueRibs",
      focusPoint: [0, 1.48, 0.08],
      preferredDistance: 1.25,
      labelPosition: [0.35, 1.48, 0.22],
    },
  },
  {
    id: "false-ribs",
    commonName: "Tulang Rusuk Palsu",
    latinName: "Costae Spuriae (VIII - X)",
    group: "rib-cage",
    division: "axial",
    shapeType: "Tulang Pipih Melengkung",
    countDescription: "3 pasang (6 buah) tulang rusuk",
    location: "Dinding dada bagian bawah di bawah rusuk sejati",
    summary: "Tiga pasang rusuk yang kartilago ujung depannya tidak menempel langsung ke sternum, melainkan bersatu menumpang pada kartilago rusuk ke-7.",
    functions: [
      "Melindungi organ abdomen atas seperti hepar (hati), lambung, dan limpa",
      "Membentuk arkus kostalis (sudut subkostal) di tepi bawah sangkar dada",
      "Menyokong mobilitas diafragma dan perluasan rongga toraks bawah",
    ],
    anatomyFacts: [
      "Kartilago kosta VIII, IX, dan X bergabung membentuk busur tepi bawah dada yang disebut Arkus Kostalis (Costal Arch).",
    ],
    characteristics: [
      "Panjang korpus bertahap memendek dari iga VIII hingga X",
      "Memiliki sudut kelengkungan lebih landai dibanding rusuk sejati",
    ],
    articulations: [
      {
        jointName: "Articulatio Interchondralis (Sendi Sinovial Planar)",
        connectedTo: "Kartilago kosta di atasnya membentuk arkus kostalis",
        movementType: "Gerak geser lentur sinergis",
      },
      {
        jointName: "Articulatio Costovertebralis",
        connectedTo: "Vertebra T8, T9, T10",
        movementType: "Rotasi dan elevasi lateral",
      },
    ],
    clinicalNotes: [
      "Kostokondritis adalah peradangan pada sendi kartilago kosta yang menimbulkan nyeri dada tajam mirip serangan jantung.",
    ],
    model: {
      meshName: "FalseRibs",
      focusPoint: [0, 1.25, 0.08],
      preferredDistance: 1.2,
      labelPosition: [0.42, 1.22, 0.2],
    },
  },
  {
    id: "floating-ribs",
    commonName: "Tulang Rusuk Melayang",
    latinName: "Costae Fluctuantes (XI - XII)",
    group: "rib-cage",
    division: "axial",
    shapeType: "Tulang Pipih Melengkung Pendek",
    countDescription: "2 pasang (4 buah) tulang rusuk terbawah",
    location: "Dinding posterolateral punggung bawah",
    summary: "Dua pasang rusuk pendek yang ujung depannya melayang bebas di dinding otot tanpa perlekatan ke sternum maupun kartilago lain.",
    functions: [
      "Melindungi kedua ginjal (ren) dari trauma pukulan dari arah punggung belakang",
      "Memberikan fleksibilitas pergerakan membungkuk dan memutar pada pinggang",
      "Tempat insersi otot kuadratus lumborum dan diafragma",
    ],
    anatomyFacts: [
      "Tidak memiliki tuberkulum kosta dan tidak menempel pada prosesus transversus vertebra (hanya menempel pada korpus T11-T12).",
      "Ujung depannya dilapisi topi kartilago kecil yang tertanam bebas di dalam dinding otot perut belakang.",
    ],
    characteristics: [
      "Bentuk relatif lurus, pendek, dan ramping dengan ujung anterior meruncing",
    ],
    articulations: [
      {
        jointName: "Articulatio Capituli Costae",
        connectedTo: "Fovea kostalis tunggal pada korpus vertebra T11 dan T12",
        movementType: "Gerakan rotasi independen ringan",
      },
    ],
    clinicalNotes: [
      "Trauma benturan keras pada punggung bawah berisiko mematahkan rusuk melayang dan menusuk organ ginjal atau limpa di dekatnya.",
    ],
    model: {
      meshName: "FloatingRibs",
      focusPoint: [0, 1.08, -0.05],
      preferredDistance: 1.1,
      labelPosition: [0.35, 1.08, -0.15],
    },
  },

  // ================= SHOULDER GIRDLE / GELANG BAHU =================
  {
    id: "clavicle",
    commonName: "Tulang Selangka",
    latinName: "Clavicula",
    group: "shoulder-girdle",
    division: "appendicular",
    shapeType: "Tulang Pipa (Panjang)",
    countDescription: "2 tulang (kiri dan kanan) berbentuk huruf 'S'",
    location: "Anterior gelang bahu di perbatasan dada atas dan leher",
    summary: "Penyangga tulang horisontal yang memosisikan lengan bebas dari dinding dada sehingga memiliki rentang gerak maksimum.",
    functions: [
      "Berfungsi sebagai strut (penopang tiang) yang menahan lengan atas menjauh dari batang tubuh",
      "Mentransmisikan gaya benturan fisik dari anggota gerak atas menuju rangka aksial",
      "Melindungi pleksus brakialis dan pembuluh darah subklavia di bawahnya",
    ],
    anatomyFacts: [
      "Merupakan tulang pertama dalam tubuh manusia yang mengalami osifikasi (pada minggu ke-5 kehamilan), namun paling akhir menyelesaikan osifikasi penuh (usia ~25 tahun).",
      "Merupakan salah satu tulang yang paling sering mengalami fraktur di tubuh manusia.",
    ],
    characteristics: [
      "Ujung medial (ekstremitas sternalis) berbentuk kuboid tumpul bersendi dengan manubrium sterni",
      "Ujung lateral (ekstremitas akromialis) berbentuk pipih bersendi dengan akromion skapula",
      "Lengkung 2/3 medial cembung ke anterior, lengkung 1/3 lateral cekung ke anterior",
    ],
    articulations: [
      {
        jointName: "Articulatio Sternoclavicularis",
        connectedTo: "Manubrium sterni",
        movementType: "Elevasi, depresi, protraksi, retraksi, dan rotasi aksial bahu",
      },
      {
        jointName: "Articulatio Acromioclavicularis (Sendi AC - Sinovial Planar)",
        connectedTo: "Akromion pada os scapula",
        movementType: "Gerak geser lentur saat mengangkat lengan melampaui kepala",
      },
    ],
    clinicalNotes: [
      "Fraktur klavikula paling sering terjadi pada titik temu sepertiga tengah dan sepertiga lateral akibat jatuh dengan tangan terentang (FOOSH).",
    ],
    model: {
      meshName: "Clavicle",
      focusPoint: [0.22, 1.68, 0.05],
      preferredDistance: 1.0,
      labelPosition: [0.25, 1.72, 0.15],
    },
  },
  {
    id: "scapula",
    commonName: "Tulang Belikat",
    latinName: "Scapula",
    group: "shoulder-girdle",
    division: "appendicular",
    shapeType: "Tulang Pipih",
    countDescription: "2 tulang segitiga pipih (kiri dan kanan)",
    location: "Posterior rongga dada menutupi rusuk II hingga VII",
    summary: "Tulang pipih segitiga di punggung atas yang menjadi fondasi sendi bahu dengan soket mangkuk glenoid.",
    functions: [
      "Menyediakan mangkuk sendi (Kavitas Glenoidalis) untuk kepala humerus membentuk sendi bahu",
      "Memberikan tempat perlekatan bagi 17 otot penggerak bahu dan lengan (termasuk 4 otot Rotator Cuff: SITS)",
      "Memungkinkan ritme skapulohumeral (rotasi skapula saat lengan diangkat ke atas)",
    ],
    anatomyFacts: [
      "Spina scapulae berakhir di tonjolan lateral yang lebar dinamakan Akromion (puncak bahu).",
      "Prosesus Korakoideus menyerupai paruh burung gagak di bagian anterior, menjadi jangkar bagi tendon bisep kaput brevis.",
    ],
    characteristics: [
      "Memiliki tiga margo (superior, medialis/vertebralis, lateralis/aksilaris) dan tiga angulus (superior, inferior, lateralis)",
      "Fossa supraspinata dan infraspinata terpisah oleh spina scapulae di permukaan dorsal",
    ],
    articulations: [
      {
        jointName: "Articulatio Glenohumeralis (Sendi Bahu / Peluru Sinovial)",
        connectedTo: "Kaput humeri lengan atas",
        movementType: "Rentang gerak paling bebas di seluruh tubuh (fleksi, ekstensi, abduksi, adduksi, rotasi internal-eksternal, sirkumduksi)",
      },
      {
        jointName: "Sendi Skapulotorasik (Sendi Fisiologis / Muskuler)",
        connectedTo: "Meluncur di atas dinding rusuk via bantalan otot subscapularis dan serratus anterior",
        movementType: "Elevasi, depresi, retraksi, protraksi, upward & downward rotation",
      },
    ],
    clinicalNotes: [
      "'Winged Scapula' (belikat menonjol seperti sayap) terjadi akibat kerusakan Nervus Thoracicus Longus yang melumpuhkan M. Serratus Anterior.",
    ],
    model: {
      meshName: "Scapula",
      focusPoint: [0.28, 1.55, -0.15],
      preferredDistance: 1.1,
      labelPosition: [0.32, 1.58, -0.25],
    },
  },

  // ================= UPPER LIMB / ANGGOTA GERAK ATAS =================
  {
    id: "humerus",
    commonName: "Tulang Lengan Atas",
    latinName: "Humerus",
    group: "upper-limb",
    division: "appendicular",
    shapeType: "Tulang Pipa (Panjang)",
    countDescription: "2 tulang (kiri dan kanan)",
    location: "Regio brachium (antara gelang bahu dan sendi siku)",
    summary: "Tulang terbesar dan terpanjang pada anggota gerak atas yang menjadi tuas utama penggerak lengan.",
    functions: [
      "Menghantarkan gaya angkat, dorong, dan tarik dari otot lengan atas",
      "Membentuk persendian siku yang stabil bersama radius dan ulna",
      "Tempat insersi otot deltoid, pektoralis mayor, latissimus dorsi, bisep, dan trisep",
    ],
    anatomyFacts: [
      "Kaput humeri berbentuk setengah bola licin berlapis kartilago hialin yang 3x lebih besar dari mangkuk glenoid.",
      "Sulcus nervi radialis memilin di belakang diafisis; fraktur batang humerus rentan melumpuhkan saraf radialis (drop hand).",
    ],
    characteristics: [
      "Memiliki Tuberkulum Majus dan Minus di proksimal yang mengapit Sulkus Infertuberkularis (bicipital groove)",
      "Ujung distal melebar membentuk Epikondilus Medialis dan Lateralis, Troklea (untuk ulna), dan Kapitulum (untuk radius)",
    ],
    articulations: [
      {
        jointName: "Articulatio Humeroulnaris (Sendi Engsel)",
        connectedTo: "Incisura trochlearis pada os ulna",
        movementType: "Fleksi dan ekstensi siku murni",
      },
      {
        jointName: "Articulatio Humeroradialis",
        connectedTo: "Fovea capitis pada kaput radii",
        movementType: "Fleksi-ekstensi dan rotasi kaput radii",
      },
    ],
    clinicalNotes: [
      "Epicondylitis medialis dikenal sebagai 'Golfer's elbow', sedangkan epicondylitis lateralis dikenal sebagai 'Tennis elbow'.",
      "Fraktur 'supracondylar' humerus sering terjadi pada anak-anak yang jatuh dari ketinggian.",
    ],
    model: {
      meshName: "Humerus",
      focusPoint: [0.55, 1.25, 0],
      preferredDistance: 1.15,
      labelPosition: [0.58, 1.25, 0.15],
    },
  },
  {
    id: "radius",
    commonName: "Tulang Pengumpil",
    latinName: "Radius",
    group: "upper-limb",
    division: "appendicular",
    shapeType: "Tulang Pipa (Panjang)",
    countDescription: "2 tulang (kiri dan kanan), terletak di sisi lateral (segaris ibu jari)",
    location: "Sisi luar (lateral) lengan bawah (antebrachium)",
    summary: "Tulang lengan bawah di sisi ibu jari yang dapat berputar melintasi ulna untuk gerakan pronasi dan supinasi telapak tangan.",
    functions: [
      "Memungkinkan gerakan memutar telapak tangan menengadah (supinasi) dan menelungkup (pronasi)",
      "Membentuk persendian pergelangan tangan utama dengan tulang karpal (skafoid dan lunatum)",
      "Menopang perlekatan otot M. Biceps Brachii pada tuberositas radii",
    ],
    anatomyFacts: [
      "Kata 'Radius' adalah bahasa Latin untuk 'jari-jari roda', karena kaput radii berputar seperti poros roda pada persendian siku.",
      "Ujung proksimalnya kecil namun ujung distalnya melebar masif di pergelangan tangan (kebalikan dari ulna).",
    ],
    characteristics: [
      "Kaput radii berbentuk cakram bundar dengan fovea cekung di puncaknya",
      "Ujung distal memiliki Prosesus Stiloideus Radii di sisi lateral dan Incisura Ulnaris di sisi medial",
    ],
    articulations: [
      {
        jointName: "Articulatio Radioulnaris Proximalis & Distalis (Sendi Putar / Trochoid)",
        connectedTo: "Incisura radialis ulnae dan kaput ulnae",
        movementType: "Rotasi pronasi (telungkup) dan supinasi (tengadah) 180°",
      },
      {
        jointName: "Articulatio Radiocarpalis (Sendi Pergelangan Tangan / Elipsoid)",
        connectedTo: "Os Scaphoideum dan Os Lunatum",
        movementType: "Fleksi, ekstensi, abduksi radial, adduksi ulnar",
      },
    ],
    clinicalNotes: [
      "Fraktur Colles adalah patah tulang radius distal akibat menahan jatuh dengan telapak tangan terdorong ke belakang (bentuk 'garpu makan').",
    ],
    model: {
      meshName: "Radius",
      focusPoint: [0.72, 0.85, 0.05],
      preferredDistance: 0.9,
      labelPosition: [0.76, 0.85, 0.12],
    },
  },
  {
    id: "ulna",
    commonName: "Tulang Hasta",
    latinName: "Ulna",
    group: "upper-limb",
    division: "appendicular",
    shapeType: "Tulang Pipa (Panjang)",
    countDescription: "2 tulang (kiri dan kanan), terletak di sisi medial (segaris jari kelingking)",
    location: "Sisi dalam (medial) lengan bawah (antebrachium)",
    summary: "Tulang penstabil lengan bawah yang membentuk tonjolan siku (olekranon) dan bersendi kuat dengan humerus.",
    functions: [
      "Membentuk sendi engsel siku yang kokoh dan mencegah dislokasi posterior siku saat lengan lurus",
      "Menjadi poros tetap di mana tulang radius berputar mengitarinya",
      "Tempat insersi tendon M. Triceps Brachii pada olekranon",
    ],
    anatomyFacts: [
      "Olekranon adalah tonjolan runcing yang kita rasakan di ujung siku saat ditekuk.",
      "Ulna tidak bersentuhan langsung dengan tulang karpal di pergelangan tangan, melainkan dipisahkan oleh diskus artikularis fibrokartilago (TFCC).",
    ],
    characteristics: [
      "Ujung proksimal masif dengan tonjolan Olekranon dan Prosesus Koronoideus yang membentuk cekungan Incisura Trochlearis",
      "Ujung distal mengecil membentuk Kaput Ulnae dan Prosesus Stiloideus Ulnae",
    ],
    articulations: [
      {
        jointName: "Articulatio Humeroulnaris",
        connectedTo: "Troklea humeri",
        movementType: "Gerak engsel fleksi-ekstensi siku murni",
      },
      {
        jointName: "Membrana Interossea Antebrachii",
        connectedTo: "Margo interossea radii via lembar jaringan fibrosa",
        movementType: "Distribusi gaya tumbukan mekanik antara lengan bawah",
      },
    ],
    clinicalNotes: [
      "Fraktur Monteggia adalah fraktur sepertiga proksimal ulna yang disertai dislokasi kepala radius di siku.",
      "Ulnar nerve entrapment (Cubital Tunnel Syndrome) menyebabkan kesemutan pada jari kelingking dan manis.",
    ],
    model: {
      meshName: "Ulna",
      focusPoint: [0.66, 0.85, -0.02],
      preferredDistance: 0.9,
      labelPosition: [0.63, 0.85, 0.12],
    },
  },
  {
    id: "carpals",
    commonName: "Pergelangan Tangan",
    latinName: "Ossa Carpi (Karpal)",
    group: "upper-limb",
    division: "appendicular",
    shapeType: "Tulang Pendek",
    countDescription: "16 tulang (8 pada tiap pergelangan: Skafoid, Lunatum, Triquetrum, Pisiforme, Trapezium, Trapezoideum, Kapitatum, Hamatum)",
    location: "Regio carpus antara radius-ulna dan telapak tangan",
    summary: "Delapan tulang pendek tersusun dalam dua baris yang memberikan fleksibilitas tinggi dan membentuk Terowongan Karpal (Carpal Tunnel).",
    functions: [
      "Memberikan mobilitas multi-arah pada sendi pergelangan tangan",
      "Menyerap gaya getaran dan impak sebelum diteruskan ke lengan bawah",
      "Membentuk lengkungan karpal sebagai lantai dan dinding Carpal Tunnel yang dilalui tendon fleksor dan Nervus Medianus",
    ],
    anatomyFacts: [
      "Jembatan keledai anatomi klasik untuk menghafal 8 karpal: 'Some Lovers Try Positions That They Cannot Handle' (Scaphoid, Lunate, Triquetrum, Pisiform, Trapezium, Trapezoid, Capitate, Hamate).",
      "Tulang Pisiforme adalah tulang sesamoid kecil yang tertanam di dalam tendon M. Flexor Carpi Ulnaris.",
      "Os Capitatum adalah tulang karpal terbesar dan menjadi pusat titik rotasi pergelangan tangan.",
    ],
    characteristics: [
      "Baris Proksimal: Skafoid, Lunatum, Triquetrum, Pisiforme",
      "Baris Distal: Trapezium, Trapezoideum, Kapitatum, Hamatum (memiliki kait 'Hamulus')",
    ],
    articulations: [
      {
        jointName: "Articulatio Intercarpales & Midcarpales (Sendi Geser Sinovial)",
        connectedTo: "Saling berartikulasi antar tulang karpal",
        movementType: "Gerak luncur mikro kumulatif menghasilkan fleksibilitas pergelangan tangan yang halus",
      },
    ],
    clinicalNotes: [
      "Carpal Tunnel Syndrome (CTS): kompresi N. Medianus di terowongan karpal akibat penebalan retinakulum fleksor, memicu baal dan nyeri pada ibu jari, telunjuk, dan jari tengah.",
      "Fraktur Skafoid sering mengalami nekrosis avaskular (kematian jaringan tulang) karena pasokan darahnya masuk dari arah distal ke proksimal.",
    ],
    model: {
      meshName: "Carpals",
      focusPoint: [0.78, 0.58, 0.05],
      preferredDistance: 0.7,
      labelPosition: [0.82, 0.58, 0.15],
    },
  },
  {
    id: "metacarpals",
    commonName: "Telapak Tangan",
    latinName: "Ossa Metacarpi (I - V)",
    group: "upper-limb",
    division: "appendicular",
    shapeType: "Tulang Pipa Mini",
    countDescription: "10 tulang (5 pada tiap tangan: Metakarpal I ibu jari hingga V kelingking)",
    location: "Rangka telapak tangan antara karpus dan jari-jari",
    summary: "Lima tulang panjang mini yang membentuk kerangka telapak tangan dan tonjolan buku jari (knuckles).",
    functions: [
      "Membentuk kubah telapak tangan yang fleksibel untuk menggenggam berbagai bentuk benda",
      "Menopang perlekatan otot-otot intrinsik tangan (otot tenar, hipotenar, lumbricales, dan interossei)",
    ],
    anatomyFacts: [
      "Metakarpal I (ibu jari) adalah yang paling pendek dan paling tebal, dengan mobilitas rotasi oposisi luar biasa yang membedakan manusia dan primata tinggi.",
      "Kepala metakarpal (kaput metakarpalis) membentuk tonjolan buku jari (knuckles) yang terlihat saat tangan mengepal.",
    ],
    characteristics: [
      "Terdiri dari Basis (bersendi dengan karpal), Korpus (batang), dan Kaput (bersendi dengan falang)",
    ],
    articulations: [
      {
        jointName: "Articulatio Carpometacarpalis I (Sendi Pelana / Sellaris)",
        connectedTo: "Os Trapezium dengan basis Metakarpal I ibu jari",
        movementType: "Gerakan Oposisi ibu jari (menyentuh ujung semua jari lain), abduksi, adduksi, fleksi, ekstensi",
      },
      {
        jointName: "Articulatio Metacarpophalangea / MCP Joint (Sendi Kondiloid)",
        connectedTo: "Falang proksimal jari I–V",
        movementType: "Fleksi, ekstensi, abduksi, adduksi merapatkan jari",
      },
    ],
    clinicalNotes: [
      "Boxer's fracture: fraktur pada leher metakarpal ke-5 akibat memukul benda keras dengan posisi kepalan tangan yang keliru.",
    ],
    model: {
      meshName: "Metacarpals",
      focusPoint: [0.82, 0.48, 0.05],
      preferredDistance: 0.65,
      labelPosition: [0.86, 0.48, 0.12],
    },
  },
  {
    id: "hand-phalanges",
    commonName: "Jari Tangan",
    latinName: "Phalanges Manus",
    group: "upper-limb",
    division: "appendicular",
    shapeType: "Tulang Pipa Mini",
    countDescription: "28 ruas (14 pada tiap tangan: Ibu jari memiliki 2 falang; 4 jari lainnya memiliki masing-masing 3 falang)",
    location: "Ujung distal anggota gerak atas (digiti manus)",
    summary: "Ruas-ruas tulang jari yang memungkinkan ketangkasan motorik halus, mencubit, menulis, dan memegang instrumen presisi.",
    functions: [
      "Melakukan manipulasi motorik halus (mengetik, memegang pena, memainkan alat musik)",
      "Menopang bantalan ujung jari yang kaya akan reseptor taktil (korpuskel Meissner & Merkel)",
      "Memberikan cengkeraman kait (hook grip), cengkeraman daya (power grip), dan cengkeraman presisi (precision pinch)",
    ],
    anatomyFacts: [
      "Ibu jari (Pollex / Digitus I) hanya memiliki Falang Proksimal dan Falang Distal (tidak memiliki Falang Medial).",
      "Jari telunjuk (II), tengah (III), manis (IV), dan kelingking (V) masing-masing memiliki 3 ruas: Falang Proksimal, Falang Media, dan Falang Distal.",
    ],
    characteristics: [
      "Falang distal memiliki Tuberositas Phalangis Distalis berbentuk sekop di ujungnya untuk menopang bantalan kuku (nail bed)",
    ],
    articulations: [
      {
        jointName: "Articulatio Interphalangea Manus (Sendi PIP & DIP - Sendi Engsel)",
        connectedTo: "Antara falang proksimal-media dan media-distal",
        movementType: "Fleksi dan ekstensi murni menekuk jari",
      },
    ],
    clinicalNotes: [
      "'Mallet finger' (cedera jari bisbol): robekan tendon ekstensor pada sendi DIP sehingga ujung jari terkulai dan tidak bisa diluruskan.",
      "Artritis reumatoid sering menyerang sendi PIP dan MCP memicu deformitas boutonniere atau leher angsa (swan-neck deformity).",
    ],
    model: {
      meshName: "HandPhalanges",
      focusPoint: [0.85, 0.36, 0.05],
      preferredDistance: 0.6,
      labelPosition: [0.9, 0.36, 0.1],
    },
  },

  // ================= PELVIC GIRDLE / GELANG PANGGUL =================
  {
    id: "pelvis",
    commonName: "Tulang Panggul",
    latinName: "Pelvis / Ossa Coxae (Innominate Bone)",
    group: "pelvic-girdle",
    division: "appendicular",
    shapeType: "Tulang Pipih / Tak Beraturan",
    countDescription: "2 tulang koksa (kanan dan kiri) yang masing-masing merupakan fusi dari 3 tulang: Ilium, Iskium, dan Pubis",
    location: "Dasar batang tubuh antara tulang belakang dan paha",
    summary: "Cincin tulang berbentuk mangkuk besar yang menjadi tumpuan penopang berat tubuh atas dan pelindung organ reproduksi internal.",
    functions: [
      "Menghubungkan tulang belakang aksial dengan kedua tungkai bawah",
      "Menyediakan mangkuk soket dalam (Asetabulum) untuk persendian panggul dengan kaput femur",
      "Melindungi organ reproduksi internal, vesika urinaria (kandung kemih), dan rektum",
      "Pada wanita, membentuk jalan lahir (pelvis inlet, cavity, dan outlet) untuk proses persalinan",
    ],
    anatomyFacts: [
      "Ilium membentuk sayap lebar panggul dengan krista iliaka di tepi atas (tempat meletakkan tangan di pinggang).",
      "Iskium membentuk tulang duduk dengan Tuberositas Iskiadika yang menopang tubuh saat duduk di kursi.",
      "Kedua tulang pubis bersatu di garis tengah anterior melalui bantalan kartilago Simfisis Pubis.",
      "Perbedaan jenis kelamin: Panggul wanita lebih lebar, lebih dangkal, dengan arkus pubis bersudut tumpul (>90°) untuk persalinan; sedangkan pria berbentuk hati lebih sempit dengan arkus pubis lancip (<70°).",
    ],
    characteristics: [
      "Asetabulum dibentuk oleh pertemuan ketiga tulang: Ilium (2/5), Iskium (2/5), dan Pubis (1/5)",
      "Memiliki Foramen Obturatum, lubang terbesar pada rangka yang ditutupi oleh membran obturatoria",
    ],
    articulations: [
      {
        jointName: "Articulatio Coxae (Sendi Panggul / Ball and Socket)",
        connectedTo: "Kaput femoris",
        movementType: "Gerak multi-aksial stabil berdaya beban tinggi (fleksi, ekstensi, abduksi, adduksi, rotasi)",
      },
      {
        jointName: "Symphysis Pubica (Amfiartrosis Simfisis)",
        connectedTo: "Antara os pubis kanan dan kiri",
        movementType: "Relaksasi mikro berkat hormon relaksin selama trimester akhir kehamilan",
      },
    ],
    clinicalNotes: [
      "Displasia Panggul Perkembangan (DDH) pada bayi terjadi jika asetabulum terlalu dangkal sehingga kaput femur mudah mengalami dislokasi.",
      "Fraktur cincin panggul berenergi tinggi (misal kecelakaan lalu lintas) berisiko tinggi menyebabkan perdarahan masif internal.",
    ],
    model: {
      meshName: "Pelvis",
      focusPoint: [0, 0.45, 0],
      preferredDistance: 1.35,
      labelPosition: [0.26, 0.55, 0.2],
    },
  },

  // ================= LOWER LIMB / ANGGOTA GERAK BAWAH =================
  {
    id: "femur",
    commonName: "Tulang Paha",
    latinName: "Femur / Os Femoris",
    group: "lower-limb",
    division: "appendicular",
    shapeType: "Tulang Pipa (Panjang)",
    countDescription: "2 tulang (kiri dan kanan)",
    location: "Regio femoris (antara panggul dan lutut)",
    summary: "Tulang terpanjang, terberat, dan terkuat di tubuh manusia, dirancang menahan tekanan kompresi hingga ribuan kilogram.",
    functions: [
      "Menopang seluruh berat badan tubuh atas saat berdiri, berjalan, melompat, dan berlari",
      "Menyediakan lengan tuas biomekanika panjang untuk langkah kaki yang efisien",
      "Tempat insersi otot kuadrisep femoris, hamstring, gluteus, dan adduktor paha",
    ],
    anatomyFacts: [
      "Panjang femur rata-rata sekitar 26% dari total tinggi badan seseorang; formula antropologi forensik sering menggunakan panjang femur untuk merekonstruksi tinggi jenazah.",
      "Mampu menahan gaya kompresi hingga 30 kali berat badan saat mendarat dari lompatan tinggi.",
      "Leher femur (Collum Femoris) membentuk sudut inklinasi ~125° terhadap batang tulang.",
    ],
    characteristics: [
      "Kaput femoris memiliki cekungan kecil Fovea Capitis tempat melekatnya Ligamentum Teres",
      "Di pangkal kolum terdapat Trokanter Mayor di lateral dan Trokanter Minor di medial",
      "Ujung distal melebar membentuk Kondilus Medialis dan Lateralis yang bersendi dengan tibia",
    ],
    articulations: [
      {
        jointName: "Articulatio Coxae (Sendi Panggul)",
        connectedTo: "Asetabulum tulang pelvis",
        movementType: "Gerak segala arah berdaya dukung beban tinggi",
      },
      {
        jointName: "Articulatio Femorotibialis & Femoropatellaris (Sendi Lutut)",
        connectedTo: "Kondilus tibia dan facies articularis patella",
        movementType: "Fleksi dan ekstensi utama, serta rotasi aksial terbatas saat lutut fleksi",
      },
    ],
    clinicalNotes: [
      "Fraktur kolum femoris (patah leher paha) sangat umum terjadi pada lansia dengan osteoporosis akibat jatuh ringan, sering membutuhkan operasi artroplasti panggul.",
      "Avascular Necrosis (AVN) kaput femur dapat terjadi bila arteri sirkumfleksa femoris medialis robek akibat dislokasi atau fraktur leher paha.",
    ],
    model: {
      meshName: "Femur",
      focusPoint: [0.18, -0.22, 0],
      preferredDistance: 1.45,
      labelPosition: [0.22, -0.22, 0.16],
    },
  },
  {
    id: "patella",
    commonName: "Tempurung Lutut",
    latinName: "Patella",
    group: "lower-limb",
    division: "appendicular",
    shapeType: "Tulang Sesamoid",
    countDescription: "2 tulang berbentuk segitiga pipih (kiri dan kanan)",
    location: "Anterior sendi lutut tertanam dalam tendon kuadrisep",
    summary: "Tulang sesamoid terbesar di tubuh manusia yang berfungsi meningkatkan efisiensi mekanis otot paha depan dalam meluruskan tungkai.",
    functions: [
      "Berfungsi sebagai fulkrum katrol mekanik yang meningkatkan torsi daya ungkit tendon kuadrisep hingga 30–50%",
      "Melindungi sendi lutut dan kartilago artikular dari benturan langsung anterior",
      "Memandu traksi tendon kuadrisep agar tepat berada di alur troklea femur (fossa interkondilaris)",
    ],
    anatomyFacts: [
      "Patella baru mulai mengalami osifikasi dari tulang rawan pada anak usia 3 hingga 5 tahun.",
      "Permukaan belakangnya dilapisi oleh lapisan kartilago hialin paling tebal di seluruh tubuh manusia (mencapai tebal 5-6 mm) untuk menahan gesekan kompresi tinggi saat berjongkok.",
    ],
    characteristics: [
      "Basis patellae berada di superior yang menerima insersi tendon M. Quadriceps Femoris",
      "Apex patellae mengarah ke inferior tempat bermulanya Ligamentum Patellae menuju tuberositas tibia",
    ],
    articulations: [
      {
        jointName: "Articulatio Patellofemoralis (Sendi Luncur / Planar)",
        connectedTo: "Facies patellaris pada bagian distal anterior femur",
        movementType: "Gerak meluncur (tracking) ke superior saat ekstensi dan ke inferior saat fleksi lutut",
      },
    ],
    clinicalNotes: [
      "Kondromalasia Patela ('Runner's Knee'): pelunakan dan pengikisan tulang rawan di belakang patela akibat gesekan tracking yang tidak lurus.",
      "Dislokasi patela paling sering bergeser ke arah lateral akibat kelemahan otot Vastus Medialis Oblique (VMO).",
    ],
    model: {
      meshName: "Patella",
      focusPoint: [0.18, -0.72, 0.08],
      preferredDistance: 0.75,
      labelPosition: [0.22, -0.72, 0.16],
    },
  },
  {
    id: "tibia",
    commonName: "Tulang Kering",
    latinName: "Tibia",
    group: "lower-limb",
    division: "appendicular",
    shapeType: "Tulang Pipa (Panjang)",
    countDescription: "2 tulang (kiri dan kanan), terletak di sisi medial tungkai bawah",
    location: "Sisi anterior-medial tungkai bawah (cruris)",
    summary: "Tulang penyangga beban utama pada tungkai bawah yang mentransmisikan berat badan dari paha ke pergelangan kaki.",
    functions: [
      "Menopang sekitar 90% berat badan yang dihantarkan dari sendi lutut ke pergelangan kaki",
      "Membentuk persendian pergelangan kaki (talocrural joint) dan mata kaki bagian dalam (Maleolus Medialis)",
      "Tempat insersi tendon patela pada Tuberositas Tibiae",
    ],
    anatomyFacts: [
      "Margo anterior tibia sangat dangkal tepat di bawah kulit tanpa lapisan otot tebal (sehingga sangat nyeri bila terbentur benda keras).",
      "Merupakan tulang terpanjang kedua di tubuh manusia setelah femur.",
    ],
    characteristics: [
      "Kondilus Medialis dan Lateralis di proksimal membentuk dataran datar rata Plato Tibia (Tibial Plateau)",
      "Ujung distal membentuk tonjolan Maleolus Medialis di sisi dalam pergelangan kaki",
    ],
    articulations: [
      {
        jointName: "Articulatio Femorotibialis",
        connectedTo: "Kondilus femur via bantalan meniskus medialis dan lateralis",
        movementType: "Fleksi dan ekstensi sendi lutut",
      },
      {
        jointName: "Articulatio Talocruralis (Sendi Pergelangan Kaki / Engsel)",
        connectedTo: "Troklea tali pada tulang talus kaki",
        movementType: "Dorsifleksi (angkat ujung kaki) dan plantarfleksi (jinjit)",
      },
    ],
    clinicalNotes: [
      "Shin splints (Medial Tibial Stress Syndrome): nyeri pada tulang kering akibat inflamasi periosteum karena lari berlebihan di permukaan keras.",
      "Penyakit Osgood-Schlatter: peradangan dan pembengkakan pada tuberositas tibia pada remaja aktif akibat tarikan berulang tendon patela.",
    ],
    model: {
      meshName: "Tibia",
      focusPoint: [0.17, -1.18, 0.02],
      preferredDistance: 1.1,
      labelPosition: [0.18, -1.18, 0.14],
    },
  },
  {
    id: "fibula",
    commonName: "Tulang Betis",
    latinName: "Fibula",
    group: "lower-limb",
    division: "appendicular",
    shapeType: "Tulang Pipa Ramping",
    countDescription: "2 tulang ramping (kiri dan kanan), terletak di sisi lateral tungkai bawah",
    location: "Sisi luar (lateral) dan sejajar dengan tulang tibia",
    summary: "Tulang ramping di sisi luar tungkai bawah yang menjadi penstabil lateral pergelangan kaki dan tempat perlekatan banyak otot betis.",
    functions: [
      "Membentuk tonjolan Maleolus Lateralis (mata kaki luar) yang mengunci sendi pergelangan kaki agar tidak terkilir",
      "Menopang sekitar 10% beban aksial tungkai bawah",
      "Memberikan area luas bagi perlekatan otot-otot eversi, inversi, dan fleksor kaki (M. Fibularis longus, brevis, soleus)",
    ],
    anatomyFacts: [
      "Kata 'Fibula' berasal dari bahasa Latin yang berarti 'jarum peniti / gesper bros pakaian'.",
      "Fibula tidak ikut membentuk persendian lutut (kaput fibula tidak bersendi dengan femur).",
      "Karena bukan penopang beban utama, segmen tengah batang fibula sering digunakan oleh dokter bedah ortopedi sebagai cangkok tulang (bone graft vascularized).",
    ],
    characteristics: [
      "Batang sangat ramping dan terpuntir sepanjang sumbunya",
      "Ujung proksimal memiliki Kaput Fibulae; ujung distal membentuk Maleolus Lateralis yang lebih panjang dan menonjol dibanding maleolus medialis tibia",
    ],
    articulations: [
      {
        jointName: "Articulatio Tibiofibularis Proximalis & Distalis (Sindesmosis)",
        connectedTo: "Faset fibula pada tibia lateral dan incisura fibularis tibia",
        movementType: "Stabilitas tinggi dengan gerak geser mikro saat pergelangan kaki bergerak",
      },
    ],
    clinicalNotes: [
      "Nervus Fibularis Communis melingkari leher fibula proksimal; tekanan gips yang terlalu ketat atau trauma pukulan lateral dapat memicu 'Foot Drop' (kaki lemas tidak bisa dorsifleksi).",
      "Cedera engkel 'Maisonneuve fracture' melibatkan fraktur spiral leher fibula proksimal yang menyertai robekan sindesmosis pergelangan kaki.",
    ],
    model: {
      meshName: "Fibula",
      focusPoint: [0.25, -1.18, -0.02],
      preferredDistance: 1.1,
      labelPosition: [0.28, -1.18, 0.1],
    },
  },
  {
    id: "tarsals",
    commonName: "Pergelangan Kaki",
    latinName: "Ossa Tarsi (Tarsal)",
    group: "lower-limb",
    division: "appendicular",
    shapeType: "Tulang Pendek Masif",
    countDescription: "14 tulang (7 pada tiap kaki: Kalkaneus, Talus, Navikular, Kuboid, Kuneiforme Medial, Intermediet, Lateral)",
    location: "Regio tarsus / pangkal kaki posterior",
    summary: "Tujuh tulang berukuran besar dan kuat yang menopang berat tubuh, meredam kejut langkah, dan membentuk lengkung kaki.",
    functions: [
      "Kalkaneus (tulang tumit) menjadi titik tumpu utama berat badan saat tumit pertama kali menyentuh tanah (heel strike)",
      "Talus mendistribusikan beban dari tibia ke kalkaneus di posterior dan metatarsal di anterior",
      "Membentuk lengkungan kaki longitudinal dan transversal untuk pegas elastisitas saat berjalan",
    ],
    anatomyFacts: [
      "Kalkaneus adalah tulang terbesar di kaki; tempat melekatnya Tendon Achilles (tendon terkuat dan tertebal di tubuh manusia).",
      "Talus adalah satu-satunya tulang tarsal yang tidak memiliki perlekatan otot sama sekali (gerakannya murni dikendalikan oleh ligamen dan artikulasi).",
    ],
    characteristics: [
      "Tarsus Proksimal: Talus dan Kalkaneus",
      "Tarsus Intermediet: Os Naviculare",
      "Tarsus Distal: Os Cuneiforme Mediale, Intermedium, Laterale, dan Os跳 Cuboideum",
    ],
    articulations: [
      {
        jointName: "Articulatio Subtalaris / Talocalcaneal (Sendi Sinovial Planar)",
        connectedTo: "Antara talus dan kalkaneus",
        movementType: "Inversi (miring telapak ke dalam) dan Eversi (miring telapak ke luar) saat melangkah di permukaan tidak rata",
      },
    ],
    clinicalNotes: [
      "Plantar Fasciitis: peradangan pada fasia plantaris yang menempel pada tuberositas kalkaneus, memicu nyeri tumit menusuk saat langkah pertama di pagi hari.",
      "Spur Tumit (Calcaneal spur): pertumbuhan tonjolan kalsium osteofit di bawah kalkaneus.",
    ],
    model: {
      meshName: "Tarsals",
      focusPoint: [0.18, -1.6, 0.05],
      preferredDistance: 0.75,
      labelPosition: [0.22, -1.6, 0.18],
    },
  },
  {
    id: "metatarsals",
    commonName: "Telapak Kaki",
    latinName: "Ossa Metatarsi (I - V)",
    group: "lower-limb",
    division: "appendicular",
    shapeType: "Tulang Pipa Mini Masif",
    countDescription: "10 tulang (5 pada tiap kaki: Metatarsal I ibu jari kaki hingga V kelingking kaki)",
    location: "Rangka telapak kaki anterior antara tarsus dan jari kaki",
    summary: "Lima tulang panjang penopang yang menyerap gaya impak dan menjadi tuas tolakan (push-off) saat melangkah.",
    functions: [
      "Mentransmisikan gaya dorong tolakan kaki saat berlari dan melompat (terutama kaput metatarsal I)",
      "Mempertahankan kelengkungan lengkung transversal kaki",
      "Menopang perlekatan otot-otot lumbrikal dan interosei pedis",
    ],
    anatomyFacts: [
      "Metatarsal I adalah yang paling pendek, paling tebal, dan paling kuat karena menanggung beban terbesar saat fase 'toe-off'.",
      "Terdapat dua tulang sesamoid kecil di bawah kepala metatarsal I di dalam tendon M. Flexor Hallucis Brevis.",
    ],
    characteristics: [
      "Terdiri dari Basis segitiga di proksimal, Korpus melengkung cembung ke dorsal, dan Kaput bulat di distal",
      "Tuberositas Metatarsal V menonjol di tepi lateral luar telapak kaki",
    ],
    articulations: [
      {
        jointName: "Articulatio Tarsometatarsales / Sendi Lisfranc",
        connectedTo: "Tulang kuneiforme dan kuboid",
        movementType: "Sendi geser kaku berdaya tahan beban tinggi",
      },
      {
        jointName: "Articulatio Metatarsophalangea / MTP Joint",
        connectedTo: "Falang proksimal jari kaki",
        movementType: "Fleksi dan dorsofleksi saat mendorong langkah",
      },
    ],
    clinicalNotes: [
      "Hallux Valgus (Bunion): deviasi lateral ibu jari kaki pada sendi MTP I yang memicu tonjolan nyeri di pangkal ibu jari kaki.",
      "Jones Fracture: patah tulang pada pangkal tuberositas metatarsal ke-5 akibat gerakan inversi mendadak.",
    ],
    model: {
      meshName: "Metatarsals",
      focusPoint: [0.18, -1.68, 0.16],
      preferredDistance: 0.7,
      labelPosition: [0.24, -1.68, 0.28],
    },
  },
  {
    id: "foot-phalanges",
    commonName: "Jari Kaki",
    latinName: "Phalanges Pedis",
    group: "lower-limb",
    division: "appendicular",
    shapeType: "Tulang Pipa Mini Pendek",
    countDescription: "28 ruas (14 pada tiap kaki: Ibu jari kaki memiliki 2 falang; 4 jari lainnya memiliki masing-masing 3 falang)",
    location: "Ujung paling distal anggota gerak bawah (digiti pedis)",
    summary: "Ruas-ruas tulang jari kaki yang berfungsi memberikan cengkeraman ke permukaan tanah dan menjaga keseimbangan tubuh.",
    functions: [
      "Memberikan cengkeraman dan penyesuaian dinamis saat kaki berdiri di permukaan tanah yang miring",
      "Memberikan fase akhir tolakan halus saat melangkah",
      "Membantu refleks keseimbangan postural tubuh",
    ],
    anatomyFacts: [
      "Ibu jari kaki (Hallux / Digitus I) hanya memiliki 2 falang: Proksimal dan Distal.",
      "Falang pada jari kaki jauh lebih pendek dan lebih pipih dibandingkan falang pada jari tangan karena fungsinya fokus pada daya topang, bukan manipulasi presisi.",
    ],
    characteristics: [
      "Falang distal jari kaki berukuran sangat kecil dengan tuberositas kuku pipih",
    ],
    articulations: [
      {
        jointName: "Articulatio Interphalangea Pedis (Sendi PIP & DIP Kaki)",
        connectedTo: "Antar falang proksimal, media, dan distal",
        movementType: "Fleksi (mencengkeram) dan ekstensi ringan",
      },
    ],
    clinicalNotes: [
      "Hammer toe (Jari kaki palu): deformitas fleksi abnormal pada sendi PIP jari kaki kedua atau ketiga akibat pemakaian sepatu sempit bertumit tinggi.",
      "Gout Artritis (Asam Urat) paling sering menyerang sendi MTP I ibu jari kaki (Podagra) dengan nyeri bengkak merah mendadak di malam hari.",
    ],
    model: {
      meshName: "FootPhalanges",
      focusPoint: [0.18, -1.72, 0.26],
      preferredDistance: 0.65,
      labelPosition: [0.24, -1.72, 0.38],
    },
  },
];
