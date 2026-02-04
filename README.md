# Scaler Flow - Digital Experience Agency

A premium, high-performance website showcasing cutting-edge web design with 3D animations, smooth scrolling, and interactive elements.

## 🚀 Features

- **3D Hero Section** - Interactive text with mouse tracking
- **Magnetic Philosophy** - Floating words with magnetic cursor effects
- **3D Capabilities Carousel** - Rotating service cards with flip animations
- **Horizontal Showcase** - Smooth scrolling project gallery
- **Animated Timeline** - Interactive process visualization
- **Contact Form** - With confetti celebration and email integration
- **Smooth Scrolling** - Lenis-powered physics-based scrolling
- **Scroll Progress** - Fixed navigation dots
- **Fully Responsive** - Optimized for all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Animations**: GSAP + ScrollTrigger
- **3D**: Three.js + React Three Fiber
- **Smooth Scroll**: Lenis
- **Forms**: React Hook Form + Zod
- **Email**: Resend API
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/scaler-flow.git

# Navigate to project directory
cd scaler-flow

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🔧 Environment Variables

Create a `.env.local` file with the following:

```env
RESEND_API_KEY=your_resend_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📝 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix linting errors
pnpm format       # Format code with Prettier
pnpm type-check   # Run TypeScript compiler check
pnpm analyze      # Analyze bundle size
```

## 🏗️ Project Structure

```
scaler-flow/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/
│   │   ├── layout/         # Header, Footer, Navigation
│   │   ├── sections/       # Page sections (Hero, Capabilities, etc.)
│   │   └── ui/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and helpers
│   └── styles/             # Global styles
├── public/                 # Static assets
└── TODO.md                 # Project task breakdown
```

## 🎨 Key Components

### Sections
- **Hero** - 3D animated text with particle background
- **Philosophy** - Magnetic floating words
- **Capabilities** - 3D rotating carousel with service cards
- **Showcase** - Horizontal scrolling project gallery
- **Process** - Animated timeline with 6 steps
- **Contact** - Form with confetti and particles

### UI Components
- **Button** - Multiple variants with loading states
- **Input** - Animated form inputs with validation
- **Textarea** - Auto-resize textarea
- **Cursor** - Custom cursor with magnetic effects
- **Particles** - Animated background particles

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Build

```bash
# Build the project
pnpm build

# The output will be in the .next folder
# Deploy the .next folder to your hosting provider
```

## 📊 Performance

- **Lighthouse Score**: 100/100 (Performance)
- **Core Web Vitals**: All green
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: WebP/AVIF with Next.js Image
- **Font Loading**: Optimized with next/font

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Contact

- **Website**: [scalerflow.com](https://scalerflow.com)
- **Email**: hello@scalerflow.com
- **LinkedIn**: [@scalerflow](https://linkedin.com/company/scalerflow)

---

Built with ❤️ by Scaler Flow Team
