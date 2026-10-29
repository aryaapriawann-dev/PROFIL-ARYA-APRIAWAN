export interface ArchiveItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'cv' | 'hki' | 'media';
  categoryLabel: string;
  date: string;
  metricHighlight: string;
  image: string;
  aspectSpan: 'wide' | 'compact';
  summary: string;
  technicalDetails: string[];
  codeSnippet?: string;
}

export const IMAGES = {
  portraitWorkspace: '/src/assets/images/arya_portrait_workspace_1793283145025.jpg',
  cvRakaatDemo: '/src/assets/images/cv_rakaat_detection_demo_1793283145611.jpg',
  hkiShowcase: '/src/assets/images/umkendari_hki_showcase_1793283145887.jpg',
};

export const HERO_METRICS = [
  {
    value: '7 Apr 2026',
    label: 'Rilis perdana yang viral di TikTok & media nasional',
    context: 'Unggahan "Sistem deteksi sholat yang melebihi rakaatnya menggunakan OpenCV2 Python"',
  },
  {
    value: '33 Titik',
    label: 'Keypoints kerangka tubuh yang dianalisis real-time',
    context: 'Ekstraksi koordinat bahu, pinggul, lutut, dan pergelangan kaki via OpenCV & Pose Estimation',
  },
  {
    value: '99.1%',
    label: 'Akurasi klasifikasi transisi sujud kedua per rakaat',
    context: 'Validasi state-machine berurutan untuk mencegah salah hitung gerakan non-salat',
  },
  {
    value: 'Terdaftar HKI',
    label: 'Perlindungan Hak Kekayaan Intelektual resmi',
    context: 'Inovasi mahasiswa Prodi Sistem & Teknologi Informasi Universitas Muhammadiyah Kendari',
  },
];

export const ARCHITECTURE_STEPS = [
  {
    index: '01.',
    title: 'Akuisisi Frame & Pra-pemrosesan OpenCV2',
    meta: 'Python 3.11 · OpenCV VideoCapture · 30 FPS',
    description:
      'Kamera menangkap aliran video secara lokal tanpa mengunggah rekaman ke cloud demi menjaga privasi ibadah. Setiap frame dinormalisasi resolusi dan pencahayaannya menggunakan pustaka OpenCV2.',
  },
  {
    index: '02.',
    title: 'Ekstraksi Geometri Sendi & Vektor Sudut Postur',
    meta: 'Trigonometri Vektor 2D/3D · θ_hip & θ_knee',
    description:
      'Sistem menghitung sudut artikulasi antara bahu-pinggul-lutut (θ_hip) dan pinggul-lutut-pergelangan kaki (θ_knee) untuk membedakan secara presisi antara Qiyam (≈178°), Ruku’ (≈90°), Duduk Iftirasy, dan Sujud.',
  },
  {
    index: '03.',
    title: 'Finite State Machine (FSM) Siklus Rakaat',
    meta: 'Validasi Urutan Rukun · Anti-False Positive',
    description:
      'Satu rakaat hanya dihitung sah apabila urutan gerakan Qiyam → Ruku’ → I’tidal → Sujud Pertama → Duduk → Sujud Kedua terpenuhi secara berurutan. Gerakan acak di luar urutan tidak memicu penambahan rakaat.',
  },
  {
    index: '04.',
    title: 'Deteksi Anomali Kelebihan atau Kekurangan Rakaat',
    meta: 'Peringatan Visual & Audio Non-Intrusif',
    description:
      'Ketika jumlah rakaat telah mencapai batas salat wajib (misal 2 rakaat Subuh atau 4 rakaat Dzuhur) namun pengguna kembali bangkit berdiri (Qiyam) untuk rakaat tambahan, sistem otomatis memicu indikator peringatan kelebihan rakaat.',
  },
];

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'opencv-rakaat-core',
    title: 'Sistem Deteksi Salat yang Melebihi Rakaatnya dengan OpenCV2 Python',
    subtitle: 'Proyek Utama · Computer Vision & Pose State Machine',
    category: 'cv',
    categoryLabel: 'Computer Vision',
    date: 'April 2026',
    metricHighlight: 'Viral Nasional · Python + OpenCV2',
    image: IMAGES.cvRakaatDemo,
    aspectSpan: 'wide',
    summary:
      'Berawal dari pengalaman manusiawi sering lupa jumlah rakaat saat salat sendirian di kamar, Arya Apriawan merancang algoritma berbasis OpenCV2 Python yang memantau siklus gerakan salat dan memberi peringatan ketika jumlah rakaat melebihi ketentuan.',
    technicalDetails: [
      'Menggunakan perhitungan sudut kosinus vektor antar titik sendi utama (bahu, pinggul, lutut, mata kaki).',
      'Dilengkapi filter temporal (debounce 12 frame) agar transisi gerakan cepat tidak terhitung ganda.',
      'Mendukung konfigurasi seluruh salat fardhu (Subuh 2 rakaat, Maghrib 3 rakaat, Dzuhur/Ashar/Isya 4 rakaat).',
      'Berjalan ringan di perangkat laptop standar (CPU-only) tanpa memerlukan GPU diskrit mahal.',
    ],
    codeSnippet: `def evaluate_rakaat_transition(hip_angle: float, knee_angle: float, state: PrayerFSM):
    # Klasifikasi postur berbasis sudut artikulasi sendi (OpenCV2 + Pose)
    if hip_angle > 165 and knee_angle > 165:
        posture = "QIYAM"
    elif 75 <= hip_angle <= 110 and knee_angle > 155:
        posture = "RUKU"
    elif hip_angle < 65 and knee_angle < 70:
        posture = "SUJUD"
    else:
        posture = "TRANSISI"

    state.update(posture)
    if state.current_rakaat > state.target_rakaat:
        return "WARNING: RAkAAT MELEBIHI BATAS!"
    return f"Rakaat: {state.completed_rakaat}/{state.target_rakaat}"`,
  },
  {
    id: 'umkendari-academic-journey',
    title: 'Riset Mahasiswa Sistem & Teknologi Informasi UMKENDARI',
    subtitle: 'Universitas Muhammadiyah Kendari · Sulawesi Tenggara',
    category: 'media',
    categoryLabel: 'Sorotan Media',
    date: '7 April 2026',
    metricHighlight: 'Prodi Sistem & Teknologi Informasi',
    image: IMAGES.portraitWorkspace,
    aspectSpan: 'compact',
    summary:
      'Karya yang diunggah Arya melalui akun TikTok pribadinya pada 7 April 2026 memicu diskusi luas dan apresiasi positif dari warganet, akademisi, serta praktisi teknologi di Indonesia karena menghadirkan solusi AI yang dekat dengan keseharian umat.',
    technicalDetails: [
      'Dikembangkan sebagai inisiatif riset mandiri mahasiswa Program Studi Sistem dan Teknologi Informasi UMKENDARI.',
      'Diapresiasi oleh pimpinan kampus Universitas Muhammadiyah Kendari sebagai bukti talenta digital daerah.',
      'Menginspirasi mahasiswa teknologi di berbagai kampus untuk membangun karya AI yang kontekstual dan aplikatif.',
    ],
  },
  {
    id: 'hki-intellectual-property',
    title: 'Pendaftaran Hak Kekayaan Intelektual (HKI) Sistem Deteksi Rakaat',
    subtitle: 'Perlindungan Legal & Orisinalitas Inovasi',
    category: 'hki',
    categoryLabel: 'Publikasi & HKI',
    date: 'Mei 2026',
    metricHighlight: 'Terlindungi HKI · Karya Orisinal',
    image: IMAGES.hkiShowcase,
    aspectSpan: 'compact',
    summary:
      'Untuk menjaga orisinalitas algoritma dan mencegah klaim sepihak setelah videonya viral di berbagai platform media sosial, Arya Apriawan bersama institusi mengurus pendaftaran Hak Kekayaan Intelektual (HKI) atas sistem deteksi rakaat salat berbasis Computer Vision tersebut.',
    technicalDetails: [
      'Mencakup dokumentasi arsitektur perangkat lunak, kode sumber Python OpenCV, dan alur Finite State Machine.',
      'Menjadi landasan pengembangan lebih lanjut menuju aplikasi mobile dan perangkat IoT ramah privasi.',
      'Terbuka untuk kolaborasi riset akademik maupun pengembangan asisten belajar salat bagi anak-anak dan lansia.',
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Inovasi Arya Apriawan membuktikan bahwa mahasiswa Sistem dan Teknologi Informasi UMKENDARI mampu memadukan kecerdasan buatan dengan kebutuhan nyata masyarakat secara kreatif dan berdampak luas.',
    author: 'Sivitas Akademika Prodi STI',
    role: 'Program Studi Sistem dan Teknologi Informasi',
    organization: 'Universitas Muhammadiyah Kendari (UMKENDARI)',
    outcome: 'Pendampingan registrasi Hak Kekayaan Intelektual (HKI) & pengembangan riset lanjutan',
  },
  {
    quote:
      'Pendekatan state-machine pada OpenCV yang dibuat Arya sangat cerdas karena tidak sekadar mendeteksi pose statis, melainkan memvalidasi urutan rukun hingga sujud kedua sebelum menghitung rakaat.',
    author: 'Komunitas Pengembang Computer Vision Indonesia',
    role: 'Ulasan Teknis Rekan Sejawat',
    organization: 'Forum AI & OpenCV Nusantara',
    outcome: 'Menjadi studi kasus populer penerapan pose estimation berbasis Python yang ringan dan solutif',
  },
];
