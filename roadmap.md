# Pelan Tindakan (Roadmap) Pembangunan Aplikasi Aduan Komuniti

Dokumen ini menggariskan pelan pembangunan strategik untuk aplikasi "Sistem Aduan Komuniti". Pelan ini dibahagikan kepada tiga fasa utama, bermula daripada pengukuhan infrastruktur asas sehingga pengenalan ciri-ciri pintar dan pemerkasaan komuniti.

---

### **Fasa 1: Pengukuhan Asas & Infrastruktur Teras (Jangka Pendek)**

**Matlamat:** Mengubah aplikasi daripada prototaip berasaskan penyemak imbas (browser-based) kepada aplikasi web berbilang pengguna (multi-user) yang berfungsi sepenuhnya.

1.  **Integrasi Backend & Pangkalan Data (Database)**
    *   **Masalah Semasa:** Data aduan disimpan dalam `localStorage`, terhad kepada peranti pengguna individu dan tidak dikongsi.
    *   **Tindakan:** Membina API backend (cth: Node.js/Express, Firebase Functions) dan menyambungkannya kepada pangkalan data terpusat (cth: Firestore, Supabase, PostgreSQL).
    *   **Hasil:** Semua aduan akan disimpan di satu lokasi pusat. Pengguna dan YB akan melihat data yang sama dan konsisten di semua peranti.

2.  **Sistem Pengesahan Pengguna (User Authentication)**
    *   **Masalah Semasa:** Peranan "Pengguna" dan "YB" boleh ditukar dengan bebas tanpa sebarang pengesahan.
    *   **Tindakan:** Melaksanakan sistem pendaftaran dan log masuk. Akaun YB memerlukan proses pengesahan khas (verification).
    *   **Hasil:** Memastikan hanya YB yang sah boleh mengemas kini status aduan. Membolehkan pengguna menjejaki sejarah aduan mereka sendiri.

3.  **Kemas Kini Masa Nyata (Real-time Updates)**
    *   **Masalah Semasa:** Pengguna perlu memuat semula (refresh) halaman untuk melihat sebarang kemas kini.
    *   **Tindakan:** Mengintegrasikan teknologi seperti WebSockets atau ciri pendengar (listeners) masa nyata daripada pangkalan data (cth: Firebase Firestore).
    *   **Hasil:** Apabila YB mengemas kini status atau komen, perubahan tersebut akan dipaparkan secara automatik pada skrin pengguna tanpa perlu muat semula, mewujudkan pengalaman yang lancar dan interaktif.

---

### **Fasa 2: Pengembangan Ciri & Penglibatan Pengguna (Jangka Sederhana)**

**Matlamat:** Menambah ciri-ciri baharu untuk meningkatkan nilai, kebolehgunaan, dan penglibatan pengguna.

1.  **Papan Pemuka (Dashboard) Khas untuk YB**
    *   **Idea:** Wujudkan satu halaman khas untuk YB yang memaparkan ringkasan data aduan secara visual.
    *   **Ciri-ciri:**
        *   Graf pai menunjukkan peratusan aduan mengikut status (Baru, Dalam Proses, Selesai).
        *   Graf bar menunjukkan jumlah aduan mengikut kategori (Infrastruktur, Kebersihan).
        *   Senarai aduan yang baru diterima untuk tindakan segera.
    *   **Hasil:** Membantu YB membuat keputusan berdasarkan data, mengenal pasti tren, dan memberi keutamaan kepada isu yang lebih kritikal.

2.  **Integrasi Peta & Geolokasi**
    *   **Idea:** Membenarkan pengguna menandakan lokasi aduan pada peta interaktif.
    *   **Tindakan:**
        *   Menambah komponen peta pada borang aduan.
        *   Menyimpan data koordinat (latitud/longitud) bagi setiap aduan.
        *   Memaparkan semua aduan sebagai pin di atas peta pada papan pemuka YB.
    *   **Hasil:** Memberi konteks geografi kepada aduan, memudahkan YB untuk mengenal pasti kluster masalah di kawasan tertentu dan merancang tindakan dengan lebih efisien.

3.  **Fungsi Carian dan Penapisan (Search & Filter)**
    *   **Idea:** Menambah bar carian dan opsyen penapisan pada senarai aduan.
    *   **Tindakan:** Membolehkan pengguna dan YB menapis aduan berdasarkan status, kategori, kata kunci, atau julat tarikh.
    *   **Hasil:** Memudahkan navigasi dan pengurusan apabila jumlah aduan semakin meningkat.

---

### **Fasa 3: Ciri Pintar & Pemerkasaan Komuniti (Jangka Panjang)**

**Matlamat:** Memanfaatkan teknologi AI secara lebih mendalam dan membina ciri-ciri yang menggalakkan penglibatan komuniti dua hala.

1.  **Analisis Aduan Lanjutan dengan Gemini API**
    *   **Idea:** Menggunakan Gemini untuk lebih daripada sekadar pengkategorian asas.
    *   **Ciri Potensi:**
        *   **Pengesanan Tahap Kedesakan (Urgency Detection):** Menganalisis teks aduan untuk memberi skor kedesakan secara automatik.
        *   **Pengesanan Aduan Pendua (Duplicate Detection):** Memberi amaran jika aduan yang serupa telah dihantar di kawasan berdekatan.
        *   **Penjanaan Ringkasan Automatik:** Menghasilkan laporan ringkasan mingguan/bulanan untuk YB.
    *   **Hasil:** Mengautomasikan tugas-tugas analisis dan membantu YB memberi fokus kepada perkara yang paling penting.

2.  **Papan Aduan Awam & Sistem Undian (Upvoting)**
    *   **Idea:** Wujudkan satu paparan awam di mana penduduk boleh melihat aduan (tanpa mendedahkan data peribadi penghantar) dan mengundi "Saya juga mengalami masalah ini".
    *   **Hasil:** Memberi YB data kuantitatif tentang isu mana yang memberi kesan kepada paling ramai penduduk, membantu dalam pengagihan sumber yang lebih demokratik.

3.  **Saluran Pengumuman Rasmi YB**
    *   **Idea:** Menyediakan satu ruang khas di mana YB boleh menyiarkan pengumuman rasmi kepada komuniti.
    *   **Hasil:** Menjadikan aplikasi ini platform komunikasi dua hala, bukan sahaja untuk menerima aduan tetapi juga untuk penyebaran maklumat proaktif daripada wakil rakyat.
