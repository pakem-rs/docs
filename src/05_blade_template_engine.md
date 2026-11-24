# 📘 Modul 05: Blade Template Engine

Pakem mengadopsi sintaks **Laravel Blade** murni secara native di Rust (`resources/views/**/*.blade.rs`). Engine Blade di Pakem berjalan tanpa ketergantungan runtime berat, mendukung caching otomatis, pipeline filter berantai, dan delegasi ke plugin WASM Sandbox.

---

## 1. Menampilkan Variabel & Escaping

### Escaped Output (Aman dari XSS)
Gunakan kurung kurawal ganda `\{{ ... }}` untuk mencetak variabel yang otomatis di-escape HTML:
```html
<h1>Halo, {{ $user.name }}!</h1>
<p>Email: {{ $user.email }}</p>
```

### Raw / Unescaped Output
Gunakan tanda seru ganda `{!! ... !!}` jika Anda ingin mencetak konten HTML mentah:
```html
<div class="article-body">
    {!! $post.html_content !!}
</div>
```

---

## 2. Pewarisan Layout (Layout Inheritance)

Pakem Blade mendukung struktur template bertingkat menggunakan `@extends`, `@section`, dan `@yield`.

### Layout Induk (`resources/views/layouts/app.blade.rs`):
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>@yield('title') - Pakem App</title>
</head>
<body class="bg-slate-900 text-white">
    <nav>
        <a href="/">Home</a> | <a href="/products">Produk</a>
    </nav>

    <main class="container mx-auto p-6">
        @yield('content')
    </main>

    <footer>
        <p>&copy; 2026 Pakem Framework</p>
    </footer>
</body>
</html>
```

### Halaman Turunan (`resources/views/home.blade.rs`):
```html
@extends('layouts.app')

@section('title', 'Beranda')

@section('content')
    <div class="hero">
        <h1 class="text-3xl font-bold">Selamat Datang di Toko Kami</h1>
        <p>Temukan produk teknologi terbaik dengan harga hemat.</p>
    </div>
@endsection
```

---

## 3. Struktur Kontrol & Kondisional

### `@if`, `@elseif`, `@else`, `@endif`
```html
@if($user.is_admin)
    <span class="badge admin">Administrator</span>
@elseif($user.is_editor)
    <span class="badge editor">Editor</span>
@else
    <span class="badge user">Pengguna Biasa</span>
@endif
```

### `@unless` (Kebalikan dari `@if`)
```html
@unless($user.is_verified)
    <div class="alert">Silakan verifikasi email Anda terlebih dahulu!</div>
@endunless
```

### `@switch`, `@case`, `@default`
```html
@switch($order.status)
    @case('pending')
        <p>Pesanan sedang menunggu pembayaran.</p>
        @break
    @case('paid')
        <p>Pesanan telah lunas dan sedang diproses.</p>
        @break
    @default
        <p>Status pesanan tidak diketahui.</p>
@endswitch
```

---

## 4. Perulangan (Loops)

### `@foreach` & Variabel Ajaib `$loop`
```html
<ul>
    @foreach($products as $product)
        <li>
            #{{ $loop.index }} - {{ $product.name }}
            @if($loop.first) <span class="badge">PRODUK UTAMA</span> @endif
            @if($loop.last) <span class="badge">AKHIR DAFTAR</span> @endif
        </li>
    @endforeach
</ul>
```

### `@forelse` (Loop dengan Fallback Kosong)
```html
@forelse($items as $item)
    <div class="card">{{ $item.title }}</div>
@empty
    <p class="text-slate-400">Belum ada item yang tersedia saat ini.</p>
@endforelse
```

---

## 5. Form & Security Helpers

```html
<form method="POST" action="/posts/1">
    <!-- Token CSRF otomatis terinjeksi -->
    @csrf

    <!-- HTTP Method Spoofing untuk PUT / PATCH / DELETE -->
    @method('PUT')

    <input type="text" name="title" value="{{ $post.title }}">

    <!-- Attribute Helpers -->
    <input type="checkbox" name="active" @checked($post.is_active)>
    <button type="submit" @disabled($post.is_archived)>Perbarui</button>
</form>
```

---

## 6. Pipeline Filter Berantai

Pakem Blade mendukung operator pipa `|` untuk mentransformasi teks secara berurutan:

```html
<!-- Format Mata Uang Rupiah -->
<p>Total: {{ $nominal | rupiah }}</p>

<!-- URL Slug Generator & Uppercase -->
<p>Slug: {{ $title | slug | uppercase }}</p>

<!-- Pembatasan Panjang Teks -->
<p>Ringkasan: {{ $content | limit: 120 }}</p>

<!-- Kombinasi Berantai Bersama Filter WASM Sandbox -->
<p>{{ $komentar | sensor_kata | trim }}</p>
```

---

## 7. Direktif WebAssembly & Indonesian Script

### Direktif `@wasm`
Eksekusi fungsi plugin WebAssembly langsung di dalam view:
```html
<div>Hasil Filter WASM: @wasm('sensor_kata', 'sensor', $komentar)</div>
```

### Direktif `@eval_is`
Eksekusi logika perhitungan skrip Indonesian Script (`.is`) tanpa reload server:
```html
<span>Hemat Diskon: Rp @eval_is('promo.is', 'hitung_promo', $total, 'DISKON50')</span>
```

---

## 8. Komponen Blade Modern (`<x-... />`) & Parameter `@include`

### A. Sub-View Include dengan Parameter (`@include`)
Pakem Blade mendukung passing parameter ke sub-view via array binding maupun fungsi `compact(...)` dengan isolasi sub-context:

```html
<!-- Menggunakan Array Binding ala Laravel -->
@include('shared.alert', ['type' => 'danger', 'message' => 'Terjadi kesalahan sistem'])

<!-- Menggunakan compact() -->
@include('users.card', compact('user', 'status'))

<!-- Conditional Includes -->
@includeIf('analytics.tracker')
@includeWhen($user.is_admin, 'admin.toolbar')
@includeUnless($is_guest, 'components.user_menu')
```

### B. Komponen Blade (`<x-component />`)
Gunakan tag komponen kustom untuk membangun antarmuka deklaratif yang dapat digunakan ulang:

```html
<!-- Self-closing Component -->
<x-alert type="warning" message="Masa aktif akun Anda tinggal 3 hari!" />

<!-- Block Component dengan Default Slot -->
<x-card title="Statistik Penjualan">
    <p>Total transaksi bulan ini mengalami kenaikan sebesar 25%.</p>
</x-card>

<!-- Block Component dengan Named Slots -->
<x-modal id="confirm-delete">
    <x-slot:header>
        <h3 class="font-bold">Konfirmasi Penghapusan</h3>
    </x-slot:header>

    <p>Apakah Anda yakin ingin menghapus data ini secara permanen?</p>

    <x-slot:footer>
        <button class="btn btn-danger">Hapus</button>
    </x-slot:footer>
</x-modal>
```
Di dalam template komponen (`resources/views/components/card.blade.rs`), Anda cukup mencetak variabel `{{ $slot }}` dan slot spesifik `{{ $slot_header }}`:
```html
<div class="card shadow-md">
    <div class="card-header">{{ $slot_header }}</div>
    <div class="card-body">{{ $slot }}</div>
</div>
```

---

## 9. Asset Bundling & Helper Terintegrasi

### A. Asset Bundler (`@vite` & `mix`)
Pakem Blade mendukung integrasi modern asset bundler langsung di template:
```html
<head>
    <!-- Vite Bundler Tag -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- Laravel Mix Helper Fallback -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
```

### B. Helper Navigasi, String, & Operator Ternary
```html
<!-- Navigasi Aktif -->
<li class="{{ request()->is('dashboard*') ? 'active' : '' }}">Dashboard</li>

<!-- Session & Auth Helper -->
@if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
@endif

<span>Masuk sebagai: {{ auth()->user().name }}</span>

<!-- String Helpers -->
<p>{{ Str::limit($post.content, 100) }}</p>
<a href="/tags/{{ Str::slug($tag.name) }}">#{{ $tag.name }}</a>

<!-- Ternary Operator -->
<span class="status">{{ $user.is_active ? 'Aktif' : 'Non-Aktif' }}</span>
```

---

## 10. Proteksi Template Anti-Copas di Production (`@productionShield`) & Minifikasi HTML

Untuk melindungi kekayaan intelektual (IP), source code HTML, dan mencegah penyalinan template secara ilegal di lingkungan publik/production:

### A. Direktif `@productionShield`
Letakkan direktif `@productionShield` di layout induk (`layouts/app.blade.rs`) atau aktifkan via builder / env:
```html
<head>
    <title>Sistem Dashboard Enterprise</title>
    @productionShield
</head>
```
Fitur proteksi otomatis yang diaktifkan meliputi:
1. **Anti-Context Menu**: Mematikan klik kanan mouse (`contextmenu`).
2. **Shortcut Interception**: Memblokir pembukaan DevTools dan View Source (`F12`, `Ctrl+Shift+I`, `Ctrl+Shift+J`, `Ctrl+Shift+C`, `Ctrl+U`, `Ctrl+S`).
3. **Anti-Debugger Loop**: Mengeksekusi loop `debugger` asinkron dinamis untuk membekukan eksekusi JavaScript jika browser DevTools dibuka secara paksa.
4. **DevTools Resizing Detector**: Mendeteksi pembukaan docked DevTools melalui kalkulasi rasio dimensi layar browser.
5. **CSS Shield**: Mencegah seleksi teks sembarangan (`user-select: none`) dan drag-and-drop gambar (`user-drag: none`).

### B. Konfigurasi via Controller atau `.env`
Anda juga dapat mengontrol proteksi shield dan minifikasi HTML secara terpusat:
```rust
// Pada Controller
View::make("dashboard.index")
    .with("data", data)
    .shield()   // Aktifkan production shield
    .minify()   // Aktifkan minifikasi HTML
    .render(req)
    .await
```
Atau cukup tambahkan konfigurasi di `.env` produksi:
```env
BLADE_PRODUCTION_SHIELD=true
BLADE_MINIFY_HTML=true
```

---

## 11. Merender View dari Controller (`View::make` & `impl IntoResponse`)

Untuk merender template Blade dari Controller, gunakan builder `View::make(...)` atau `req.view(...)`:

```rust
use pakem::prelude::*;
use axum::response::IntoResponse;
use crate::app::models::user::User;

pub async fn show_dashboard(req: Request) -> impl IntoResponse {
    let users = User::all(req.db()).await.unwrap_or_default();
    let is_admin = req.user.as_ref().map(|u| u.role == "admin").unwrap_or(false);

    // Sintaks bebas ampersand (&) yang bersih dan mudah diketik
    View::make("dashboard.index")
        .with("title", "Dashboard — Pakem")
        .with("users", users)
        .with("is_admin", is_admin)
        .render(req)
        .await
}
```

Metode `.render(req).await` (atau `.render(&req).await`) secara otomatis:
1. Menyisipkan variabel global aplikasi (CSRF token, flash messages, data user auth aktif).
2. Mengompilasi dan mengeksekusi template Blade secara asinkron.
3. Mengembalikan tipe response yang langsung kompatibel dengan Axum `impl IntoResponse`.

---

### Navigasi Modul:
- **Sebelumnya**: [Modul 04: Model & Eloquent ORM](./04_model_dan_eloquent_orm.md) 
- **Berikutnya**: [Modul 06: WASM Sandbox & Plugin](./06_wasm_sandbox_dan_plugin.md) ➔
- **Kembali ke**: [Daftar Isi Dokumentasi](./README.md)
