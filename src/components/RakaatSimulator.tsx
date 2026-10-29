import React, { useState, useEffect } from 'react';
import {
  PRAYER_CONFIGS,
  POSTURE_SEQUENCE,
  PrayerType,
  RakaatState,
  createInitialRakaatState,
  stepPostureState,
  triggerExcessRakaatScenario,
  triggerExactCompletionScenario,
} from '../utils/rakaatDetector';
import { Play, Pause, RotateCcw, StepForward, AlertTriangle, CheckCircle2, Camera } from 'lucide-react';

export const RakaatSimulator: React.FC = () => {
  const [state, setState] = useState<RakaatState>(() => createInitialRakaatState('subuh'));
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const currentPosture = POSTURE_SEQUENCE[state.currentPostureIndex];
  const currentPrayerConfig = PRAYER_CONFIGS[state.prayer];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = window.setInterval(() => {
      setState((prev) => stepPostureState(prev));
    }, 1100);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying]);

  const handleSelectPrayer = (prayer: PrayerType) => {
    setIsAutoPlaying(false);
    setState(createInitialRakaatState(prayer));
  };

  const handleNextStep = () => {
    setIsAutoPlaying(false);
    setState((prev) => stepPostureState(prev));
  };

  const handleReset = () => {
    setIsAutoPlaying(false);
    setState(createInitialRakaatState(state.prayer));
  };

  const handleTriggerExcess = () => {
    setIsAutoPlaying(false);
    setState(triggerExcessRakaatScenario(state.prayer));
  };

  const handleTriggerExact = () => {
    setIsAutoPlaying(false);
    setState(triggerExactCompletionScenario(state.prayer));
  };

  return (
    <section id="simulasi" className="py-20 border-t border-stone-200/80">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-stone-500 mb-2">
              Demonstrasi Interaktif · Algoritma OpenCV2 Python Arya Apriawan
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900"
              style={{ textWrap: 'balance' }}
            >
              Simulasi Deteksi Rakaat &amp; Geometri Postur Salat
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md leading-relaxed">
            Uji langsung bagaimana sistem membaca koordinat sendi tubuh, menghitung rakaat dari siklus sujud kedua, dan mengeluarkan peringatan saat melebihi batas rakaat.
          </p>
        </div>

        {/* Prayer Type Selector & Preset Scenarios */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
          <div
            role="group"
            aria-label="Pilih Waktu Salat"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl"
          >
            {(Object.keys(PRAYER_CONFIGS) as PrayerType[]).map((key) => {
              const cfg = PRAYER_CONFIGS[key];
              const isSelected = state.prayer === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectPrayer(key)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-stone-50 shadow-xs'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/50'
                  }`}
                >
                  {cfg.label} ({cfg.targetRakaat} Rakaat)
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleTriggerExcess}
              className="px-3.5 py-2 text-xs font-semibold text-rose-800 bg-rose-100/80 hover:bg-rose-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Uji Kasus: Kelebihan Rakaat
            </button>
            <button
              type="button"
              onClick={handleTriggerExact}
              className="px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100/80 hover:bg-emerald-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Uji Kasus: Tuntas Tepat Rakaat
            </button>
          </div>
        </div>

        {/* Main Workspace Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Cols: Live OpenCV Camera Frame Viewport */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-stone-950 text-stone-100 rounded-2xl p-6 border border-stone-800">
            {/* Top Viewport Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <Camera className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                <span className="font-mono-tabular text-xs text-stone-300">
                  opencv2_rakaat_detector.py · {currentPrayerConfig.label}
                </span>
              </div>
              <span className="font-mono-tabular text-xs text-stone-400">
                Confidence: {(currentPosture.confidenceScore * 100).toFixed(1)}%
              </span>
            </div>

            {/* Interactive SVG Pose Skeleton Canvas */}
            <div
              data-testid="cv-pose-viewport"
              data-status={state.status}
              className="relative my-4 bg-stone-900/90 rounded-xl border border-stone-800/90 overflow-hidden flex items-center justify-center min-h-[320px]"
            >
              <svg
                viewBox="0 0 100 96"
                className="w-full h-[300px] max-w-[440px]"
                role="img"
                aria-label={`Visualisasi kerangka OpenCV untuk gerakan ${currentPosture.name}`}
              >
                {/* Reference Grid Lines */}
                <line x1="10" y1="84" x2="90" y2="84" stroke="#3f3f46" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="50" y1="8" x2="50" y2="84" stroke="#27272a" strokeWidth="0.5" />
                <text x="12" y="91" fill="#71717a" fontSize="3.1" fontFamily="monospace">
                  BIDANG SAJADAH (Y=84)
                </text>

                {/* Connecting Bone Vectors */}
                {currentPosture.joints.slice(0, -1).map((joint, idx) => {
                  const nextJoint = currentPosture.joints[idx + 1];
                  // Connect head->shoulder->elbow->wrist and shoulder->hip->knee->ankle
                  if (joint.id === 'wrist') return null;
                  return (
                    <line
                      key={`${joint.id}-${nextJoint.id}`}
                      x1={joint.x}
                      y1={joint.y}
                      x2={nextJoint.x}
                      y2={nextJoint.y}
                      stroke={state.status === 'excess_rakaat_warning' ? '#fb7185' : '#38bdf8'}
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  );
                })}
                {/* Connect shoulder directly to hip for torso */}
                {(() => {
                  const shoulder = currentPosture.joints.find((j) => j.id === 'shoulder');
                  const hip = currentPosture.joints.find((j) => j.id === 'hip');
                  if (!shoulder || !hip) return null;
                  return (
                    <line
                      x1={shoulder.x}
                      y1={shoulder.y}
                      x2={hip.x}
                      y2={hip.y}
                      stroke={state.status === 'excess_rakaat_warning' ? '#f43f5e' : '#f59e0b'}
                      strokeWidth="2.1"
                      strokeLinecap="round"
                    />
                  );
                })()}

                {/* Joint Landmarks */}
                {currentPosture.joints.map((joint) => {
                  const isLeftLabel = joint.id === 'elbow' || joint.id === 'wrist' || joint.id === 'head';
                  return (
                    <g key={joint.id}>
                      <circle
                        cx={joint.x}
                        cy={joint.y}
                        r={joint.id === 'head' ? 4.0 : 2.2}
                        fill={state.status === 'excess_rakaat_warning' ? '#f43f5e' : '#10b981'}
                        stroke="#09090b"
                        strokeWidth="0.8"
                      />
                      <text
                        x={isLeftLabel ? joint.x - 3.8 : joint.x + 3.8}
                        y={joint.y + 1}
                        textAnchor={isLeftLabel ? 'end' : 'start'}
                        fill="#d4d4d8"
                        fontSize="2.8"
                        fontFamily="monospace"
                      >
                        {joint.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Live Angle Telemetry Overlay */}
              <div className="absolute top-3 left-3 bg-stone-950/85 border border-stone-800 rounded-lg px-3 py-2 text-xs font-mono-tabular space-y-1">
                <div className="text-stone-400">
                  θ_hip: <span className="text-stone-100 font-semibold">{currentPosture.hipAngleDeg}°</span>
                </div>
                <div className="text-stone-400">
                  θ_knee: <span className="text-stone-100 font-semibold">{currentPosture.kneeAngleDeg}°</span>
                </div>
                <div className="text-stone-400">
                  θ_spine: <span className="text-stone-100 font-semibold">{currentPosture.spineInclinationDeg}°</span>
                </div>
              </div>

              {/* Current Posture Readout */}
              <div className="absolute bottom-3 right-3 bg-stone-950/85 border border-stone-800 rounded-lg px-3.5 py-2 text-right">
                <div className="text-[11px] font-mono-tabular text-stone-400">
                  Langkah {currentPosture.stepOrder}/6 · {currentPosture.arabicTerm}
                </div>
                <div className="text-sm font-semibold text-white">{currentPosture.name}</div>
              </div>
            </div>

            {/* Alert Banner Inside Viewport */}
            <div
              role="status"
              aria-live="polite"
              className={`rounded-xl px-4 py-3 text-xs font-medium flex items-center gap-3 border ${
                state.status === 'excess_rakaat_warning'
                  ? 'bg-rose-950/90 border-rose-700 text-rose-100'
                  : state.status === 'completed_exact'
                  ? 'bg-emerald-950/90 border-emerald-700 text-emerald-100'
                  : 'bg-stone-900 border-stone-800 text-stone-200'
              }`}
            >
              {state.status === 'excess_rakaat_warning' ? (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              )}
              <span>{state.alertMessage}</span>
            </div>
          </div>

          {/* Right 5 Cols: State Machine Controls & Rakaat Telemetry */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-2xl p-6 border border-stone-200">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-200">
                <div>
                  <span className="text-xs text-stone-500 block">Status Perhitungan Rakaat</span>
                  <h3 className="text-lg font-bold text-stone-900">{currentPrayerConfig.label}</h3>
                </div>
                <span className="text-xs font-mono-tabular text-stone-500">
                  {currentPrayerConfig.timeWindow}
                </span>
              </div>

              {/* Numeric Rakaat Readout Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-stone-100/80 border border-stone-200/70">
                  <span className="text-xs text-stone-500 block mb-1">Rakaat Saat Ini</span>
                  <span
                    data-testid="current-rakaat-value"
                    className={`text-2xl font-bold font-mono-tabular ${
                      state.status === 'excess_rakaat_warning' ? 'text-rose-600' : 'text-stone-900'
                    }`}
                  >
                    {state.currentRakaat}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-100/80 border border-stone-200/70">
                  <span className="text-xs text-stone-500 block mb-1">Rakaat Selesai</span>
                  <span
                    data-testid="completed-rakaat-value"
                    className="text-2xl font-bold font-mono-tabular text-stone-900"
                  >
                    {state.completedRakaat} / {state.targetRakaat}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-100/80 border border-stone-200/70">
                  <span className="text-xs text-stone-500 block mb-1">Sujud Rakaat Ini</span>
                  <span className="text-2xl font-bold font-mono-tabular text-stone-900">
                    {state.sujudCountInCurrentRakaat} / 2
                  </span>
                </div>
              </div>

              {/* Explanation of Current Posture */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-stone-900 mb-1">
                  Analisis Postur: {currentPosture.name}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{currentPosture.description}</p>
              </div>

              {/* Frame Execution Log */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-stone-700 mb-2">
                  Log Deteksi Frame OpenCV2
                </div>
                <div className="bg-stone-100 rounded-xl p-3 font-mono-tabular text-[11px] text-stone-700 space-y-1.5 max-h-[120px] overflow-y-auto border border-stone-200/80">
                  {state.historyLog.map((entry, idx) => (
                    <div key={idx} className="truncate">
                      {entry}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <StepForward className="w-4 h-4" aria-hidden="true" />
                Gerakan Berikutnya
              </button>
              <button
                type="button"
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-900 bg-stone-200/80 hover:bg-stone-300/80 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-4 h-4" aria-hidden="true" />
                    Jeda Otomatis
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" aria-hidden="true" />
                    Jalankan Otomatis
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                aria-label="Reset Simulasi"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
