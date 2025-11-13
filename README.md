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
- `npm run clean` - Clean Next.js cache and build artifacts
- `npm run clean:full` - Full cleanup (removes node_modules and reinstalls)
- `npm run rebuild` - Clean cache and rebuild project

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

## Troubleshooting

### Build Cache Errors

If you encounter webpack caching errors during builds (such as "Can't resolve './vendor-chunks/...'"), run:

```bash
npm run clean
```

For persistent issues, perform a full cleanup:

```bash
npm run clean:full
```

These errors typically occur when:
- Dependencies are updated but the cache isn't cleared
- Switching between branches with different dependencies
- The build cache becomes corrupted

See [scripts/README.md](./scripts/README.md) for detailed troubleshooting information.

### Other Common Issues

**Port already in use:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows (find PID, then taskkill /PID <pid> /F)
```

**TypeScript errors:**
```bash
npm run type-check
```

**Dependency issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

Please read the contribution guidelines before submitting pull requests.

## License

All rights reserved - Amboseli Safari Club
