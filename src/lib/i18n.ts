export type Lang = 'en' | 'tr';

export const strings = {
  en: {
    title: 'Zanaat: a small workshop of open-source developer tools',
    description:
      'Zanaat makes focused open-source developer tools, Lonca and Baron, and writes about them in one place.',
    nav: { projects: 'Projects', writing: 'Writing', github: 'GitHub', label: 'Primary' },
    headline: ['A small workshop of open-source', 'developer tools.'],
    subhead: 'Build a mark. Open a tool.',
    bar: {
      label: 'Build the mark',
      moves: 'moves',
      solve: 'Solve',
      reset: 'Reset',
      target: (name: string) => `Build the ${name} mark`,
      hint: 'Click a tile to add or remove a module; finish a mark to open its tool.',
    },
    turn: {
      title: 'Your turn: build Baron’s mark.',
      body: 'Tap a tile inside the outline to place a module, tap a cube to lift it. The small corner pieces snap in by themselves when the mark is complete.',
      close: 'Got it',
    },
    writing: 'Writing',
    soon: 'Coming soon',
    projectsTitle: 'Projects',
    projectsLede: 'Each tool has its own site and its own mark, drawn on the same grid.',
    projects: {
      lonca: 'Type-safe TypeScript SDKs for Turkish e‑commerce marketplaces',
      baron: 'Work orchestration for AI coding agents',
      zanaat: 'The workshop itself: this site and every repository',
    },
    projectMore: {
      lonca: 'Trendyol and Hepsiburada today, n11 on the way. One interface for products, orders, inventory and webhooks.',
      baron:
        'Lets a coding agent work your tracker and source control through one contract: Azure DevOps, GitHub, Jira and Linear. Ships as a CLI, an MCP server and a Claude Code plugin.',
    },
    links: { site: 'Site', docs: 'Docs', code: 'GitHub', npm: 'npm' },
    openTitle: 'Open by default',
    openBody: 'Every line is public. Read the code, open an issue, send a pull request.',
    openLink: 'github.com/zanaat-dev',
    posts: [
      { title: 'Trendyol API’sini TypeScript ile 30 dakikada', lang: 'tr', project: 'lonca' },
      { title: 'Why your coding agent shouldn’t know what ‘Active’ means', lang: 'en', project: 'baron' },
    ],
    fieldLabel: 'A board of cubes. Building the Zanaat, Lonca or Baron mark opens that project.',
    footer: 'A small workshop of open-source developer tools.',
  },
  tr: {
    title: 'Zanaat: açık kaynak geliştirici araçları atölyesi',
    description:
      'Zanaat, Lonca ve Baron gibi odaklı açık kaynak geliştirici araçları yapar ve onları tek bir yerde yazar.',
    nav: { projects: 'Projeler', writing: 'Yazılar', github: 'GitHub', label: 'Ana menü' },
    headline: ['Açık kaynak geliştirici', 'araçları atölyesi.'],
    subhead: 'Bir işaret kur. Bir araç aç.',
    bar: {
      label: 'İşareti kur',
      moves: 'hamle',
      solve: 'Çöz',
      reset: 'Sıfırla',
      target: (name: string) => `${name} işaretini kur`,
      hint: 'Bir kareye tıklayıp modül ekle ya da kaldır; bir işareti tamamlayınca aracı açılır.',
    },
    turn: {
      title: 'Sıra sende: Baron’un işaretini kur.',
      body: 'Taslağın içindeki bir kareye dokun, modül koy; bir küpe dokun, kaldır. İşaret tamamlanınca köşedeki küçük parçalar kendiliğinden yerine oturur.',
      close: 'Anladım',
    },
    writing: 'Yazılar',
    soon: 'Yakında',
    projectsTitle: 'Projeler',
    projectsLede: 'Her aracın kendi sitesi ve aynı ızgarada çizilmiş kendi işareti var.',
    projects: {
      lonca: 'Türk e‑ticaret pazaryerleri için tip güvenli TypeScript SDK’ları',
      baron: 'AI kodlama ajanları için iş orkestrasyonu',
      zanaat: 'Atölyenin kendisi: bu site ve tüm depolar',
    },
    projectMore: {
      lonca: 'Bugün Trendyol ve Hepsiburada, yolda n11. Ürün, sipariş, stok ve webhook için tek arayüz.',
      baron:
        'Kodlama ajanının iş takibini ve kaynak kontrolünü tek bir sözleşmeyle yürütmesini sağlar: Azure DevOps, GitHub, Jira ve Linear. CLI, MCP sunucusu ve Claude Code eklentisi olarak gelir.',
    },
    links: { site: 'Site', docs: 'Doküman', code: 'GitHub', npm: 'npm' },
    openTitle: 'Varsayılan olarak açık',
    openBody: 'Her satır herkese açık. Kodu oku, issue aç, pull request gönder.',
    openLink: 'github.com/zanaat-dev',
    posts: [
      { title: 'Trendyol API’sini TypeScript ile 30 dakikada', lang: 'tr', project: 'lonca' },
      { title: 'Why your coding agent shouldn’t know what ‘Active’ means', lang: 'en', project: 'baron' },
    ],
    fieldLabel: 'Küplerden bir tahta. Zanaat, Lonca ya da Baron işaretini kurmak o projeyi açar.',
    footer: 'Açık kaynak geliştirici araçları atölyesi.',
  },
} as const;
