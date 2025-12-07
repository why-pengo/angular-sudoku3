# CI/CD Documentation

## GitHub Actions Workflows

This project has two GitHub Actions workflows:

### 1. CI Pipeline (`.github/workflows/ci.yml`)
Runs on every push and pull request to main/master/develop branches.

### 2. GitHub Pages Deployment (`.github/workflows/deploy.yml`)
Automatically deploys the app to GitHub Pages after successful push to main branch.

## CI Pipeline

The CI workflow performs the following checks:

1. **Prettier Formatting** - Ensures all code follows consistent formatting rules
2. **ESLint** - Checks TypeScript code for potential errors and code quality issues
3. **Stylelint** - Validates SCSS styles against best practices
4. **Vitest Tests** - Runs all unit tests to ensure functionality
5. **Build** - Verifies the project builds successfully

### Available NPM Scripts

#### Formatting
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are formatted correctly (used in CI)

#### Linting
- `npm run lint` - Run ESLint on TypeScript files
- `npm run lint:fix` - Auto-fix ESLint issues where possible
- `npm run stylelint` - Run stylelint on SCSS files
- `npm run stylelint:fix` - Auto-fix stylelint issues where possible

#### Testing
- `npm test` - Run tests in watch mode
- `npm test -- --run` - Run tests once (used in CI)
- `npm run test:ui` - Run tests with UI

#### Build
- `npm run build` - Build the production application
- `npm run watch` - Build in watch mode for development
- `npm run build:gh-pages` - Build for GitHub Pages with correct base href

## GitHub Pages Deployment

### Automatic Deployment

The app is automatically deployed to GitHub Pages when code is pushed to the `main` branch.

**Workflow**: `.github/workflows/deploy.yml`

### Deployment Process

1. **Trigger**: Push to main branch
2. **Run Tests**: Ensures all tests pass before deployment
3. **Build**: Creates production build with `npm run build:gh-pages`
4. **Add .nojekyll**: Prevents Jekyll processing
5. **Create 404.html**: Enables client-side routing
6. **Deploy**: Publishes to `gh-pages` branch

### Output Directory

- Build output: `docs/` (ignored by git, generated during CI)
- Deployed from: `gh-pages` branch
- Base href: `/angular-sudoku3/`

**Note**: The `docs` directory is in `.gitignore` and is only created during the CI/CD build process. It is not committed to the repository.

### GitHub Pages Setup

To enable GitHub Pages for your repository:

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **(root)**
3. Save the settings

The site will be available at: `https://YOUR_USERNAME.github.io/angular-sudoku3/`

### Manual Deployment

You can also build and deploy manually:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# The docs/ directory will contain the build output
# This directory is ignored by git and only used for deployment
```

**Note**: The `docs` directory is automatically created during builds and is listed in `.gitignore`. It should not be committed to the repository.

## Running All CI Checks Locally

Before pushing your code, you can run all CI checks locally:

```bash
# Check formatting
npm run format:check

# Run linters
npm run lint
npm run stylelint

# Run tests
npm test -- --run

# Build
npm run build
```

Or to auto-fix issues where possible:

```bash
# Format code
npm run format

# Fix lint issues
npm run lint:fix
npm run stylelint:fix
```

### Configuration Files

- `.github/workflows/ci.yml` - GitHub Actions workflow configuration
- `eslint.config.js` - ESLint configuration
- `.stylelintrc.json` - Stylelint configuration
- `.prettierignore` - Files to ignore in Prettier
- `package.json` - Prettier configuration (in "prettier" field)

### CI Workflow

The workflow:
1. Checks out the code
2. Sets up Node.js 20.x
3. Installs dependencies with `npm ci`
4. Runs all checks in sequence
5. Fails if any check doesn't pass

This ensures code quality and prevents broken code from being merged.

