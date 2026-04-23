<div align="center">

# ⚡ ForgeFlow AI

### Claude Code için odaklı çoklu ajan mühendislik akışı.
#### Scope disiplinli işçiler. Düşük token. Varsayılan olarak modern UI, dark mode ve i18n.

<br />

**🌐 Dil:** [English](README.md) · **Türkçe**

<br />

[![Lisans: MIT](https://img.shields.io/badge/Lisans-MIT-000000.svg?style=for-the-badge)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code_için-üretildi-CC785C?style=for-the-badge&logo=anthropic&logoColor=white)](https://claude.com/claude-code)
[![PR'lar açık](https://img.shields.io/badge/PR-memnuniyetle-3DDC84?style=for-the-badge)](CONTRIBUTING.md)
[![Türkiye](https://img.shields.io/badge/Üretim_yeri-Türkiye-E30A17?style=for-the-badge)](README.tr.md)

<br />

![GitHub yıldız](https://img.shields.io/github/stars/berkcangumusisik/forge-flow-ai?style=social)
![GitHub fork](https://img.shields.io/github/forks/berkcangumusisik/forge-flow-ai?style=social)
![GitHub issue](https://img.shields.io/github/issues/berkcangumusisik/forge-flow-ai)
![Son commit](https://img.shields.io/github/last-commit/berkcangumusisik/forge-flow-ai)

<br />

> **Çoğu çoklu ajan repo'su daha çok gürültü üretir. ForgeFlow AI daha çok odak üretir.**

[Hızlı Başlangıç](#-hızlı-başlangıç) · [Ekip](#-ekip) · [Kullanım](#-örnek-kullanım) · [Çoklu dil kurulumu](#-çoklu-dil-readme-kurulumu) · [English README](README.md)

</div>

---

## 🧭 ForgeFlow AI nedir?

ForgeFlow AI, Claude Code projenin içine yerleşen bir çoklu ajan iş akışıdır. Altı tane scope'u belli işçi (supervisor, repo-inspector, frontend-web, backend, mobile-react-native, reviewer), bir slash komutu ve beş skill rehberi getirir. Amaç basit: token israfını ve ilgisiz dosya değişikliklerini bitirmek.

- 🔍 **Önce incele, sonra yaz.** Repo-inspector önce ilgili alanı çıkarır.
- 🎯 **Katı işçi kapsamları.** Web backend'e dokunmaz. Backend UI'ya dokunmaz. Mobile web'e dokunmaz.
- 🪶 **Düşük token mimarisi.** Tüm repo taraması yok. Dosya dump'ı yok. Görevi tekrarlama yok.
- 🎨 **Üretime hazır UI.** Dark mode, i18n, modern boşluk, gerçek bileşen tekrar kullanımı.
- 📱 **Mobil React Native.** Android ve iOS birlikte.
- ✅ **Her işçi temiz biter.** `DONE:<agent>:<task-id>`.

---

## ✨ Neden var?

Çoğu çoklu ajan repo'su bir prompt yığını gibi hissettiriyor. Token yakıyor, istemediğin dosyaları değiştiriyor ve önüne bir çıktı duvarı koyuyor. ForgeFlow AI, güvenebileceğin tekrarlı bir iş akışı isteyen geliştiriciler için yapıldı. Daha az okur. Daha az yazar. Daha çok teslim eder.

---

## 🧩 Farkı ne?

| | Tipik çoklu ajan repo | ForgeFlow AI |
|---|---|---|
| Repo okuma | Tüm repo taraması | Sadece kapsamlı inceleme |
| İşçi scope'u | Gevşek, üst üste binen | Katı, ayrık |
| Review adımı | Her şeyi tekrar okur | Sadece diff ve ilgili sözleşmeler |
| UI varsayılanı | Yok | Dark mode, i18n, tekrar kullanılabilir bileşenler |
| Mobil | Eklenti gibi ya da yok | React Native, Android ve iOS birinci sınıf |
| Bitirme | Açık uçlu | `DONE:<agent>:<task-id>` |

---

## 👥 Ekip

| İşçi | Görev |
|---|---|
| 🧠 `supervisor` | Görevi sınıflar, sadece gereken işçileri devreye alır |
| 🔎 `repo-inspector` | Yapı, bağımlılık ve riskleri çıkarır. Varsayılan olarak salt okuma |
| 🎨 `frontend-web` | Web UI, sayfalar, bileşenler, frontend state ve entegrasyonlar |
| ⚙️ `backend` | API, auth, doğrulama, veritabanı, iş mantığı |
| 📱 `mobile-react-native` | Android ve iOS için React Native |
| 🧪 `reviewer` | Sadece diff'i ve ilgili sözleşmeleri inceler |

---

## 🪶 Düşük token felsefesi

- Gerçekten gerekmedikçe tüm repo taraması yok.
- İşçiler sadece kendi scope'undaki dosyaları okur.
- Çıktı kısa tutulur. Dolgu yok, görevi tekrar etme yok, kapanış nezaketi yok.
- Var olan desenler her zaman yeni soyutlamalara yeğlenir.
- Her düşünce için ayrı işçi değil, her scope için bir işçi.

---

## 🎨 UI, dark mode ve i18n

ForgeFlow AI için UI kalitesi bir bonus değil, bir gereklilik.

- ✅ Modern ve üretime hazır görünüm. Şablon hissi yok, yapay sertlik yok.
- ✅ Dark mode birinci sınıf. Tema tokenları merkezi tutulur.
- ✅ String'ler i18n katmanında yaşar. Türkçe ve İngilizce minimum.
- ✅ Tek seferlik parçalar yerine tekrar kullanılabilir bileşenler.
- ✅ Responsive ve erişilebilir varsayılan olarak.

`frontend-web` ve `mobile-react-native` işçileri hardcoded renk ya da hardcoded kullanıcı metni yazmaz. `reviewer` her ikisini de finding olarak işaretler.

---

## 🚀 Hızlı Başlangıç

### 1. Gereksinimler

- [Claude Code](https://claude.com/claude-code) kurulu ve giriş yapılmış olmalı.
- Çalışmak istediğin herhangi bir proje (Next.js, NestJS, Expo, React Native CLI, monorepo, fark etmez).

### 2. Projene kur

**A seçeneği: yeni proje olarak klonla**

```bash
git clone https://github.com/berkcangumusisik/forge-flow-ai.git
cd forge-flow-ai
```

**B seçeneği: var olan projenin içine `.claude` klasörünü at**

```bash
# projenin kök klasöründe
git clone --depth=1 https://github.com/berkcangumusisik/forge-flow-ai.git /tmp/forge-flow-ai
cp -R /tmp/forge-flow-ai/.claude ./
cp /tmp/forge-flow-ai/CLAUDE.md ./
rm -rf /tmp/forge-flow-ai
```

**C seçeneği: git submodule olarak ekle**

```bash
git submodule add https://github.com/berkcangumusisik/forge-flow-ai.git .forge-flow-ai
ln -s .forge-flow-ai/.claude .claude
ln -s .forge-flow-ai/CLAUDE.md CLAUDE.md
```

### 3. Projeyi Claude Code'da aç

```bash
claude
```

Claude Code `.claude/commands/`, `.claude/agents/` ve `.claude/skills/` klasörlerini otomatik yükler. Komut listesinde `/forgeflow` görünmeli.

### 4. İlk görevi çalıştır

Claude Code içinde yaz:

```text
/forgeflow tema ve dil seçimli bir ayarlar sayfası ekle
```

ForgeFlow AI şunları yapar:

1. Görevi sınıflar.
2. Alan yabancıysa `repo-inspector`'ı çalıştırır.
3. Sadece gereken işçileri devreye alır.
4. Katı scope içinde değişikliği uygular.
5. `reviewer`'ı diff üzerinde çalıştırır.
6. `DONE:<agent>:<task-id>` işaretleriyle rapor verir.

---

## 💡 Örnek kullanım

```text
/forgeflow tema ve dil seçimli bir ayarlar sayfası ekle
```

```text
/forgeflow zod doğrulamalı POST /api/invoices endpoint'i yaz
```

```text
/forgeflow mobil uygulamaya 3 ekranlı bir onboarding akışı ekle
```

```text
/forgeflow merge öncesi mevcut branch'i review et
```

```text
/forgeflow ödeme modülünü incele ve risklerini listele
```

---

## 🌐 Çoklu dil README kurulumu

ForgeFlow AI her dil için ayrı bir README dosyası tutar. Desen basit ve herhangi bir GitHub repo'sunda çalışır.

### Nasıl çalışır?

1. **`README.md`** İngilizce sürümdür. GitHub repo ana sayfasında varsayılan olarak bunu gösterir.
2. **`README.tr.md`** Türkçe sürümdür.
3. Her iki dosyanın üstünde bir **dil seçici** bulunur ve birbirine link verir.
4. Badge'ler, başlık sırası ve anchor'lar iki dosya arasında tutarlı kalır. Deneyim bütün hissettirir.

### Dosya yerleşimi

```
forge-flow-ai/
├── README.md        # İngilizce, varsayılan
└── README.tr.md     # Türkçe
```

### Yeni dil nasıl eklenir?

1. `README.md` dosyasını `README.<locale>.md` olarak kopyala (örneğin `README.de.md`).
2. İçeriği çevir. Başlık sırası ve anchor'lar aynen kalsın.
3. **Her** README dosyasının üstündeki dil seçiciyi güncelle. Her dosya diğerlerinin hepsine link versin.

Örnek dil seçici satırı:

```md
🌐 Dil: [English](README.md) · Türkçe · [Deutsch](README.de.md)
```

### İpuçları

- Dosya isimleri küçük harf ve ISO locale eki ile olsun (`.tr`, `.de`, `.es`).
- Kod blokları, komutlar ve dosya yollarını çevirme.
- Başlıklar kısa olsun, anchor'lar temiz kalsın.
- Yeni bir bölüm eklediğinde aynı PR içinde tüm dillere ekle. Diller birbirinden uzaklaşmasın.

Aynı felsefe ajanların içinde de geçerli: `frontend-web` ve `mobile-react-native` işçileri kullanıcı metnini koda gömmez ve desteklenen her locale için çeviri anahtarı ister.

---

## 🗂 Repo yapısı

```
forge-flow-ai/
├── .claude/
│   ├── commands/
│   │   └── forgeflow.md            # ana slash komutu
│   ├── agents/
│   │   ├── supervisor.md
│   │   ├── repo-inspector.md
│   │   ├── frontend-web.md
│   │   ├── backend.md
│   │   ├── mobile-react-native.md
│   │   └── reviewer.md
│   └── skills/
│       ├── inspect-task/SKILL.md
│       ├── implement-web/SKILL.md
│       ├── implement-backend/SKILL.md
│       ├── implement-mobile/SKILL.md
│       └── review-diff/SKILL.md
├── CLAUDE.md                       # proje operasyon rehberi
├── CONTRIBUTING.md
├── LICENSE
├── README.md                       # İngilizce
└── README.tr.md                    # Türkçe
```

---

## 🛣 Yol haritası

- [ ] Opsiyonel `desktop` işçisi (Electron / Tauri)
- [ ] CI ve deploy için opsiyonel `devops` işçisi
- [ ] Next.js, Expo, NestJS için hazır preset'ler
- [ ] Başlangıç tema ve i18n paketleri
- [ ] ForgeFlow'a bağlı örnek repolar
- [ ] `DONE:` işareti için VS Code snippet paketi

---

## 🤝 Katkı

PR'lar memnuniyetle kabul edilir. Küçük, odaklı ve [CLAUDE.md](CLAUDE.md)'deki işçi sınırlarına uygun olsun. Açmadan önce [CONTRIBUTING.md](CONTRIBUTING.md) dosyasını oku.

---

## ⭐ Yıldız geçmişi

<a href="https://star-history.com/#berkcangumusisik/forge-flow-ai&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=berkcangumusisik/forge-flow-ai&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=berkcangumusisik/forge-flow-ai&type=Date" />
    <img alt="Yıldız Geçmişi Grafiği" src="https://api.star-history.com/svg?repos=berkcangumusisik/forge-flow-ai&type=Date" />
  </picture>
</a>

---

## 📄 Lisans

MIT. Bkz. [LICENSE](LICENSE).

---

<div align="center">

### Daha az kur. Daha çok odaklan. Daha keskin teslim et.

[← English README](README.md)

</div>
