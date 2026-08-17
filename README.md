# Omnihub Web

A modern Next.js 16 application with a hexagonal architecture, featuring authentication, secure server-side API communication, and a design-system-driven UI.

## Tech Stack

- **Framework:** Next.js 16.3.1 (App Router, Turbopack)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn UI (Base UI)
- **Forms:** React Hook Form + Zod validation
- **HTTP Client:** Axios (server-side only via `server-only` guard)
- **Icons:** Lucide React + Material Symbols
- **Package Manager:** pnpm 10.30.2

## Quick Start

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
pnpm run build
pnpm run start
```

### Linting

```bash
pnpm run lint
```

## Architecture

The project follows **hexagonal architecture** (ports & adapters) with strict domain boundaries:

```
src/
├── app/                              # Next.js routing (Route Handlers, Pages, Layouts)
│   ├── page.tsx                      # Home/landing page
│   ├── (auth)/                       # Route group for authentication
│   │   ├── login/
│   │   │   ├── page.tsx              # Login UI (Client Component)
│   │   │   └── api/route.tsx         # Login API endpoint (server-only)
│   │   └── layout.tsx
│   └── globals.css                   # Global styles & theme variables
│
├── components/                       # Shared UI components
│   ├── ui/                           # Shadcn-based component library
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── custom/                       # Custom business components
│   │   └── banner.tsx
│   └── index.ts                      # Barrel export
│
├── lib/                              # Shared utilities & infrastructure
│   ├── http/
│   │   ├── api-handler.ts            # Centralized error handler for Route Handlers
│   │   ├── http-client.ts            # Axios instance (server-only)
│   │   └── http.config.ts            # HTTP utilities (headers, methods)
│   ├── models/
│   │   └── base-response.model.ts    # Standard API response envelope
│   ├── config/
│   │   └── env.config.ts             # Environment configuration
│   └── index.ts                      # Barrel export
│
└── modules/                          # Domain-driven feature modules
    └── auth/                         # Authentication module
        ├── domains/
        │   └── auth.entity.ts        # Core types (AuthLogin, AuthEntity, etc.)
        ├── ports/
        │   └── auth-provider.port.tsx # Interface contract for auth adapters
        ├── applications/
        │   └── login.ts              # Login use case
        ├── infrastructure/
        │   └── repositories/
        │       └── auth-api.repository.tsx  # API adapter (Axios client)
        └── index.ts                  # Barrel export
```

### Key Architecture Decisions

1. **Ports & Adapters:** Modules define `AuthProviderPort` interface; implementations (`AuthApiRepository`) are swappable.
2. **Server-Only Isolation:** HTTP client and API communication are guarded with `import 'server-only'` to prevent accidental client exposure.
3. **Centralized Error Handling:** All Route Handlers use `handleApiCall()` wrapper for consistent error responses with proper HTTP status codes.
4. **Type-Safe Forms:** React Hook Form + Zod for client-side validation; server-side validation handled separately.
5. **Unified Response Envelope:** All API responses use `BaseResponseModel<T>` for consistency.

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Note:** `NEXT_PUBLIC_API_URL` is exposed to the browser. For a separate server-only backend URL in production, introduce `BACKEND_API_URL` (see `src/lib/config/env.config.ts`).

## Authentication Flow

1. User enters credentials in `/login` (Client Component)
2. React Hook Form + Zod validates client-side
3. Form submits to `/login/api` (Route Handler)
4. Server-side handler calls `login(AuthApiRepository, data)`
5. `AuthApiRepository` makes HTTP POST to backend `/auth/login`
6. Centralized error handler catches failures, logs safely, returns standardized response
7. Tokens received in response (currently logged; TODO: persist to httpOnly cookies)

## Current Limitations & TODOs

- **Token Persistence:** Access tokens are received but not yet stored (intended: httpOnly cookie or secure storage)
- **Social Auth:** Google/Facebook buttons are UI-only; backend adapters are stubbed
- **Server-Only Backend URL:** Currently uses `NEXT_PUBLIC_API_URL` for both client and server; separate `BACKEND_API_URL` recommended for production

## Code Quality

- TypeScript strict mode enabled
- JSDoc comments on all public APIs
- No `any` types (replaced with generics and `unknown`)
- Pre-commit hooks & linting recommended (see package.json suggestions)

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Tailwind CSS](https://tailwindcss.com)
- [Zod](https://zod.dev)
