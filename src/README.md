# 📚 Dokumentasi Resmi Pakem Framework (v1.0.5)

> *"Look like Laravel, Run at Rust Speed. Menghadirkan Developer Experience termanis dengan performa raw speed, memory safety, dan keamanan tingkat enterprise."*

Selamat datang di pusat dokumentasi resmi **Pakem Framework**! Dokumentasi ini disusun secara berseri (*per episode/modul*) agar mudah dipahami, terstruktur secara profesional, dan mencakup seluruh fitur framework dari instalasi hingga deployment produksi berskala enterprise.

---

## 📑 Daftar Episode & Modul Pembelajaran

Klik tautan di bawah untuk mempelajari setiap modul secara mendalam:

| No | Modul Dokumentasi | Topik Pembahasan |
| :---: | :--- | :--- |
| **01** | [**Persyaratan Sistem & Instalasi**](./01_instalasi_dan_persyaratan.md) | Requirement Rust, instalasi CLI global, `canting new --db`, struktur folder MVC, `.env`, dan `canting serve`. |
| **02** | [**Routing & Middleware**](./02_routing_dan_middleware.md) | Definisi rute GET/POST/PUT/DELETE, parameter URL, group & prefix, custom middleware, security headers, rate limiting, dan CSRF. |
| **03** | [**Controller & Request Handling**](./03_controller_dan_request.md) | `canting make:controller`, Dependency Injection, Form & JSON payload, `canting make:request` (validasi), dan file upload. |
| **04** | [**Model & Eloquent ORM**](./04_model_dan_eloquent_orm.md) | `canting make:model`, migrasi SQL, `#[derive(PakemModel)]`, CRUD, Fluent Query Builder, pagination, relasi 1-baris, dan **Model Factory & Faker Engine (`make:factory`)**. |
| **05** | [**Blade Template Engine**](./05_blade_template_engine.md) | Variabel & escaping, layout inheritance (`@extends`, `@section`), perulangan `@foreach` & `$loop`, pipeline filter `{{ $val \| rupiah }}`, direktif `@wasm`, dan `@eval_is`. |
| **06** | [**WASM Sandbox & Plugin**](./06_wasm_sandbox_dan_plugin.md) | Arsitektur WASM Native Hybrid (`wasmi 2.0`), memory fault isolation, `canting plugin:new`, `canting plugin:build`, `canting plugin:list`, dan ABI memory bridge. |
| **07** | [**Indonesian Script (.is)**](./07_indonesian_script.md) | Konsep skrip backend, sintaks bahasa natural (`fungsi`, `jika`, `selama`), built-in helpers (`rupiah`, `panjang`), eksekusi di Controller & Blade `@eval_is`. |
| **08** | [**Autentikasi & Keamanan**](./08_autentikasi_dan_keamanan.md) | `canting make:auth`, hashing Bcrypt, Dual Auth (Session Web + JWT API), RBAC & perizinan (`can`), direktif Blade `@auth`/`@guest`, dan **Pakem Shield Security Scanner (`canting audit`)**. |
| **09** | [**Broadcasting & WebSocket (Pakem Echo)**](./09_broadcasting_dan_websocket.md) | Server WebSocket, Public vs Private Channel, otorisasi token JWT, event `ShouldBroadcast`, dan integrasi frontend JS. |
| **10** | [**Queue, Jobs & Scheduler**](./10_queue_jobs_dan_scheduler.md) | Background Jobs (`canting make:job`), dispatching asinkron, persistent queue database, dan cron-style task scheduler. |
| **11** | [**Observabilitas & Pakem Telescope**](./11_observabilitas_dan_telescope.md) | Dasbor pemantauan `/pakem/telescope`, request logger, query tracer, exception viewer, health checks `/up`, dan Tab Sandbox Metrics. |
| **12** | [**Deployment & DevOps**](./12_deployment_dan_devops.md) | Kompilasi produksi `cargo build --release`, Dockerfile multi-stage (`make:docker`), reverse proxy Nginx (`make:nginx`), Supervisor daemon (`make:supervisor`), dan backup otomatis. |
| **13** | [**Pakem Live (Reactive UI)**](./13_pakem_live_server_driven_ui.md) | Server-Driven Reactive UI ala Livewire/LiveView, Tri-Dialect (`kilat:*`, `live:*`, `wire:*`), Idiomorph DOM Morphing, Two-way Binding, dan `canting make:live`. |
| **14** | [**Pakem Aurora Starter Kit**](./14_pakem_aurora_starter_kit.md) | Official starter kit autentikasi & dashboard elegan dengan Pure Native Blade + Tailwind CSS (`canting aurora:install`), Zero-JS bloat, SSR ringan. |
| **15** | [**Enterprise Security & Panic Recovery**](./15_enterprise_security_dan_zero_panic.md) | Panic Recovery best-effort (`catch_unwind`), Anti Brute-Force Lockout Cache (Moka), Granular RBAC (`@can`, `@role`), Constant-Time Eq, OWASP Headers, Audit Log kepatuhan. |
| **16** | [**Whitepaper Benchmark & Performa Resmi**](./16_benchmark_dan_performance_whitepaper.md) | Data pengujian terukur: ~61.390 RPS (minimal) & ~7.365 RPS (full-stack + DB) vs Axum polos, Actix-web, dan Laravel Octane. |
| **17** | [**Universal Storage & Redis Suite**](./17_universal_storage_dan_redis_suite.md) | Universal Storage Facade (AWS S3, MinIO, R2, Local), Presigned URL SigV4, Distributed Redis Cache, Redis Streams Queue, dan Echo Redis Broadcaster. |
| **18** | [**API-First Suite, Swagger UI & Fluent Testing Kit**](./18_api_first_openapi_swagger_dan_testing_kit.md) | Route OpenAPI v3 metadata, auto Swagger UI (`/docs/swagger`), CLI `route:openapi`, `export:postman`, and `TestApp` Fluent HTTP assertions. |
| **19** | [**Advanced Eloquent, Model Observers & Seeding**](./19_advanced_eloquent_model_observers_dan_seeding.md) | Model Lifecycle Events (`ModelLifecycle`, `Observer<T>`), `AutoSlug`, `AutoHash`, Dedicated Seeder Runner (`db:seed --class`), Audit Trail (`Audit`), dan Query Builder `chunk` & `update_or_create`. |
| **20** | [**Pakem Tinker (Interactive CLI REPL)**](./20_canting_tinker.md) | Konsol terminal interaktif `canting tinker`, autocompletion, persistent history, evaluasi Eloquent Model, Query Builder, Raw SQL, dan helper facades. |
| **21** | [**Dynamic WASM Plugins & Hot-Reloading**](./21_wasm_plugins_hot_reload.md) | WebAssembly sandbox runtime (`wasmi 2.0`), zero-downtime hot-reloading otomatis, lifecycle hooks (`OnRequest`, `BeforeSave`, `AfterResponse`), metrics dashboard, dan `canting plugin:reload`. |
| **22** | [**AI-Ready Architecture & Agent Skills**](./22_ai_agent_context_and_skills.md) | Universal AI context auto-scaffolding (`AGENTS.md`, `.cursorrules`, Copilot, Claude), `make:ai-context`, `make:ai-skill`, Reverse-Engineer skill, dan native LLM facade (`Ai::gemini()`, `Ai::openai()`, `Ai::claude()`). |
| **23** | [**Pakem Hardware Bridge**](./23_pakem_hardware_bridge.md) | WebAssembly & WebUSB/WebSerial client bridge untuk Printer Thermal (ESC/POS), Barcode Scanner (EAN-13), Fingerprint Biometrik, dan Camera Scanner. |
| **24** | [**Pakem Desktop Compilation Engine**](./24_pakem_desktop_engine.md) | Single executable standalone native desktop GUI application (.exe di Windows, Linux binary, macOS), `desktop.toml`, `canting desktop:run`, dan `canting desktop:build`. |

---

## 🌟 Tiga Pilar Utama Pakem (The 3 Pillars)

1. **⚡ Fast (Rust Raw Speed)**: Dibangun di atas Tokio Async Runtime dan Axum 0.8 Engine. Zero-cost abstractions, throughput hingga ~61.390 RPS (minimal) dan ~7.365 RPS (full-stack + DB) pada uji lokal.
2. **🎨 Beauty (Laravel Elegance)**: Sintaksis deklaratif, ekspresif, dan human-readable. Unified `Request` bundle & Typed Extractors (`ExtractDb`), Fluent Query Builder, Native Blade Template, dan Starter Kit Aurora.
3. **🛡️ Safety (Enterprise Resilience)**: Jaminan keamanan memori dari Rust, panic recovery best-effort pada handler async, granular RBAC, serta audit log untuk membantu kontrol kepatuhan (seperti SOC 2 / ISO 27001).

---

👉 **Mulai petualangan Anda dengan membaca:** [**Modul 01: Persyaratan Sistem & Instalasi**](./01_instalasi_dan_persyaratan.md)
