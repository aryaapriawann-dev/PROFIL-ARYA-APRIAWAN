import React, { useState } from 'react';
import { ARCHIVE_ITEMS, ArchiveItem } from '../data/profileData';
import { X, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const ArchiveBentoSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cv' | 'hki' | 'media'>('all');
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filteredItems =
    activeFilter === 'all'
      ? ARCHIVE_ITEMS
      : ARCHIVE_ITEMS.filter((item) => item.category === activeFilter);

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="arsip" className="py-20 border-t border-stone-200/80">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header + Segmented Filter Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-medium text-stone-500 mb-2">
              Dokumentasi Karya · Riset &amp; Legalitas Inovasi
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900"
              style={{ textWrap: 'balance' }}
            >
              Arsip Karya, Sorotan Viral &amp; Hak Kekayaan Intelektual
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter Kategori Karya"
            className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 rounded-xl self-start"
          >
            {[
              { id: 'all', label: 'Semua Karya' },
              { id: 'cv', label: 'Computer Vision' },
              { id: 'hki', label: 'Publikasi & HKI' },
              { id: 'media', label: 'Sorotan Media' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Media-First Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredItems.map((item) => {
            const isWide = item.aspectSpan === 'wide' && activeFilter === 'all';
            return (
              <article
                key={item.id}
                className={`${
                  isWide ? 'lg:col-span-7' : 'lg:col-span-5'
                } group bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5`}
              >
                <div>
                  {/* Resilient Image Frame */}
                  <div className="relative h-64 sm:h-72 w-full bg-stone-900 overflow-hidden">
                    {!imgErrors[item.id] ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(item.id)}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-stone-900 text-stone-200">
                        <ShieldCheck className="w-8 h-8 text-amber-400 mb-2" aria-hidden="true" />
                        <span className="text-sm font-semibold">{item.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-stone-200">
                      <span>
                        {item.categoryLabel} · {item.date}
                      </span>
                      <span className="font-mono-tabular text-amber-300">{item.metricHighlight}</span>
                    </div>
                  </div>

                  {/* Card Copy */}
                  <div className="p-6">
                    <div className="text-xs text-stone-500 mb-2">{item.subtitle}</div>
                    <h3 className="text-xl font-bold text-stone-900 mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-stone-100">
                  <span className="text-xs text-stone-500">
                    {item.technicalDetails.length} spesifikasi terdokumentasi
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Baca Dokumentasi Lengkap
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox / Detail Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-archive-title"
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden border border-stone-200 shadow-xl my-auto">
            <div className="relative h-64 sm:h-80 bg-stone-950">
              {!imgErrors[selectedItem.id] && (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(selectedItem.id)}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Tutup detail dokumentasi"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-stone-950/80 text-white hover:bg-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <div className="text-xs text-stone-300 mb-1">
                  {selectedItem.categoryLabel} · {selectedItem.date} · {selectedItem.metricHighlight}
                </div>
                <h3 id="modal-archive-title" className="text-xl sm:text-2xl font-bold leading-snug">
                  {selectedItem.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {selectedItem.summary}
              </p>

              <div>
                <h4 className="text-xs font-semibold text-stone-900 mb-3">
                  Poin Teknis &amp; Fakta Lapangan
                </h4>
                <ul className="space-y-2 text-sm text-stone-600">
                  {selectedItem.technicalDetails.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono-tabular text-xs text-stone-400 mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedItem.codeSnippet && (
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 mb-2">
                    Cuplikan Logika Evaluasi Rakaat (Python + OpenCV2)
                  </h4>
                  <pre className="bg-stone-950 text-stone-100 p-4 rounded-xl text-xs font-mono-tabular overflow-x-auto leading-relaxed">
                    <code>{selectedItem.codeSnippet}</code>
                  </pre>
                </div>
              )}

              <div className="pt-4 border-t border-stone-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
                >
                  Tutup Dokumentasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
