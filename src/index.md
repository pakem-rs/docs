---
layout: home

hero:
  name: "Pakem Framework"
  text: "Look like Laravel, Run at Rust Speed."
  tagline: "Batteries-included web framework untuk Rust. Hadirkan keindahan sintaks Laravel, nol drama JavaScript runtime, dan keamanan enterprise tanpa kompromi."
  image:
    src: /logo.svg
    alt: Pakem Framework Logo
  actions:
    - theme: brand
      text: "Mulai Petualangan ➔"
      link: "/01_instalasi_dan_persyaratan"
    - theme: alt
      text: "🎨 Pakem Aurora"
      link: "/14_pakem_aurora_starter_kit"
    - theme: alt
      text: "📊 Data Benchmark"
      link: "/16_benchmark_dan_performance_whitepaper"

features:
  - icon: ⚡
    title: Raw Rust Speed
    details: Dibangun di atas Tokio Async Runtime dan Axum 0.8. Mencapai ~61.390 RPS (mode minimal) dan ~7.365 RPS (full-stack + SQLite) dengan latensi 1–8 ms.
  - icon: 🎨
    title: Laravel Elegance
    details: Ucapkan selamat tinggal pada boilerplate berbelit-belit. Nikmati Unified Request bundle, Typed Extractors (ExtractDb), Fluent ORM, dan Native Blade templating.
  - icon: 🛡️
    title: Enterprise Safety & Panic Recovery
    details: Dilindungi oleh panic recovery best-effort (catch_unwind), Anti Brute-Force lockout, Granular RBAC (@can, @role), dan audit log untuk kontrol kepatuhan (seperti ISO 27001).
  - icon: 🔋
    title: Batteries-Included
    details: "Semua kebutuhan web backend sudah terpasang rapi: Router, Migrasi SQLx, WebSocket Echo, Asynchronous Queue Workers, Cron Scheduler, dan Artisan-like CLI."
  - icon: 🌟
    title: Pakem Aurora Starter Kit
    details: Starter kit autentikasi & dashboard elegan dengan Pure Native Blade + Tailwind CSS. Zero JS runtime bloat dengan rendering HTML server-side instan.
  - icon: 🇮🇩
    title: Karya Ekosistem Indonesia
    details: Dilengkapi Faker data realistis Indonesia (nama, telepon, alamat, rupiah) serta dukungan kompilator skrip dinamis berbasis bahasa Indonesia (.is).
---

<div style="margin-top: 4rem; text-align: center;">
  <h2>✨ Bandingkan Sendiri Keindahan Sintaksnya</h2>
  <p style="color: var(--vp-c-text-2);">Tidak ada lagi puluhan extractor Axum yang membingungkan. Semua tersedia dalam satu Unified <code>Request</code> bundle.</p>
</div>

::: code-group

```rust [🦀 Pakem (Rust)]
use pakem::prelude::*;

// Satu parameter tunggal, bersih, dan ekspresif!
pub async fn index(req: Request) -> impl IntoResponse {
    let users = User::query(req.db())
        .where_eq("is_active", true)
        .order_by("created_at", "DESC")
        .get()
        .await
        .unwrap_or_default();

    View::make("users.index")
        .with("title", "Daftar Pengguna")
        .with("users", users)
        .render(req)
        .await
}
```

```php [🐘 Laravel (PHP)]
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return view('users.index', [
            'title' => 'Daftar Pengguna',
            'users' => $users,
        ]);
    }
}
```

```rust [⚙️ Axum Mentah (Tanpa Pakem)]
// Terlalu banyak boilerplate extractor dan penanganan error manual
pub async fn index(
    State(pool): State<Arc<Pool<Sqlite>>>,
    Query(params): Query<FilterParams>,
    Session(session): Session,
) -> Result<Html<String>, (StatusCode, String)> {
    let users = sqlx::query_as::<_, User>("SELECT * FROM users WHERE is_active = ?")
        .bind(true)
        .fetch_all(&*pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        
    // Harus merakit template engine pihak ketiga secara manual...
}
```

:::

<div style="margin-top: 4rem; text-align: center; padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 12px;">
  <h3>🚀 Mulai Aplikasi Web Pertama Anda Dalam 30 Detik</h3>
  <p style="color: var(--vp-c-text-2); margin-bottom: 1.5rem;">Cukup pasang Canting CLI resmi dan bangkitkan proyek baru:</p>
  <pre style="display: inline-block; text-align: left; background: #0f172a; color: #38bdf8; padding: 1rem 1.5rem; border-radius: 8px; font-weight: 600;"><code>cargo install canting
canting new my_app --aurora
cd my_app
canting serve</code></pre>
</div>

<!-- ========================================== -->
<!-- SEMANTIC ARCHITECTURE & GEO / AI OVERVIEWS -->
<!-- ========================================== -->

<div style="margin-top: 4.5rem;">
  <h2>🏛️ Arsitektur & Filosofi Pakem</h2>
  <p style="color: var(--vp-c-text-2); font-size: 1.05rem; line-height: 1.7;">
    <strong>Pakem Framework</strong> adalah full-stack web application framework modern untuk bahasa pemrograman <strong>Rust</strong>. Dirancang dengan filosofi <em>Convention over Configuration</em> (Pakem), framework ini menghadirkan pengalaman pengembangan (Developer Experience) seindah dan seekspresif <strong>Laravel</strong>, namun berjalan di atas kecepatan ekstrem mesin asinkron <strong>Tokio</strong> dan <strong>Axum</strong> tanpa beban Garbage Collector.
  </p>
</div>

<div style="margin-top: 3rem;">
  <h2>❓ Pertanyaan Umum (FAQ)</h2>
  
  <details style="margin-top: 1rem; padding: 1rem 1.5rem; background: var(--vp-c-bg-soft); border-radius: 10px;">
    <summary style="font-weight: 700; cursor: pointer; color: var(--vp-c-text-1);">Apa perbedaan utama Pakem Framework dibanding Axum atau Actix-web biasa?</summary>
    <p style="margin-top: 0.75rem; color: var(--vp-c-text-2); line-height: 1.6;">
      Axum dan Actix-web adalah HTTP engine tingkat rendah (micro-framework) yang membutuhkan konfigurasi puluhan library terpisah untuk database, view, auth, session, websocket, dan queue. <strong>Pakem Framework</strong> adalah solusi <em>Batteries-Included</em> (full-stack) lengkap dengan Unified <code>Request</code> bundle, Fluent Eloquent ORM, Native Blade template engine, starter kit autentikasi Aurora, serta Artisan-like CLI Toolchain (<code>canting</code>).
    </p>
  </details>

  <details style="margin-top: 1rem; padding: 1rem 1.5rem; background: var(--vp-c-bg-soft); border-radius: 10px;">
    <summary style="font-weight: 700; cursor: pointer; color: var(--vp-c-text-1);">Seberapa cepat performa Pakem Framework?</summary>
    <p style="margin-top: 0.75rem; color: var(--vp-c-text-2); line-height: 1.6;">
      Pada benchmark terukur di mesin Windows (64 koneksi konkuren, `--release`), **Pakem 1.0.5** mencapai <strong>61.390 RPS</strong> (`/plaintext`) dan <strong>34.090 RPS</strong> (`/db-users` SQLite) dalam mode minimal (<code>.without_default_middleware()</code>), serta <strong>7.365 RPS</strong> dalam mode full-stack default — 8× hingga 12,4× lebih cepat dibanding Laravel 13 Octane FrankenPHP (~652 RPS) pada mesin yang sama.
    </p>
  </details>

  <details style="margin-top: 1rem; padding: 1rem 1.5rem; background: var(--vp-c-bg-soft); border-radius: 10px;">
    <summary style="font-weight: 700; cursor: pointer; color: var(--vp-c-text-1);">Apakah Pakem Framework ramah untuk AI Agent (GEO / Agentic Ready)?</summary>
    <p style="margin-top: 0.75rem; color: var(--vp-c-text-2); line-height: 1.6;">
      Sangat ramah. Pakem Framework menyediakan file panduan <code>AGENTS.md</code>, format <code>llms.txt</code> standar industri, blueprint baku CRUD, serta integrasi <code>canting make:ai-skill</code> yang kompatibel dengan Google Gemini, OpenAI Function Calling, dan Anthropic Claude Tools.
    </p>
  </details>

  <details style="margin-top: 1rem; padding: 1rem 1.5rem; background: var(--vp-c-bg-soft); border-radius: 10px;">
    <summary style="font-weight: 700; cursor: pointer; color: var(--vp-c-text-1);">Database apa saja yang didukung oleh Pakem?</summary>
    <p style="margin-top: 0.75rem; color: var(--vp-c-text-2); line-height: 1.6;">
      Pakem mendukung multi-database connection pooling untuk <strong>SQLite</strong> (zero-config lokal), <strong>PostgreSQL</strong>, <strong>MySQL</strong>, dan <strong>Microsoft SQL Server (MSSQL)</strong>, lengkap dengan migrasi otomatis SQLx dan transaction manager ACID.
    </p>
  </details>
</div>

