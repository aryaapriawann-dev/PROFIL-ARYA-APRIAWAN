import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialRakaatState,
  stepPostureState,
  triggerExcessRakaatScenario,
  triggerExactCompletionScenario,
  validateInquiry,
  POSTURE_SEQUENCE,
} from './rakaatDetector';

test('initial state sets correct target rakaat for Subuh and Dzuhur', () => {
  const subuh = createInitialRakaatState('subuh');
  assert.equal(subuh.targetRakaat, 2);
  assert.equal(subuh.currentRakaat, 1);
  assert.equal(subuh.completedRakaat, 0);
  assert.equal(subuh.status, 'normal');

  const dzuhur = createInitialRakaatState('dzuhur');
  assert.equal(dzuhur.targetRakaat, 4);
});

test('stepping through all 6 postures increments completedRakaat by 1', () => {
  let state = createInitialRakaatState('subuh');
  // Initial index is 0 (qiyam). Stepping 5 times reaches index 5 (sujud_2)
  for (let i = 0; i < 5; i++) {
    state = stepPostureState(state);
  }
  assert.equal(POSTURE_SEQUENCE[state.currentPostureIndex].id, 'sujud_2');
  assert.equal(state.completedRakaat, 1);
  assert.equal(state.status, 'normal');
});

test('completing 2 full rakaat in Subuh triggers completed_exact status, and stepping again triggers excess_rakaat_warning', () => {
  let state = createInitialRakaatState('subuh');
  // Rakaat 1: 5 steps to sujud_2
  for (let i = 0; i < 5; i++) {
    state = stepPostureState(state);
  }
  assert.equal(state.completedRakaat, 1);

  // Rakaat 2: 6 steps from sujud_2 (index 5) -> qiyam (0) -> ... -> sujud_2 (5)
  for (let i = 0; i < 6; i++) {
    state = stepPostureState(state);
  }
  assert.equal(state.completedRakaat, 2);
  assert.equal(state.status, 'completed_exact');

  // Step once more: person stands up to Qiyam for Rakaat 3 in Subuh -> Excess Rakaat Warning!
  state = stepPostureState(state);
  assert.equal(state.currentRakaat, 3);
  assert.equal(state.status, 'excess_rakaat_warning');
});

test('preset excess and exact scenarios produce deterministic states', () => {
  const excess = triggerExcessRakaatScenario('maghrib');
  assert.equal(excess.targetRakaat, 3);
  assert.equal(excess.currentRakaat, 4);
  assert.equal(excess.status, 'excess_rakaat_warning');

  const exact = triggerExactCompletionScenario('isya');
  assert.equal(exact.targetRakaat, 4);
  assert.equal(exact.completedRakaat, 4);
  assert.equal(exact.status, 'completed_exact');
});

test('validateInquiry rejects empty or invalid submissions and accepts valid ones', () => {
  const invalidName = validateInquiry({
    name: '',
    email: 'test@umkendari.ac.id',
    institution: 'UMKENDARI',
    topic: 'Riset AI',
    message: 'Halo Arya, kami tertarik berdiskusi tentang riset OpenCV.',
  });
  assert.equal(invalidName.valid, false);

  const invalidEmail = validateInquiry({
    name: 'Budi Santoso',
    email: 'bukan-email',
    institution: 'UMKENDARI',
    topic: 'Riset AI',
    message: 'Halo Arya, kami tertarik berdiskusi tentang riset OpenCV.',
  });
  assert.equal(invalidEmail.valid, false);

  const valid = validateInquiry({
    name: 'Dr. Hendra Wijaya',
    email: 'hendra@umkendari.ac.id',
    institution: 'Universitas Muhammadiyah Kendari',
    topic: 'Kolaborasi Riset & HKI',
    message: 'Selamat atas viralnya inovasi deteksi rakaat salat berbasis OpenCV.',
  });
  assert.equal(valid.valid, true);
});
