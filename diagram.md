# Diagram Seni Bina & Pelan Tindakan Aplikasi Aduan Komuniti

Diagram ini menggambarkan evolusi seni bina aplikasi "Sistem Aduan Komuniti" merentasi tiga fasa pembangunan seperti yang digariskan dalam pelan tindakan.

```mermaid
graph LR
    subgraph "Fasa 1: Pengukuhan Asas & Infrastruktur Teras"
        direction TB
        F1_Pengguna[Pengguna] -- Hantar/Lihat Aduan --> F1_WebApp[Aplikasi Web (React)]
        F1_YB[YB] -- Kemas Kini Aduan --> F1_WebApp
        F1_WebApp <--> F1_Backend[Backend API]
        F1_Backend --> F1_Auth[Sistem Pengesahan Pengguna]
        F1_Backend <--> F1_DB[(Pangkalan Data Terpusat)]
        F1_WebApp -.-> F1_Realtime[Kemas Kini Masa Nyata] -.-> F1_Backend
    end

    subgraph "Fasa 2: Pengembangan Ciri & Penglibatan Pengguna"
        direction TB
        F2_YB[YB] --> F2_Dashboard[Papan Pemuka (Dashboard) Analitik]
        F2_Dashboard -- Visualisasi Data --> F2_Backend[Backend API]
        F2_Pengguna[Pengguna] -- Tag Lokasi Aduan --> F2_Map[Integrasi Peta & Geolokasi]
        F2_Map --> F2_WebApp[Aplikasi Web]
        F2_WebApp --> F2_Search[Fungsi Carian & Penapisan]
        F2_Search -- Query Data --> F2_Backend
    end

    subgraph "Fasa 3: Ciri Pintar & Pemerkasaan Komuniti"
        direction TB
        F3_Backend[Backend API] -- Analisis Teks Lanjutan --> F3_Gemini[Gemini API]
        F3_Gemini -- Hasil (Kedesakan, Duplikat, Ringkasan) --> F3_Backend
        F3_Komuniti[Komuniti] --> F3_PublicBoard[Papan Aduan Awam]
        F3_PublicBoard -- Undian (Upvote) --> F3_Backend
        F3_YB[YB] --> F3_Announce[Saluran Pengumuman Rasmi]
        F3_Announce -- Papar Pengumuman --> F3_WebApp[Aplikasi Web]
    end

    Fasa1 -- Evolusi --> Fasa2 -- Evolusi --> Fasa3
```
