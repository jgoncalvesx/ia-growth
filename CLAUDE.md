# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Growth Midia IA** (internally: MidiaOS) — SaaS for paid media managers handling multiple Meta Ads and Google Ads accounts. Target user is a non-technical traffic manager.

## Commands

### Development

`npm run dev` starts both frontend and backend together via `concurrently`.

If running separately:
```bash
# Frontend — Vite dev server on port 5173
npm run dev

# Backend — Express on port 3001
npm run dev:backend
```

### Build & Lint

```bash
npm run build   # tsc -b && vite build
npm run lint    # ESLint on .ts/.tsx
npm run preview
```

No tests configured.

### Prisma (run inside `backend/`)

```bash
cd backend
npx prisma db pull    # introspect existing DB → regenerate schema.prisma
npx prisma generate   # generate Prisma Client after schema changes
```

> **Prisma 7 note:** The `datasource` in `schema.prisma` must NOT have a `url` field — that's a breaking change in Prisma 7. The connection URL is handled via `prisma.config.ts` (for CLI operations) and via `@prisma/adapter-pg` in `src/db.ts` (for the runtime client).

## Architecture

Full-stack: React frontend + Express backend. Vite proxies `/api` → `http://localhost:3001`.

### Frontend (`src/`)

- **Routing:** React Router v6, all routes in `src/App.tsx`
- **State:** `src/context/ClientContext.tsx` manages active client (multi-tenant); all other state is local `useState`
- **API layer:** `src/services/api.service.ts` — single `callApi()` wrapper, all backend calls go through here
- **Styling:** Tailwind CSS with custom HSL CSS variable color system (`tailwind.config.js`)
- **UI:** `src/components/ui/` = Radix UI / shadcn primitives; `src/components/` = feature components
- **Charts:** Recharts | **Animations:** Framer Motion | **Toasts:** Sonner | **Icons:** Lucide React

To add a new page: create in `src/pages/`, add route in `src/App.tsx`, add sidebar entry in `src/components/Sidebar.tsx`.

### Backend (`backend/`)

- **Framework:** Express.js v5, TypeScript, `ts-node-dev` in dev
- **Port:** 3001
- **Current state:** All controllers return mock data from `backend/src/data/mockData.ts`
- **ORM:** Prisma v7, PostgreSQL. Client generated to `backend/src/generated/prisma/` (TypeScript source files). Schema at `backend/prisma/schema.prisma`. Config at `backend/prisma.config.ts`
- **DB connection:** `backend/src/db.ts` — creates `PrismaPg` adapter + `PrismaClient` singleton. `dotenv.config()` must be called inside `db.ts` itself (before Pool creation) because `db.ts` is imported before `dotenv.config()` runs in `index.ts`
- **backend/ is isolated** — has its own `package.json`. The root `tsconfig.json` excludes `backend/`

New endpoints go in `backend/src/routes/` and `backend/src/controllers/`.

### Database

**Local (Docker):**
```
host: localhost  port: 5432  user: postgres  password: postgres  db: postgres
```

**Production (Neon.tech):** credentials in `backend/.env.production` (not committed).

#### Schema (12 tables, already created in local DB)

| Table | Purpose |
|---|---|
| `clientes` | Root entity |
| `contas_anuncio` | Ad accounts (Meta, Google, LinkedIn, TikTok) per client |
| `campanhas` → `conjuntos_anuncios` → `anuncios` | Campaign hierarchy |
| `metricas_diarias` | Raw API data (UNIQUE per account+ad+date) |
| `leads` | CRM with UTM fields |
| `snapshots` | Consolidated KPIs per day/account |
| `acoes_ia` | AI-suggested actions with status + rollback |
| `audit_log` | Auditable history |
| `orcamentos` | Budgets |
| `workflows`, `notificacoes`, `configuracoes` | Supporting tables |

#### Views (already created)

| View | Used by |
|---|---|
| `v_dashboard_hoje` | `GET /api/dashboard-kpis` |
| `v_kpis_30d` | `GET /api/contas-status` — includes green/yellow/red semaphore |
| `v_alertas_cpl` | `GET /api/alertas-ativos` — ads with CPL above max (last 7 days) |

Semaphore logic: green = CPL < cpl_meta, yellow = between meta and max, red = CPL > cpl_max.

Seed data: clients `'Cliente Alpha'` and `'Loja Principal'` already inserted.

### API Endpoints

All in `backend/src/controllers/` — currently all mocked:

```
GET  /api/dashboard-kpis    → v_dashboard_hoje
GET  /api/contas-status     → v_kpis_30d
GET  /api/alertas-ativos    → v_alertas_cpl
GET  /api/acoes-pendentes   → acoes_ia WHERE status='pendente'
GET  /api/audit-log         → audit_log ORDER BY criado_em DESC
GET  /api/analytics         → aggregate metricas_diarias
GET  /api/budget            → orcamentos
GET  /api/campaigns         → campanhas
GET  /api/leads             → leads
POST /api/leads             → INSERT leads
POST /api/chat              → Claude API (Anthropic) — { pergunta, conta_id?, periodo? }
POST /api/executar-acao     → UPDATE acoes_ia + INSERT audit_log
POST /api/ignorar-acao      → UPDATE acoes_ia status='ignorada'
POST /api/executar-analise  → Claude API with DB context
```

AI integration plan for `/api/chat`: question → Claude generates SQL → execute on DB → Claude interprets → return analysis. Use `@anthropic-ai/sdk` with `ANTHROPIC_API_KEY` in `backend/.env`.

### Environment Variables

- Root `.env.local` — frontend `VITE_` prefixed vars (legacy n8n webhook, not in active use)
- `backend/.env` — `DATABASE_URL` for local PostgreSQL, `ANTHROPIC_API_KEY`
- `backend/.env.production` — production `DATABASE_URL` (Neon.tech)

## Key Rules

- Frontend never accesses the DB directly — always through the Express backend
- `backend/` is isolated: its own `package.json`, excluded from root `tsconfig.json`
- Do not break mocks while migrating to real data — migrate controller by controller
- Currency in BRL (R$), timezone `America/Sao_Paulo`
- AI only suggests actions — a human must approve before execution
- Rollback window: 2 hours after any executed action

## Current Status & Priorities

1. **Deploy fix (urgent):** Coolify build fails — `tsc` prints help instead of compiling. Verify root `tsconfig.json` excludes `backend/` and `package.json` `build` script is `"tsc -b && vite build"`
2. **Connect Prisma:** `cd backend && npx prisma db pull && npx prisma generate`
3. **Replace mocks in order:** `dashboard-kpis` → `contas-status` → `alertas-ativos` → remaining controllers
4. **Claude API in `/api/chat`:** install `@anthropic-ai/sdk`, add API key, implement SQL-generation flow
5. **Data ingestion:** CSV import first (Meta + Google Ads), then direct API integration
