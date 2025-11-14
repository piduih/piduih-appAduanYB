<img width="780" height="505" alt="image" src="https://github.com/user-attachments/assets/9771b506-daa6-4e0d-9c96-381b93ca5673" />

# Sistem Aduan Komuniti YB

Aplikasi web ini direka untuk menjadi platform perantaraan antara komuniti dan wakil rakyat (YB). Ia membolehkan penduduk setempat menghantar aduan mengenai isu-isu komuniti dengan mudah, dan pada masa yang sama, menyediakan alat untuk YB menjejaki, mengurus, dan memberi maklum balas terhadap aduan tersebut secara telus.

## Ciri-ciri Utama

- **Borang Aduan Intuitif:** Pengguna boleh menghantar aduan dengan tajuk, keterangan terperinci, dan memuat naik gambar sebagai bukti.
- **Pengkategorian Pintar:** Menggunakan Google Gemini API untuk menganalisis keterangan aduan dan mencadangkan kategori yang relevan secara automatik (cth: Infrastruktur, Kebersihan, Keselamatan).
- **Dua Peranan Pengguna:** Paparan boleh diubah antara `Pengguna` (untuk membuat aduan) dan `YB` (untuk mengurus aduan) bagi tujuan demonstrasi.
- **Pengurusan Status Aduan:** YB boleh mengemas kini status setiap aduan kepada "Baru", "Dalam Proses", "Selesai", atau "Di Luar Bidang Kuasa".
- **Maklum Balas Telus:** YB boleh menambah ulasan atau nota tindakan pada setiap aduan, yang boleh dilihat oleh pengguna.
- **Penyimpanan Setempat:** Buat masa ini, data aduan disimpan dalam `localStorage` penyemak imbas untuk persistensi sesi semasa fasa prototaip.

## Struktur Teknologi

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **AI/ML:** Google Gemini API (untuk pengkategorian pintar)
- **Modul:** Menggunakan ES Modules terus dalam penyemak imbas melalui `importmap`, tanpa memerlukan proses `build`.

## Bagaimana Ia Berfungsi

1.  **Hantar Aduan:** Pengguna mengisi borang aduan. Apabila dihantar, Gemini API menganalisis teks untuk menetapkan kategori secara automatik.
2.  **Lihat Aduan:** Aduan baru muncul dalam senarai aduan yang disusun mengikut tarikh terkini.
3.  **Tukar Peranan:** Pengguna boleh menukar paparan kepada "Paparan YB" menggunakan butang di bahagian atas.
4.  **Tindakan YB:** Dalam paparan YB, wakil rakyat boleh mengubah status aduan dan menulis ulasan mengenai tindakan yang telah atau akan diambil.
5.  **Kemas Kini:** Perubahan yang dibuat oleh YB akan disimpan dan dipaparkan serta-merta pada aplikasi.

## Pelan Pembangunan (Roadmap)

Aplikasi ini sedang dalam pembangunan aktif. Pelan tindakan masa hadapan merangkumi tiga fasa utama:

1.  **Fasa 1 (Asas):** Menggantikan `localStorage` dengan backend dan pangkalan data sebenar, serta menambah sistem pengesahan pengguna.
2.  **Fasa 2 (Pengembangan):** Membina papan pemuka analitik untuk YB, mengintegrasikan peta geolokasi, dan menambah fungsi carian/penapisan.
3.  **Fasa 3 (Pintar):** Menggunakan Gemini API untuk analisis lanjutan (seperti pengesanan kedesakan) dan membina ciri penglibatan komuniti seperti sistem undian (upvoting).
