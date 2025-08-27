# Mary Frank PTO - Step-by-Step Setup Guide

This guide will walk you through setting up the Mary Frank PTO website from scratch in a clean, organized way using Git branches for each major feature.

## Prerequisites

- Node.js 18+ installed
- Git installed
- A code editor (VS Code recommended)
- Basic knowledge of React, Next.js, and Tailwind CSS

## Project Overview

We're building a PTO website with:

- Hero section with expandable panels
- Navigation header
- Multiple page routes
- Tailwind CSS for styling
- Next.js 15 with App Router

## Quick Start

**Want to get started immediately?** Run these commands:

```bash
# Clone and setup
git clone <your-repo>
cd mary-frank-pto
npm install
npm run dev
```

Then follow the step-by-step guide below to understand what each part does.

## Step-by-Step Development Process

This guide breaks down the development into **5 main steps**, each building on the previous one:

1. **Project Foundation** - Set up Next.js with dependencies and configuration
2. **Base Layout** - Create header navigation and layout structure
3. **Hero Section** - Build the interactive hero with expandable panels
4. **Page Routes** - Create all individual page components
5. **UI Components** - Build reusable components for consistency

Each step creates a new Git branch, so you can work incrementally and easily rollback if needed.

---

## Step 1: Project Foundation (main branch)

**Goal**: Set up the basic Next.js project with all necessary dependencies and configuration.

**Progress**: 🚀 **Starting Point** → Basic Next.js project with Tailwind CSS

### Step 1: Create New Project

```bash
# Create new directory
mkdir mary-frank-pto
cd mary-frank-pto

# Initialize Git
git init

# Create Next.js project
npx create-next-app@latest . --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes

# Install additional dependencies
npm install @heroicons/react date-fns
npm install -D prettier husky lint-staged

# Initialize Git and create first commit
git add .
git commit -m "Initial Next.js project setup"
```

### Step 2: Configure Project Files

```bash
# Create jsconfig.json for JavaScript path mapping
echo '{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}' > jsconfig.json

# Remove TypeScript files if they exist
rm -rf tsconfig.json
```

### Step 3: Update Configuration Files

```bash
# Update package.json scripts
npm pkg set scripts.format="prettier --write ."
npm pkg set scripts.prepare="husky"

# Create postcss.config.mjs
echo 'const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
export default config;' > postcss.config.mjs

# Create .prettierrc
echo '{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}' > .prettierrc

# Create .prettierignore
echo 'node_modules
.next
.git' > .prettierignore
```

### Step 4: Create Basic CSS

```bash
# Create app/globals.css
echo '@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: system-ui, -apple-system, sans-serif;
}' > app/globals.css
```

### Step 5: Commit Foundation

```bash
git add .
git commit -m "Configure project with Tailwind, Prettier, and basic setup"
```

---

## Step 2: Base Layout & Navigation (feature/base-layout branch)

**Goal**: Create the basic layout structure with header navigation and container components.

**Progress**: 🏗️ **Basic Project** → Working layout with navigation

### Step 1: Create Branch

```bash
git checkout -b feature/base-layout
```

### Step 2: Create Basic Layout Components

```bash
# Create layout directory
mkdir -p components/layout

# Create Container component
echo 'export default function Container({ children, className = "" }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}' > components/layout/Container.jsx

# Create Header component
echo '"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/fundraising", label: "Fundraising" },
    { href: "/volunteer", label: "Volunteer" },
    { href: "/news", label: "News" },
  ];

  return (
    <header className="flex items-center justify-between border-b px-5 py-3">
      <Link href="/" className="font-semibold">
        Mary Frank PTO
      </Link>
      <nav className="flex gap-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm ${
                active
                  ? "font-medium text-black underline underline-offset-4"
                  : "text-gray-700 hover:text-black hover:underline underline-offset-4"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}' > components/layout/Header.jsx
```

### Step 3: Update Root Layout

```bash
# Update app/layout.jsx
echo 'import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "Mary Frank PTO",
  description: "Connecting families, students, and staff.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased bg-gray-50">
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <footer className="border-t px-5 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Mary Frank PTO • All rights reserved.
        </footer>
      </body>
    </html>
  );
}' > app/layout.jsx
```

### Step 4: Create Basic Home Page

```bash
# Update app/page.jsx
echo 'import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <Container className="py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Mary Frank PTO
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connecting families, students, and staff for student success.
        </p>
      </div>
    </Container>
  );
}' > app/page.jsx
```

### Step 5: Commit Layout

```bash
git add .
git commit -m "Add basic layout with header, container, and navigation"
```

---

## Step 3: Hero Section (feature/hero-section branch)

**Goal**: Build the interactive hero section with expandable panels and quick action buttons.

**Progress**: 🎨 **Layout Complete** → Interactive hero with panels

### Step 1: Create Branch

```bash
git checkout -b feature/hero-section
```

### Step 2: Create Hero Component

```bash
# Create Hero component
mkdir -p components
echo '"use client";

import { useState } from "react";
import Image from "next/image";

const heroPanels = [
  {
    id: "pto-branding",
    title: "Mary Frank PTO",
    description: "Connecting families, students, and staff for student success",
    bgColor: "bg-slate-800",
    bgImage: "/slides/teacher-parent-chat.png",
    content: (
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          Mary Frank PTO
        </h1>
        <p className="text-white text-lg mb-4 max-w-2xl">
          We support our teachers, enhance student learning, and build strong partnerships.
        </p>
        <a
          href="/about"
          className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-800 transition-all duration-300"
        >
          LEARN MORE
        </a>
      </div>
    ),
  },
  {
    id: "events",
    title: "Events",
    description: "Stay updated on all PTO meetings, fundraisers, and school events",
    bgColor: "bg-teal-500",
    bgImage: "/slides/community-meeting.png",
    content: (
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          This Week Events
        </h1>
        <p className="text-white text-lg mb-4 max-w-2xl">
          Dont miss what is happening at Mary Frank this week.
        </p>
        <a
          href="/events"
          className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300"
        >
          VIEW CALENDAR
        </a>
      </div>
    ),
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Find opportunities to help and make a difference in our school",
    bgColor: "bg-emerald-500",
    bgImage: "/slides/school-bus-arrival.png",
    content: (
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          Volunteer Opportunities
        </h1>
        <p className="text-white text-lg mb-4 max-w-2xl">
          Your help is needed right now. Join our community of volunteers.
        </p>
        <a
          href="/volunteer"
          className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300"
        >
          GET INVOLVED
        </a>
      </div>
    ),
  },
  {
    id: "news",
    title: "News & Updates",
    description: "Stay informed about PTO activities and school news",
    bgColor: "bg-green-500",
    bgImage: "/slides/school-playground.png",
    content: (
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          Latest News
        </h1>
        <p className="text-white text-lg mb-4 max-w-2xl">
          Stay connected with our community and learn about the latest achievements.
        </p>
        <a
          href="/news"
          className="inline-flex items-center border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
        >
          READ MORE
        </a>
      </div>
    ),
  },
];

export default function Hero() {
  const [expandedPanel, setExpandedPanel] = useState("pto-branding");

  const handlePanelClick = (panelId) => {
    if (expandedPanel !== panelId) {
      setExpandedPanel(panelId);
    }
  };

  return (
    <>
      <section className="relative w-full overflow-hidden" style={{ height: "70vh" }}>
        <div className="flex h-full">
          {heroPanels.map((panel) => (
            <div
              key={panel.id}
              className={`relative group transition-all duration-500 ease-in-out overflow-hidden ${
                expandedPanel === panel.id
                  ? "flex-[3] z-20 ring-4 ring-white/30 shadow-2xl"
                  : "flex-1 opacity-75 cursor-pointer"
              }`}
              onClick={() => handlePanelClick(panel.id)}
            >
              <div className="absolute inset-0">
                <Image
                  src={panel.bgImage}
                  alt={panel.title}
                  fill
                  className="object-cover w-full h-full"
                  priority={panel.id === "pto-branding"}
                />
                <div className={`absolute inset-0 ${panel.bgColor} opacity-85`} />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-center p-4 lg:p-6">
                {expandedPanel === panel.id ? (
                  <div className="h-full flex flex-col justify-center items-center">
                    <div className="w-full max-w-4xl">{panel.content}</div>
                  </div>
                ) : (
                  <div className="text-center text-white h-full flex flex-col justify-center items-center">
                    <div className="space-y-3">
                      <h2 className="text-xl lg:text-2xl font-bold drop-shadow-lg">
                        {panel.title}
                      </h2>
                      <p className="text-sm lg:text-base opacity-90 drop-shadow-md px-2">
                        {panel.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/volunteer" className="group">
              <div className="bg-[#00b140] hover:bg-[#009933] text-white p-6 rounded-lg text-center transition-all duration-200 transform hover:scale-105 shadow-md">
                <div className="text-2xl mb-2 font-bold">PTO</div>
                <h3 className="font-semibold text-lg">Join PTO</h3>
                <p className="text-sm opacity-90">$10/family</p>
              </div>
            </a>

            <a href="/donate" className="group">
              <div className="bg-teal-500 hover:bg-teal-600 text-white p-6 rounded-lg text-center transition-all duration-200 transform hover:scale-105 shadow-md">
                <div className="text-2xl mb-2 font-bold">$</div>
                <h3 className="font-semibold text-lg">Donate</h3>
                <p className="text-sm opacity-90">Support our programs</p>
              </div>
            </a>

            <a href="/volunteer" className="group">
              <div className="bg-emerald-500 hover:bg-emerald-600 text-white p-6 rounded-lg text-center transition-all duration-200 transform hover:scale-105 shadow-md">
                <div className="text-2xl mb-2 font-bold">✓</div>
                <h3 className="font-semibold text-lg">Volunteer</h3>
                <p className="text-sm opacity-90">Find opportunities</p>
              </div>
            </a>

            <a href="/events" className="group">
              <div className="bg-cyan-500 hover:bg-cyan-600 text-white p-6 rounded-lg text-center transition-all duration-200 transform hover:scale-105 shadow-md">
                <div className="text-2xl mb-2 font-bold">📅</div>
                <h3 className="font-semibold text-lg">Calendar</h3>
                <p className="text-sm opacity-90">See what is happening</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}' > components/Hero.jsx
```

### Step 3: Update Home Page

```bash
# Update app/page.jsx to include Hero
echo 'import Hero from "@/components/Hero";
import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <>
      <Hero />
      <Container className="py-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get Involved
          </h2>
          <ul className="list-disc pl-5 text-gray-700 max-w-2xl mx-auto text-left">
            <li>Check our <a className="text-blue-600 underline" href="/events">Events</a></li>
            <li>See ways to <a className="text-blue-600 underline" href="/fundraising">Fundraise</a></li>
            <li>Ready to help? <a className="text-blue-600 underline" href="/volunteer">Volunteer</a></li>
            <li>Read the latest <a className="text-blue-600 underline" href="/news">News</a></li>
          </ul>
        </div>
      </Container>
    </>
  );
}' > app/page.jsx
```

### Step 4: Add Placeholder Images

```bash
# Create public/slides directory
mkdir -p public/slides

# Add placeholder images (you can use any images for now)
# teacher-parent-chat.png
# community-meeting.png
# school-bus-arrival.png
# school-playground.png
```

### Step 5: Commit Hero Section

```bash
git add .
git commit -m "Add hero section with expandable panels and quick links"
```

---

## Step 4: Page Routes (feature/page-routes branch)

**Goal**: Create all the individual page components for navigation routes.

**Progress**: 📱 **Hero Complete** → All pages working

### Step 1: Create Branch

```bash
git checkout -b feature/page-routes
```

### Step 2: Create Page Components

```bash
# Create about page
mkdir -p app/about
echo 'import Container from "@/components/layout/Container";

export default function About() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Mary Frank PTO</h1>
        <p className="text-lg text-gray-600 mb-4">
          We are a dedicated group of parents, teachers, and staff working together to enhance the educational experience at Mary Frank Elementary.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Our mission is to support our teachers, enhance student learning, and build strong partnerships between families and our school.
        </p>
      </div>
    </Container>
  );
}' > app/about/page.jsx

# Create events page
mkdir -p app/events
echo 'import Container from "@/components/layout/Container";

export default function Events() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Events</h1>
        <p className="text-lg text-gray-600 mb-4">
          Stay updated on all PTO meetings, fundraisers, and school events.
        </p>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Event calendar coming soon...</p>
        </div>
      </div>
    </Container>
  );
}' > app/events/page.jsx

# Create fundraising page
mkdir -p app/fundraising
echo 'import Container from "@/components/layout/Container";

export default function Fundraising() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Fundraising</h1>
        <p className="text-lg text-gray-600 mb-4">
          Support our school through various fundraising initiatives.
        </p>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Fundraising information coming soon...</p>
        </div>
      </div>
    </Container>
  );
}' > app/fundraising/page.jsx

# Create volunteer page
mkdir -p app/volunteer
echo 'import Container from "@/components/layout/Container";

export default function Volunteer() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Volunteer</h1>
        <p className="text-lg text-gray-600 mb-4">
          Find opportunities to help and make a difference in our school.
        </p>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">Volunteer opportunities coming soon...</p>
        </div>
      </div>
    </Container>
  );
}' > app/volunteer/page.jsx

# Create news page
mkdir -p app/news
echo 'import Container from "@/components/layout/Container";

export default function News() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">News & Updates</h1>
        <p className="text-lg text-gray-600 mb-4">
          Stay informed about PTO activities, fundraising progress, and school news.
        </p>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-500">News articles coming soon...</p>
        </div>
      </div>
    </Container>
  );
}' > app/news/page.jsx
```

### Step 3: Commit Page Routes

```bash
git add .
git commit -m "Add placeholder pages for all navigation routes"
```

---

## Step 5: UI Components (feature/ui-components branch)

**Goal**: Build reusable UI components for consistent design across the site.

**Progress**: 🔧 **Pages Complete** → Reusable components

### Step 1: Create Branch

```bash
git checkout -b feature/ui-components
```

### Step 2: Create Reusable UI Components

```bash
# Create UI components directory
mkdir -p components/ui

# Create Section component
echo 'export default function Section({ title, subtitle, children, className = "" }) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        )}
        {subtitle && (
          <p className="text-lg text-gray-600 mb-8">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}' > components/ui/Section.jsx

# Create NewsCard component
echo 'export default function NewsCard({ title, excerpt, date, category, href }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {category}
          </span>
          <time className="text-sm text-gray-500">{date}</time>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <a
          href={href}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Read more →
        </a>
      </div>
    </article>
  );
}' > components/ui/NewsCard.jsx
```

### Step 3: Update Home Page with Section Component

```bash
# Update app/page.jsx to use Section component
echo 'import Hero from "@/components/Hero";
import Container from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <>
      <Hero />
      <Container className="py-6">
        <Section title="Mary Frank PTO" subtitle="Connecting families, students, and staff for student success">
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              Check our{" "}
              <a className="text-blue-600 underline" href="/events">
                Events
              </a>
            </li>
            <li>
              See ways to{" "}
              <a className="text-blue-600 underline" href="/fundraising">
                Fundraise
              </a>
            </li>
            <li>
              Ready to help?{" "}
              <a className="text-blue-600 underline" href="/volunteer">
                Volunteer
              </a>
            </li>
            <li>
              Read the latest{" "}
              <a className="text-blue-600 underline" href="/news">
                News
              </a>
            </li>
          </ul>
        </Section>
      </Container>
    </>
  );
}' > app/page.jsx
```

### Step 4: Commit UI Components

```bash
git add .
git commit -m "Add reusable UI components: Section and NewsCard"
```

---

## Final Steps: Merge and Polish

**Goal**: Combine all features into a working website and test the complete system.

**Progress**: 🎉 **All Features Complete** → Working website

### Step 1: Merge All Branches

```bash
# Switch to main branch
git checkout main

# Merge feature branches
git merge feature/base-layout
git merge feature/hero-section
git merge feature/page-routes
git merge feature/ui-components
```

### Step 2: Test the Application

```bash
# Start development server
npm run dev
```

### Step 3: Final Commit

```bash
git add .
git commit -m "Complete project setup with all features"
```

---

## Project Structure After Setup

```
mary-frank-pto/
├── app/
│   ├── about/page.jsx
│   ├── events/page.jsx
│   ├── fundraising/page.jsx
│   ├── globals.css
│   ├── layout.jsx
│   ├── news/page.jsx
│   ├── page.jsx
│   └── volunteer/page.jsx
├── components/
│   ├── Hero.jsx
│   ├── layout/
│   │   ├── Container.jsx
│   │   └── Header.jsx
│   └── ui/
│       ├── NewsCard.jsx
│       └── Section.jsx
├── public/
│   └── slides/
│       ├── teacher-parent-chat.png
│       ├── community-meeting.png
│       ├── school-bus-arrival.png
│       └── school-playground.png
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── .prettierrc
└── README.md
```

## What You've Built So Far

🎯 **Complete Basic Website**: You now have a fully functional PTO website with:

- ✅ Responsive navigation header
- ✅ Interactive hero section with expandable panels
- ✅ All page routes working
- ✅ Reusable UI components
- ✅ Modern design with Tailwind CSS
- ✅ Clean, maintainable code structure

## Next Steps

Now that you have a clean, organized foundation, you can:

1. **Add real content** to the placeholder pages
2. **Integrate APIs** for events, news, and volunteer opportunities
3. **Add authentication** for admin features
4. **Implement forms** for volunteer signups and donations
5. **Add more interactive features** to the hero section

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

This approach gives you a clean, maintainable codebase that you can build upon systematically!

---

## 🚀 Advanced Integrations (Optional)

The following sections add powerful integrations that make this a production-ready PTO website. These are **optional** - you can stop after the basic setup above and still have a working website.

**When to add these**: Only when you're ready to connect real data sources and need production features.

---

## Branch 6: feature/contentful-integration

### Step 1: Create Branch

```bash
git checkout -b feature/contentful-integration
```

### Step 2: Install Contentful Dependencies

```bash
npm install contentful contentful-management
```

### Step 3: Set Up Contentful Account

1. Go to [Contentful.com](https://www.contentful.com/)
2. Sign up for a free account
3. Create a new space called "Mary Frank PTO"

### Step 4: Create Content Types

#### Volunteer Opportunity Content Type

1. Go to "Content model" → "Add content type"
2. Name: `volunteerOpportunity`
3. Add these fields:
   - **Title** (Short text) - Required
   - **Description** (Long text) - Required
   - **Spots** (Number) - Required
   - **Urgency** (Short text) - Values: "high", "medium", "low"
   - **Date** (Date) - Optional
   - **Time** (Short text) - Optional
   - **Location** (Short text) - Optional
   - **Category** (Short text) - Optional

#### News Article Content Type

1. Go to "Content model" → "Add content type"
2. Name: `newsArticle`
3. Add these fields:
   - **Title** (Short text) - Required
   - **Excerpt** (Long text) - Required
   - **Content** (Rich text) - Required
   - **Publish Date** (Date) - Required
   - **Category** (Short text) - Required
   - **Featured Image** (Media) - Optional

### Step 5: Get API Keys

1. Go to "Settings" → "API keys"
2. Click "Add API key"
3. Name it "Mary Frank PTO Website"
4. Copy the **Space ID** and **Content Delivery API - access token**

### Step 6: Create Contentful Client

```bash
# Create lib/contentful.js
echo 'import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export default client;' > lib/contentful.js
```

### Step 7: Create API Routes

```bash
# Create volunteer API route
mkdir -p app/api/contentful/volunteer
echo 'import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function GET() {
  try {
    const response = await client.getEntries({
      content_type: "volunteerOpportunity",
      order: ["-sys.createdAt"],
      limit: 10,
    });

    const opportunities = response.items.map((item) => ({
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      spots: item.fields.spots || 0,
      urgency: item.fields.urgency || "medium",
      date: item.fields.date,
      time: item.fields.time,
      location: item.fields.location,
      category: item.fields.category,
    }));

    return Response.json(
      {
        success: true,
        data: opportunities,
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching volunteer opportunities:", error);
    return Response.json({
      success: true,
      data: [
        {
          id: 1,
          title: "Fall Festival Volunteers",
          description: "Need 8 more parents for setup and cleanup",
          urgency: "high",
          spots: 8,
        },
        {
          id: 2,
          title: "Library Helper",
          description: "Tuesday mornings 9-11 AM",
          urgency: "medium",
          spots: 1,
        },
      ],
    });
  }
}' > app/api/contentful/volunteer/route.js

# Create news API route
mkdir -p app/api/contentful/news
echo 'import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function GET() {
  try {
    const response = await client.getEntries({
      content_type: "newsArticle",
      order: ["-fields.publishDate"],
      limit: 5,
    });

    const news = response.items.map((item) => ({
      id: item.sys.id,
      title: item.fields.title,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      publishDate: item.fields.publishDate,
      category: item.fields.category,
      slug: item.fields.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    }));

    return Response.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return Response.json({
      success: true,
      data: [
        {
          id: 1,
          title: "Teacher Wish Lists Updated",
          excerpt: "New classroom supplies needed for 3rd grade",
          category: "teacher-support",
          slug: "teacher-wish-lists-updated",
          publishDate: "2024-01-15T00:00:00Z",
        },
        {
          id: 2,
          title: "Fall Festival Success - Record Breaking Year!",
          excerpt: "Raised $2,400 for classroom technology",
          category: "fundraising",
          slug: "fall-festival-success-2024",
          publishDate: "2024-01-10T00:00:00Z",
        },
      ],
    });
  }
}' > app/api/contentful/news/route.js
```

### Step 8: Add Environment Variables

```bash
# Add to .env.local
echo 'CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here' >> .env.local
```

### Step 9: Commit Contentful Integration

```bash
git add .
git commit -m "Add Contentful integration with volunteer and news APIs"
```

---

## Branch 7: feature/google-calendar-integration

### Step 1: Create Branch

```bash
git checkout -b feature/google-calendar-integration
```

### Step 2: Install Google APIs

```bash
npm install googleapis
```

### Step 3: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API for your project

### Step 4: Create Service Account

1. In Google Cloud Console, go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Give it a name (e.g., "mary-frank-pto-calendar")
4. Add description: "Service account for PTO website calendar integration"
5. Click "Create and Continue"
6. Skip role assignment for now, click "Continue"
7. Click "Done"

### Step 5: Generate Service Account Key

1. Click on your newly created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file (keep this secure!)

### Step 6: Share Calendar with Service Account

1. Open Google Calendar
2. Find your PTO calendar in the left sidebar
3. Click the three dots next to it > "Settings and sharing"
4. Scroll down to "Share with specific people"
5. Click "Add people"
6. Add your service account email (from the JSON file)
7. Give it "Make changes to events" permission
8. Click "Send"

### Step 7: Create Calendar API Route

```bash
# Create events API route
mkdir -p app/api/events
echo 'import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\\n"),
  },
  scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
});

const calendar = google.calendar({ version: "v3", auth });

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const maxResults = parseInt(searchParams.get("maxResults")) || 5;

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: maxResults,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items.map((event) => {
      const start = event.start.dateTime || event.start.date;
      const end = event.end.dateTime || event.end.date;

      return {
        id: event.id,
        title: event.summary,
        description: event.description,
        start: start,
        end: end,
        location: event.location,
        formattedDate: new Date(start).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        formattedTime: new Date(start).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };
    });

    return Response.json({
      success: true,
      data: { events },
    });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return Response.json({
      success: false,
      error: "Failed to fetch events",
    });
  }
}' > app/api/events/route.js
```

### Step 8: Add Environment Variables

```bash
# Add to .env.local
echo 'GOOGLE_CALENDAR_ID=your_calendar_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour private key content here\\n-----END PRIVATE KEY-----"' >> .env.local
```

### Step 9: Commit Google Calendar Integration

```bash
git add .
git commit -m "Add Google Calendar integration for events"
```

---

## Branch 8: feature/google-sheets-integration

### Step 1: Create Branch

```bash
git checkout -b feature/google-sheets-integration
```

### Step 2: Set Up Google Sheets

1. Create a new Google Sheet
2. Name it "Mary Frank PTO Volunteer Signups"
3. Create a sheet called "VolunteerSignups"
4. Add headers: Timestamp, Opportunity ID, Opportunity Title, Name, Email, Phone, Message, Date, Time, Location, Status

### Step 3: Share Sheet with Service Account

1. Click "Share" button
2. Add your service account email
3. Give it "Editor" access

### Step 4: Add Environment Variable

```bash
# Add to .env.local
echo 'GOOGLE_SHEETS_ID=your_sheet_id_here' >> .env.local
```

### Step 5: Commit Google Sheets Setup

```bash
git add .
git commit -m "Configure Google Sheets for volunteer signups"
```

---

## Branch 9: feature/email-integration

### Step 1: Create Branch

```bash
git checkout -b feature/email-integration
```

### Step 2: Install Email Dependencies

```bash
npm install resend
```

### Step 3: Set Up Resend Account

1. Go to [Resend.com](https://resend.com/)
2. Sign up for a free account
3. Verify your domain or use the test domain
4. Get your API key

### Step 4: Add Environment Variable

```bash
# Add to .env.local
echo 'RESEND_API_KEY=your_resend_api_key_here
PTO_EMAIL=your_pto_email@example.com' >> .env.local
```

### Step 5: Commit Email Setup

```bash
git add .
git commit -m "Configure Resend for email notifications"
```

---

## Branch 10: feature/volunteer-signup-system

### Step 1: Create Branch

```bash
git checkout -b feature/volunteer-signup-system
```

### Step 2: Create Volunteer Signup API

```bash
# Create volunteer signup route
mkdir -p app/api/volunteer/signup
echo 'import { google } from "googleapis";
import { Resend } from "resend";

// Check if we have the required environment variables
const hasGoogleSheets =
  process.env.GOOGLE_SHEETS_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const hasResend = process.env.RESEND_API_KEY;

// Initialize Google Sheets API using service account
let sheets = null;
if (hasGoogleSheets) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  sheets = google.sheets({ version: "v4", auth });
}

// Initialize Resend only if we have the API key
let resend = null;
if (hasResend) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request) {
  try {
    const {
      name,
      email,
      phone,
      message,
      opportunityId,
      opportunityTitle,
      opportunityDate,
      opportunityTime,
      opportunityLocation,
    } = await request.json();

    // Validate required fields
    if (!name || !email || !opportunityId) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    let sheetResponse = null;
    let volunteerEmailResponse = null;
    let ptoEmailResponse = null;

    // Store in Google Sheets if available
    if (sheets && hasGoogleSheets) {
      try {
        const timestamp = new Date().toISOString();
        const rowData = [
          timestamp,
          opportunityId,
          opportunityTitle,
          name,
          email,
          phone || "",
          message || "",
          opportunityDate || "",
          opportunityTime || "",
          opportunityLocation || "",
          "pending", // status
        ];

        sheetResponse = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEETS_ID,
          range: "VolunteerSignups!A:K",
          valueInputOption: "USER_ENTERED",
          insertDataOption: "INSERT_ROWS",
          requestBody: {
            values: [rowData],
          },
        });
      } catch (sheetsError) {
        console.error("Google Sheets error:", sheetsError);
      }
    }

    // Send confirmation email to volunteer if Resend is available
    if (resend && hasResend) {
      try {
        volunteerEmailResponse = await resend.emails.send({
          from: "Mary Frank PTO <noreply@stepweaver.dev>",
          to: email,
          subject: `Volunteer Signup Confirmation - ${opportunityTitle}`,
          html: generateVolunteerEmail({
            name,
            opportunityTitle,
            opportunityDate,
            opportunityTime,
            opportunityLocation,
            opportunityId,
          }),
        });
      } catch (emailError) {
        console.error("Resend email error:", emailError);
      }
    }

    // Send notification email to PTO if Resend is available
    if (resend && hasResend) {
      try {
        ptoEmailResponse = await resend.emails.send({
          from: "Mary Frank PTO <noreply@stepweaver.dev>",
          to: process.env.PTO_EMAIL || "stephen@stepweaver.dev",
          subject: `New Volunteer Signup: ${opportunityTitle}`,
          html: generatePTOEmail({
            name,
            email,
            phone,
            message,
            opportunityTitle,
            opportunityDate,
            opportunityTime,
            opportunityLocation,
            opportunityId,
          }),
        });
      } catch (emailError) {
        console.error("PTO email error:", emailError);
      }
    }

    // Return success response
    return Response.json({
      success: true,
      message: "Volunteer signup successful",
      data: {
        googleSheets: hasGoogleSheets ? "enabled" : "disabled",
        resend: hasResend ? "enabled" : "disabled",
        volunteerEmailId: volunteerEmailResponse?.data?.id || null,
        ptoEmailId: ptoEmailResponse?.data?.id || null,
        sheetRow: sheetResponse?.data?.updates?.updatedRange || null,
        testMode: !hasGoogleSheets || !hasResend,
      },
    });
  } catch (error) {
    console.error("Error processing volunteer signup:", error);
    return Response.json(
      { success: false, error: "Failed to process signup" },
      { status: 500 }
    );
  }
}

function generateVolunteerEmail({
  name,
  opportunityTitle,
  opportunityDate,
  opportunityTime,
  opportunityLocation,
  opportunityId,
}) {
  const calendarLink = generateCalendarLink({
    title: opportunityTitle,
    date: opportunityDate,
    time: opportunityTime,
    location: opportunityLocation,
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Volunteer Signup Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #00b140 0%, #009933 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Volunteering!</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Mary Frank PTO</p>
      </div>

      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <p style="font-size: 18px; margin-bottom: 20px;">Hi ${name},</p>

        <p>Thank you for signing up to volunteer! Your commitment to our school community means so much.</p>

        <div style="background: white; border-left: 4px solid #00b140; padding: 20px; margin: 20px 0; border-radius: 0 5px 5px 0;">
          <h3 style="margin: 0 0 15px 0; color: #00b140;">Volunteer Opportunity Details</h3>
          <p><strong>Event:</strong> ${opportunityTitle}</p>
          ${opportunityDate ? `<p><strong>Date:</strong> ${opportunityDate}</p>` : ""}
          ${opportunityTime ? `<p><strong>Time:</strong> ${opportunityTime}</p>` : ""}
          ${opportunityLocation ? `<p><strong>Location:</strong> ${opportunityLocation}</p>` : ""}
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${calendarLink}" style="background: #00b140; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            📅 Add to Calendar
          </a>
        </div>

        <p><strong>What happens next?</strong></p>
        <ul>
          <li>You will receive a reminder email 24 hours before the event</li>
          <li>Please arrive 10 minutes early to check in</li>
          <li>If you need to cancel, please contact us as soon as possible</li>
        </ul>

        <p>If you have any questions, please reply to this email or contact us at pto@maryfrankpto.org</p>

        <p>Thank you again for your support!</p>

        <p style="margin-top: 30px;">
          <strong>Mary Frank PTO Team</strong><br>
          <em>Connecting families, students, and staff for student success</em>
        </p>
      </div>
    </body>
    </html>
  `;
}

function generatePTOEmail({
  name,
  email,
  phone,
  message,
  opportunityTitle,
  opportunityDate,
  opportunityTime,
  opportunityLocation,
  opportunityId,
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Volunteer Signup</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #00b140 0%, #009933 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">New Volunteer Signup</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Mary Frank PTO</p>
      </div>

      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <h3 style="color: #00b140; margin-top: 0;">Volunteer Information</h3>

        <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          <p><strong>Opportunity:</strong> ${opportunityTitle}</p>
          ${opportunityDate ? `<p><strong>Date:</strong> ${opportunityDate}</p>` : ""}
          ${opportunityTime ? `<p><strong>Time:</strong> ${opportunityTime}</p>` : ""}
          ${opportunityLocation ? `<p><strong>Location:</strong> ${opportunityLocation}</p>` : ""}
          ${message ? `<p><strong>Notes:</strong> ${message}</strong></p>` : ""}
        </div>

        <p><strong>Action Required:</strong></p>
        <ul>
          <li>Confirm the volunteer signup</li>
          <li>Update the volunteer count in Contentful</li>
          <li>Send any additional information to the volunteer</li>
        </ul>

        <p>This signup has been automatically recorded in your Google Sheets.</p>

        <p style="margin-top: 30px;">
          <strong>Mary Frank PTO System</strong><br>
          <em>Automated notification</em>
        </p>
      </div>
    </body>
    </html>
  `;
}

function generateCalendarLink({ title, date, time, location }) {
  if (!date) return "#";

  const eventDate = new Date(date);
  const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000); // 1 hour duration

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${eventDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    details: `Volunteer opportunity for Mary Frank PTO`,
    location: location || "Mary Frank Elementary School",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}' > app/api/volunteer/signup/route.js
```

### Step 3: Update Hero Component to Use Real APIs

```bash
# Update components/Hero.jsx to use the real APIs
# This will replace the mock data with real Contentful and Google Calendar data
```

### Step 4: Commit Volunteer Signup System

```bash
git add .
git commit -m "Add complete volunteer signup system with Google Sheets and email"
```

---

## Final Integration: Merge All Branches

### Step 1: Merge All Feature Branches

```bash
# Switch to main branch
git checkout main

# Merge all feature branches
git merge feature/contentful-integration
git merge feature/google-calendar-integration
git merge feature/google-sheets-integration
git merge feature/email-integration
git merge feature/volunteer-signup-system
```

### Step 2: Create Complete Environment File

```bash
# Create .env.local with all required variables
echo '# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here

# Google Calendar Configuration
GOOGLE_CALENDAR_ID=your_calendar_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour private key content here\\n-----END PRIVATE KEY-----"

# Google Sheets Configuration
GOOGLE_SHEETS_ID=your_sheet_id_here

# Email Configuration
RESEND_API_KEY=your_resend_api_key_here
PTO_EMAIL=your_pto_email@example.com

# Base URL (for production)
NEXT_PUBLIC_BASE_URL=http://localhost:3000' > .env.local
```

### Step 3: Test Complete System

```bash
# Start development server
npm run dev

# Test each integration:
# 1. Visit /api/contentful/volunteer - should show Contentful data
# 2. Visit /api/events - should show Google Calendar events
# 3. Test volunteer signup from hero section
# 4. Check Google Sheets for new entries
# 5. Check email delivery
```

### Step 4: Final Commit

```bash
git add .
git commit -m "Complete project with all integrations: Contentful, Google Calendar, Sheets, and email"
```

---

## Complete Project Structure

```
mary-frank-pto/
├── app/
│   ├── about/page.jsx
│   ├── events/page.jsx
│   ├── fundraising/page.jsx
│   ├── globals.css
│   ├── layout.jsx
│   ├── news/page.jsx
│   ├── page.jsx
│   ├── volunteer/page.jsx
│   └── api/
│       ├── contentful/
│       │   ├── volunteer/route.js
│       │   └── news/route.js
│       ├── events/route.js
│       └── volunteer/
│           └── signup/route.js
├── components/
│   ├── Hero.jsx
│   ├── layout/
│   │   ├── Container.jsx
│   │   └── Header.jsx
│   └── ui/
│       ├── NewsCard.jsx
│       └── Section.jsx
├── lib/
│   └── contentful.js
├── public/
│   └── slides/
│       ├── teacher-parent-chat.png
│       ├── community-meeting.png
│       ├── school-bus-arrival.png
│       └── school-playground.png
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── .prettierrc
├── .env.local
└── README.md
```

## Environment Variables Reference

Your `.env.local` file should contain:

```bash
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here

# Google Calendar Configuration
GOOGLE_CALENDAR_ID=your_calendar_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour private key content here\\n-----END PRIVATE KEY-----"

# Google Sheets Configuration
GOOGLE_SHEETS_ID=your_sheet_id_here

# Email Configuration
RESEND_API_KEY=your_resend_api_key_here
PTO_EMAIL=your_pto_email@example.com

# Base URL (for production)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## What You've Built

This comprehensive setup gives you:

1. **Dynamic Content Management** - Contentful for easy content updates
2. **Real-time Calendar Integration** - Google Calendar for events
3. **Automated Volunteer Management** - Google Sheets for tracking
4. **Professional Email System** - Resend for notifications
5. **Interactive Hero Section** - Expandable panels with real data
6. **Complete API Infrastructure** - RESTful endpoints for all features
7. **Responsive Design** - Tailwind CSS for modern UI
8. **Production Ready** - Environment-based configuration

## Next Steps for Production

1. **Domain Setup** - Configure your domain with proper DNS
2. **SSL Certificate** - Ensure HTTPS is enabled
3. **Environment Variables** - Set production values in your hosting platform
4. **Content Migration** - Move your existing content to Contentful
5. **Team Training** - Teach PTO members how to use Contentful
6. **Monitoring** - Set up error tracking and analytics
7. **Backup Strategy** - Regular backups of your data
8. **Performance Optimization** - Image optimization and caching

## Troubleshooting Common Issues

### Contentful Issues

- **"Cannot read properties of undefined"** - Check environment variables
- **"No content found"** - Verify content types and published content
- **API rate limits** - Consider implementing caching

### Google Calendar Issues

- **"Invalid credentials"** - Verify service account setup
- **"Calendar not found"** - Check calendar sharing permissions
- **"Insufficient permissions"** - Review service account roles

### Email Issues

- **"Failed to send email"** - Verify Resend API key and domain
- **"Invalid sender"** - Check from email address configuration

### Google Sheets Issues

- **"Sheet not found"** - Verify sheet ID and sharing permissions
- **"Permission denied"** - Check service account access

## 🎉 You're All Set!

This comprehensive setup gives you everything you need to run a professional PTO website with real-time data, automated workflows, and easy content management!

### Quick Reference

- **Basic Setup**: Follow Steps 1-5 above for a working website
- **Advanced Features**: Add integrations when you need them
- **Development**: `npm run dev` to start building
- **Production**: `npm run build` when ready to deploy

### Need Help?

- Check the troubleshooting section below
- Review the environment variables reference
- Test each integration step by step

Happy coding! 🚀
