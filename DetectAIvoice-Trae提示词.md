# DetectAIvoice.com — Trae 提示词模板

> 出品时间：2026-06-23
> 模板说明：5 份提示词，老板按顺序喂给 Trae。每份独立可用。

---

## 提示词①：初始化

```
你是一个 Next.js 全栈开发者。请为我创建一个完整的网站项目。

## 项目名称
DetectAIvoice.com

## 项目定位
AI 语音检测/深度伪造音频指南网站。目标受众：普通消费者（防诈骗）、企业安全团队、新闻/媒体验证从业者。

## 技术栈要求
- Next.js 15 App Router
- TypeScript
- TailwindCSS
- 部署目标：Vercel

## 目录结构要求

/app/page.tsx                    # 首页
/app/layout.tsx                  # 全局布局（字体、SEO元数据、GA4）
/app/about/page.tsx              # 关于页
/app/tools/page.tsx              # Tool Hub — 工具引导中心页（核心功能页）
/app/blog/page.tsx               # 文章列表页（分页）
/app/blog/[slug]/page.tsx        # 文章详情页
/app/category/[slug]/page.tsx    # 分类页
/app/404.tsx                     # 404 页面

/src/data/site.ts                # 站点配置数据（导航、分类、站点信息）
/src/data/articles.ts            # 文章数据
/src/data/tools.ts               # 工具对比数据
/src/lib/gtag.ts                 # GA4 工具函数

/public/images/                  # 图片文件夹（预留）

/components/layout/
  Header.tsx                     # 顶部导航
  Footer.tsx                     # 页脚
  Sidebar.tsx                    # 文章侧栏（推荐文章/目录）

/components/ui/
  BlogCard.tsx                   # 文章卡片
  ToolCard.tsx                   # 工具卡片
  CategoryCard.tsx               # 分类卡片
  Pagination.tsx                 # 分页组件

## 设计要求

### 整体风格
- 安全/科技感，蓝色为主色调（#1a56db），灰色为辅
- 干净、信任感强、信息层级清晰
- 移动端优先，完全响应式

### 导航栏
- Logo: "DetectAIvoice" + 小图标（可以是一个声波+盾牌的组合概念）
- 链接：首页 | 工具对比 | 博客 | 关于
- 移动端折叠菜单

### 首页设计
- Hero区域：大标题 + 简短定位 + CTA按钮"探索检测工具"
- 分类展示区：三大分类（消费者防护 / 企业安全 / 工具评测）卡片网格
- 精选文章区：3-4篇最新/最重要的文章
- 工具快速入口：列出3-4个核心检测工具，快速链接到对比页
- CTA区域：订阅月报

### Tool Hub 页面（这是核心功能页）
- 顶部：标题 "Find the Right AI Voice Detector for You" + 简短说明
- 引导问题："你是？" → 三个按钮：普通用户 / 企业团队 / 媒体记者
- 每个按钮点击后显示对应的推荐工具列表（带卡片）
- 每个工具卡片包含：名称、简介、价格（免费/付费）、精准率、适用场景、"查看完整评测"链接
- 底部：常见问题 FAQ 折叠区

### 文章详情页
- 文章正文（H1/H2/H3 层级）
- 右侧目录导航（移动端折叠）
- 侧栏推荐文章（同分类的3篇）
- 底部相关文章
- 时间标签 + 分类标签
- 社交媒体分享按钮

## 数据文件结构

### /src/data/site.ts
```typescript
export const siteConfig = {
  name: 'DetectAIvoice',
  tagline: 'Your guide to detecting AI voice deepfakes',
  description: 'Comprehensive guides, tool comparisons, and safety tips for detecting AI voice clones and deepfake audio.',
  url: 'https://detectaivoice.vercel.app',
  ogImage: '/images/og-default.jpg',
  categories: [
    { slug: 'consumer-safety', name: 'Consumer Safety', description: 'Protect yourself and your family from AI voice scams.' },
    { slug: 'enterprise', name: 'Enterprise Security', description: 'Deepfake detection for businesses and organizations.' },
    { slug: 'tool-reviews', name: 'Tool Reviews', description: 'Expert comparisons of AI voice detection tools.' },
    { slug: 'scam-reconstruction', name: 'Scam Reconstructions', description: 'Real case studies of deepfake voice attacks.' },
    { slug: 'monthly-report', name: 'Monthly Reports', description: 'Monthly voice fraud landscape updates.' }
  ],
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Tool Hub', href: '/tools' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' }
  ],
  tools: [
    { name: 'EyeSift', slug: 'eyesift', free: true, accuracy: '87%', bestFor: 'Quick audio checks' },
    { name: 'Resemble Detect', slug: 'resemble-detect', free: false, accuracy: '94%', bestFor: 'Professional verification' },
    { name: 'Pindrop Pulse', slug: 'pindrop-pulse', free: false, accuracy: '92%', bestFor: 'Enterprise security' },
    { name: 'DeepfakeDetector.ai', slug: 'deepfakedetector-ai', free: true, accuracy: '85%', bestFor: 'Basic detection' },
  ]
};
```

### /src/data/articles.ts
```typescript
// 文章类型
export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image?: string;
  content: string; // Markdown
  tools?: string[]; // 关联工具slug
  featured?: boolean;
}

// 初始数据：先建空数组，内容后面填充
export const articles: Article[] = [];
```

### /src/data/tools.ts
```typescript
export interface Tool {
  slug: string;
  name: string;
  description: string;
  url: string;
  price: 'Free' | 'Freemium' | 'Paid';
  priceRange?: string;
  accuracy: string;
  accuracySource: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  platform: string[];
  rating: number;
}

export const tools: Tool[] = [
  // 初始空数据，后面填充
];
```

## 需确保的功能
- 所有页面可访问性良好（aria标签、语义化HTML）
- 文章 Markdown 渲染（使用 react-markdown）
- 分页功能
- 分类筛选
- 站点地图支持（sitemap.ts）
- 404 友好页面
- 首次请求性能良好（Lighthouse 90+）

请根据以上要求，生成完整的项目代码。不需要 npm install，告诉我命令列表即可。
```

---

## 提示词②：SEO 配置

```
请在 detectaivoice.com 项目中配置以下 SEO 相关文件。

## 1. /app/robots.ts
- 允许所有爬虫
- sitemap 指向 https://detectaivoice.vercel.app/sitemap.xml

## 2. /app/sitemap.ts
- 动态生成 sitemap，包含：
  - 首页
  - 工具引导页 (/tools)
  - 关于页 (/about)
  - 博客列表页 (/blog)
  - 每篇文章的详情页 (/blog/{slug})
  - 每个分类页 (/category/{slug})
- lastmod 从文章数据中读取
- changefreq 文章页设为 weekly，其他 monthly
- priority 首页 1.0，工具页 0.9，文章 0.7，分类 0.6

## 3. /app/layout.tsx 中的 metadata
- title: "DetectAIvoice - AI Voice Detection & Deepfake Audio Guide"
- description: "Comprehensive guides, expert tool comparisons, and safety tips for detecting AI voice clones and deepfake audio in 2026."
- Open Graph:
  - og:title: "DetectAIvoice - AI Voice Detection Guide"
  - og:description: "Learn how to detect AI voice scams. Expert tool comparisons, safety guides, and monthly updates."
  - og:image: /images/og-default.jpg
  - og:url: https://detectaivoice.vercel.app
  - og:type: website
- Twitter Card:
  - card: summary_large_image
  - title: "DetectAIvoice"
  - description: "Your guide to detecting AI voice deepfakes"
  - image: /images/og-default.jpg

## 4. JSON-LD 结构化数据

### 首页添加 Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DetectAIvoice",
  "description": "Your guide to detecting AI voice deepfakes. Tool comparisons, safety tips, and monthly fraud reports.",
  "url": "https://detectaivoice.vercel.app",
  "sameAs": []
}
```

### 每篇文章添加 Article Schema（在文章详情页）
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{title}}",
  "description": "{{description}}",
  "datePublished": "{{date}}",
  "author": {
    "@type": "Person",
    "name": "DetectAIvoice Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DetectAIvoice"
  }
}
```

## 5. Google Analytics 4
- 在 layout.tsx 中注入 GA4 script
- 使用环境变量 NEXT_PUBLIC_GA_ID
- 默认 GA ID: G-ZRP4M7BYQX（和所有站统一）
- 在 /src/lib/gtag.ts 中创建 GA4 工具函数（pageview, event）

## 6. Google Search Console
- 在 layout.tsx head 中添加 meta verification tag
- 使用环境变量 NEXT_PUBLIC_GSC_VERIFICATION

请生成以上所有文件的具体代码。
```

---

## 提示词③：页面结构

```
在 detectaivoice.com 项目中，完成以下页面的 UI 实现。

## 1. 导航栏 Header.tsx

### 桌面端
- Logo + 站点名（左）
- 导航链接：Home | Tool Hub | Blog | About（中/右）
- 当前页面高亮

### 移动端
- 汉堡菜单
- 点击展开全屏导航

## 2. 首页 /app/page.tsx

### Hero 区域
- 标题（大字）："Is That Voice Real? Detect AI Voice Clones Before It's Too Late"
- 副标题："Expert guides, real tool comparisons, and monthly deepfake scam alerts — all in one place."
- CTA 按钮：橙色/红色大胆风格，"Explore Detection Tools →" 链接到 /tools
- 背景：蓝色渐变 + 声波纹路抽象图形

### 数据可信度条（Data Bar）
- 横向3个数据卡片：
  - "1 in 4 Americans have received a deepfake voice call" — Source: Hiya 2026
  - "$900M+ lost to AI-powered scams in 2025" — Source: FBI
  - "77% of targeted victims lost money" — Source: McAfee
- 每个卡片小字标注来源

### 分类展示区
- 标题 "What Do You Need?"
- 3 个分类卡片并排：
  1. Consumer Safety | 保护自己和家人 | 图标：盾牌
  2. Enterprise Security | 企业部署指南 | 图标：建筑
  3. Tool Reviews | 工具对比评测 | 图标：放大镜
- 每个卡片点击跳转到对应分类页

### 推荐文章区
- 标题 "Latest Guides & Reviews"
- 4 篇文章卡片（BlogCard 组件）
- 每张卡片：分类标签 | 标题 | 简介 | 日期 | 阅读时间 | 关联工具标签

### 工具快速入口
- 标题 "Quick Tool Picks"
- 4 个工具卡片（ToolCard 组件）
- 显示：工具名、免费/付费标签、精准率、适用场景
- 底部 "View All Tools →" 链接

### Newsletter 订阅区
- 标题 "Stay Ahead of AI Voice Scams"
- 描述 "Get our monthly Voice Fraud Report delivered to your inbox."
- 邮箱输入框 + 订阅按钮

## 3. Tool Hub /app/tools/page.tsx

### 顶部
- 标题 "Find the Right AI Voice Detector for You"
- 描述 "Not sure which tool to use? Tell us who you are and we'll point you in the right direction."
- 免责声明小字："All detection tools are probabilistic, not deterministic. Use multiple signals for verification."

### 引导区（三个大按钮）
- 按钮1：🛡️ "I'm a regular person" → 消费者推荐
- 按钮2：🏢 "I run a business/team" → 企业推荐
- 按钮3：📰 "I work in media/verification" → 媒体推荐

### 工具列表区（点击按钮后显示）
- 每个工具一个水平卡片
- 元素：工具名 | 简介（一行）| 价格标签（免费/付费）| 精准率 | 星评 | 平台（Web/iOS/API等）| "Read Full Review"链接
- 每个工具卡片链接到 blog/{tool-slug} 的评测文章

### FAQ 折叠区
- 常见问题：
  - "Are AI voice detectors accurate?"
  - "What's the difference between free and paid tools?"
  - "Can I detect deepfake audio without any tools?"
  - "How do I know which tool is right for me?"
- 点击展开答案

## 4. 文章列表页 /app/blog/page.tsx

- 标题 "All Articles"
- 分类筛选标签（横向可滚动）
- 文章网格（2列桌面，1列移动）
- 分页组件（每页9篇）
- 排序：最新在前

## 5. 文章详情页 /app/blog/[slug]/page.tsx

- 分类标签 + 日期 + 阅读时间
- H1 文章标题
- 文章正文（Markdown 渲染）
- 右侧目录导航（桌面端，滚动跟随）
- 侧栏推荐文章（同分类3篇）
- 底部相关文章
- 社交分享按钮（Twitter / Facebook / LinkedIn / 复制链接）
- 文章底部附加：如果文章关联了工具，显示工具卡片

## 6. 分类页 /app/category/[slug]/page.tsx

- 分类标题 + 描述
- 该分类下的文章列表
- 分页

## 7. 关于页 /app/about/page.tsx

- 站点定位："DetectAIvoice is an independent resource dedicated to helping people detect AI voice deepfakes."
- 强调内容基于公开研究报告和工具基准测试
- 免责声明
- 联系方式（邮箱占位）

## 8. 404 页面 /app/404.tsx

- 友好提示："Page not found"
- "The page you're looking for doesn't exist or has been moved."
- "Go Home" 按钮

请生成以上所有页面的完整代码。
```

---

## 提示词④：内容填充

```
在 detectaivoice.com 项目中，可以确认目录结构、组件、页面都已经完成。现在需要填充数据文件中的内容。

数据文件位置：
- /src/data/site.ts — 已有站点配置（无需修改）
- /src/data/articles.ts — 需要填充文章数据
- /src/data/tools.ts — 需要填充工具数据

## 工具数据填充 /src/data/tools.ts

请填入以下工具数据，每项包含 slug, name, description, url, price, priceRange, accuracy, accuracySource, bestFor, pros, cons, platform, rating:

```typescript
export const tools: Tool[] = [
  {
    slug: 'eyesift',
    name: 'EyeSift',
    description: 'Free browser-based AI voice detector that analyzes audio files locally without uploading to a server.',
    url: 'https://www.eyesift.com/faq/ai-voice-detection-deepfake-audio-2026/',
    price: 'Free',
    accuracy: '87%',
    accuracySource: 'Independent test reports',
    bestFor: 'Quick audio file checks for individuals',
    pros: ['No file upload needed (browser-side)', 'Free forever', 'Simple one-click interface', 'Supports MP3, WAV, M4A, OGG, FLAC'],
    cons: ['Lower accuracy on compressed audio', 'No API for enterprise', 'No real-time call detection'],
    platform: ['Web'],
    rating: 4.0
  },
  {
    slug: 'resemble-detect',
    name: 'Resemble Detect',
    description: 'Enterprise-grade deepfake audio detection API with benchmark-leading accuracy. From the team behind Resemble AI voice cloning.',
    url: 'https://www.resemble.ai/resources/audio-deepfake-detection-benchmark-results-how-8-systems-performed-in-2026',
    price: 'Paid',
    priceRange: 'Contact for pricing',
    accuracy: '94%',
    accuracySource: 'Resemble AI published benchmark (May 2026)',
    bestFor: 'Professional media verification and enterprise deployment',
    pros: ['Highest reported accuracy in 2026 benchmarks', 'API integration ready', 'Benchmarked against 8 competing systems', 'Built by voice AI experts'],
    cons: ['Paid only — no free tier', 'Requires technical integration', 'Overkill for casual users'],
    platform: ['API', 'Web'],
    rating: 4.5
  },
  {
    slug: 'pindrop-pulse',
    name: 'Pindrop Pulse',
    description: 'Enterprise voice security platform that detects deepfakes in real-time phone calls and audio files.',
    url: 'https://www.pindrop.com/',
    price: 'Paid',
    priceRange: 'Contact for pricing',
    accuracy: '92%',
    accuracySource: 'Industry analyst reports',
    bestFor: 'Enterprise call center security and fraud prevention',
    pros: ['Real-time call analysis', 'Enterprise security features', 'Integrates with contact center systems', 'Proven track record'],
    cons: ['Enterprise pricing only', 'Not for individual use', 'Complex setup'],
    platform: ['API', 'Phone System Integration'],
    rating: 4.3
  },
  {
    slug: 'deepfakedetector-ai',
    name: 'DeepfakeDetector.ai',
    description: 'Online tool for detecting deepfake audio and video with educational resources and tutorials.',
    url: 'https://deepfakedetector.ai/blog/how-to-detect-deepfake-audio',
    price: 'Freemium',
    priceRange: 'Free basic, Pro from $9.99/mo',
    accuracy: '85%',
    accuracySource: 'User reports and internal testing',
    bestFor: 'Basic audio and video deepfake detection for individuals',
    pros: ['Free tier available', 'Covers both audio and video', 'Includes educational content', 'Easy to use'],
    cons: ['Accuracy varies by audio quality', 'Limited free tier', 'Less suitable for enterprise'],
    platform: ['Web'],
    rating: 3.8
  },
  {
    slug: 'hiya-deepfake',
    name: 'Hiya AI Call Detection',
    description: 'Mobile app and network-level solution that identifies and blocks AI-powered scam calls in real time.',
    url: 'https://www.hiya.com/en-ca/newsroom/press-releases/state-of-the-call-2026',
    price: 'Freemium',
    priceRange: 'Free basic, Premium from $3.99/mo',
    accuracy: 'N/A',
    accuracySource: 'N/A (blocking, not detecting)',
    bestFor: 'Real-time scam call blocking on smartphones',
    pros: ['Blocks calls before you answer', 'Available as mobile app', 'Network-level protection', 'Proven against robocalls'],
    cons: ['Does not analyze audio files', 'Not a detection tool per se', 'Relies on call metadata'],
    platform: ['iOS', 'Android'],
    rating: 4.1
  },
  {
    slug: 'uncovai',
    name: 'UncovAI',
    description: 'AI content detection platform that identifies AI-generated voice, text, and images.',
    url: 'https://uncovai.com/best-ai-audio-detector-2026/',
    price: 'Freemium',
    priceRange: 'Free basic, Pro from $14.99/mo',
    accuracy: '88%',
    accuracySource: 'Internal testing and user reports',
    bestFor: 'Multi-modal AI content detection (voice + text + image)',
    pros: ['Multi-modal detection', 'Regularly updated', 'Reasonable accuracy', 'User-friendly interface'],
    cons: ['Newer tool with less track record', 'Not specialized solely for voice', 'Accuracy varies by audio quality'],
    platform: ['Web'],
    rating: 3.9
  }
];
```

## 文章数据填充 /src/data/articles.ts

请根据以下文章列表写出完整的 article 数据。每篇文章 content 写 800-1200 词（英文，Markdown 格式）。

⚠️ 内容质量标准：
- 每篇文章正文中至少嵌入 2 个内部链接，链接到站内其他文章或工具对比页（如 /tools /blog/best-ai-voice-detectors-2026 等）
  例如："We compared the accuracy of Resemble Detect in our full review." 指向 /blog/resemble-detect
- 所有数据引用必须标注来源（FBI/McAfee/Hiya/Malwarebytes 等报告链接）
- 工具评测不能凭空编造，引用公开基准测试或有来源的数据
- 每篇文章结尾注明："This article is for informational purposes only. Deepfake detection tools are probabilistic and should not be relied upon as sole evidence."

首期 10 篇文章：

1. slug: "what-is-ai-voice-cloning"
   title: "What Is AI Voice Cloning and How Does It Work? (2026 Guide)"
   category: "consumer-safety"
   description: "AI voice cloning went from science fiction to everyday reality. Learn how it works, what it sounds like, and why it matters for your safety."
   tools: []
   featured: true

2. slug: "signs-of-deepfake-call"
   title: "7 Signs a Phone Call Could Be a Deepfake (Even If It Sounds Real)"
   category: "consumer-safety"
   description: "AI voice clones can mimic anyone with just 3 seconds of audio. Here are the subtle signs that reveal a deepfake call."
   tools: ['eyesift', 'hiya-deepfake']
   featured: true

3. slug: "best-ai-voice-detectors-2026"
   title: "Best AI Voice Detectors in 2026: 6 Top Tools Compared (Free vs Paid)"
   category: "tool-reviews"
   description: "We compare 6 top AI voice detection tools across accuracy, price, platform, and use case. Find the right tool for your needs."
   tools: ['eyesift', 'resemble-detect', 'pindrop-pulse', 'deepfakedetector-ai', 'uncovai', 'hiya-deepfake']
   featured: true

4. slug: "tested-3-free-tools"
   title: "Deepfake Voice Detection: I Tried 3 Free Tools Against My Own Cloned Voice"
   category: "tool-reviews"
   description: "I cloned my own voice using a free AI tool, then tested 3 free detectors to see which ones caught it."
   tools: ['eyesift', 'deepfakedetector-ai', 'uncovai']

5. slug: "free-ai-voice-detectors"
   title: "Free AI Voice Detectors That Actually Work: Tested and Ranked"
   category: "tool-reviews"
   description: "Not everyone needs enterprise-grade detection. Here are the free tools that deliver reliable results without the price tag."
   tools: ['eyesift', 'deepfakedetector-ai', 'uncovai']

6. slug: "ceo-scammed-ai-voice"
   title: "Case Study: How a CEO Got Scammed by an AI Voice Clone ($243K Lost)"
   category: "scam-reconstruction"
   description: "A detailed breakdown of a real 2025 deepfake voice scam that cost a UK energy company over $200,000."
   tools: []  // Note: 这个案例基于公开报道，可以引用新闻来源

7. slug: "political-deepfake-audio-2026"
   title: "Breaking Down the Latest Political Deepfake Audio — Real or Fake?"
   category: "scam-reconstruction"
   description: "With the 2026 election cycle in full swing, deepfake audio is weaponized against candidates. Learn how to verify political audio."
   tools: ['resemble-detect', 'eyesift']

8. slug: "protect-elderly-deepfake"
   title: "How to Protect Your Elderly Parents From AI Voice Scams"
   category: "consumer-safety"
   description: "Seniors are the most vulnerable target for AI voice scams. A practical guide to protect your loved ones without scaring them."
   tools: ['hiya-deepfake', 'eyesift']
   featured: true

9. slug: "deepfake-call-action-plan"
   title: "What to Do If You Get a Deepfake Call: Step-by-Step Action Plan"
   category: "consumer-safety"
   description: "You suspect a call was a deepfake. Here's exactly what to do — from preserving evidence to reporting it to the authorities."
   tools: ['eyesift']

10. slug: "ai-voice-scam-900-million-2025"
   title: "AI Voice Scams Cost Americans $900M in 2025 — Report Breakdown"
   category: "monthly-report"
   description: "The FBI's 2025 Internet Crime Report shows AI-powered scams caused nearly $900M in losses. Full breakdown and what it means."
   tools: []

请根据以上内容写出完整的 /src/data/articles.ts 和 /src/data/tools.ts 文件。每篇 content 写 800-1200 词英文，格式为 Markdown。
```

---

## 提示词⑤：引流入口

```
在 detectaivoice.com 项目中，请在已有页面基础上添加社交分享和引流入口。

## 1. 社交媒体分享按钮（文章详情页）

在每篇文章底部添加分享栏：
- Twitter/X：分享链接 + 标题
- Facebook：分享链接
- LinkedIn：分享链接
- "Copy Link" 按钮（点击复制文章URL）

实现方式：简单的 URL 拼接分享，不需要第三方 SDK。
图标用 SVG 内联或简单的文字按钮。

## 2. Reddit 植入位预留

在每篇文章底部、分享栏上方，加一个逻辑注释区：
```html
<!-- REDDIT SHARE: 运营人员可在此链接到相关 Reddit 帖子
     格式: https://www.reddit.com/r/{subreddit}/comments/{post_id}/
     当前文章适合的 Reddit 板块:
     - r/cybersecurity (企业安全类文章)
     - r/scams (消费者安全类文章)
     - r/technews (行业报告类文章)
     - r/privacy (隐私保护类文章)
-->
```

## 3. LinkedIn 适配

- 在文章详情页的 Head 中添加 LinkedIn 分享标签
- LinkedIn 的 og:title / og:description 与主 metadata 一致即可

## 4. Newsletter 订阅区

- 在首页底部 + 每篇文章底部 + 工具引导页底部
- 使用 mailto: 占位，或空表单结构（运营后接入邮箱服务）
- 样式：简洁，白底 + 蓝色边框
- 文案："Get the Monthly Voice Fraud Report" + "Your email"

## 5. Pinterest 分享

- 如果文章有配图，在图片 hover 时显示 Pinterest 分享按钮
- 没有配图的文章可以不显示

## 6. 文章内部链接策略

- 每篇文章正文中至少包含 2 个内部链接
- 链接到站内其他文章或工具对比页
- 链接文案自然融入上下文（不要生硬插入）

请在文章详情页组件中实现以上功能。
```
