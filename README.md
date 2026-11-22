# 📚 Pakem Framework Official Documentation Portal

> **Repository Resmi:** `https://github.com/pakem-rs/docs`  
> **Live Site:** `https://pakem.my.id/`  
> *"Look like Laravel, Run at Rust Speed."*

Portal dokumentasi resmi untuk **Pakem Framework**, dibangun menggunakan **VitePress** untuk performa static site generation secepat kilat, nol JavaScript bloat pada halaman bacaan, dan tampilan dark/light mode yang elegan.

---

## 🚀 Menjalankan Secara Lokal (Local Development)

```bash
# 1. Masuk ke direktori docs_portal
cd docs_portal

# 2. Pasang dependensi
npm install

# 3. Jalankan development server lokal
npm run dev
```

Buka peramban Anda di `http://localhost:5173/docs/`.

---

## 🏗️ Melakukan Build Statis

```bash
npm run build
```

Hasil kompilasi statis akan berada di `src/.vitepress/dist/`.

---

## 📤 Mendorong ke GitHub (`pakem-rs/docs`)

Repositori ini telah dilengkapi dengan GitHub Actions (`.github/workflows/deploy.yml`) untuk proses auto-deployment ke **GitHub Pages**.

```bash
# Inisialisasi git di dalam folder docs_portal
git init
git add .
git commit -m "docs: release Pakem v0.5.0 official documentation portal"
git branch -M main
git remote add origin https://github.com/pakem-rs/docs.git
git push -u origin main
```

Setelah dipush:
1. Masuk ke halaman repositori di GitHub: `https://github.com/pakem-rs/docs/settings/pages`.
2. Pada bagian **Build and deployment > Source**, pilih **GitHub Actions**.
3. Portal dokumentasi akan otomatis aktif di: `https://pakem.my.id/`!

