import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Pakem Framework',
  description: 'Look like Laravel, Run at Rust Speed. Batteries-included web framework for Rust.',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,

  sitemap: {
    hostname: 'https://pakem.my.id'
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'alternate icon', type: 'image/png', href: '/logo.png' }],
    ['link', { rel: 'canonical', href: 'https://pakem.my.id/' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { name: 'author', content: 'Pakem Framework Core Team' }],
    ['meta', { name: 'keywords', content: 'pakem, pakem framework, rust web framework, laravel rust, axum, tokio, canting cli, indonesian rust framework, high performance web backend, blade rust, orm rust' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],

    // Open Graph / Facebook / WhatsApp / Telegram
    ['meta', { property: 'og:site_name', content: 'Pakem Framework' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Pakem Framework — Look like Laravel, Run at Rust Speed' }],
    ['meta', { property: 'og:description', content: 'Look like Laravel, Run at Rust Speed. Batteries-included web framework untuk Rust.' }],
    ['meta', { property: 'og:url', content: 'https://pakem.my.id/' }],
    ['meta', { property: 'og:image', content: 'https://pakem.my.id/og-image.png' }],
    ['meta', { property: 'og:image:secure_url', content: 'https://pakem.my.id/og-image.png' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'Pakem Framework — Look like Laravel, Run at Rust Speed' }],
    ['meta', { property: 'og:locale', content: 'id_ID' }],
    ['meta', { property: 'og:locale:alternate', content: 'en_US' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@pakem_rs' }],
    ['meta', { name: 'twitter:title', content: 'Pakem Framework — Look like Laravel, Run at Rust Speed' }],
    ['meta', { name: 'twitter:description', content: 'Look like Laravel, Run at Rust Speed. Batteries-included web framework untuk Rust.' }],
    ['meta', { name: 'twitter:image', content: 'https://pakem.my.id/og-image.png' }],

    // GEO & AI Search Engine Friendly Meta Tags
    ['meta', { name: 'ai-engine-content', content: 'index, snippet, summarize' }],
    ['meta', { name: 'generator', content: 'VitePress' }],

    // Schema.org Structured Data (JSON-LD) for Search Engines & Generative AI Graphs
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://pakem.my.id/#website',
            'url': 'https://pakem.my.id/',
            'name': 'Pakem Framework',
            'description': 'Look like Laravel, Run at Rust Speed. Batteries-included web framework for Rust.',
            'publisher': {
              '@id': 'https://pakem.my.id/#organization'
            },
            'inLanguage': ['id-ID', 'en-US']
          },
          {
            '@type': 'Organization',
            '@id': 'https://pakem.my.id/#organization',
            'name': 'Pakem Framework Core Team',
            'url': 'https://pakem.my.id/',
            'logo': 'https://pakem.my.id/logo.png',
            'sameAs': [
              'https://github.com/pakem-rs',
              'https://crates.io/crates/pakem'
            ]
          },
          {
            '@type': 'SoftwareApplication',
            '@id': 'https://pakem.my.id/#software',
            'name': 'Pakem Framework',
            'operatingSystem': 'Linux, macOS, Windows',
            'applicationCategory': 'DeveloperApplication',
            'programmingLanguage': 'Rust',
            'softwareVersion': '1.0.1',
            'license': 'https://opensource.org/licenses/MIT',
            'description': 'Look like Laravel, Run at Rust Speed. Menenun mahakarya perangkat lunak modern dengan ketelitian canting dan kekuatan pakem berkecepatan Rust.',
            'url': 'https://pakem.my.id/',
            'downloadUrl': 'https://crates.io/crates/pakem',
            'author': {
              '@id': 'https://pakem.my.id/#organization'
            }
          }
        ]
      })
    ]
  ],

  themeConfig: {
    siteTitle: 'Pakem Framework',
    logo: '/logo.svg',
    
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

