# 🌿 Modul 19 — Advanced Eloquent ORM, Model Lifecycle Observers & Seeding Suite

> *"Look like Laravel, Run at Rust Speed. Menghadirkan kecantikan Eloquent ORM Laravel dengan kecepatan raw Tokio & Axum tanpa overhead."*

Selamat datang di **Modul 19 Dokumentasi Resmi Pakem Framework**! Pada modul ini, kita akan mempelajari serangkaian fitur tingkat lanjut dari Eloquent ORM Pakem:
1. **Model Lifecycle Events & Observers (`ModelLifecycle` & `Observer<T>`)**
2. **Auto Slug Generator & Unique Collision Resolver (`AutoSlug`)**
3. **Auto Password Hashing Idempotent (`AutoHash`)**
4. **Dedicated Seeder Class Runner (`canting db:seed --class`) & `canting make:seeder`**
5. **Declarative Audit Trail Logging (`Audit::record`)**
6. **Advanced Eloquent Query Builder (`chunk`, `update_or_create`)**

---

## 🌟 1. Filosofi & Keindahan Kode

Di framework tradisional Rust, developer sering kali dipaksa menulis SQL manual atau berurusan dengan lifetime query yang rumit saat melakukan batch processing, pencatatan audit perubahan data, atau penanganan lifecycle hooks.

Pakem menghadirkan sintaksis ekspresif dan deklaratif yang terasa akrab bagi developer Laravel/Rails, namun dikompilasi ke machine code Rust yang sangat aman (*memory-safe*) dan secepat kilat (*zero-cost abstractions*).

---

## 🔄 2. Model Lifecycle Observers

Observer memungkinkan Anda mendengarkan event lifecycle entitas model ketika sedang disimpan, dibuat, diperbarui, atau dihapus.

### A. Lifecycle Hooks yang Tersedia
Trait `ModelLifecycle` menyediakan hook asinkron:
- `saving` & `saved` — Dipanggil sebelum & sesudah record disimpan (baik create maupun update).
- `creating` & `created` — Dipanggil sebelum & sesudah record baru dimasukkan ke database.
- `updating` & `updated` — Dipanggil sebelum & sesudah record yang sudah ada diperbarui.
- `deleting` & `deleted` — Dipanggil sebelum & sesudah record dihapus / di-soft-delete.

### B. Membuat Custom Observer
Implementasikan trait `Observer<T>`:

```rust
use pakem::prelude::*;
use crate::app::models::Article;

pub struct ArticleObserver;

#[async_trait::async_trait]
impl Observer<Article> for ArticleObserver {
    async fn creating(&self, pool: &DatabasePool, model: &mut Article) -> Result<(), sqlx::Error> {
        // Otomatis generate slug sebelum artikel disimpan
        if model.slug.is_empty() {
            model.slug = AutoSlug::generate(pool, Article::TABLE, &model.title, None).await?;
        }
        Ok(())
    }

    async fn created(&self, pool: &DatabasePool, model: &Article) -> Result<(), sqlx::Error> {
        // Catat ke Audit Trail secara otomatis
        Audit::record(pool)
            .on(Article::TABLE, model.id)
            .action("CREATE")
            .new_values(serde_json::to_value(model).unwrap_or_default())
            .save()
            .await?;
        Ok(())
    }
}
```

---

## 🔤 3. Auto Slug Generator & Collision Resolver (`AutoSlug`)

`AutoSlug` memudahkan Anda membuat slug URL SEO-friendly yang bersih dan otomatis menyelesaikan benturan (*collision*) jika slug sudah digunakan di database.

### Contoh Penggunaan:
```rust
use pakem::prelude::*;

// 1. Slugify sederhana teks biasa
let slug = AutoSlug::slugify("Panduan Belajar Rust & Pakem Framework 2026!");
// Hasil: "panduan-belajar-rust-pakem-2026"

// 2. Slugify unik berbasis database
// Jika "panduan-belajar-rust" sudah ada, otomatis menjadi "panduan-belajar-rust-1", "-2", dst.
let unique_slug = AutoSlug::generate(req.db(), "articles", &input_title, None).await?;

// 3. Saat Update: Mengecualikan ID artikel itu sendiri
let updated_slug = AutoSlug::generate(req.db(), "articles", &input_title, Some(article.id)).await?;
```

---

## 🔐 4. Auto Password Hashing (`AutoHash`)

Mengamankan kata sandi pengguna dengan Bcrypt standar industri. `AutoHash` bersifat *idempotent*: jika string sudah merupakan hash Bcrypt valid (`$2b$`, `$2a$`, `$2y$`), `AutoHash` tidak akan melakukan double-hash.

```rust
use pakem::prelude::*;

// Hashing kata sandi plain-text
let hashed = AutoHash::bcrypt("rahasia123", 10)?;
// Hasil: "$2b$10$..."

// Cek apakah string sudah di-hash
if !AutoHash::is_hashed(&user.password) {
    user.password = AutoHash::bcrypt(&user.password, 10)?;
}
```

---

## 📜 5. Dedicated Seeder Class Runner

Pakem memisahkan seeding database ke dalam class-class seeder independen ala Laravel.

### A. Membuat Seeder Baru via CLI
Gunakan perintah `make:seeder`:
```bash
canting make:seeder UserSeeder
canting make:seeder ProductSeeder
```
Perintah ini akan membuat file di `src/database/seeders/user_seeder.rs`.

### B. Struktur Class Seeder
```rust
use pakem::prelude::*;
use crate::app::models::User;

pub struct UserSeeder;

#[async_trait::async_trait]
impl Seeder for UserSeeder {
    async fn run(&self, pool: &DatabasePool) -> Result<(), sqlx::Error> {
        println!("🌱 Seeding pengguna administrator...");

        User::query(pool)
            .update_or_create([
                ("name", "Super Admin"),
                ("email", "admin@pakem.my.id"),
                ("password", &AutoHash::bcrypt("secret123", 10).unwrap()),
            ])
            .await?;

        Ok(())
    }
}
```

### C. Mendaftarkan ke `DatabaseSeeder`
Di `src/database/seeders/mod.rs`:
```rust
use pakem::prelude::*;

pub struct DatabaseSeeder;

#[async_trait::async_trait]
impl Seeder for DatabaseSeeder {
    async fn run(&self, pool: &DatabasePool) -> Result<(), sqlx::Error> {
        // Panggil seeder secara berurutan
        call_seeder::<UserSeeder>(pool).await?;
        call_seeder::<ProductSeeder>(pool).await?;
        Ok(())
    }
}
```

### D. Menjalankan Seeder Spesifik via CLI
```bash
# Menjalankan seluruh seeder (DatabaseSeeder utama)
canting db:seed

# Menjalankan HANYA class seeder tertentu
canting db:seed --class UserSeeder
canting db:seed --class ProductSeeder
```

---

## 🕵️ 6. Declarative Audit Trail Logging (`Audit`)

Catat riwayat mutasi data secara transparan untuk keperluan compliance enterprise (SOC 2, ISO 27001).

### A. Mencatat Log Audit Baru
```rust
use pakem::prelude::*;
use serde_json::json;

Audit::record(req.db())
    .on("orders", order_id)
    .action("UPDATE")
    .by_user(Some(operator_id))
    .ip(req.client_ip().as_deref())
    .user_agent(req.user_agent().as_deref())
    .diff(
        json!({ "status": "PENDING" }),
        json!({ "status": "PROCESSING" }),
    )
    .save()
    .await?;
```

### B. Membaca Riwayat Audit Entitas
```rust
// Ambil seluruh riwayat perubahan pesanan tertentu
let history = Audit::history(req.db(), "orders", order_id).await?;

for log in history {
    println!(
        "[{:?}] {} aksi {} oleh User {:?}",
        log.created_at, log.auditable_type, log.action, log.user_id
    );
}
```

---

## ⚡ 7. Advanced Eloquent Query Builder

### A. Ramah Memori: `chunk(size, callback)`
Memproses jutaan baris data tanpa membebani RAM server (*out-of-memory prevention*).

```rust
use pakem::prelude::*;
use crate::app::models::User;

// Proses setiap 500 pengguna sekaligus secara streaming
User::query(req.db())
    .where_eq("is_active", true)
    .chunk(500, |batch| async move {
        for user in batch {
            send_newsletter(&user).await;
        }
        Ok(())
    })
    .await?;
```

### B. Cek atau Buat/Update: `update_or_create(values)`
Mencari record berdasarkan klausa WHERE. Jika ditemukan, lakukan update kolom; jika tidak ditemukan, buat record baru.

```rust
let contact = Contact::query(req.db())
    .where_eq("email", "budi@pakem.my.id")
    .update_or_create([
        ("name", "Budi Santoso"),
        ("phone", "08123456789"),
    ])
    .await?;
```

---

## 🎯 Kesimpulan
Dengan kehadiran **Model Observers, AutoSlug, Dedicated Seeder Runner, Audit Trail, dan Advanced Eloquent Builder**, Pakem Framework semakin mengukuhkan posisinya sebagai backend framework modern terlengkap: **seindah Laravel, secepat Rust!**
