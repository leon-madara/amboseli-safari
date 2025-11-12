# Agent OS Configuration - Amboseli Safari Club

This document provides comprehensive information about the Agent OS configuration for the Amboseli Safari Club luxury safari lodge website.

## Table of Contents

- [Overview](#overview)
- [Profile Configuration](#profile-configuration)
- [Standards & Skills](#standards--skills)
- [Development Workflow](#development-workflow)
- [Commands Reference](#commands-reference)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

Agent OS is a spec-driven development system that enables systematic feature planning and implementation using AI agents. This project uses a custom `amboseli-safari` profile tailored for luxury Next.js websites with TypeScript, Tailwind CSS, and atomic design patterns.

### Key Benefits

- **Systematic Development**: Structured workflow from concept to implementation
- **Consistent Standards**: AI agents apply project-specific coding standards automatically
- **Better Documentation**: Specs and implementation reports create living documentation
- **Faster Iteration**: Parallel task execution with specialized subagents
- **Quality Assurance**: Built-in verification and testing workflows

---

## Profile Configuration

### Profile Details

- **Name:** `amboseli-safari`
- **Location:** `~/agent-os/profiles/amboseli-safari/`
- **Based On:** `default` profile
- **Purpose:** Next.js 14 luxury website with TypeScript, Tailwind CSS, and atomic design

### Configuration Settings

Located in `~/agent-os/config.yml`:

```yaml
version: 2.1.1
profile: amboseli-safari
claude_code_commands: true
use_claude_code_subagents: true
standards_as_claude_code_skills: true
agent_os_commands: false
```

### Project Installation

Agent OS is installed in your project at:

```
amboseli-safari-club/
├── agent-os/               # Project-specific Agent OS files
│   ├── config.yml         # Project configuration
│   ├── product/           # Product context (mission, roadmap, tech-stack)
│   ├── specs/             # Feature specifications
│   ├── reports/           # Implementation reports
│   └── standards/         # Compiled standards (15 files)
└── .claude/               # Claude Code integration
    ├── commands/agent-os/ # Workflow commands (6 commands)
    ├── agents/agent-os/   # Subagents for orchestration (8 agents)
    └── skills/            # Standards as Skills (15 skills)
```

---

## Standards & Skills

The `amboseli-safari` profile includes 15 customized standards that define how to build the luxury safari lodge website. These are available as Claude Code Skills for automatic application.

### Global Standards

Located in `.claude/skills/`:

1. **global-tech-stack** - Next.js 14, TypeScript 5.3+, Tailwind CSS, Framer Motion
   - Framework configurations
   - Dependency specifications
   - Architecture patterns
   - Performance targets
   - Security practices

2. **global-coding-style** - TypeScript patterns, Next.js conventions
   - Type safety rules (strict mode, no `any`)
   - Server vs Client Component patterns
   - File naming conventions
   - Import organization
   - Code formatting standards

3. **global-conventions** - Luxury brand voice, safari-specific naming
   - Brand voice guidelines (sophisticated, elegant, warm)
   - URL structure (`/accommodations`, `/experiences`)
   - Component naming (PascalCase, descriptive)
   - Git workflow (feature branches, commit messages)
   - Environment variable patterns

4. **global-commenting** - JSDoc and inline comment standards
5. **global-error-handling** - Try-catch patterns, error boundaries
6. **global-validation** - Zod schema patterns for forms and APIs

### Frontend Standards

7. **frontend-components** - Atomic Design + Next.js patterns
   - Server Component (default) vs Client Component usage
   - Component structure (TypeScript interfaces, props patterns)
   - File organization (Component.tsx, Component.module.css, index.ts)
   - Styling approach (Tailwind + CSS Modules)
   - Animation standards (Framer Motion)

8. **frontend-css** - Tailwind-first + CSS Modules for complexity
   - Design token usage from `tailwind.config.ts`
   - CSS Module patterns for component-specific styles
   - Safari-themed color palette (terracotta, sand, gold)
   - Typography hierarchy (Playfair Display, Inter)
   - Responsive breakpoints

9. **frontend-accessibility** - WCAG 2.1 AA for luxury hospitality
   - Semantic HTML requirements
   - Color contrast ratios (4.5:1 minimum)
   - Keyboard navigation patterns
   - ARIA label usage
   - Screen reader considerations
   - Reduced motion support

10. **frontend-responsive** - Mobile-first for global travelers
    - Breakpoint strategy (xs: 475px → 2xl: 1536px)
    - Touch target sizes (44x44px minimum)
    - Responsive image patterns
    - Mobile-specific optimizations

### Backend Standards

11. **backend-api** - Next.js App Router API routes
    - Route handler patterns (`route.ts` files)
    - Zod validation for all inputs
    - Response format standards (success/error)
    - HTTP status code usage
    - Error handling patterns
    - nodemailer email integration

12. **backend-models** - Data modeling patterns (future CMS integration)
13. **backend-queries** - Data fetching in Server Components
14. **backend-migrations** - Database migration patterns (future)

### Testing Standards

15. **testing-test-writing** - Jest + React Testing Library patterns (future)

---

## Development Workflow

Agent OS provides a 6-phase spec-driven development workflow.

### Phase 0: Plan Product (Run Once)

**Command:** `/plan-product`

Define the product's strategic context:
- Product mission and vision
- Target audience (affluent travelers, $200k+ HHI, age 35-65)
- Feature roadmap with priorities
- Technology stack documentation

**Output:** Creates `agent-os/product/` with:
- `mission.md` - Product vision and target users
- `roadmap.md` - Prioritized feature list
- `tech-stack.md` - Technology choices

**When to run:** Once at project start, or when significant strategic changes occur.

### Phase 1: Shape Spec

**Command:** `/shape-spec`

Interactive requirements gathering for a feature. The agent asks clarifying questions to refine:
- Feature scope and boundaries
- User stories and use cases
- Visual references needed
- Similar features in codebase
- Success criteria

**Output:** Creates/updates `agent-os/specs/[feature-name]/requirements.md`

**When to use:** When you have a rough feature idea that needs clarification before formal specification.

**Example:**
```
You: /shape-spec
Agent: What feature would you like to shape?
You: Enhanced navigation with sticky header and dropdown menus
Agent: [Asks clarifying questions about behavior, mobile menu, etc.]
```

### Phase 2: Write Spec

**Command:** `/write-spec`

Generates a comprehensive specification document from requirements. The spec includes:
- Feature overview and rationale
- Detailed requirements (functional, technical, UX)
- Component breakdown
- Acceptance criteria
- Testing requirements
- Implementation notes

**Output:** Creates `agent-os/specs/[feature-name]/spec.md`

**When to use:** After shaping requirements or when you have clear requirements to document.

### Phase 3: Create Tasks

**Command:** `/create-tasks [spec-name]`

Breaks down the specification into an actionable, prioritized task list. Tasks are grouped by specialty:
- Database (schema, migrations)
- Backend (API routes, business logic)
- Frontend (components, styling)
- Testing (unit, integration, E2E)

**Output:** Creates `agent-os/specs/[feature-name]/tasks.md`

**When to use:** After completing the specification, before implementation.

### Phase 4: Implement Tasks

**Command:** `/implement-tasks [spec-name]`

Executes the task list with the main agent. Best for:
- Simple features (1-3 day implementations)
- Single-concern features
- Straightforward implementations with clear requirements

**Output:**
- Implemented code
- `agent-os/reports/[feature-name]/implementation-report.md`

**When to use:** For features like Enhanced Navigation, Footer, Testimonials Section.

### Phase 5: Orchestrate Tasks

**Command:** `/orchestrate-tasks [spec-name]`

Delegates task groups to specialized subagents for parallel execution. Best for:
- Complex features (1-2 week implementations)
- Multi-concern features (frontend + backend + integration)
- Features requiring specialized expertise

**Available Subagents:**
- **Frontend Subagent** - Component implementation, styling
- **Backend Subagent** - API routes, data fetching
- **Testing Subagent** - Test coverage
- **Integration Subagent** - Cross-concern coordination

**Output:**
- Implemented code from multiple subagents
- `agent-os/reports/[feature-name]/orchestration-report.md`

**When to use:** For features like Room Detail Pages, Booking Calendar, Payment Integration.

---

## Commands Reference

### Core Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/plan-product` | Define product strategy | Once at project start |
| `/shape-spec` | Refine feature requirements | Before writing specs |
| `/write-spec` | Create detailed specification | After shaping or when requirements are clear |
| `/create-tasks` | Break spec into task list | After completing spec |
| `/implement-tasks` | Execute with main agent | Simple features (1-3 days) |
| `/orchestrate-tasks` | Delegate to subagents | Complex features (1-2 weeks) |
| `/improve-skills` | Optimize Skill descriptions | After installing or updating standards |

### Workflow Patterns

**Simple Feature (e.g., Enhanced Footer):**
```bash
/shape-spec        # Interactive requirements gathering
/write-spec        # Generate comprehensive spec
/create-tasks      # Break into task list
/implement-tasks   # Execute with main agent
```

**Complex Feature (e.g., Booking System):**
```bash
/shape-spec           # Interactive requirements gathering
/write-spec           # Generate comprehensive spec
/create-tasks         # Break into task list
/orchestrate-tasks    # Delegate to specialized subagents
```

**Research & Planning (without coding):**
Use the Task tool with subagent_type="Plan" to research without executing code.

---

## Best Practices

### 1. Always Shape Before Writing

Don't skip the `/shape-spec` phase. Even if requirements seem clear, shaping helps:
- Identify edge cases
- Clarify assumptions
- Gather visual references
- Define success criteria

### 2. Keep Specs Focused

One spec = one feature. Break large initiatives into multiple specs:
- ✅ Good: "Enhanced Navigation", "Room Detail Pages", "Booking Calendar"
- ❌ Bad: "Complete Website Redesign"

### 3. Update Roadmap After Implementation

After completing a feature, update `agent-os/product/roadmap.md`:
- Mark feature as completed
- Add actual completion date
- Note any scope changes
- Identify follow-up features

### 4. Use Orchestration for Multi-Concern Features

If a feature touches frontend, backend, AND integration, use `/orchestrate-tasks`:
- Specialized subagents work in parallel
- Better expertise per domain
- Faster overall completion

### 5. Review Generated Specs

Always review specifications before creating tasks:
- Verify requirements match intent
- Check for missing edge cases
- Ensure acceptance criteria are testable
- Validate technical approach

### 6. Commit Specs and Reports

Version control all Agent OS documentation:
- Specs document feature history
- Reports track implementation decisions
- Team members can reference past work

### 7. Run /improve-skills Periodically

After updating standards or adding new ones:
```bash
/improve-skills
```
This optimizes Skill descriptions for better Claude Code recognition.

---

## Troubleshooting

### Commands Not Recognized

**Problem:** `/plan-product` shows "Unknown slash command"

**Solution:** Restart Claude Code to pick up newly installed commands.

### Skills Not Applying

**Problem:** AI agents not following project standards

**Solutions:**
1. Run `/improve-skills` to optimize Skill descriptions
2. Verify `.claude/skills/` directory exists with 15 SKILL.md files
3. Check `standards_as_claude_code_skills: true` in `~/agent-os/config.yml`

### Spec Creation Fails

**Problem:** `/write-spec` doesn't generate expected output

**Solutions:**
1. Ensure requirements exist in `agent-os/specs/[feature]/requirements.md`
2. Run `/shape-spec` first to establish clear requirements
3. Check that spec name is lowercase with hyphens

### Task List Too Generic

**Problem:** `/create-tasks` generates vague task descriptions

**Solutions:**
1. Make specification more detailed with component breakdowns
2. Include technical requirements and acceptance criteria in spec
3. Reference similar features in codebase for context

### Subagents Not Delegating

**Problem:** `/orchestrate-tasks` runs with main agent instead of subagents

**Solutions:**
1. Verify `use_claude_code_subagents: true` in `~/agent-os/config.yml`
2. Check `.claude/agents/agent-os/` directory has 8 agent files
3. Ensure task list has properly grouped tasks (database, backend, frontend)

### Standards Out of Sync

**Problem:** Agent OS standards differ from actual codebase patterns

**Solutions:**
1. Update standards in `~/agent-os/profiles/amboseli-safari/standards/`
2. Run project installation again: `~/agent-os/scripts/project-install.sh`
3. Run `/improve-skills` to refresh Skills

---

## Directory Structure Reference

```
amboseli-safari-club/
│
├── agent-os/                           # Agent OS project files
│   ├── config.yml                      # Project configuration
│   ├── product/                        # Product strategy
│   │   ├── mission.md                  # Product vision
│   │   ├── roadmap.md                  # Feature roadmap
│   │   └── tech-stack.md               # Technology choices
│   ├── specs/                          # Feature specifications
│   │   ├── enhanced-navigation/
│   │   │   ├── requirements.md         # Shaped requirements
│   │   │   ├── spec.md                 # Full specification
│   │   │   └── tasks.md                # Task breakdown
│   │   └── room-detail-pages/
│   │       ├── requirements.md
│   │       ├── spec.md
│   │       └── tasks.md
│   ├── reports/                        # Implementation reports
│   │   ├── enhanced-navigation/
│   │   │   └── implementation-report.md
│   │   └── room-detail-pages/
│   │       └── orchestration-report.md
│   └── standards/                      # Compiled standards (15 files)
│       ├── backend/
│       │   ├── api.md
│       │   ├── migrations.md
│       │   ├── models.md
│       │   └── queries.md
│       ├── frontend/
│       │   ├── accessibility.md
│       │   ├── components.md
│       │   ├── css.md
│       │   └── responsive.md
│       ├── global/
│       │   ├── coding-style.md
│       │   ├── commenting.md
│       │   ├── conventions.md
│       │   ├── error-handling.md
│       │   ├── tech-stack.md
│       │   └── validation.md
│       └── testing/
│           └── test-writing.md
│
├── .claude/                            # Claude Code integration
│   ├── commands/agent-os/              # Workflow commands
│   │   ├── plan-product.md
│   │   ├── shape-spec.md
│   │   ├── write-spec.md
│   │   ├── create-tasks.md
│   │   ├── implement-tasks.md
│   │   ├── orchestrate-tasks.md
│   │   └── improve-skills.md
│   ├── agents/agent-os/                # Subagents
│   │   ├── product-planner.md
│   │   ├── spec-shaper.md
│   │   ├── spec-writer.md
│   │   ├── spec-verifier.md
│   │   ├── tasks-list-creator.md
│   │   ├── implementer.md
│   │   ├── implementation-verifier.md
│   │   └── spec-initializer.md
│   └── skills/                         # Standards as Skills
│       ├── backend-api/SKILL.md
│       ├── backend-migrations/SKILL.md
│       ├── backend-models/SKILL.md
│       ├── backend-queries/SKILL.md
│       ├── frontend-accessibility/SKILL.md
│       ├── frontend-components/SKILL.md
│       ├── frontend-css/SKILL.md
│       ├── frontend-responsive/SKILL.md
│       ├── global-coding-style/SKILL.md
│       ├── global-commenting/SKILL.md
│       ├── global-conventions/SKILL.md
│       ├── global-error-handling/SKILL.md
│       ├── global-tech-stack/SKILL.md
│       ├── global-validation/SKILL.md
│       └── testing-test-writing/SKILL.md
│
├── docs/                               # Research & planning docs
│   └── hero-section-enhancement-plan.md
│
└── [rest of Next.js project structure]
```

---

## Additional Resources

- **Agent OS Documentation:** https://buildermethods.com/agent-os
- **Installation Guide:** https://buildermethods.com/agent-os/installation
- **Workflow Guide:** https://buildermethods.com/agent-os/workflow
- **GitHub Repository:** https://github.com/buildermethods/agent-os
- **Community:** https://buildermethods.com/pro

---

## Version History

- **v1.0.0** (November 2024) - Initial Agent OS installation with `amboseli-safari` profile
  - Custom standards for Next.js 14 + TypeScript + Tailwind
  - 15 Skills configured for luxury safari lodge website
  - 6 commands + 8 subagents installed
  - Hero section enhancement plan created

---

**Last Updated:** November 2024
**Profile Version:** `amboseli-safari` v1.0.0
**Agent OS Version:** 2.1.1
