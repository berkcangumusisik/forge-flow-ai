# ForgeFlow AI

A focused multi-agent engineering workflow for Claude Code. Scoped workers for web, backend, mobile, inspection, and review. Low token usage by design.

> Most multi-agent repos create more noise. ForgeFlow AI creates more focus.

---

## English

### Why this exists

Multi-agent setups usually waste tokens, rewrite unrelated files, and produce noisy output. ForgeFlow AI was built for developers who want a real, usable workflow inside Claude Code. It inspects before it implements, activates only the workers a task needs, and keeps every output short and scoped.

### What makes it different

- Inspect first, implement second
- Strict worker scopes, no cross-contamination
- Repository inspector runs before any code is touched
- Reviewer only looks at changed files and related contracts
- Every worker ends with a clear `DONE:<agent>:<task-id>` marker
- Mobile is React Native and works on Android and iOS
- Web and mobile UI default to dark mode and i18n

### Team structure

| Worker | Scope |
|---|---|
| `supervisor` | Classifies the task, activates only the workers needed |
| `repo-inspector` | Maps structure, dependencies, and risks. Never writes code unless told |
| `frontend-web` | Web UI, pages, components, frontend state and integrations |
| `backend` | API, auth, validation, database, business logic |
| `mobile-react-native` | React Native code for Android and iOS |
| `reviewer` | Inspects only the diff and related contracts |

### Low token philosophy

- No full-repo scans unless the task requires it
- Workers read only what they need
- Outputs stay concise, no filler, no restating the task
- Reuse existing patterns before inventing new ones
- One worker per scope, not one worker per thought

### Mobile support

Mobile work is React Native, targeting Android and iOS together. Safe area, navigation patterns, responsiveness, and shared logic reuse are part of the default checklist. No web assumptions leak into mobile files.

### UI philosophy

UI should feel like something a real product team would ship. Clean spacing, clear hierarchy, strong readability, aligned components. No template look, no AI-generated stiffness, no flashy noise. Reusable components are preferred over one-off snippets.

### Dark mode and i18n

- Dark mode is a first-class concern, not an afterthought
- Theme tokens stay centralized
- Strings are not hardcoded into components
- Translation files support at least English and Turkish
- Components render correctly in both themes and both languages

### Quick start

```bash
git clone https://github.com/YOUR_USERNAME/forge-flow-ai.git
cd forge-flow-ai
```

Open the project in Claude Code. The `.claude/` directory is picked up automatically.

### Example command usage

```text
/forgeflow add a settings page with theme toggle and language switcher
```

```text
/forgeflow build a POST /api/invoices endpoint with zod validation
```

```text
/forgeflow review the current branch before merging
```

The `/forgeflow` command classifies the task, activates only the workers required, and returns scoped assignments.

### Repository structure

```
forge-flow-ai/
  .claude/
    commands/
      forgeflow.md
    agents/
      supervisor.md
      repo-inspector.md
      frontend-web.md
      backend.md
      mobile-react-native.md
      reviewer.md
    skills/
      inspect-task/SKILL.md
      implement-web/SKILL.md
      implement-backend/SKILL.md
      implement-mobile/SKILL.md
      review-diff/SKILL.md
  README.md
  CLAUDE.md
  CONTRIBUTING.md
  LICENSE
```

### Roadmap

- [ ] Optional desktop worker (Electron / Tauri)
- [ ] Optional devops worker for CI and deploy tasks
- [ ] Preset stacks for Next.js, Expo, NestJS
- [ ] Starter i18n and theme packs
- [ ] Example repos wired to ForgeFlow

### Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR. Keep changes scoped, keep outputs short, keep the spirit of the project intact.

### License

MIT. See [LICENSE](LICENSE).

---

## Türkçe

### Neden var?

Çoğu çoklu ajan kurulumu token israf eder, ilgisiz dosyaları değiştirir ve karmakarışık çıktı üretir. ForgeFlow AI, Claude Code içinde gerçekten kullanılabilir bir akış isteyen geliştiriciler için yapıldı. Önce inceler, sonra yazar. Sadece görevin ihtiyacı olan işçileri devreye alır. Her çıktıyı kısa ve kapsamı belli tutar.

### Farkı nedir?

- Önce incele, sonra yaz
- İşçi kapsamları net, birbirine karışmaz
- Repo inspector koda dokunulmadan önce çalışır
- Reviewer sadece değişen dosyalara ve ilgili sözleşmelere bakar
- Her işçi `DONE:<agent>:<task-id>` formatıyla biter
- Mobil tarafı React Native, hem Android hem iOS
- Web ve mobil UI varsayılan olarak dark mode ve i18n destekler

### Ekip yapısı

| İşçi | Kapsam |
|---|---|
| `supervisor` | Görevi sınıflar, sadece gereken işçileri devreye alır |
| `repo-inspector` | Yapı, bağımlılık ve riskleri çıkarır. İstenmedikçe kod yazmaz |
| `frontend-web` | Web UI, sayfa, bileşen, frontend state ve entegrasyonlar |
| `backend` | API, auth, doğrulama, veritabanı, iş mantığı |
| `mobile-react-native` | Android ve iOS için React Native kodu |
| `reviewer` | Sadece diff ve ilgili sözleşmeleri inceler |

### Düşük token felsefesi

- Gerekli olmadıkça tüm repo taranmaz
- İşçiler sadece ihtiyaç duyduklarını okur
- Çıktı kısa tutulur, dolgu yoktur, görev tekrar edilmez
- Önce var olan desenler tekrar kullanılır
- Her düşünce için ayrı işçi yok, her kapsam için bir işçi var

### Mobil destek

Mobil tarafı React Native, Android ve iOS birlikte hedeflenir. Safe area, navigasyon, responsive davranış ve paylaşılan mantık yeniden kullanımı varsayılan olarak kontrol edilir. Web varsayımları mobil dosyalara sızmaz.

### UI felsefesi

UI, gerçek bir ürün ekibinin sahneye çıkaracağı gibi görünmeli. Temiz boşluk, net hiyerarşi, güçlü okunabilirlik ve hizalı bileşenler. Şablon görünümü yok, yapay sertlik yok, gürültülü süs yok. Tekrar kullanılabilir bileşenler tek seferlik parçalara tercih edilir.

### Dark mode ve i18n

- Dark mode sonradan eklenen bir şey değil, tasarımın parçası
- Tema tokenları merkezi tutulur
- String'ler bileşen içine gömülmez
- Çeviri dosyaları en az Türkçe ve İngilizce destekler
- Bileşenler her iki temada ve her iki dilde düzgün çalışır

### Hızlı başlangıç

```bash
git clone https://github.com/YOUR_USERNAME/forge-flow-ai.git
cd forge-flow-ai
```

Projeyi Claude Code'da aç. `.claude/` klasörü otomatik algılanır.

### Örnek kullanım

```text
/forgeflow tema ve dil seçimli bir ayarlar sayfası ekle
```

```text
/forgeflow zod doğrulamalı POST /api/invoices endpoint'i yaz
```

```text
/forgeflow merge öncesi mevcut branch'i review et
```

`/forgeflow` komutu görevi sınıflar, sadece gerekli işçileri devreye alır ve kapsamı belli görevler oluşturur.

### Repo yapısı

```
forge-flow-ai/
  .claude/
    commands/
      forgeflow.md
    agents/
      supervisor.md
      repo-inspector.md
      frontend-web.md
      backend.md
      mobile-react-native.md
      reviewer.md
    skills/
      inspect-task/SKILL.md
      implement-web/SKILL.md
      implement-backend/SKILL.md
      implement-mobile/SKILL.md
      review-diff/SKILL.md
  README.md
  CLAUDE.md
  CONTRIBUTING.md
  LICENSE
```

### Yol haritası

- [ ] Opsiyonel masaüstü işçisi (Electron / Tauri)
- [ ] CI ve deploy için opsiyonel devops işçisi
- [ ] Next.js, Expo, NestJS için hazır preset'ler
- [ ] Başlangıç i18n ve tema paketleri
- [ ] ForgeFlow'a bağlı örnek repolar

### Katkı

Katkılara açık. PR açmadan önce [CONTRIBUTING.md](CONTRIBUTING.md) dosyasını oku. Değişiklikleri kapsamlı tut, çıktıyı kısa tut, projenin ruhunu koru.

### Lisans

MIT. Bkz. [LICENSE](LICENSE).

---

Build less. Focus more. Ship sharper.
