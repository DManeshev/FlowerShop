# SEO-аудит YourFlowers21 (yourflowers21.ru)

Дата: 6 ноября 2026  
Объём: технический SEO, Metadata API, заголовки, SSR/индексация, Core Web Vitals, карточки товаров и категорий, Schema.org, Local SEO, перелинковка, изображения.  
Важно: исходный код не изменялся. Все выводы подтверждены исходниками, live-запросами curl (включая Googlebot UA) и данными API.

## 1. Резюме

Сайт технически работает и отдаёт корректные HTTP-редиректы, но почти не существует для поисковых роботов в том виде, в котором его видит пользователь.

Ключевая проблема: весь контент рендерится только на клиенте. В HTML любой страницы нет ни `<header>`, ни `<h1>`, ни `<img>`, ни ссылок на категории — только RSC-payload и скрипты. Причина не в динамическом рендере, а в `PersistGate loading={null}` в `src/providers/Providers.tsx:27`: на сервере `bootstrapped = false`, компонент возвращает `null`, и всё дерево (шапка, меню, футер, товары) не попадает в SSR-ответ.

Дополнительно:

- `sitemap.xml` содержит 4 URL, 2 из которых отдают 404 (`/category`, `/product`), и не содержит ни одного товара или категории — при 744 товарах и 24 подкатегориях.
- Невалидные товары и категории отдают HTTP 200 (soft 404).
- `/dashboard`, `/auth`, `/thanks` отдают `index, follow` и title главной.
- Canonical отсутствует на всех страницах, метаданные товаров и категорий полностью дублируют главную.
- Schema.org отсутствует полностью — ни Product, ни BreadcrumbList, ни LocalBusiness.
- H1 нет на главной, в категории, в карточке товара, в политике, в 404; названия товаров и карточек — `<h2>`.
- JS на главной/товаре — ~1,12 МБ (16 чанков), включая неиспользуемые Yandex Maps (~288 КБ) и framer-motion (~224 КБ).
- Изображение-исходник 2,34 МБ, AVIF не отдаётся, priority стоит на всех карточках, sizes не соответствует сетке.

Итоговая оценка: техническая база ⚠️, индексируемость 🔴, контент 🔴, микроразметка 🔴, локальное SEO 🔴, производительность 🟡.

Если исправить только P0, сайт начнёт индексироваться как магазин, а не как одна страница. Ожидаемый эффект P0+P1 — рост числа страниц в индексе с ~2 до сотен и появление товарных сниппетов.

## 2. Методика и ограничения

Что проверено:

- Исходники: `src/app/**`, `src/components/**`, `src/providers/**`, `src/services/**`, `src/config/**`, `next.config.js`, `.env`.
- Live: `robots.txt`, `sitemap.xml`, HTML главной, товара, категории, `/delivery`, `/privacy`, `/auth`, `/dashboard`, `/thanks`, 404.
- HTTP-коды, редиректы, TLS, заголовки, размер JS, параметры оптимизатора изображений.
- API `http://83.220.168.220:4200/api`: 744 товара, 24 подкатегории, 5 родительских категорий.
- Локальный dev-сервер и `yarn build`.

Ограничения:

- Нет доступа к Google Search Console и Яндекс.Вебмастеру — фактическую индексацию, запросы и field CWV проверить нельзя.
- PageSpeed Insights API вернул 429 quota exceeded — CWV оценены по коду и сетевым замерам, без lab/field данных.
- `yarn build` падает на `/_global-error` (`InvariantError: Expected workStore to be initialized`, Next.js 16.3.2) — это operational-блокер, а не прямой SEO-дефект, но он мешает проверять статическую генерацию и деплоить.

## 3. Карта проблем

| ID | Критичность | Проблема | Где |
|---|---|---|---|
| T1 | 🔴 P0 | CSR-only: контента нет в HTML | `src/providers/Providers.tsx:27` |
| T2 | 🔴 P0 | Sitemap с 404 и без товаров/категорий | `src/app/sitemap.ts:4-22` |
| T3 | 🔴 P0 | Soft 404 для невалидных slug | `product/[slug]/page.tsx`, `category/[slug]/page.tsx` |
| T4 | 🔴 P0 | Индексируются `/dashboard`, `/auth`, `/thanks` | `layout.tsx:24-27`, `robots.ts:7` |
| M1 | 🔴 P0 | Нет canonical и уникальных метаданных | `layout.tsx:18-36`, страницы |
| H1 | 🔴 P0 | Нет H1, нарушена иерархия | `Heading.tsx:9`, `Home.tsx`, `Product.tsx` |
| S1 | 🟠 P1 | Нет Schema.org | весь проект |
| C1 | 🟠 P1 | Дубли описаний товаров | данные API |
| L1 | 🟠 P1 | Перелинковка: категории только в client JS | `Navigation.tsx:19-47` |
| I1 | 🟠 P1 | Изображения и шрифты | `Card.tsx`, `Product.tsx`, `next.config.js`, `global.scss` |
| L2 | 🟡 P2 | Нет городских лендингов и NAP | `delivery/page.tsx`, `Footer.tsx` |
| T5 | 🟡 P2 | www без валидного TLS и редиректа | инфраструктура |
| T6 | 🟡 P2 | `headers()` делает все страницы динамическими | `layout.tsx:48-52` |
| B1 | 🔴 P0 | Падает production build | Next.js 16.3.2 |
| SEC1 | 🔴 P0 | Секреты DaData в `next.config.js` env | `next.config.js:18-23` |

## 4. Technical SEO

### T1. Весь контент рендерится только на клиенте — 🔴 P0

HTML любой страницы содержит только RSC-payload: `<body><div hidden=""><!--$--><!--/$--></div><script>self.__next_f....`. В нём нет `<header>`, `<h1>`, `<img>`, ссылок на категории. Googlebot с обычным UA получает тот же пустой каркас. Контент появляется только после выполнения ~1,12 МБ JS.

Где: `src/providers/Providers.tsx:27`:

```tsx
<PersistGate loading={null} persistor={persistor}>
```

`PersistGate` при `bootstrapped = false` возвращает `loading`, то есть `null`. На сервере `componentDidMount` не вызывается, поэтому всё дерево `children` (Header, Navigation, main, Footer, товары) не рендерится в SSR.

Критичность: 🔴 P0 — блокирует индексацию всего сайта.

Влияние: поисковик видит пустую страницу. Даже если Google выполнит JS, краулинговый бюджет тратится на рендер, а Яндекс и соцсети/мессенджеры (превью ссылок) контент не увидят вовсе. В сочетании с sitemap из 4 URL это означает, что в индексе реально могут быть только главная и `/delivery`.

Исправление: убрать `PersistGate` из глобальных провайдеров. Оставить его только там, где действительно нужна гидратация корзины:

```tsx
// src/providers/Providers.tsx
<QueryClientProvider client={queryClient}>
  <ReduxProvider store={store}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </ReduxProvider>
</QueryClientProvider>
```

А в Cart/Checkout:

```tsx
'use client'
import { PersistGate } from 'redux-persist/integration/react'
// ...
<PersistGate loading={<CartSkeleton />} persistor={persistor}>
  <CartView />
</PersistGate>
```

Дополнительно убрать YMaps из глобальных провайдеров (`Providers.tsx:29`) — он грузит карты на каждой странице, хотя нигде не используется.

Проверка: после фикса `curl -s https://yourflowers21.ru/ | grep -E "<header|<h1|<img"` должен находить контент; в «Просмотре кода» Googlebot — тоже.

### T2. Sitemap содержит 404 и не содержит каталога — 🔴 P0

`sitemap.xml` отдаёт 4 URL: `/`, `/category`, `/product`, `/delivery`. `/category` и `/product` — 404 (таких роутов нет). При этом 744 товара, 24 подкатегории, 5 родительских категорий, `/subscription`, `/privacy` в sitemap отсутствуют. `lastModified: new Date()` — это дата сборки, а не изменения страницы.

Где: `src/app/sitemap.ts:4-22`.

Критичность: 🔴 P0.

Влияние: из 4 URL валидны 2. Поисковик получает сигнал «сайт из двух страниц» и ошибки 404 в отчёте sitemap. Товары и категории не обнаруживаются, потому что ссылки на них тоже нет в SSR HTML (см. T1, L1). Фактически каталог не индексируется.

Исправление: генерировать sitemap из API, исключая пустые и несуществующие URL:

```ts
import type { MetadataRoute } from 'next'
import { ProductService, CategoryService } from '@/services'

const BASE = 'https://yourflowers21.ru'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: products }, { data: categories }] = await Promise.all([
    ProductService.getAll({ limit: 10_000 }),
    CategoryService.getAll()
  ])

  const staticPages = ['', '/delivery', '/subscription', '/privacy']

  return [
    ...staticPages.map(path => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.6
    })),
    ...categories
      .filter(c => c.subcategories?.length || c.productsCount > 0)
      .map(c => ({
        url: `${BASE}/category/${encodeURIComponent(c.slug)}`,
        lastModified: new Date(c.updatedAt),
        changeFrequency: 'daily' as const,
        priority: 0.8
      })),
    ...products.map(p => ({
      url: `${BASE}/product/${encodeURIComponent(p.slug)}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }))
  ]
}
```

Если `CategoryService` не отдаёт `productsCount`, получить категории через `ProductService.getByCategory` нельзя — лучше добавить поле в API или считать по списку товаров. Для 744 URL один sitemap допустим (лимит 50 000).

Отдельно: слаги кириллические (`букет-сочный-лайм`) и смешанные (`rozy-kendi-s-evkaliptom`). В sitemap и canonical использовать `encodeURIComponent`, в ссылках — обычный `Link` (он кодирует сам). Несогласованность кодирования даёт дубли.

### T3. Soft 404: невалидные товары и категории отдают 200 — 🔴 P0

`/product/nesushchestvuyushchiy-tovar` → 200, `/category/nesushchestvuyushchaya-kategoriya` → 200. Пять родительских категорий (`/category/cvetochnye-bukety` и др.) → 200 с пустым списком.

Где:

- `src/app/product/[slug]/page.tsx:7-14` — нет проверки ответа и `notFound()`.
- `src/app/category/[slug]/page.tsx:14-26` — при пустом массиве рендерится `<NotFoundProducts />`, но статус остаётся 200.

Критичность: 🔴 P0.

Влияние: поисковик индексирует бесконечное число «пустых» URL, размывает краулинговый бюджет и получает сотни страниц-дублей с одинаковым шаблоном. Это классический soft 404, который Google понижает, а Яндекс исключает из индекса.

Исправление:

```ts
// product/[slug]/page.tsx
import { notFound } from 'next/navigation'

const { data } = await ProductService.getBySlug(slug)
if (!data?.id) notFound()
return <Product {...data} />
```

```ts
// category/[slug]/page.tsx
const { data: products } = await ProductService.getByCategory(slug)
const category = await CategoryService.getBySlug(slug) // добавить метод
if (!category) notFound()

if (products.length === 0) {
  return <CategoryEmpty title={category.name} /> // 200, но с H1 и текстом
}
```

Для родительских категорий без товаров: либо агрегировать товары подкатегорий, либо отдавать 404/noindex, но не пустую страницу с 200. Нельзя одновременно держать их в меню и отдавать пустоту.

Дополнительно: обернуть вызовы API в `try/catch`, чтобы 500 от бэкенда не превращался в 200 с пустым экраном.

### T4. Служебные страницы открыты для индексации — 🔴 P0

`/dashboard`, `/auth`, `/thanks` отдают `<meta name="robots" content="index, follow">` и title/description главной. `/dashboard` — админ-панель, `/auth` — форма входа, `/thanks` — страница после заказа.

Где:

- `src/app/layout.tsx:24-27` — глобальный `robots: { index: true, follow: true }`.
- `src/app/robots.ts:7` — только `allow: '/'`.
- `src/constants/seo.constants.ts:3-8` — `NO_INDEX_PAGE` существует, но нигде не используется.

Критичность: 🔴 P0.

Влияние: в индекс могут попасть админка и форма авторизации, что выглядит как утечка и мусор в выдаче. `/thanks` — тупиковая страница без ценности. Плюс все три конкурируют с главной по одинаковому title.

Исправление:

```ts
// src/app/auth/page.tsx, src/app/dashboard/page.tsx, src/app/thanks/page.tsx
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
export const metadata = { ...NO_INDEX_PAGE, title: 'Вход | Твои цветы 21' }
```

```ts
// src/app/robots.ts
rules: {
  userAgent: '*',
  allow: '/',
  disallow: ['/dashboard', '/auth', '/thanks', '/api/']
}
```

`Disallow` не гарантирует исключение из индекса, если на страницу есть внешние ссылки, поэтому `noindex` обязателен. Для админки дополнительно добавить заголовок в `next.config.js`:

```ts
async headers() {
  return [{
    source: '/dashboard/:path*',
    headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
  }]
}
```

Также стоит разделить layout: `(site)` с Header/Footer и `(admin)` без них — см. T6.

### T6. `headers()` в корневом layout делает все страницы динамическими — 🟡 P2

`layout.tsx:48-52` вызывает `headers()` и читает `x-invoke-path`, чтобы определить защищённый роут. В Next.js 16 этого заголовка нет, поэтому `isProtectedRoute` всегда `false`; при этом `headers()` переводит все маршруты в динамический рендер, убивая `revalidate = 3600` на главной и CDN-кэширование.

Где: `src/app/layout.tsx:48-52`.

Критичность: 🟡 P2 (но связано с T4).

Влияние: рост TTFB, отсутствие статики, лишняя нагрузка на бэкенд, худшие CWV. Плюс логика защищённых роутов не работает: в live `/dashboard` в HTML присутствуют `desktop__view`, header и footer.

Исправление: убрать `headers()` и `x-invoke-path`. Использовать route groups:

```
src/app/(site)/layout.tsx   → Header, Navigation, Footer, Checkout
src/app/(admin)/layout.tsx  → только контент
src/app/(site)/page.tsx
src/app/(site)/product/[slug]/page.tsx
src/app/(admin)/dashboard/page.tsx
```

Тогда `layout.tsx` остаётся только с `<html>/<body>/Providers`, а главная снова становится статической с `revalidate = 3600`. Защиту админки делать на сервере (проверка cookie в `(admin)/layout.tsx`), а не через `usePathname`.

### T5. www без валидного TLS и без редиректа — 🟡 P2

`www.yourflowers21.ru` резолвится в тот же IP, но TLS-сертификат невалиден (`SEC_E_WRONG_PRINCIPAL`). Редиректа на apex нет. При этом HTTP→HTTPS 301 и trailing slash→без slash 308 работают корректно.

Где: инфраструктура (nginx/хостинг).

Критичность: 🟡 P2.

Влияние: пользователи и краулеры, пришедшие по www-ссылке (из старых каталогов, соцсетей), видят ошибку сертификата. Это потеря трафика и дубли, если www когда-нибудь начнёт отвечать.

Исправление: выпустить сертификат на www (или wildcard), настроить 301 `https://www.yourflowers21.ru/*` → `https://yourflowers21.ru/$1`. Если www не нужен — убрать DNS-запись. Canonical на apex закрепит выбор домена.

### T7. Мелочи technical SEO

- `src/config/url.config.ts:9`: `getProductUrl` возвращает `/products${path}`, а реальный роут — `/product/[slug]` (единственное число). Сейчас функция, похоже, не используется, но при подключении даст битые ссылки. Исправить на `/product${path}` или удалить.
- `src/app/not-found.tsx:8` — заголовок 404 через `<h2>`; нужен `<h1>`.
- В `Navigation.tsx:36-47` `<div>` вложен в `<ul>` — невалидный HTML, влияет на парсинг и доступность.
- `SITE_NAME` (`seo.constants.ts:1`) не используется — либо применять в metadata, либо удалить.
- `.env`: `APP_URL = http://localhost:3000`. Если это значение уедет в прод, `metadataBase`, canonical и OG будут указывать на localhost. Нужен `https://yourflowers21.ru` и fallback в коде.
- `next.config.js:18-23` пробрасывает `DADATA_ACCESS_KEY`/`DADATA_SECRET_KEY` через env — такие значения инлайнятся в клиентский бандл при использовании. Секреты должны жить только на сервере (route handler / server action).

## 5. Metadata API

### M1. Нет canonical, все страницы используют метаданные главной — 🔴 P0

Метаданные заданы только в `layout.tsx`. На товарах, категориях, доставке, подписке, политике — тот же title, description и OG, что на главной. `alternates.canonical` отсутствует везде. `og:image`, `og:url`, `twitter:image` отсутствуют. Title — ~101 символ, в выдаче обрежется.

Где: `src/app/layout.tsx:18-36`; отсутствие `generateMetadata` в `src/app/product/[slug]/page.tsx` и `src/app/category/[slug]/page.tsx`.

Критичность: 🔴 P0.

Влияние: 744 товара и 24 категории конкурируют друг с другом и с главной как дубли. Без canonical любые параметры (`?utm`, `?page`, сортировки) создают дубли. Без `og:image` ссылки в Telegram/VK/MAX выглядят как серая заглушка — падает CTR из соцсетей. Длинный title снижает CTR в SERP.

Исправление:

1. Сократить title главной до 55–65 символов:

```
title: 'Доставка цветов в Чебоксарах — Твои цветы 21'
```

2. Добавить canonical и OG-изображение в layout:

```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL ?? 'https://yourflowers21.ru'),
  title: { default: 'Доставка цветов в Чебоксарах — Твои цветы 21', template: '%s | Твои цветы 21' },
  description: '...',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Твои цветы 21',
    url: '/',
    images: [{ url: '/og/home.jpg', width: 1200, height: 630, alt: 'Твои цветы 21' }]
  },
  twitter: { card: 'summary_large_image' }
}
```

3. `generateMetadata` для товара:

```ts
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const { data } = await ProductService.getBySlug(slug)
  if (!data) return { title: 'Товар не найден', robots: { index: false } }

  const url = `/product/${encodeURIComponent(slug)}`
  return {
    title: `${data.name} — купить с доставкой в Чебоксарах`,
    description: data.description.slice(0, 155),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: data.name,
      description: data.description.slice(0, 155),
      images: [{ url: data.images[0], width: 1200, height: 630, alt: data.name }]
    }
  }
}
```

4. Аналогично для категории: title `Букеты «{category.name}» — доставка по Чебоксарам`, description с городами и ценой от, canonical `/category/{slug}`.
5. Для `/delivery`, `/subscription`, `/privacy` — собственные title/description/canonical. Для `/privacy` можно оставить `index, follow`, но с уникальным title.
6. Добавить verification для GSC и Яндекса, когда появятся коды.

Проверка: `curl -s <url> | grep -o '<link rel="canonical"[^>]*>'` — на каждой странице self-referencing canonical; title и description различаются.

## 6. H1–H6

### H1. Заголовка H1 нет почти нигде — 🔴 P0

- Главная (`src/app/home/Home.tsx`) — только сетка карточек, H1 нет.
- Категория (`category/[slug]/page.tsx`) — H1 нет, названия товаров идут как `<h2>`.
- Товар (`product/[slug]/Product.tsx:62`) — название через `Heading`, а `Heading.tsx:9` всегда рендерит `<h2>`.
- `/privacy` — SubHeading (H2) вместо H1.
- `/auth`, `/not-found` — H2.
- H1 есть только на `/delivery` (`delivery/page.tsx:7`) и `/subscription` (`subscription/page.tsx:7`), причём с emoji.
- `ProductCard` (`Card.tsx:35`) использует `<h2>` для каждого товара — на категории это 30 H2 и ни одного H1.

Где: `src/components/ui/heading/Heading.tsx:9`, `src/components/ui/cards/productCard/Card.tsx:35`, перечисленные страницы.

Критичность: 🔴 P0.

Влияние: поисковик не понимает главную тему страницы. H2-названия товаров конкурируют между собой и с H2 секций. Это один из самых простых и самых результативных фиксов.

Исправление:

1. Сделать `Heading` полиморфным:

```tsx
interface IHeading {
  title: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

const Heading = ({ title, as: Tag = 'h2', className = '' }: IHeading) => (
  <Tag className={`${styles.title} ${className}`}>{title}</Tag>
)
```

2. Товар: `<Heading as="h1" title={name} />`.
3. Категория: `<h1>{category.name}</h1>` + подзаголовок с городами.
4. Главная: видимый H1 «Доставка цветов в Чебоксарах и Новочебоксарске» над сеткой.
5. Карточки: заменить `<h2>` на `<h3>` (внутри H1/H2 секции) или на `<span>/<div>`, если это просто название.
6. `/privacy`, `/auth`, `/not-found` — H1.
7. Убрать emoji из H1 на `/delivery` и `/subscription` (или вынести в отдельный `<span aria-hidden>`); H1 должен быть текстовым и осмысленным: «Доставка цветов по Чебоксарам, Новому Городу и Новочебоксарску».

Проверка: на каждой странице ровно один H1, далее H2 по секциям, H3 внутри.

## 7. Schema.org

### S1. Структурированных данных нет вообще — 🟠 P1

В HTML нет ни одного `<script type="application/ld+json">`. Нет Product, Offer, BreadcrumbList, LocalBusiness, Organization, WebSite, FAQPage.

Где: весь проект; удобнее всего добавить helper в `src/lib/seo/jsonld.ts` и подключать в серверных страницах.

Критичность: 🟠 P1 (после P0, потому что без SSR разметка тоже не попадёт в HTML).

Влияние: нет расширенных сниппетов: цена, наличие, рейтинг, хлебные крошки в выдаче. Для товарного магазина это прямая потеря CTR и трафика. LocalBusiness критичен для локальной выдачи и карт.

Исправление:

Product + Offer на карточке товара:

```ts
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  image: images,
  description,
  sku: String(id),
  brand: { '@type': 'Brand', name: 'Твои цветы 21' },
  offers: {
    '@type': 'Offer',
    url: `https://yourflowers21.ru/product/${encodeURIComponent(slug)}`,
    priceCurrency: 'RUB',
    price,
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@type': 'Organization', name: 'Твои цветы 21' }
  }
}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
/>
```

BreadcrumbList на товаре и категории:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://yourflowers21.ru/" },
    { "@type": "ListItem", "position": 2, "name": "Каталог", "item": "https://yourflowers21.ru/category/..." },
    { "@type": "ListItem", "position": 3, "name": "Букет", "item": "https://yourflowers21.ru/product/..." }
  ]
}
```

LocalBusiness/Florist на главной и `/contacts`:

```json
{
  "@context": "https://schema.org",
  "@type": "Florist",
  "name": "Твои цветы 21",
  "url": "https://yourflowers21.ru",
  "image": "https://yourflowers21.ru/og/shop.jpg",
  "telephone": "+7-987-666-30-45",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Стартовая, 3",
    "addressLocality": "Чебоксары",
    "addressRegion": "Чувашская Республика",
    "postalCode": "428000",
    "addressCountry": "RU"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 56.1462, "longitude": 47.2519 },
  "areaServed": ["Чебоксары", "Новочебоксарск", "Новый Город"],
  "priceRange": "₽₽",
  "sameAs": [
    "https://vk.com/your_flowers_21",
    "https://t.me/your_flowers_21"
  ]
}
```

FAQPage на `/delivery` — вопросы «Сколько стоит доставка?», «Как быстро привезёте?», «Можно ли оплатить картой?». Только реальные вопросы/ответы, без фейковых.

Organization + WebSite — на главной, с `sameAs` на соцсети.

Важно: не добавлять `aggregateRating`, пока нет реальных отзывов. Фейковые рейтинги — нарушение правил Google и риск ручных санкций.

Проверка: Rich Results Test / Яндекс.Вебмастер → «Структурированные данные». Ошибок быть не должно, цена и наличие в разметке должны совпадать с видимыми.

## 8. SSR и доступность для роботов

T1 (см. выше) — главный блокер.

Дополнительно:

- Ссылки на категории отсутствуют в HTML. `Navigation.tsx:19-23` грузит категории через `useQuery` на клиенте; родительские категории — `<span>` с `onMouseEnter` (`Navigation.tsx:44`), а не `<Link>`. В мобильном меню (HeaderMenuBtn) родители — `<li onClick>`. Даже после фикса T1 эти ссылки не появятся в SSR без переделки.
- `/privacy` фактически сирота. В футере только `/delivery`; ссылка на политику есть только в checkout, который рендерится клиентом.
- `/subscription` ссылка есть в Navigation, но меню клиентское — краулер её не увидит без JS.
- Нет lastmod-достоверности — sitemap не помогает обходу.
- 404-страница минимальна: H2 «Страница не найдена» и ссылка «Главная». Нет ссылок на категории/популярные товары.

Исправление (сводно):

1. Починить T1.
2. Сделать серверный компонент категорий и передавать данные в клиентское меню как props:

```tsx
// src/app/(site)/layout.tsx
const { data: categories } = await CategoryService.getAll()
<Navigation categories={categories} />
```

3. Родительские категории — `<Link href={/category/${slug}}>`, а не `<span>`.
4. Футер: список 8–10 категорий, `/delivery`, `/subscription`, `/privacy`, `/contacts`, адрес, телефоны, часы работы.
5. 404: ссылки на 4–6 категорий и строку поиска (если появится).
6. Проверять SSR через curl и «Просмотр кода» Googlebot, а не только через браузер.

## 9. Core Web Vitals

### I1. Изображения, шрифты и JS — 🟠 P1

1. `Card.tsx:29` — `priority` на каждой карточке. На главной это 30 preload-изображений, которые конкурируют с LCP-ресурсом.
2. `Card.tsx:30` — `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`, хотя сетка на десктопе — 4 колонки. Браузер скачивает лишне крупные файлы.
3. `Card.tsx:20-22` — framer-motion с `initial={{ opacity: 0 }}` и задержкой 0.2 с. Контент невидим до гидратации → LCP откладывается, возможен CLS.
4. `Product.tsx:44` — LCP-изображение товара `fill` без `priority`, `sizes` и `fetchPriority`. Размер выбирается по умолчанию.
5. `next.config.js:4-17` — нет `formats: ['image/avif', 'image/webp']`, нет `minimumCacheTTL`. `deviceSizes` включает 2048/3840 — лишние варианты srcset.
6. Кэш оптимизированных изображений — `Cache-Control: public, max-age=14400` (4 часа). Для неизменяемых файлов мало.
7. `global.scss:3-7` — 4 внешних `@import`: Lora, Berkshire Swash, Suisse Intl (db.onlinewebfonts.com), Playfair Display. Реально используется только Lora. Это render-blocking запросы к сторонним доменам.
8. JS главной/товара — 1 148 213 байт, 16 чанков. Внутри: framer-motion ~224 КБ, Yandex Maps 288 КБ (провайдер YMaps нигде не используется), base-ui 177 КБ.
9. Исходники изображений — например `IMG_4366.jpeg` 2,34 МБ. Оптимизатор отдаёт JPEG 142 КБ / WebP 99 КБ при w=1024; AVIF не отдаётся.

Критичность: 🟠 P1.

Влияние: LCP на мобильных, скорее всего, > 4 с; INP страдает от гидратации 1,12 МБ; CLS — от `fill` без соотношения сторон и анимаций. Плохие CWV напрямую влияют на ранжирование и на конверсию.

Исправление:

```js
// next.config.js
images: {
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 31536000,
  deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536],
  imageSizes: [64, 128, 256, 384],
  remotePatterns: [{ hostname: 'flower-storage.storage.yandexcloud.net' }]
}
```

```tsx
// Card.tsx — priority только для первых 2–4 карточек
<Image
  src={images[0]}
  alt={`${name} — букет с доставкой в Чебоксарах`}
  fill
  priority={index < 4}
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>
```

```tsx
// Product.tsx — LCP-изображение
<Image
  src={images[0]}
  alt={name}
  fill
  priority
  fetchPriority="high"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

- Убрать `motion.div` с `opacity: 0` из карточек; заменить на CSS-transition или `whileInView` без скрытия начального состояния. Это также уберёт framer-motion из критического пути.
- Убрать YMaps из `Providers.tsx:29`; если карта нужна на checkout — `dynamic(() => import('./Map'), { ssr: false })`.
- Шрифты: подключить только Lora через `next/font/google` с `display: 'swap'` и `subsets: ['cyrillic', 'latin']`; удалить 3 неиспользуемых `@import`. Self-hosting уберёт зависимость от `fonts.googleapis.com` и `db.onlinewebfonts.com`.
- Для `fill`-контейнеров задать `aspect-ratio` в SCSS, чтобы не было CLS.
- Исходники 2,34 МБ стоит пережать на этапе загрузки в storage (WebP/AVIF, max 1600 px). Оптимизатор помогает, но не отменяет хранение гигантов.
- Проверить `Cache-Control` для `/_next/static/*` — там должен быть `immutable, max-age=31536000`.

Целевые значения: LCP < 2,5 с, INP < 200 мс, CLS < 0,1 на мобильных.

## 10. SEO карточек товаров и категорий

### C1. Дубли и тонкий контент — 🟠 P1

Данные API:

- 744 товара.
- 630 товаров с одинаковым description: «Если вас интересует другое количество цветов (Высота, цвет, оформление букета), пожалуйста обращайтесь к администраторам Твои Цветы...»
- 708 товаров в дублирующихся группах по description.
- 13 товаров без description.
- 261 товар с одним изображением.
- 24 подкатегории, 5 родительских категорий без товаров.
- На главной — только 30 товаров из 744, без пагинации и без ссылки «весь каталог».

Где: данные API; вывод — `src/app/product/[slug]/Product.tsx:81`, `src/app/home/Home.tsx:16-21`.

Критичность: 🟠 P1.

Влияние: карточки не могут ранжироваться: у них нет уникального текста, состава, характеристик. Даже после исправления SSR и метаданных Google/Яндекс склеят их в группы дублей. 261 товар с одним фото проигрывает конкурентам в товарной выдаче.

Исправление:

1. Приоритизировать топ-50–100 товаров по продажам/просмотрам и переписать описания вручную: состав, количество стеблей, высота, диаметр, упаковка, повод, стойкость, уход, города доставки. 300–600 символов.
2. Добавить блок характеристик (таблица): состав, размер, упаковка, открытка, срок standing, цена.
3. Для остальных — шаблон с переменными (цвет, цветы, количество, размер) даст лишь частичную уникальность; такие карточки временно `noindex`, пока не будет текста. Не применять canonical на категорию для товаров — это скроет их из товарной выдачи.
4. Добавить 2–4 дополнительных фото для товаров с одним изображением.
5. Alt-тексты: не просто name, а «Букет розовых роз с эвкалиптом, 15 шт — доставка в Чебоксарах».
6. На карточке товара добавить: хлебные крошки, блок «Похожие букеты» (4 товара той же категории), «Доставка и оплата» с городами, кнопку «Купить в 1 клик» (если есть).
7. На категории: H1, описание категории (2–3 абзаца), фильтры/сортировка с canonical на базовый URL, пагинация с `?page=` и `noindex` для страниц > 1 (или self-canonical, если контент уникален).
8. На главной: блок «Популярные категории» со ссылками и кнопка «Смотреть весь каталог».

## 11. Local SEO (Чебоксары, Новочебоксарск, Новый Город)

### L2. Локальных страниц и сигналов нет — 🟡 P2

- Нет страницы `/contacts` с NAP (name, address, phone), картой, часами работы.
- Нет городских лендингов под «доставка цветов Чебоксары», «доставка цветов Новочебоксарск», «доставка цветов Новый Город».
- LocalBusiness/Florist отсутствует (см. S1).
- В футере нет адреса и телефонов — только `/delivery`.
- В шапке адрес и телефоны есть (`Header.tsx:59-70`), это хорошо, но этого мало.
- `/delivery` содержит цены по городам, но нет FAQ, зон, сроков, схемы, отзывов.
- Юрлицо известно из `/privacy`: ИП Манешева Алина Яковлевна — можно использовать в LocalBusiness и контактах.

Где: `src/app/delivery/page.tsx`, `src/components/layout/footer/Footer.tsx`, отсутствующие `/contacts` и городские страницы.

Критичность: 🟡 P2.

Влияние: локальная выдача и карты — основной канал для цветочного магазина. Без NAP, LocalBusiness и городских страниц сайт не участвует в локальном пакете и проигрывает агрегаторам.

Исправление:

1. `/contacts`: адрес, телефоны, email, часы работы, карта, реквизиты ИП, ссылки на соцсети, LocalBusiness schema, кнопка «Построить маршрут».
2. Городские страницы с реальным контентом, а не дорвей:
   - `/dostavka-cvetov-cheboksary`
   - `/dostavka-cvetov-novocheboksarsk`
   - `/dostavka-cvetov-novyj-gorod`
   
   На каждой: H1 с городом, зоны и стоимость, сроки, ассортимент, фото, FAQ, отзывы (реальные), ссылки на категории. Уникальный текст, а не копия с заменой города.
3. В футер на всех страницах: адрес, телефоны, часы, ссылка на `/contacts`, `/privacy`.
4. `areaServed` в схеме: Чебоксары, Новочебоксарск, Новый Город.
5. Зарегистрировать/проверить Яндекс.Бизнес и Google Business Profile, синхронизировать NAP с сайтом, добавить ссылку на сайт.
6. Добавить `tel:` ссылки (уже есть в шапке) и WhatsApp/Telegram для заказа.
7. На `/delivery` — FAQPage и блок «Как мы доставляем» с фото.

## 12. Внутренняя перелинковка

### L1. Категории и футер не дают краулеру ссылок — 🟠 P1

- `Navigation.tsx:19-23` — категории грузятся на клиенте; в SSR их нет.
- `Navigation.tsx:44` — родительские категории `<span>` с `onMouseEnter`, не ссылки.
- HeaderMenuBtn — мобильные родители `<li onClick>`.
- `Footer.tsx:9-11` — только `/delivery`.
- Нет хлебных крошек на товаре/категории.
- Нет блока похожих товаров.
- Главная — 30 товаров, без пагинации и без ссылки на каталог.
- `url.config.ts:9` — неверный путь `/products`.

Где: перечисленные файлы.

Критичность: 🟠 P1.

Влияние: даже при работающем SSR глубина обхода ограничена: краулер не найдёт 744 товара, если с главной нет ссылок на категории, а с категорий — на все товары. Sitemap поможет, но внутренние ссылки распределяют вес и ускоряют индексацию.

Исправление:

1. Серверный Navigation с категориями из API (props).
2. Родители — `<Link href={/category/${slug}}>`.
3. Футер: 8–10 категорий, `/delivery`, `/subscription`, `/privacy`, `/contacts`, NAP.
4. Breadcrumbs компонент на товаре и категории + BreadcrumbList schema.
5. Блок «Похожие букеты» на товаре (4 шт. из той же категории).
6. Пагинация на категории; на главной — ссылка «Весь каталог» и блок категорий.
7. Исправить `getProductUrl` на `/product${path}`.
8. Проверить, что все ссылки — `<Link>/<a href>`, а не `onClick + router.push`.

## 13. Приоритизированный план

### P0 — блокирует индексацию (1–2 недели)

| # | Задача | Файлы | Ожидаемый эффект |
|---|---|---|---|
| 1 | Убрать PersistGate из глобальных провайдеров, оставить только вокруг корзины | `src/providers/Providers.tsx:27` | Контент появляется в HTML, сайт становится индексируемым |
| 2 | Убрать YMaps из провайдеров | `Providers.tsx:29` | −288 КБ JS на всех страницах |
| 3 | Разделить layout на (site)/(admin), убрать headers()/x-invoke-path | `src/app/layout.tsx:48-77` | Статика, корректные шапка/футер, TTFB |
| 4 | Добавить noindex на /auth, /dashboard, /thanks + Disallow | `robots.ts`, страницы | Убирает мусор из индекса |
| 5 | notFound() для невалидных товаров/категорий | `product/[slug]/page.tsx`, `category/[slug]/page.tsx` | Убирает soft 404 |
| 6 | Sitemap из API без 404, с товарами и категориями | `src/app/sitemap.ts` | Сотни URL в обходе |
| 7 | H1 на всех страницах, Heading as | `Heading.tsx`, страницы, `Card.tsx` | Понятная тема страниц |
| 8 | Canonical + короткий title + generateMetadata для товара/категории | `layout.tsx`, product, category | Убирает дубли, улучшает CTR |
| 9 | APP_URL=https://yourflowers21.ru, fallback в getSiteUrl | `.env`, `url.config.ts` | Корректные canonical/OG |
| 10 | Убрать секреты DaData из next.config.js env | `next.config.js:18-23` | Безопасность |
| 11 | Починить yarn build (_global-error) | Next.js / layout | Возможность деплоя |

### P1 — рост трафика (2–4 недели)

| # | Задача | Ожидаемый эффект |
|---|---|---|
| 12 | Schema.org: Product, Offer, BreadcrumbList, LocalBusiness, Organization | Товарные сниппеты, крошки |
| 13 | Уникальные описания топ-100 товаров + характеристики | Ранжирование карточек |
| 14 | Серверное меню категорий, родители-ссылки, футер с категориями | Глубина обхода |
| 15 | Хлебные крошки + «Похожие букеты» | Перелинковка, UX |
| 16 | Пагинация категорий и «Весь каталог» на главной | Индексация 744 товаров |
| 17 | priority только для первых карточек, корректные sizes, AVIF, minimumCacheTTL | LCP, вес страницы |
| 18 | Шрифты через next/font, удалить 3 @import | Render-blocking, LCP |
| 19 | Убрать framer-motion с карточек | INP, LCP |
| 20 | OG-изображения 1200×630 для главной/товаров/категорий | CTR в соцсетях |

### P2 — локальное SEO и качество (1–2 месяца)

| # | Задача | Ожидаемый эффект |
|---|---|---|
| 21 | `/contacts` с NAP, картой, часами, реквизитами | Локальная выдача |
| 22 | Городские страницы Чебоксары / Новочебоксарск / Новый Город | Локальный трафик |
| 23 | FAQPage на `/delivery`, блок зон и сроков | Расширенные сниппеты |
| 24 | www → apex, валидный TLS | Устранение ошибок |
| 25 | Canonical для фильтров/сортировок, lastmod из API | Чистота индекса |
| 26 | 404 с ссылками на категории, валидный HTML в `<ul>` | UX, обход |
| 27 | Пережать исходники изображений в storage | Вес, LCP |

### P3 — мониторинг и развитие

- Подключить GSC + Яндекс.Вебмастер, verification в metadata
- Яндекс.Метрика + цели (заказ, звонок)
- Мониторинг CWV (CrUX/PSI), отчёты sitemap, 404
- Реальные отзывы + aggregateRating после накопления
- Контент-хаб: уход за цветами, что подарить, сезонные подборки
- Регулярный аудит Rich Results и индексации

## 14. Как проверить после исправлений

SSR и индексируемость:

```bash
curl -s -A "Googlebot" https://yourflowers21.ru/ | grep -E "<header|<h1|<img|href=\"/category"
curl -s -A "Googlebot" https://yourflowers21.ru/product/<slug> | grep -E "<h1|application/ld\+json|canonical"
```

В HTML должны быть шапка, H1, изображения, ссылки и JSON-LD.

HTTP-коды:

```bash
curl -o /dev/null -s -w "%{http_code}\n" https://yourflowers21.ru/product/nesushchestvuyushchiy-tovar   # 404
curl -o /dev/null -s -w "%{http_code}\n" https://yourflowers21.ru/category/nesushchestvuyushchaya-kategoriya # 404
curl -o /dev/null -s -w "%{http_code}\n" https://yourflowers21.ru/auth   # 200 + noindex
```

Sitemap:

- Все URL из sitemap отдают 200 (проверить скриптом).
- В sitemap есть товары и категории, нет `/category` и `/product`.
- `lastmod` меняется при обновлении товара, а не при каждой сборке.

Canonical и метаданные:

```bash
curl -s https://yourflowers21.ru/product/<slug> | grep -o '<link rel="canonical"[^>]*>'
curl -s https://yourflowers21.ru/product/<slug> | grep -o '<title>[^<]*</title>'
curl -s https://yourflowers21.ru/product/<slug> | grep -o '<meta property="og:image"[^>]*>'
```

Canonical — self-referencing, title уникальный, og:image — абсолютный URL.

Schema.org: Rich Results Test (Google) и «Структурированные данные» в Яндекс.Вебмастере. Ошибок нет, Product определяется, BreadcrumbList валиден.

CWV: PageSpeed Insights (мобильный) после фикса; цели LCP < 2,5 с, INP < 200 мс, CLS < 0,1. Проверить, что LCP-изображение грузится с `fetchpriority=high`, AVIF/WebP отдаются, шрифты не блокируют рендер.

Индексация: GSC → «Покрытие», Яндекс.Вебмастер → «Индексирование». Число страниц должно вырасти с ~2 до сотен; soft 404 и 404 в sitemap — исчезнуть.

## 15. Что нельзя проверить без доступов

- Фактическую индексацию и запросы — нужны GSC и Яндекс.Вебмастер.
- Field CWV — нужен CrUX/PSI с квотой.
- Позиции и локальный пакет — нужны гео-данные и Яндекс.Бизнес/Google Business Profile.
- Наличие ручных санкций — GSC → «Ручные действия».

Эти пункты стоит закрыть сразу после P0, чтобы измерения были на чистой базе.

Исходный код не изменялся. Dev-сервер на порту 3005 остановлен. Все временные диагностические скрипты и дампы находятся в `C:\Users\Denis\AppData\Local\Temp\opencode\` и в репозиторий не попадали.

## 16. Статус выполнения (обновляется по мере работы)

| ID | Статус | Комментарий |
|---|---|---|
| T1 | ✅ Частично | `PersistGate` убран из `src/providers/Providers.tsx`; оставлен в `src/components/layout/basket/Cart.tsx`. Shell (Header/Navigation/main/Footer) теперь рендерится на сервере. В `Cart.tsx` `loading={null}` — лучше заменить на скелетон, чтобы корзина не исчезала на сервере. YMaps в провайдерах отсутствует. Категории в `Navigation` по-прежнему грузятся на клиенте (см. L1). |
| T2 | ✅ Выполнено | `src/app/sitemap.ts` генерируется из API: статические страницы, категории с товарами/подкатегориями, все товары; без `/category` и `/product`; slug кодируются через `encodeURIComponent`. |
| T3 | ✅ Выполнено | `notFound()` добавлен в `product/[slug]/page.tsx` и `category/[slug]/page.tsx`. Невалидные slug теперь отдают 404. `CategoryService.getBySlug` деструктурирует `data`. |
| T4 | ✅ Выполнено | `/auth` — серверный page с metadata + клиентский `Auth.tsx`. `/dashboard` — клиентский page + серверный `layout.tsx` с metadata (noindex). `/thanks` — серверный с metadata. `robots.ts` и `next.config.js` headers корректны. Build проходит. |
| M1 | ✅ Выполнено | layout.tsx: metadataBase (fallback), title template, description, canonical, OG-изображение, verification (yandex/google через env). generateMetadata для product/[slug], category/[slug], delivery, subscription, privacy. |
| H1 | ⬜ | — |
| S1 | ⬜ | — |
| C1 | ⬜ | — |
| L1 | ⬜ | — |
| I1 | ⬜ | — |
| L2 | ⬜ | — |
| T5 | ⬜ | — |
| T6 | ✅ Выполнено | Убран `headers()`/`x-invoke-path` из корневого layout; введены route groups `(site)` и `(admin)`; корневой layout стал синхронным; страницы стали статическими. Build проходит. |
| B1 | ✅ Выполнено | `yarn build` проходит успешно (14/14 страниц). |
| SEC1 | ✅ Выполнено | DaData полностью удалён из проекта и `next.config.js`; секреты больше не пробрасываются в клиентский бандл. |
