# 📊 Modul 16: Laporan Benchmark & Performa Reproducible

> **Prinsip Utama:** *"Crafted with Canting Precision, Driven by the Raw Speed of Rust."*  
> Dokumen ini menyajikan hasil pengujian performa **nyata dan dapat direproduksi** antara **Pakem Framework v1.0.5**, **Axum 0.8 (polos)**, **Actix-web 4.20.0**, dan **Laravel 13 + Octane (FrankenPHP)** pada mesin yang sama.

---

## ⚙️ 1. Metodologi & Lingkungan Pengujian Nyata

Seluruh pengujian dijalankan secara berurutan pada mesin lokal yang sama dalam mode kompilasi `--release`:

* **Spesifikasi Mesin Uji**:
  - **Arsitektur & Core**: `AMD64` · `12 logical cores`
  - **Sistem Operasi**: `Microsoft Windows NT 10.0.26300.0`
  - **Compiler Rust**: `rustc 1.99.1 (58cf8f9c3 2026-10-13)` (`--release`)
  - **Runtime PHP/Octane**: `FrankenPHP 1.14.0` · `PHP 8.6.0` (4 worker threads, OPcache aktif, `APP_ENV=production`, `SESSION_DRIVER=array`)
* **Tool Beban Pengujian**: [`examples/bench_load.rs`](https://github.com/pakem-rs/framework/blob/1.x/examples/bench_load.rs) (`reqwest` HTTP/1.1 keep-alive pool)
* **Parameter Beban**:
  - Concurrency: `64` koneksi konkuren
  - Durasi: `5 detik` per endpoint (`0` error / `100%` sukses di semua skenario)
* **Skenario Endpoint**:
  1. `GET /plaintext` — Respons teks `"Hello, World!"`
  2. `GET /json` — Serialisasi JSON sederhana
  3. `GET /db-users` — Query SQLite in-memory (`SELECT id, name FROM bench_users LIMIT 10`)

---

## 📈 2. Hasil Perbandingan Terukur

| Framework | `/plaintext` (RPS) | `/json` (RPS) | `/db-users` (RPS) | p50 Latency | p99 Latency |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Axum 0.8 (polos)** | **71,700.9 RPS** | **70,605.7 RPS** | **34,463.9 RPS** | 0.86–1.80 ms | 1.62–3.02 ms |
| **Actix-web 4.20.0** | **67,219.5 RPS** | **66,934.5 RPS** | **30,251.6 RPS** | 0.92–2.06 ms | 1.92–3.23 ms |
| **Pakem 1.0.5 (`.without_default_middleware()`)** | **61,390.5 RPS** | **60,488.2 RPS** | **34,090.1 RPS** | 1.00–1.85 ms | 2.00–2.32 ms |
| **Pakem 1.0.5 (Full Stack Default)** | **5,207.8 RPS** *(Request)* | **7,573.6 RPS** *(Request)* | **7,364.9 RPS** *(ExtractDb)* | 8.20–9.94 ms | 13.90–35.08 ms |
| **Laravel 13 Octane (FrankenPHP)** | **652.2 RPS** | **662.4 RPS** | **594.1 RPS** | 95.39–106.41 ms | 116.36–147.96 ms |

> *(Catatan: Pada mode Full Stack Default, Pakem dijalankan dengan `APP_ENV=production` dan `RATE_LIMIT_MAX=10000000` agar beban uji tidak diblokir oleh rate limiter default 60 req/menit).*

---

## 🔬 3. Analisis Jujur: Apa Arti Angka Ini?

1. **Pakem Mode Minimal vs Axum/Actix Polos (*Apples-to-Apples*)**:
   - Saat middleware bawaan dimatikan menggunakan `.without_default_middleware()`, **Pakem 1.0.5** mencapai **61,390.5 RPS** (`/plaintext`), **60,488.2 RPS** (`/json`), dan **34,090.1 RPS** (`/db-users` dengan p99 **2.32 ms**).
   - Pada skenario query database (`/db-users`), Pakem minimal mencapai **98.9%** performa Axum 0.8 polos (`34,090` vs `34,464` RPS) dan **melampaui Actix-web 4.20.0** (`30,251` RPS).

2. **Pakem Full Stack Default vs Laravel 13 Octane**:
   - Dalam mode default *batteries-included*, setiap request melewati seluruh stack middleware Pakem: Session SQLite Store, CSRF protection, rate limiter, i18n, compression, security headers, dan panic recovery.
   - Meskipun membawa seluruh stack tersebut, **Pakem 1.0.5 Full Stack** tetap **8× – 12.4× lebih cepat** daripada Laravel 13 Octane (FrankenPHP) pada mesin yang sama (`7,364.9 RPS` vs `594.1 RPS` di `/db-users`, serta p99 latency ~8× lebih rendah).

3. **Biaya `Request` vs Typed Extractors (`ExtractDb`)**:
   - Extractor `Request` mengekstrak `Session`, `CsrfToken`, dan mengecek `session.get("user")` secara eager.
   - Untuk endpoint API publik berkecepatan tinggi, gunakan typed extractor ringan seperti `ExtractDb(db)` atau aktifkan `.without_default_middleware()` pada `Application`.

---

## 🧪 4. Cara Mereproduksi Pengujian Ini Sendiri

Seluruh kode benchmark tersedia di repositori [`pakem-rs/framework`](https://github.com/pakem-rs/framework):

```bash
# 1. Jalankan server benchmark Pakem dalam mode release
cargo run --release --example bench_server

# 2. Di terminal terpisah, jalankan load generator
cargo run --release --example bench_load

# Atau jalankan skrip PowerShell dengan oha / wrk:
./benches/run_bench.ps1
```

Lihat detail lengkap metodologi dan skrip pembanding di [`benches/README.md`](https://github.com/pakem-rs/framework/blob/1.x/benches/README.md).
