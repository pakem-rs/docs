# 📘 Modul 01: Persyaratan Sistem & Instalasi

Selamat datang di dokumentasi resmi **Pakem Framework**! Modul ini membahas semua hal yang Anda butuhkan untuk memulai pengembangan aplikasi dengan Pakem dari awal.

---

## 1. Persyaratan Sistem (System Requirements)

Sebelum menggunakan Pakem, pastikan sistem komputer Anda telah terpasang:

- **Rust Compiler & Cargo**: Versi **1.75+** (Stable).
  - Cek versi: `rustc --version` dan `cargo --version`
  - Panduan instalasi: [rustup.rs](https://rustup.rs)
- **Database Engine** (Pilih salah satu atau beberapa sesuai kebutuhan):
  - **SQLite**: Cocok untuk pemula, prototyping cepat, zero-config tanpa server database tambahan.
  - **PostgreSQL**: Direkomendasikan untuk production berkinerja tinggi.
  - **MySQL / MariaDB**: Alternatif populer untuk aplikasi web standar.
- **Git**: Untuk inisialisasi repositori otomatis dan version control.
- *(Opsional)* **WebAssembly Target**: Jika Anda ingin mengembangkan plugin WASM:
  ```bash
  rustup target add wasm32-unknown-unknown
  ```

---

## 2. Instalasi Pakem CLI (`canting`)

Pakem dilengkapi dengan toolchain Command Line Interface (CLI) bawaan yang elegan dan canggih bernama `pakem`.

### Cara 1: Pasang Global via Crates.io
```bash
cargo install canting --force
```

### Cara 2: Pasang Langsung dari Repositori GitHub Resmi
```bash
cargo install --git https://github.com/pakem-rs/framework.git canting --force
```

Setelah instalasi selesai, verifikasi dengan menjalankan:
```bash
pakem --version
pakem --help
```

### Cara 3: Auto-Upgrade Toolchain & Dependensi Proyek
```bash
canting upgrade
```

### Cara 4: Instalasi Lokal dari Source Code
Jika Anda berkontribusi atau memodifikasi source code Pakem:
```bash
# Clone repositori framework
git clone https://github.com/pakem-rs/framework.git
cd framework

# Install biner CLI ke lingkungan Cargo lokal
cargo install --path canting --force
```

---

## 3. Membuat Proyek Baru (`canting new`)

Pakem menyediakan flag `--db` untuk mengonfigurasi driver database dan file `.env` secara instan, serta memangkas waktu kompilasi `cargo build` awal hingga **45%**.

### Opsi A: SQLite (Tercepat, Zero-Config)
```bash
canting new my-blog --db sqlite
```
> Otomatis membuat file `database.sqlite` dan menyiapkan dependensi SQLite yang ramping.

### Opsi B: PostgreSQL (Production Ready)
```bash
canting new enterprise-app --db postgres
```
> Menyiapkan driver PostgreSQL berkinerja tinggi dan template koneksi standard.

### Opsi C: MySQL / MariaDB
```bash
canting new store-app --db mysql
```

### Opsi D: Microsoft SQL Server (MSSQL Enterprise)
```bash
canting new enterprise-app --db mssql
```
> Menyiapkan driver pure-Rust TDS Tiberius berkecepatan tinggi tanpa memerlukan instalasi driver ODBC Microsoft eksternal di sistem operasi.

### Opsi E: Multi-Driver (Semua Driver Aktif)
```bash
canting new portal-app --db all
```

---

## 4. Struktur Direktori Proyek

Pakem menerapkan arsitektur **Model-View-Controller (MVC)** yang terorganisir rapi dan intuitif:

```text
my-app/
├── app/
│   └── scripts/             # Skrip Indonesian Script (.is) backend
├── database/
│   ├── migrations/          # File migrasi SQL skema tabel
│   └── seeders/             # Data seeding untuk pengujian/dummy
├── plugins/                 # Plugin WebAssembly (.wasm) dan source plugin
├── public/                  # Static assets publik (gambar, font, favicon)
├── resources/
│   ├── css/                 # Stylesheet CSS kustom
│   ├── js/                  # JavaScript frontend
│   └── views/               # Template Blade (.blade.rs)
│       ├── layouts/         # Layout dasar (@extends)
│       └── auth/            # Halaman login, register, profil
├── src/
│   ├── app/
│   │   ├── controllers/     # Controller handlers HTTP
│   │   ├── models/          # Model data (PakemModel derive)
│   │   ├── requests/        # Validasi Form/JSON request
│   │   └── services/        # Business logic layer
│   ├── routes/
│   │   ├── api.rs           # Endpoint RESTful API
│   │   └── web.rs           # Route halaman web
│   └── main.rs              # Entrypoint server aplikasi
├── storage/
│   ├── app/public/          # Berkas upload user
│   ├── cache/               # Cache aplikasi
│   └── logs/                # File log perputaran harian
├── .env                     # Konfigurasi environment lokal aktif
├── .env.example             # Template konfigurasi environment
└── Cargo.toml               # Dependensi Rust & Cargo crate
```

---

## 5. Konfigurasi Environment (`.env`)

Pakem mengadopsi standar **Laravel DX**. Anda **tidak perlu lagi menuliskan string `DATABASE_URL` yang panjang dan bertele-tele**. Cukup tentukan `DB_CONNECTION` dan parameter database terpisah:

### A. SQLite (Zero-Config)
```env
DB_CONNECTION=sqlite
DB_DATABASE=./database.sqlite
```

### B. MySQL / MariaDB
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_app
DB_USERNAME=root
DB_PASSWORD=secret
```

### C. PostgreSQL
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=my_app
DB_USERNAME=postgres
DB_PASSWORD=secret
```

### D. Microsoft SQL Server (MSSQL)
```env
DB_CONNECTION=sqlsrv
DB_HOST=127.0.0.1
DB_PORT=1433
DB_DATABASE=my_app
DB_USERNAME=sa
DB_PASSWORD=YourPassword123
```

> [!TIP]
> **Eksplisit `DATABASE_URL` Bersifat Opsional**: Jika variabel `DATABASE_URL` tidak didefinisikan di `.env`, mesin Pakem Framework otomatis merakit koneksi berkecepatan tinggi dari pasangan variabel `DB_*` di atas. Jika `DATABASE_URL` tetap ingin ditulis manual (misalnya untuk penyedia cloud PaaS seperti Supabase/Neon/Railway), Pakem akan memprioritaskannya.

### 5.1 Menghasilkan Kunci Aplikasi (`canting key:generate`)

Kunci aplikasi (`APP_KEY`) bertugas mengamankan cookie terenkripsi, sesi pengguna, token HMAC, dan snapshot state reaktif. Setiap kali membuat proyek baru atau mengkloning repositori, pastikan kunci aplikasi telah digenerate:

```bash
# Menghasilkan dan menyimpan APP_KEY acak 256-bit langsung ke file .env
canting key:generate

# Menampilkan key ke terminal tanpa memodifikasi file .env
canting key:generate --show

# Memperbarui APP_KEY sekaligus JWT_SECRET
canting key:generate --jwt
```

> [!IMPORTANT]
> Saat berada di lingkungan produksi (`APP_ENV=production`), `canting key:generate` otomatis meminta konfirmasi atau flag `--force` untuk mencegah kerusakan dekripsi data sesi dan token pengguna yang sedang aktif.

---

## 6. Menjalankan Server Aplikasi

Masuk ke folder proyek yang baru dibuat:
```bash
cd my-blog
```

### Menjalankan Server Standar:
```bash
canting serve
# atau langsung menggunakan: cargo run
```

### Menjalankan Server dengan Auto-Reload (Hot-Reloading):
Jika Anda menginstal `cargo-watch`, server akan otomatis restart setiap kali Anda menyimpan perubahan kode:
```bash
canting watch
```

Buka browser Anda dan akses:
👉 **`http://localhost:8000`**

---

### Navigasi Modul:
- **Berikutnya**: [Modul 02: Routing & Middleware](./02_routing_dan_middleware.md) ➔
- **Kembali ke**: [Daftar Isi Dokumentasi](./README.md)
