import React, { useState } from 'react';
import { validateInquiry, InquirySubmission } from '../utils/rakaatDetector';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface SavedInquiry extends InquirySubmission {
  id: string;
  timestamp: string;
}

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState<InquirySubmission>({
    name: '',
    email: '',
    institution: '',
    topic: 'Kolaborasi Riset AI / Computer Vision',
    message: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedList, setSubmittedList] = useState<SavedInquiry[]>([
    {
      id: 'seed-1',
      name: 'Tim Redaksi Teknologi Kendari',
      email: 'redaksi@sultratech.id',
      institution: 'Media Teknologi Sulawesi Tenggara',
      topic: 'Wawancara & Liputan Media',
      message: 'Mengapresiasi karya deteksi rakaat salat berbasis OpenCV2 karya Arya Apriawan di UMKENDARI.',
      timestamp: 'Terverifikasi · Arsip Publik',
    },
  ]);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateInquiry(form);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Mohon periksa kembali isian formulir Anda.');
      setJustSubmitted(false);
      return;
    }

    setErrorMessage(null);
    const newEntry: SavedInquiry = {
      ...form,
      id: `inq-${Date.now()}`,
      timestamp: 'Baru saja dikirim',
    };
    setSubmittedList((prev) => [newEntry, ...prev]);
    setJustSubmitted(true);
    setForm({
      name: '',
      email: '',
      institution: '',
      topic: 'Kolaborasi Riset AI / Computer Vision',
      message: '',
    });
  };

  return (
    <section id="kontak" className="py-20 border-t border-stone-200/80 bg-stone-100/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Cols: Academic & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-medium text-stone-500 mb-2">
                Terbuka untuk Diskusi Ilmiah &amp; Pengembangan
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900"
                style={{ textWrap: 'balance' }}
              >
                Hubungi Arya Apriawan untuk Riset, Seminar &amp; Kolaborasi
              </h2>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              Tertarik mendiskusikan implementasi Computer Vision (OpenCV2 Python), undangan seminar kampus, liputan media, atau pengembangan lanjutan sistem asisten ibadah berbasis AI? Kirimkan pesan langsung melalui formulir ini.
            </p>

            <div className="space-y-4 pt-2 border-t border-stone-200 text-sm">
              <div>
                <div className="text-xs text-stone-500">Afiliasi Akademik</div>
                <div className="font-semibold text-stone-900">
                  Program Studi Sistem dan Teknologi Informasi (STI)
                </div>
                <div className="text-stone-600">Universitas Muhammadiyah Kendari (UMKENDARI)</div>
              </div>
              <div>
                <div className="text-xs text-stone-500">Fokus Keahlian</div>
                <div className="font-semibold text-stone-900">
                  Computer Vision · Python OpenCV2 · Pose Estimation · Sistem Cerdas
                </div>
              </div>
              <div>
                <div className="text-xs text-stone-500">Status Karya Inovasi</div>
                <div className="font-semibold text-stone-900">
                  Terdaftar Hak Kekayaan Intelektual (HKI) · Rilis Perdana 7 April 2026
                </div>
              </div>
            </div>

            {/* Recent Inquiries Log */}
            <div className="pt-4 border-t border-stone-200">
              <h3 className="text-xs font-semibold text-stone-700 mb-3">
                Daftar Pesan &amp; Apresiasi Masuk ({submittedList.length})
              </h3>
              <div className="space-y-2.5" data-testid="inquiry-list">
                {submittedList.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-white border border-stone-200/90 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-stone-500">
                      <span className="font-semibold text-stone-900">{item.name}</span>
                      <span>{item.timestamp}</span>
                    </div>
                    <div className="text-stone-500">
                      {item.institution || 'Umum'} · {item.topic}
                    </div>
                    <p className="text-stone-700 pt-1">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200">
            <h3 className="text-lg font-bold text-stone-900 mb-1">
              Formulir Kolaborasi &amp; Kontak Langsung
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Semua kolom bertanda bintang (*) wajib diisi dengan benar.
            </p>

            {errorMessage && (
              <div
                role="alert"
                className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}

            {justSubmitted && !errorMessage && (
              <div
                role="status"
                className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>
                  Pesan Anda berhasil tercatat dan ditambahkan ke daftar pesan kolaborasi Arya Apriawan.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Contoh: Dr. Rahmat Hidayat"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Alamat Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="nama@institusi.ac.id"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-inst" className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Institusi / Kampus / Media
                  </label>
                  <input
                    id="contact-inst"
                    type="text"
                    value={form.institution}
                    onChange={(e) => setForm({ ...form, institution: e.target.value })}
                    placeholder="Universitas / Perusahaan / Komunitas"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
                <div>
                  <label htmlFor="contact-topic" className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Topik Keperluan
                  </label>
                  <select
                    id="contact-topic"
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                  >
                    <option value="Kolaborasi Riset AI / Computer Vision">
                      Kolaborasi Riset AI / Computer Vision
                    </option>
                    <option value="Undangan Pembicara / Workshop Kampus">
                      Undangan Pembicara / Workshop Kampus
                    </option>
                    <option value="Wawancara & Liputan Media">Wawancara &amp; Liputan Media</option>
                    <option value="Lisensi HKI & Pengembangan Produk">
                      Lisensi HKI &amp; Pengembangan Produk
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-stone-800 mb-1.5">
                  Pesan atau Rencana Kolaborasi *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tuliskan pesan, pertanyaan teknis mengenai OpenCV deteksi rakaat salat, atau agenda kolaborasi Anda..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                Kirim Pesan Kolaborasi
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
