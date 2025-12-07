# CI/CD Documentation

## GitHub Actions CI Pipeline

This project includes a comprehensive CI pipeline that runs on every push and pull request to the main/master/develop branches.

### CI Checks

The pipeline performs the following checks:

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

### Running All CI Checks Locally

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

