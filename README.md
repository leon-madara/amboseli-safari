# Amboseli Safari Club

A luxury safari lodge website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design with atomic design patterns
- Server-side rendering with Next.js 14
- Type-safe development with TypeScript
- CSS Modules for component styling
- Optimized images and performance
- Contact forms and booking inquiry system
- Newsletter subscription
- FAQ section
- Legal pages (Privacy Policy, Terms & Conditions, Cancellation Policy)

## Tech Stack

- **Framework:** Next.js 14.2.0+ (App Router)
- **Language:** TypeScript 5.3.0+
- **Styling:** Tailwind CSS 3.4.0+ with CSS Modules
- **Runtime:** Node.js 18.0.0+
- **Package Manager:** npm 9.0.0+
- **Form Validation:** Zod 3.22.0+

For detailed technology specifications, see [TECH_STACK.md](./TECH_STACK.md)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and configure your environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

See [SETUP.md](./SETUP.md) for detailed project structure documentation.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## Agent OS Development Workflow

This project uses [Agent OS](https://buildermethods.com/agent-os) for spec-driven development with AI agents.

### Quick Start

**⚠️ Important:** After installing Agent OS, restart Claude Code to enable the commands.

**Available Commands:**
- `/plan-product` - Define product mission, roadmap, and tech stack
- `/shape-spec` - Refine feature requirements interactively
- `/write-spec` - Generate detailed specifications
- `/create-tasks` - Break specs into actionable task lists
- `/implement-tasks` - Execute tasks with main agent (for simple features)
- `/orchestrate-tasks` - Delegate to specialized subagents (for complex features)
- `/improve-skills` - Optimize Skill descriptions for better recognition

### Development Phases

1. **Plan Product** - Define mission, target audience, feature roadmap (run once)
2. **Shape Spec** - Interactive requirements gathering for a feature
3. **Write Spec** - Create comprehensive specification document
4. **Create Tasks** - Break down spec into prioritized task list
5. **Implement/Orchestrate** - Execute tasks with appropriate agent strategy

### Profile & Standards

- **Profile:** `amboseli-safari` (custom Next.js 14 + TypeScript + Tailwind)
- **Standards Location:** `.claude/skills/agent-os/`
- **Configuration:** See [AGENT_OS.md](./AGENT_OS.md) for full details

### Example Workflow

```bash
# 1. Shape a new feature (e.g., Enhanced Navigation)
/shape-spec

# 2. Write the specification
/write-spec

# 3. Create task list from spec
/create-tasks enhanced-navigation

# 4. Execute tasks
/implement-tasks enhanced-navigation     # For simple features
/orchestrate-tasks enhanced-navigation   # For complex features
```

### Documentation

- **Product Context:** `agent-os/product/` (mission, roadmap, tech-stack)
- **Feature Specs:** `agent-os/specs/` (detailed specifications)
- **Implementation Reports:** `agent-os/reports/` (post-implementation analysis)
- **Enhancement Plans:** `docs/` (research and planning documents)

For complete Agent OS documentation, see [AGENT_OS.md](./AGENT_OS.md)

## Component Architecture

This project follows atomic design principles:

- **Atoms:** Basic building blocks (Button, Input, Badge, etc.)
- **Molecules:** Simple component combinations (Card, FormField, etc.)
- **Organisms:** Complex components (Navigation, Hero, ContactForm, etc.)
- **Templates:** Page-level layouts

## Contributing

Please read the contribution guidelines before submitting pull requests.

## License

All rights reserved - Amboseli Safari Club
