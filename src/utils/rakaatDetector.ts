export type PrayerType = 'subuh' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya';

export type PostureId =
  | 'qiyam'
  | 'ruku'
  | 'itidal'
  | 'sujud_1'
  | 'iftirasy'
  | 'sujud_2'
  | 'tahiyat';

export interface PrayerConfig {
  id: PrayerType;
  label: string;
  targetRakaat: number;
  timeWindow: string;
}

export interface JointPoint {
  id: string;
  label: string;
  x: number; // Normalized 0..100
  y: number; // Normalized 0..100
}

export interface PostureSpec {
  id: PostureId;
  name: string;
  arabicTerm: string;
  stepOrder: number;
  hipAngleDeg: number;
  kneeAngleDeg: number;
  spineInclinationDeg: number;
  confidenceScore: number;
  description: string;
  joints: JointPoint[];
}

export interface RakaatState {
  prayer: PrayerType;
  targetRakaat: number;
  currentRakaat: number;
  completedRakaat: number;
  currentPostureIndex: number;
  sujudCountInCurrentRakaat: number;
  status: 'normal' | 'completed_exact' | 'excess_rakaat_warning' | 'short_rakaat_warning';
  alertMessage: string;
  historyLog: string[];
}

export const PRAYER_CONFIGS: Record<PrayerType, PrayerConfig> = {
  subuh: { id: 'subuh', label: 'Salat Subuh', targetRakaat: 2, timeWindow: '04:35 – 05:50 WITA' },
  dzuhur: { id: 'dzuhur', label: 'Salat Dzuhur', targetRakaat: 4, timeWindow: '12:05 – 15:15 WITA' },
  ashar: { id: 'ashar', label: 'Salat Ashar', targetRakaat: 4, timeWindow: '15:20 – 17:55 WITA' },
  maghrib: { id: 'maghrib', label: 'Salat Maghrib', targetRakaat: 3, timeWindow: '18:02 – 19:10 WITA' },
  isya: { id: 'isya', label: 'Salat Isya', targetRakaat: 4, timeWindow: '19:15 – 04:30 WITA' },
};

export const POSTURE_SEQUENCE: PostureSpec[] = [
  {
    id: 'qiyam',
    name: 'Berdiri Tegak (Qiyam)',
    arabicTerm: 'القيام',
    stepOrder: 1,
    hipAngleDeg: 178,
    kneeAngleDeg: 179,
    spineInclinationDeg: 2,
    confidenceScore: 0.992,
    description: 'Deteksi vektor tulang belakang vertikal (θ_spine ≈ 2°) dengan tangan bersedekap di dada.',
    joints: [
      { id: 'head', label: 'Head (0)', x: 50, y: 15 },
      { id: 'shoulder', label: 'Shoulder (11)', x: 50, y: 27 },
      { id: 'elbow', label: 'Elbow (13)', x: 43, y: 39 },
      { id: 'wrist', label: 'Wrist (15)', x: 52, y: 36 },
      { id: 'hip', label: 'Hip (23)', x: 50, y: 52 },
      { id: 'knee', label: 'Knee (25)', x: 50, y: 68 },
      { id: 'ankle', label: 'Ankle (27)', x: 50, y: 84 },
    ],
  },
  {
    id: 'ruku',
    name: "Ruku' (Membungkuk 90°)",
    arabicTerm: 'الركوع',
    stepOrder: 2,
    hipAngleDeg: 91,
    kneeAngleDeg: 176,
    spineInclinationDeg: 89,
    confidenceScore: 0.987,
    description: 'Sudut pinggul (θ_hip) mendekati 90° dengan punggung rata sejajar bidang horizontal.',
    joints: [
      { id: 'head', label: 'Head (0)', x: 28, y: 45 },
      { id: 'shoulder', label: 'Shoulder (11)', x: 37, y: 47 },
      { id: 'elbow', label: 'Elbow (13)', x: 43, y: 60 },
      { id: 'wrist', label: 'Wrist (15)', x: 48, y: 69 },
      { id: 'hip', label: 'Hip (23)', x: 56, y: 50 },
      { id: 'knee', label: 'Knee (25)', x: 56, y: 68 },
      { id: 'ankle', label: 'Ankle (27)', x: 56, y: 84 },
    ],
  },
  {
    id: 'itidal',
    name: "I'tidal (Bangkit Tegak)",
    arabicTerm: 'الاعتدال',
    stepOrder: 3,
    hipAngleDeg: 179,
    kneeAngleDeg: 178,
    spineInclinationDeg: 1,
    confidenceScore: 0.994,
    description: "Transisi kembali dari Ruku' ke posisi vertikal penuh sebelum turun menuju sujud.",
    joints: [
      { id: 'head', label: 'Head (0)', x: 50, y: 15 },
      { id: 'shoulder', label: 'Shoulder (11)', x: 50, y: 27 },
      { id: 'elbow', label: 'Elbow (13)', x: 45, y: 39 },
      { id: 'wrist', label: 'Wrist (15)', x: 45, y: 50 },
      { id: 'hip', label: 'Hip (23)', x: 50, y: 52 },
      { id: 'knee', label: 'Knee (25)', x: 50, y: 68 },
      { id: 'ankle', label: 'Ankle (27)', x: 50, y: 84 },
    ],
  },
  {
    id: 'sujud_1',
    name: 'Sujud Pertama',
    arabicTerm: 'السجود الأول',
    stepOrder: 4,
    hipAngleDeg: 48,
    kneeAngleDeg: 52,
    spineInclinationDeg: 124,
    confidenceScore: 0.985,
    description: 'Tujuh anggota tubuh menyentuh lantai; koordinat Y kepala berada di bawah pinggul.',
    joints: [
      { id: 'head', label: 'Head (0)', x: 26, y: 80 },
      { id: 'shoulder', label: 'Shoulder (11)', x: 36, y: 70 },
      { id: 'elbow', label: 'Elbow (13)', x: 32, y: 79 },
      { id: 'wrist', label: 'Wrist (15)', x: 22, y: 84 },
      { id: 'hip', label: 'Hip (23)', x: 54, y: 58 },
      { id: 'knee', label: 'Knee (25)', x: 52, y: 84 },
      { id: 'ankle', label: 'Ankle (27)', x: 68, y: 84 },
    ],
  },
  {
    id: 'iftirasy',
    name: 'Duduk di Antara Dua Sujud',
    arabicTerm: 'الجلوس بين السجدتين',
    stepOrder: 5,
    hipAngleDeg: 94,
    kneeAngleDeg: 42,
    spineInclinationDeg: 4,
    confidenceScore: 0.989,
    description: 'Tulang belakang tegak dalam posisi duduk lipat lutut (θ_knee ≈ 42°).',
    joints: [
      { id: 'head', label: 'Head (0)', x: 46, y: 38 },
      { id: 'shoulder', label: 'Shoulder (11)', x: 48, y: 50 },
      { id: 'elbow', label: 'Elbow (13)', x: 44, y: 63 },
      { id: 'wrist', label: 'Wrist (15)', x: 38, y: 72 },
      { id: 'hip', label: 'Hip (23)', x: 52, y: 71 },
      { id: 'knee', label: 'Knee (25)', x: 38, y: 84 },
      { id: 'ankle', label: 'Ankle (27)', x: 64, y: 84 },
    ],
  },
  {
    id: 'sujud_2',
    name: 'Sujud Kedua (Penutup Rakaat)',
    arabicTerm: 'السجود الثاني',
    stepOrder: 6,
    hipAngleDeg: 47,
    kneeAngleDeg: 51,
    spineInclinationDeg: 125,
    confidenceScore: 0.991,
    description: 'Sujud kedua terkonfirmasi oleh OpenCV state-machine → +1 Rakaat tercatat selesai.',
    joints: [
      { id: 'head', label: 'Head (0)', x: 26, y: 80 },
      { id: 'shoulder', label: 'Shoulder (11)', x: 36, y: 70 },
      { id: 'elbow', label: 'Elbow (13)', x: 32, y: 79 },
      { id: 'wrist', label: 'Wrist (15)', x: 22, y: 84 },
      { id: 'hip', label: 'Hip (23)', x: 54, y: 58 },
      { id: 'knee', label: 'Knee (25)', x: 52, y: 84 },
      { id: 'ankle', label: 'Ankle (27)', x: 68, y: 84 },
    ],
  },
];

export function createInitialRakaatState(prayer: PrayerType = 'subuh'): RakaatState {
  const config = PRAYER_CONFIGS[prayer];
  return {
    prayer,
    targetRakaat: config.targetRakaat,
    currentRakaat: 1,
    completedRakaat: 0,
    currentPostureIndex: 0,
    sujudCountInCurrentRakaat: 0,
    status: 'normal',
    alertMessage: `Pemantauan aktif untuk ${config.label} (Target: ${config.targetRakaat} Rakaat).`,
    historyLog: [`[INIT] Kamera OpenCV2 siap — Mode ${config.label} (${config.targetRakaat} Rakaat)`],
  };
}

export function stepPostureState(state: RakaatState): RakaatState {
  const nextIndex = (state.currentPostureIndex + 1) % POSTURE_SEQUENCE.length;
  const nextPosture = POSTURE_SEQUENCE[nextIndex];

  let completedRakaat = state.completedRakaat;
  let currentRakaat = state.currentRakaat;
  let sujudCount = state.sujudCountInCurrentRakaat;

  if (nextPosture.id === 'qiyam') {
    sujudCount = 0;
    currentRakaat = completedRakaat + 1;
  } else if (nextPosture.id === 'sujud_1') {
    sujudCount = 1;
  } else if (nextPosture.id === 'sujud_2') {
    sujudCount = 2;
    completedRakaat += 1;
  }

  let status: RakaatState['status'] = 'normal';
  let alertMessage = `Rakaat ${currentRakaat} dari ${state.targetRakaat} · Gerakan: ${nextPosture.name}`;

  if (completedRakaat > state.targetRakaat || (currentRakaat > state.targetRakaat && nextPosture.id !== 'sujud_2')) {
    status = 'excess_rakaat_warning';
    alertMessage = `PERINGATAN OPENCV: Terdeteksi masuk Rakaat ke-${Math.max(currentRakaat, completedRakaat)}! Melebihi batas ${PRAYER_CONFIGS[state.prayer].label} (${state.targetRakaat} Rakaat).`;
  } else if (completedRakaat === state.targetRakaat && nextPosture.id === 'sujud_2') {
    status = 'completed_exact';
    alertMessage = `TARGET TERCAPAI: ${completedRakaat}/${state.targetRakaat} Rakaat selesai. Waktunya Tahiyat Akhir & Salam.`;
  }

  const logEntry = `[FRAME] ${nextPosture.name} (θ_hip=${nextPosture.hipAngleDeg}°, conf=${(nextPosture.confidenceScore * 100).toFixed(1)}%) — Rakaat Selesai: ${completedRakaat}/${state.targetRakaat}`;

  return {
    ...state,
    currentPostureIndex: nextIndex,
    currentRakaat,
    completedRakaat,
    sujudCountInCurrentRakaat: sujudCount,
    status,
    alertMessage,
    historyLog: [logEntry, ...state.historyLog].slice(0, 8),
  };
}

export function triggerExcessRakaatScenario(prayer: PrayerType): RakaatState {
  const config = PRAYER_CONFIGS[prayer];
  const excessNumber = config.targetRakaat + 1;
  return {
    prayer,
    targetRakaat: config.targetRakaat,
    currentRakaat: excessNumber,
    completedRakaat: config.targetRakaat,
    currentPostureIndex: 0, // Back to Qiyam on an extra rakaat instead of sitting for final Tahiyat
    sujudCountInCurrentRakaat: 0,
    status: 'excess_rakaat_warning',
    alertMessage: `PERINGATAN OPENCV: Bangkit ke Rakaat ke-${excessNumber} terdeteksi setelah ${config.targetRakaat} rakaat selesai! Melebihi ketentuan ${config.label}.`,
    historyLog: [
      `[ALERT] Anomali transisi: Qiyam terdeteksi pada Rakaat ke-${excessNumber} (Batas ${config.label}: ${config.targetRakaat} Rakaat)`,
      `[OK] Sujud Kedua Rakaat ke-${config.targetRakaat} selesai (${config.targetRakaat}/${config.targetRakaat})`,
      `[INIT] Kamera OpenCV2 siap — Mode ${config.label} (${config.targetRakaat} Rakaat)`,
    ],
  };
}

export function triggerExactCompletionScenario(prayer: PrayerType): RakaatState {
  const config = PRAYER_CONFIGS[prayer];
  return {
    prayer,
    targetRakaat: config.targetRakaat,
    currentRakaat: config.targetRakaat,
    completedRakaat: config.targetRakaat,
    currentPostureIndex: 5, // Sujud 2 completed
    sujudCountInCurrentRakaat: 2,
    status: 'completed_exact',
    alertMessage: `TARGET TERCAPAI: ${config.targetRakaat}/${config.targetRakaat} Rakaat ${config.label} tuntas dengan presisi. Silakan lanjut Tahiyat Akhir.`,
    historyLog: [
      `[DONE] Target ${config.targetRakaat} Rakaat ${config.label} terpenuhi tanpa kelebihan rakaat.`,
      `[FRAME] Sujud Kedua Rakaat ke-${config.targetRakaat} terverifikasi (conf=99.1%)`,
    ],
  };
}

export interface InquirySubmission {
  name: string;
  email: string;
  institution: string;
  topic: string;
  message: string;
}

export function validateInquiry(input: InquirySubmission): { valid: boolean; error?: string } {
  if (!input.name.trim() || input.name.trim().length < 2) {
    return { valid: false, error: 'Mohon masukkan nama lengkap Anda (minimal 2 karakter).' };
  }
  if (!input.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    return { valid: false, error: 'Mohon masukkan alamat email yang valid.' };
  }
  if (!input.message.trim() || input.message.trim().length < 10) {
    return { valid: false, error: 'Pesan kolaborasi atau pertanyaan minimal terdiri dari 10 karakter.' };
  }
  return { valid: true };
}
