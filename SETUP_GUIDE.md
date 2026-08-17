# Development Setup Guide

This guide explains the code quality tools configured in this project and how to use them.

## Tools Overview

### 1. **Prettier** — Code Formatter

Automatically formats code for consistency (indentation, line breaks, quotes, etc.).

**Config File:** `.prettierrc.json`

**Key Settings:**

- `printWidth: 100` — Line length before wrapping
- `singleQuote: true` — Use single quotes instead of double
- `tabWidth: 2` — 2-space indentation
- `trailingComma: "es5"` — Add trailing commas where valid in ES5
- `plugins: ["prettier-plugin-tailwindcss"]` — Auto-sorts Tailwind classes
- `semi: true` — Require semicolons
- `endOfLine: "lf"` — Unix line endings

**Ignore File:** `.prettierignore`
Files and directories to skip during formatting (node_modules, .next, .env, etc.)

**Commands:**

```bash
# Format all files
pnpm run format

# Check if files need formatting (without making changes)
pnpm run format:check
```

---

### 2. **TypeScript Type Checking**

Ensures code is type-safe without compiling to JavaScript.

**Config File:** `tsconfig.json`

**Command:**

```bash
# Check for type errors
pnpm run type-check
```

**When to use:**

- CI/CD pipelines
- Before committing (pre-commit hook)
- As part of your IDE workflow (should run automatically)

---

### 3. **Husky** — Git Hooks Manager

Automatically runs checks when you commit code, preventing bad commits.

**Config File:** `.husky/pre-commit`

**What it does:**
Every time you run `git commit`, Husky automatically:

1. Runs `pnpm lint-staged` (see below)
2. Lints TypeScript files (`eslint --fix`)
3. Formats code with Prettier
4. Type-checks your changes

**First-time setup:**

```bash
pnpm install  # Installs dependencies + runs prepare script to set up hooks
```

---

### 4. **Lint-Staged** — Selective Linting

Only lints/formats files that have changed (faster than checking the entire codebase).

**Config File:** `.lintstagedrc.json`

**Rules:**

```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md}": ["prettier --write"],
  "*.ts": ["tsc --noEmit"]
}
```

**How it works:**

- TypeScript files: Run ESLint, then Prettier
- JSON/Markdown files: Run Prettier only
- TypeScript files: Type-check before commit

**Manual run:**

```bash
pnpm exec lint-staged
```

---

## Workflow Examples

### Scenario 1: Making Changes Locally

1. **Edit code:**

   ```bash
   # Make changes to src/modules/auth/applications/login.ts
   ```

2. **Stage changes:**

   ```bash
   git add src/modules/auth/applications/login.ts
   ```

3. **Commit:**

   ```bash
   git commit -m "refactor: improve login error handling"
   ```

   **What happens automatically:**
   - Husky runs the pre-commit hook
   - Lint-staged:
     - Runs ESLint on your changed file (fixes issues automatically)
     - Runs Prettier (auto-formats)
     - Runs TypeScript type-check (blocks commit if there are type errors)
   - If all checks pass → commit succeeds
   - If any check fails → commit is blocked, fix the issues and try again

4. **Push to remote:**
   ```bash
   git push origin your-branch
   ```

---

### Scenario 2: Code Has Type Errors

```bash
$ git commit -m "add new feature"
```

**Output:**

```
⚠️  Type checking files...
src/modules/auth/applications/login.ts:5:22 - error TS2345:
Argument of type 'string' is not assignable to parameter of type 'AuthLogin'.

✖ lint-staged: failed due to a git hook
```

**How to fix:**

1. Fix the type error in the file
2. Stage the changes again
3. Commit again

```bash
# Fix the error
nano src/modules/auth/applications/login.ts

# Re-stage
git add src/modules/auth/applications/login.ts

# Retry commit
git commit -m "add new feature"  # This time it should succeed
```

---

### Scenario 3: Formatting Issues

```bash
$ git commit -m "update auth module"
```

**Prettier auto-fixes most formatting issues**, so you'll see:

```
✔ lint-staged fixed 2 files
```

The hook will:

1. Auto-format your changes
2. Add the formatted changes to your commit
3. Allow the commit to proceed

---

### Scenario 4: Manual Formatting Check Before Commit

Check if code needs formatting without committing:

```bash
pnpm run format:check
```

Output if formatting is needed:

```
[warn] src/modules/auth/applications/login.ts
Code style issues found in 1 file. Run Prettier with --write to fix.
```

Auto-fix:

```bash
pnpm run format
```

---

## Commands Cheat Sheet

```bash
# Development
pnpm run dev              # Start dev server
pnpm run build            # Build for production
pnpm run start            # Start production server

# Code Quality
pnpm run lint             # Run ESLint
pnpm run type-check       # Check TypeScript types
pnpm run format           # Auto-format all code
pnpm run format:check     # Check if formatting is needed
pnpm exec lint-staged     # Manually run lint-staged

# Pre-commit hooks
# (automatically run on git commit, no need to invoke manually)
```

---

## Troubleshooting

### "husky: command not found"

Husky wasn't installed properly. Run:

```bash
pnpm install
```

### "lint-staged: command not found"

Same issue. Run:

```bash
pnpm install
```

### Pre-commit hook is not running

Check that `.husky/pre-commit` exists:

```bash
cat .husky/pre-commit
```

If it doesn't exist, reinstall:

```bash
pnpm install
npx husky add .husky/pre-commit "pnpm lint-staged"
```

### Type-check is too slow

TypeScript checks the entire project. To speed it up during development:

- Let your IDE handle type-checking (VS Code with TypeScript extension does this automatically)
- The pre-commit hook only checks changed files via lint-staged

### Want to skip pre-commit hooks (not recommended)

```bash
git commit --no-verify
```

⚠️ **Warning:** Skipping hooks can let broken code into your repository. Only use this in emergencies!

---

## Next Steps

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Try the tools:**

   ```bash
   pnpm run type-check   # Should pass
   pnpm run format:check # Should pass (we just formatted everything)
   ```

3. **Make a test commit:**

   ```bash
   echo "test" > test.txt
   git add test.txt
   git commit -m "test"  # Watch the pre-commit hook run
   ```

4. **Clean up:**
   ```bash
   git reset HEAD~1      # Undo the test commit
   rm test.txt
   ```

---

## IDE Integration

### VS Code (Recommended)

**Install extensions:**

1. "Prettier - Code formatter" by Prettier (esbenp.prettier-vscode)
2. "ESLint" by Microsoft (dbaeumer.vscode-eslint)

**Settings (`.vscode/settings.json`):**

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

This way, code auto-formats on save in your editor, and the pre-commit hook is just a safety net.

---

## CI/CD Integration

In your CI pipeline (GitHub Actions, etc.), run:

```bash
pnpm run type-check
pnpm run format:check
pnpm run lint
pnpm run build
```

This ensures all changes meet quality standards before merging.
