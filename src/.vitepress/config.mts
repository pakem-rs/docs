import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Pakem Framework',
  description: 'Look like Laravel, Run at Rust Speed. Batteries-included web framework for Rust.',
  base: '/docs/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'Pakem Framework — Look like Laravel, Run at Rust Speed' }],
    ['meta', { name: 'og:description', content: 'Web framework Rust modern dengan Developer Experience termanis, performa raw speed, dan keamanan enterprise.' }],
  ],

  themeConfig: {
    siteTitle: '⚡ Pakem Framework',
    
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Cari dokumentasi...',
                buttonAriaLabel: 'Cari dokumentasi'
              },
              modal: {
                noResultsText: 'Tidak ada hasil untuk',
                resetButtonTitle: 'Hapus pencarian',
                footer: {
                  selectText: 'untuk memilih',
                  navigateText: 'untuk navigasi',
                  closeText: 'untuk menutup'
                }
              }
            }
          }
        }
      }
    },

    nav: [
      { text: 'Panduan Awal', link: '/01_instalasi_dan_persyaratan' },
      { text: 'Aurora Starter Kit', link: '/14_pakem_aurora_starter_kit' },
      { text: 'Enterprise Security', link: '/15_enterprise_security_dan_zero_panic' },
      { text: 'Whitepaper Benchmark', link: '/16_benchmark_dan_performance_whitepaper' },
      {
        text: 'Ekosistem',
        items: [
          { text: 'Pakem Live (Reactive UI)', link: '/13_pakem_live_server_driven_ui' },
          { text: 'WASM Plugins', link: '/06_wasm_sandbox_dan_plugin' },
          { text: 'Indonesian Script (.is)', link: '/07_indonesian_script' },
          { text: 'Pakem Telescope', link: '/11_observabilitas_dan_telescope' },
        ]
      },
      { text: 'v1.0.0 (LTS)', link: 'https://github.com/pakem-rs/framework/releases' }
    ],

    sidebar: [
      {
        text: '🌟 Pengenalan & Persiapan',
        items: [
          { text: 'Tentang & Indeks Modul', link: '/README' },
          { text: '01. Persyaratan & Instalasi', link: '/01_instalasi_dan_persyaratan' },
        ]
      },
      {
        text: '🛣️ Fondasi Inti (The Basics)',
        items: [
          { text: '02. Routing & Middleware', link: '/02_routing_dan_middleware' },
          { text: '03. Controller & Unified Request', link: '/03_controller_dan_request' },
          { text: '05. Native Blade Template Engine', link: '/05_blade_template_engine' },
        ]
      },
      {
        text: '🗄️ Database & Eloquent ORM',
        items: [
          { text: '04. Model, Query Builder & Factory', link: '/04_model_dan_eloquent_orm' },
          { text: '19. Advanced Eloquent, Observers & Seeding', link: '/19_advanced_eloquent_model_observers_dan_seeding' },
        ]
      },
      {
        text: '🛡️ Keamanan & Enterprise Safety',
        items: [
          { text: '08. Autentikasi Dual (Session + JWT)', link: '/08_autentikasi_dan_keamanan' },
          { text: '15. Enterprise Security & Zero-Panic', link: '/15_enterprise_security_dan_zero_panic' },
        ]
      },
      {
        text: '🎨 Official Starter Kits & UI',
        items: [
          { text: '14. Pakem Aurora Starter Kit', link: '/14_pakem_aurora_starter_kit' },
          { text: '13. Pakem Live (Reactive UI)', link: '/13_pakem_live_server_driven_ui' },
        ]
      },
      {
        text: '⚡ Fitur Lanjutan (Advanced)',
        items: [
          { text: '20. Pakem Tinker (Interactive REPL)', link: '/20_canting_tinker' },
          { text: '21. Dynamic WASM & Hot-Reload', link: '/21_wasm_plugins_hot_reload' },
          { text: '06. WASM Sandbox & Plugin', link: '/06_wasm_sandbox_dan_plugin' },
          { text: '07. Indonesian Script (.is)', link: '/07_indonesian_script' },
          { text: '09. Broadcasting & WebSocket', link: '/09_broadcasting_dan_websocket' },
          { text: '10. Queue Jobs & Scheduler', link: '/10_queue_jobs_dan_scheduler' },
          { text: '17. Universal Storage & Redis Suite', link: '/17_universal_storage_dan_redis_suite' },
          { text: '18. API-First & Testing Kit', link: '/18_api_first_openapi_swagger_dan_testing_kit' },
          { text: '11. Observabilitas & Telescope', link: '/11_observabilitas_dan_telescope' },
        ]
      },
      {
        text: '🤖 AI Ecosystem & Hardware Bridge',
        items: [
          { text: '22. AI Context & Agent Skills', link: '/22_ai_agent_context_and_skills' },
          { text: '23. Pakem Hardware Bridge', link: '/23_pakem_hardware_bridge' },
          { text: '24. Pakem Desktop Engine', link: '/24_pakem_desktop_engine' },
        ]
      },
      {
        text: '🚀 Produksi & Pembuktian',
        items: [
          { text: '12. Deployment & DevOps', link: '/12_deployment_dan_devops' },
          { text: '16. Benchmark & Performance Whitepaper', link: '/16_benchmark_dan_performance_whitepaper' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pakem-rs' }
    ],

    footer: {
      message: 'Dirilis di bawah Lisensi MIT. Look like Laravel, Run at Rust Speed.',
      copyright: 'Copyright © 2026 Pakem Framework Core Team'
    },

    docFooter: {
      prev: 'Halaman Sebelumnya',
      next: 'Halaman Berikutnya'
    }
  }
})

