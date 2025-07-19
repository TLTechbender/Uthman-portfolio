# Portfolio Documentation: The Real Gist 🚀

## Ekaabo oo, Ori yii gun die, sugbon te eti re sile go gbo mhi!

## Table of Contents

1. [Project Overview](#project-overview-the-full-gist)
2. [Architecture](#architecture-how-we-set-am)
3. [Monorepo Journey](#monorepo-journey-how-i-discover-npm-workspaces)
4. [Setup Instructions](#setup-instructions-how-to-run-am)
5. [Available Commands](#available-commands-wetin-you-fit-run)
6. [Technology Stack](#technology-stack-wetin-we-use)
7. [Project Structure](#project-structure-how-we-arrange-am)
8. [Development Workflow](#development-workflow-how-to-work-am)
9. [Troubleshooting](#troubleshooting-when-wahala-enter)

---

## Project Overview (The Full Gist)

### How Far Bola? Why All These Packages? 🤔

Person fit ask: "On top single page app you run go do don do `npm install react router, npm install gbasgbos` and many packages, see as `package.json` long, monorepo too haba, wetin Vanilla js?"

**Me:** Hear me out o! I for use plain HTML and CSS but that one go be mess scatter for ground. Why? Because I decide say make I use **Sanity** for all the convenience wey e dey offer.

**Real Talk:** When Uthman wan change text, boom! E just work without am having to slide into my DMs dey talk say _"How far Bola I need your help 😊😊😊"_

**Animation nko?** No be me plain CSS and JS animations go kill! My mama still dey house o!

**Monorepo?** Bro, I want organization and I want `npm run dev` to work without me having to manually `cd` into both `frontend` and `cms` folders in different terminal tabs to do `npm run dev`. That one na stress!

---

## Architecture (How I take set am Set Am)

### The Simple Blueprint 📐

Either way, here is how the app dey go:

```
project-root/
├── frontend/     # Contains the UI logic
├── cms/          # Contains the CMS logic
└── package.json  # Monorepo configuration with npm workspaces
```

1. **Frontend**: Contains all the UI logic and user interactions
2. **CMS**: Contains the CMS logic - we use Sanity as our CMS of choice
3. **Root**: The monorepo configuration that ties everything together

**Why Sanity?**

- I'm very familiar with it
- Their TypeScript integration na top notch
- Content management without wahala

---

## Monorepo Setup (The npm Workspaces Configuration)

### Why We Use npm Workspaces Instead of Turbo 🤷🏾‍♂️

**Person fit ask:** "But bro, why you no use Turbo repo? I don see am for plenty tutorial!"

**Real Talk:** Turbo repo na overkill for wetin we dey do! npm workspaces don give us 80% of wetin we need with 20% of the complexity. We no need all that caching and build orchestration wahala for portfolio website, infact all this package.jsons for just two pages is a whole lot, seems like overengineering looking from the outside, but if you sit down and reason the matter wella, una go know say nha condition make crayfish bend.

### The Root Package.json Magic ✨

```json
{
  "workspaces": ["frontend", "cms"],
  "scripts": {
    "dev": "concurrently \"npm run dev --workspace=frontend\" \"npm run dev --workspace=cms\""
  }
}
```

**See how e sweet?** One command `npm run dev` and both frontend and cms go start together! No more running around different terminals like headless chicken (chai, nha me dey call myself chicken sha).

### Tools I Added for Smooth Operation

- **concurrently**: Make both apps run together with different colors for their logs (reason for choosing this is again I used it in the past)
- **rimraf**: Cross-platform way to delete `node_modules` (God punish windows sha!)

---

## Setup Instructions (How una go take Run Am)

### Prerequisites

- Node.js (version 16 or higher) - **npm workspaces need am!**
- npm version 7+ (for workspaces support)
- Git

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone [repo-url]
   cd uthman-portfolio
   ```

2. **Install ALL dependencies with one command:**

   ```bash
   # This one command go install everything, frontend, and cms no stress and no sorrow.
   npm install
   # or you fit use our custom command
   npm run install:all
   ```

3. **Set up environment variables:**

   ```bash
   # Most likely the ones from sanity bro (applicable to only the frotend sha)

   ```

4. **Start development servers (The Sweet Part!):**

   ```bash
   # This one command go start BOTH frontend and cms together!
   npm run dev
   ```

   **Or if you wan start them separately:**

   ```bash
   npm run dev:frontend    # Only React app
   npm run dev:cms        # Only Sanity studio
   ```

---

## Available Commands (Wetin You Fit Run)

### Development Commands 💻

```bash
npm run dev              # Start both frontend and cms together
npm run dev:frontend     # Start only React app
npm run dev:cms         # Start only Sanity studio
```

### Build Commands 🏗️

```bash
npm run build           # Build both apps for production
npm run build:frontend  # Build only frontend
npm run build:cms       # Build only cms
```

### Installation Commands 📦

```bash
npm run install:all      # Install all dependencies (same as npm install)
npm run install:frontend # Install only frontend dependencies
npm run install:cms      # Install only cms dependencies
```

### Cleaning Commands 🧹 (When Wahala Enter)

```bash
npm run clean           # Delete ALL node_modules and reinstall everything
npm run fresh           # Same as clean (Pick your poison bro)
npm run clean:all       # Delete ALL node_modules but don't reinstall
npm run clean:frontend  # Clean only frontend
npm run clean:cms       # Clean only cms
npm run clean:root      # Clean only root
```

**Why we need clean commands?** Sometimes dependency go just dey misbehave and the only way na to delete everything start afresh (Something turbo taught me the fucking hard way)!

### Linting Commands 🧐

```bash
npm run lint            # Run ESLint on all workspaces
npm run lint:frontend   # Lint only frontend
npm run lint:cms        # Lint only cms
npm run lint:fix        # Auto-fix ESLint errors everywhere
npm run lint:fix:frontend # Auto-fix only frontend
npm run lint:fix:cms    # Auto-fix only cms
```

---

## Technology Stack (Wetin We Use)

### Frontend Stack

- **React Router Framework Mode** - For building the UI and also getting some SSR benefits without the premium wahala of next.js
- **TypeScript** - Standard in big 2025
- **Vite** - Our odogwu on which this entire house is built on
- **Tailwind CSS** - Cos why I go dey create extra css file nha

### CMS Stack

- **Sanity** - Headless CMS for content management
- **Sanity Studio** - For content editing interface
- **TypeScript** - For type safety with Sanity schemas

### Development Tools

- **npm workspaces** - For managing the monorepo (no Turbo needed!)
- **concurrently** - Run multiple commands at once with colored output
- **rimraf** - Cross-platform file deletion (works on Windows and Unix)
- **ESLint** - For code linting across all workspaces
- **Prettier** - For code formatting

---

## Project Structure (How We Arrange Am)

```
uthman-portfolio/
├── package.json              # Root config with workspaces and scripts
├── node_modules/             # Shared dependencies
├── package-lock.json         # Root lock file
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   ├── routes/
│   │   ├── lib/              # Helper functions an all that type shit
│   │   └── types.ts          # would contain all the types from fetching from the sanity studio cms
│   ├── public/
│
│
├── cms/
│   ├── schemaTypes/          #Contains all the defined schemas
│   ├── sanity.config.ts
│   ├── package.json          # CMS-specific dependencies
│   └── package-lock.json     # CMS lock file
└── README.md
```

### Key Points About the Structure

- **Root package.json**: Controls the entire monorepo with workspaces
- **Individual package.json files**: Each workspace get their own dependencies
- **Shared node_modules**: npm workspaces automatically link packages to avoid duplication
- **Symlinks**: Your workspaces dey link to each other through symlinks (like shortcuts)

---

## Development Workflow (How to Work Am)

### Normal Day-to-Day Development

```bash
# Morning setup
npm run dev          # Start everything

# Code, code, code...

# Before commit
npm run lint:fix     # Fix any linting issues
npm run build        # Make sure everything builds fine
```

### When Things Go Wrong (Troubleshooting Mode)

```bash
# Dependency issues?
npm run fresh        # Nuclear option - delete everything and start over

# Only frontend get problem?
npm run clean:frontend && npm run install:frontend

# Only cms get wahala?
npm run clean:cms && npm run install:cms
```

### Adding New Dependencies

```bash
# Add to frontend only
npm install lodash --workspace=frontend

# Add to cms only
npm install some-package --workspace=cms

# Add to root (development tools)
npm install -D some-dev-tool
```

---

## Troubleshooting (When Wahala Enter)

### Common Issues and Solutions

**"npm run dev no dey work!"**

- Make sure you get Node 16+ and npm 7+
- Run `npm run fresh` to reset everything

**"One workspace no dey start!"**

- Check if that workspace get the script defined in their package.json
- Try run am individually: `npm run dev:frontend` or `npm run dev:cms`

**"Dependencies no dey install properly!"**

- Clear everything: `npm run clean:all`
- Install fresh: `npm run install:all`

**"I wan share code between frontend and cms!"**

- Create a shared folder in root
- Use relative imports between workspaces
- Or create a separate workspace for shared utilities

---

## Final Notes (Last Last)

That's basically it! **1 simple monorepo setup rules them all**. The npm workspaces approach fit look simple but e dey very powerful and no get unnecessary complexity wey Turbo repo go bring.

**Why This Setup Sweet:**

1. **Single command development**: `npm run dev` start everything
2. **Granular control**: You fit work on individual parts when needed
3. **Clean template**: `npm run clean:all` give you fresh template to share
4. **Cross-platform**: Everything work for Windows, Mac, and Linux
5. **Future-proof**: Easy to add more workspaces if Uthman wan expand

The architecture fit look like overkill but trust me, it's for the best. When I don cook am finish, you go appreciate the organization!

---

**Developer:** Omo, it's <OluwaBrimz/> on the Keyboard,

**Version:** 1.0.0 (definitely more avenues may pop up where uthman want to cook like mad)

**Monorepo Configuration:** npm workspaces with concurrently and rimraf for maximum developer experience, Oshamo 🚀
