# 🧬 Modul 25: Polyglot System Cloning Suite

> **Visi:**  
> *"Look like Laravel, Run at Rust Speed. Pindahkan sistem lama Anda yang sudah matang dan berjalan bertahun-tahun di Laravel, CodeIgniter, .NET, Golang, atau Java ke performa ekstrem Rust dalam hitungan detik."*

<p align="center">
  <img src="/demo-polyglot-clone.gif" alt="Pakem Polyglot System Cloner Demo" style="border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4); margin: 20px 0;">
</p>

---

## 🏛️ 1. Latar Belakang & Masalah Migrasi Bahasa

Migrasi aplikasi dari bahasa pemrograman lama (PHP, C#, Java, Python) ke **Rust** sering kali menjadi momok yang menakutkan bagi tim rekayasa perangkat lunak:
- Penulisan ulang (*rewriting*) kode dari nol memakan waktu berbulan-bulan hingga bertahun-tahun.
- Risiko *human error* saat mentranslasikan relasi tabel, tipe data, validasi, dan routing.
- Masalah kata sandi pengguna: sistem lama menggunakan algoritma hash warisan (Bcrypt, SHA-1, MD5) yang membuat pengguna lama tidak bisa login jika tidak dipaksa mereset kata sandi.

**Pakem Framework menghadirkan solusinya**: Sebuah ekosistem perkakas CLI terintegrasi (**Canting Polyglot Cloner**) yang mampu mengkloning skema database fisik, logika bisnis, routing, template view, dan kontrak REST API secara otomatis, dilengkapi **Legacy Auth Adapter** untuk migrasi login tanpa gangguan (*zero-downtime*).

---

## 🗄️ 2. `canting clone:db` (Database Reverse Engineering)

Memindai database fisik aktif (SQLite, PostgreSQL, MySQL/MariaDB) dan otomatis menghasilkan Model Rust lengkap dengan relasi Eloquent:

```bash
# Kloning seluruh skema database aktif
canting clone:db

# Kloning tabel tertentu dengan RESTful API Controller dan Factory
canting clone:db --tables users,posts,comments --with-controllers --with-factories

# Mode simulasi tanpa menulis file (pratinjau)
canting clone:db --dry-run
```

### Kemampuan Cerdas:
1. **Smart Relation Inference**: Otomatis mendeteksi kunci asing (*Foreign Key*) menjadi makro deklaratif `has_many!` dan `belongs_to!`.
2. **Pivot Table Detection**: Otomatis mengenali tabel persimpangan many-to-many (misal `post_tag`, `user_roles`) menjadi `belongs_to_many!`.
3. **Soft Deletes Detection**: Tabel dengan kolom `deleted_at` otomatis dipasangi penanganan Soft Delete.

---

## 🚀 3. `canting clone:laravel` (Laravel Project Transpiler)

Mengkloning langsung struktur logika dari direktori proyek **Laravel** ke **Pakem Framework**:

```bash
# Kloning seluruh model, routes, views, dan controllers dari proyek Laravel
canting clone:laravel /path/ke/proyek/laravel --with-controllers

# Hanya mengkloning Eloquent Models
canting clone:laravel /path/ke/proyek/laravel --models-only

# Hanya mengonversi template Blade PHP ke Pakem Blade (.blade.rs)
canting clone:laravel /path/ke/proyek/laravel --views-only

# Mode pratinjau (Dry-Run)
canting clone:laravel /path/ke/proyek/laravel --dry-run
```

### Komponen yang Ditranspilasikan:
- **Eloquent Models (`app/Models/*.php`)**:
  - Mengurai `$table`, `$primaryKey`, `$fillable`, `$casts`, `$timestamps`, dan `SoftDeletes`.
  - Mentranspilasi relasi `hasMany`, `belongsTo`, `belongsToMany`, dan `hasOne` menjadi makro Pakem Rust.
- **Routes (`routes/web.php` & `routes/api.php`)**:
  - Mentranspilasikan `Route::get`, `Route::post`, `Route::put`, `Route::delete`.
  - Menguraikan `Route::resource('posts', PostController::class)` menjadi 7 route RESTful standar.
- **Blade Views (`resources/views/**/*.blade.php` ➔ `.blade.rs`)**:
  - Mengonversi pemanggilan panah objek PHP `$post->user->name` menjadi `$post.user.name` dan `$loop->iteration` menjadi `$loop.iteration`.
  - Mengonversi operator null-safe PHP `$post?->user?->name` menjadi `$post.user.name`.
  - Mentranspilasikan direktif sesi Laravel `@session('status') ... @endsession` menjadi `@if(session('status'))`.
  - Menetralkan blok skrip PHP mentah `@php ... @endphp` menjadi komentar informatif agar tidak merusak kompilasi Blade.
  - Mendukung komponen Blade modern (`<x-... />`, `<x-slot:...>`), parameter sub-view `@include` (`['key' => $val]`, `compact(...)`), serta bundler `@vite(['...'])` dan `mix('...')`.
- **Controllers (`app/Http/Controllers/*.php`)**:
  - Membangkitkan controller Pakem Rust yang mematuhi Unified `Request` bundle dan `PakemResult`.

---

## 🇮🇩 4. `canting clone:ci` (CodeIgniter 3 & 4 Transpiler)

Mengkloning aplikasi enterprise berbasis **CodeIgniter 3** maupun **CodeIgniter 4**:

```bash
# Kloning seluruh aplikasi CodeIgniter 3 atau 4
canting clone:ci /path/ke/proyek/codeigniter --with-controllers

# Hanya mengonversi View PHP Native CI ke Blade Pakem (.blade.rs)
canting clone:ci /path/ke/proyek/codeigniter --views-only
```

### Kemampuan Otomatis:
- **Deteksi Dual-Version**: Otomatis mendeteksi folder `application/` (CI3) atau `app/` (CI4).
- **Normalisasi Model**: Membersihkan konvensi penamaan lama seperti `User_model` atau `UserModel` menjadi Struct Rust `User`.
- **View Transpiler**: Mengonversi `<?= $var ?>` menjadi `{{ $var }}`, `form_open()` menjadi form HTML dengan proteksi bawaan `@csrf`, serta kontrol alur `<?php if ...: ?>` menjadi `@if`.
- **Route Converter**: Mengubah wildcard CI `(:num)` dan `(:any)` menjadi parameter `{id}` dan `{slug}` di `routes/web.rs`.

---

## 🌐 5. `canting clone:api` (Universal OpenAPI & Swagger Cloner — .NET / Golang / Java)

Mengkloning kontrak RESTful API dari ekosistem **ASP.NET Core (.NET)**, **Golang (Gin/Fiber/Echo)**, maupun **Spring Boot** ke Pakem:

```bash
# Kloning kontrak API dari URL endpoint Swagger langsung
canting clone:api https://api.example.com/swagger/v1/swagger.json --with-controllers

# Kloning dari file lokal OpenAPI
canting clone:api ./openapi.json --dto-only
```

### Kemampuan Otomatis:
- **DTO Model Generator**: Menghasilkan Struct Rust DTO bertipe kuat dengan derive `#[derive(Serialize, Deserialize)]` di `src/app/dto/`.
- **API Routes**: Otomatis menghasilkan pemetaan rute lengkap di `routes/api.rs`.
- **API Controllers**: Membangkitkan controller handlers yang mengembalikan standar `PakemResult`.

---

## 🛡️ 6. Zero-Downtime Password & Auth Migration

Untuk menjamin pengguna lama dapat langsung login tanpa reset password, Pakem menyediakan **Multi-Framework Legacy Auth Migration Adapter**:

```rust
use pakem::prelude::*;

// Cukup gunakan check_with_migration pada LoginController Anda:
let (is_valid, needs_rehash) = Hash::check_with_migration("password123", &user.password);

if is_valid {
    if needs_rehash {
        // Password cocok tapi masih berformat lama (Laravel $2y$, CI3 SHA1, atau MD5)
        // Otomatis re-hash ke standar Tri-Layer Pakem (Layer 0 Sandi A-N Hybrid -> Layer 1 Pepper -> Layer 2 Bcrypt)!
        let new_hash = Hash::make("password123");
        User::query(req.db())
            .where_eq("id", user.id)
            .update_one("password", new_hash)
            .await?;
    }
    // Lanjutkan proses login seperti biasa
}
```

---

### Navigasi Modul:
- **Sebelumnya**: [Modul 24: Pakem Desktop Engine](./24_pakem_desktop_engine.md)
- **Kembali ke**: [Daftar Isi Dokumentasi](./README.md)
