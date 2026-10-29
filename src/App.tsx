/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  IMAGES,
  HERO_METRICS,
  ARCHITECTURE_STEPS,
  TESTIMONIALS,
} from './data/profileData';
import { RakaatSimulator } from './components/RakaatSimulator';
import { ArchiveBentoSection } from './components/ArchiveBentoSection';
import { ContactSection } from './components/ContactSection';
import { ArrowRight, Code2 } from 'lucide-react';

export default function App() {
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-stone-900 selection:text-stone-50">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-xs border-b border-stone-200/90">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#profil"
            className="text-lg font-bold tracking-tight text-stone-950 whitespace-nowrap shrink-0"
          >
            Arya Apriawan
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
          >
            <a
              href="#profil"
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Profil
            </a>
            <a
              href="#arsitektur"
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Cara Kerja CV
            </a>
            <a
              href="#simulasi"
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Simulasi Rakaat
            </a>
            <a
              href="#arsip"
              className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Arsip &amp; HKI
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <a
              href="#simulasi"
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
            >
              Coba Simulasi CV
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section: Split-Screen + Full-Width 4-Column Metric Row Below */}
        <section id="profil" className="pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left Column: Typographic Hierarchy */}
              <div className="lg:col-span-7 flex flex-col justify-between py-2">
                <div>
                  <p className="text-xs font-medium text-stone-600 mb-4">
                    Mahasiswa Sistem &amp; Teknologi Informasi · Universitas Muhammadiyah Kendari (UMKENDARI)
                  </p>
                  <h1
                    className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-950 leading-[1.12] mb-6"
                    style={{ textWrap: 'balance' }}
                  >
                    Mengawal Kekhusyukan Ibadah Lewat{' '}
                    <span className="font-editorial italic font-normal text-stone-800">
                      Computer Vision
                    </span>{' '}
                    Pendeteksi Rakaat Salat.
                  </h1>
                  <p className="text-base text-stone-600 leading-relaxed max-w-[64ch] mb-8">
                    Profil resmi <strong>Arya Apriawan</strong>, inovator muda asal Kendari yang viral setelah mengembangkan{' '}
                    <em>sistem pendeteksi kesalahan jumlah rakaat salat otomatis</em> menggunakan bahasa pemrograman Python dan pustaka OpenCV2. Solusi teknologi tepat guna yang memadukan kecerdasan buatan dengan ketepatan beribadah serta telah didaftarkan Hak Kekayaan Intelektual (HKI).
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#simulasi"
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    Jalankan Simulasi OpenCV2
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#arsip"
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-stone-800 bg-stone-200/75 hover:bg-stone-300/75 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    Lihat Dokumentasi &amp; HKI
                  </a>
                </div>
              </div>

              {/* Right Column: Matching Height Visual Showcase */}
              <div className="lg:col-span-5 flex">
                <div className="relative w-full rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 flex flex-col justify-end min-h-[380px]">
                  {!heroImgError ? (
                    <img
                      src={IMAGES.portraitWorkspace}
                      alt="Arya Apriawan mengembangkan sistem deteksi rakaat salat berbasis OpenCV Python di ruang kerjanya"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 text-center text-stone-200">
                      <Code2 className="w-10 h-10 text-amber-400 mb-3" aria-hidden="true" />
                      <span className="text-sm font-semibold">
                        Arya Apriawan — Pengembang Sistem Deteksi Rakaat OpenCV2
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="relative p-6 text-stone-100">
                    <div className="text-xs text-stone-300 mb-1">
                      Kendari, Sulawesi Tenggara · 7 April 2026
                    </div>
                    <p className="text-sm font-medium leading-snug">
                      “Sistem deteksi sholat yang melebihi rakaatnya menggunakan OpenCV2 Python.”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Metric Row Below Hero Split */}
            <div className="mt-12 pt-10 border-t border-stone-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HERO_METRICS.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-stone-950">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold text-stone-800">{item.label}</div>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.context}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subtle Editorial Section Ribbon */}
        <div
          aria-hidden="true"
          className="py-3 border-y border-stone-200 bg-stone-100/80 overflow-hidden text-xs font-mono-tabular text-stone-500"
        >
          <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-6 overflow-x-auto whitespace-nowrap">
            <span>arya apriawan · universitas muhammadiyah kendari</span>
            <span>·</span>
            <span>opencv2 python pose estimation</span>
            <span>·</span>
            <span>deteksi otomatis kelebihan rakaat salat</span>
            <span>·</span>
            <span>terdaftar hak kekayaan intelektual (hki)</span>
          </div>
        </div>

        {/* Technical Architecture & Story Behind the Viral Innovation */}
        <section id="arsitektur" className="py-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left 5 Cols: Origin Story */}
              <div className="lg:col-span-5 space-y-5">
                <p className="text-xs font-medium text-stone-500">
                  Latar Belakang &amp; Cara Kerja Sistem
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900"
                  style={{ textWrap: 'balance' }}
                >
                  Dari Masalah Lupa Rakaat Menjadi Inovasi AI yang Viral Nasional
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Banyak umat Muslim pernah mengalami keraguan atau lupa jumlah rakaat ketika melaksanakan salat sendirian setelah seharian beraktivitas. Berangkat dari persoalan nyata tersebut, <strong>Arya Apriawan</strong>—mahasiswa Program Studi Sistem dan Teknologi Informasi di <strong>Universitas Muhammadiyah Kendari (UMKENDARI)</strong>—membangun prototipe cerdas berbasis <em>Computer Vision</em>.
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Saat pertama kali diunggah di akun TikTok pribadinya pada <strong>7 April 2026</strong>, karya ini langsung menarik perhatian jutaan penonton dan dibagikan ulang oleh berbagai akun media besar karena memadukan pemrograman Python OpenCV2 dengan kebutuhan ibadah sehari-hari secara kreatif.
                </p>
              </div>

              {/* Right 7 Cols: 4-Step Editorial Numbered Engineering Pipeline */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ARCHITECTURE_STEPS.map((step) => (
                  <div
                    key={step.index}
                    className="p-6 rounded-2xl bg-white border border-stone-200 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                        <span className="font-mono-tabular font-semibold text-stone-900">
                          {step.index}
                        </span>
                        <span>{step.meta}</span>
                      </div>
                      <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Claim-to-Proof Adjacency: Academic & Community Endorsements */}
            <div className="mt-14 pt-10 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <blockquote
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-stone-200 flex flex-col justify-between space-y-4"
                >
                  <p className="text-sm text-stone-700 leading-relaxed font-editorial italic">
                    “{t.quote}”
                  </p>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{t.author}</div>
                    <div className="text-xs text-stone-500">
                      {t.role} · {t.organization}
                    </div>
                    <div className="text-[11px] text-stone-600 mt-1.5 pt-1.5 border-t border-stone-100">
                      Capaian: {t.outcome}
                    </div>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Rakaat Detection Simulator */}
        <RakaatSimulator />

        {/* Archive Bento Grid & Lightbox */}
        <ArchiveBentoSection />

        {/* Contact & Collaboration Section */}
        <ContactSection />
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-stone-200 bg-[#FAF9F5] py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 Arya Apriawan · Mahasiswa Prodi Sistem dan Teknologi Informasi UMKENDARI.
          </div>
          <div className="flex items-center gap-6">
            <a href="#profil" className="hover:text-stone-900 transition-colors">
              Profil
            </a>
            <a href="#simulasi" className="hover:text-stone-900 transition-colors">
              Simulasi OpenCV
            </a>
            <a href="#arsip" className="hover:text-stone-900 transition-colors">
              Dokumentasi HKI
            </a>
            <a href="#kontak" className="hover:text-stone-900 transition-colors">
              Kontak
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
