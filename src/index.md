---
layout: home

hero:
  name: "⚡ Pakem Framework"
  text: "Look like Laravel, Run at Rust Speed."
  tagline: "Batteries-included web framework untuk Rust. Hadirkan keindahan sintaks Laravel, nol drama JavaScript runtime, dan keamanan enterprise tanpa kompromi."
  actions:
    - theme: brand
      text: "Mulai Petualangan ➔"
      link: "/01_instalasi_dan_persyaratan"
    - theme: alt
      text: "🎨 Pakem Aurora"
      link: "/14_lumina_aurora_starter_kit"
    - theme: alt
      text: "📊 Data Benchmark"
      link: "/16_benchmark_dan_performance_whitepaper"

features:
  - icon: ⚡
    title: Raw Rust Speed
    details: Dibangun di atas Tokio Async Runtime dan Axum Engine. Latensi respons sub-milidetik (< 0.5ms), 118.000+ RPS, dan penggunaan memori sangat hemat (~15MB RAM).
  - icon: 🎨
    title: Laravel Elegance
    details: Ucapkan selamat tinggal pada boilerplate berbelit-belit. Nikmati Unified Request bundle, Fluent Eloquent ORM, Native Blade templating, dan sintaks deklaratif.
  - icon: 🛡️
    title: Zero-Panic & Enterprise Safety
    details: Dilindungi oleh Global Zero-Panic Error Boundary (catch_unwind), Anti Brute-Force lockout, Granular RBAC (@can, @role), dan Audit Trail ISO 27001.
  - icon: 🔋
    title: Batteries-Included
    details: "Semua kebutuhan web backend sudah terpasang rapi: Router, Migrasi SQLx, WebSocket Echo, Asynchronous Queue Workers, Cron Scheduler, dan Artisan-like CLI."
  - icon: 🌟
    title: Pakem Aurora Starter Kit
    details: Starter kit autentikasi & dashboard elegan dengan Pure Native Blade + Tailwind CSS. Zero JS runtime bloat, respons instan 60 FPS di perangkat apa pun.
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
  <p style="color: var(--vp-c-text-2); margin-bottom: 1.5rem;">Cukup pasang CLI dan bangkitkan proyek baru:</p>
  <pre style="display: inline-block; text-align: left; background: #0f172a; color: #38bdf8; padding: 1rem 1.5rem; border-radius: 8px; font-weight: 600;"><code>cargo install --git https://github.com/pakem-rs/pakem-cli
canting new my_app --aurora
cd my_app && canting serve</code></pre>
</div>

