# GitHub Pages Deployment Guide

## Overview

This Angular Sudoku app is configured to automatically deploy to GitHub Pages whenever code is pushed to the `main` branch.

## What Happens on Deployment

When you push to `main`, the GitHub Actions workflow (`.github/workflows/deploy.yml`) will:

1. ✅ Checkout the code
2. ✅ Setup Node.js environment
3. ✅ Install dependencies
4. ✅ Run all tests
5. ✅ Build the app with proper base href (`/angular-sudoku3/`)
6. ✅ Add `.nojekyll` file (prevents Jekyll processing)
7. ✅ Create `404.html` (enables client-side routing)
8. ✅ Deploy to `gh-pages` branch
9. ✅ GitHub Pages serves the site

## First-Time Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` / `(root)`
4. Click **Save**

### 2. Update Repository Name (if different)

If your repository name is **not** `angular-sudoku3`, update the base href in `package.json`:

```json
"build:gh-pages": "ng build --base-href /why-pengo/"
```

### 3. Update README

```markdown
## 🎮 [Play Online](https://why-pengo.github.io/angular-sudoku3/)
```

## Deployment Workflow

### Automatic Deployment

Simply push to main:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

The deployment will start automatically. You can monitor progress in the **Actions** tab on GitHub.

### Check Deployment Status

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Look for the "Deploy to GitHub Pages" workflow
4. Click on the latest run to see logs

## Build Configuration

### Output Directory

- **Local build**: `docs/`
- **Deployed files**: `docs/browser/`
- **Deployment branch**: `gh-pages`

### Build Scripts

```bash
# Standard build (outputs to docs/)
npm run build

# GitHub Pages build (with base href)
npm run build:gh-pages
```

### Angular Configuration

The `angular.json` is configured to output to `docs/`:

```json
{
  "outputPath": "docs",
  ...
}
```

## Accessing Your Deployed App

After deployment completes (usually 1-2 minutes):

```
https://why-pengo.github.io/angular-sudoku3/
```


## Troubleshooting

### Site Not Loading

**Problem**: You see a 404 error or blank page

**Solutions**:
1. Check that GitHub Pages is enabled in Settings → Pages
2. Verify the `gh-pages` branch exists
3. Ensure the base href matches your repository name
4. Check the Actions tab for deployment errors
5. Wait a few minutes - deployment can take time

### Routing Issues

**Problem**: Direct URLs or refreshing gives 404

**Solution**: The workflow creates a `404.html` file that redirects to `index.html`, enabling client-side routing. Verify this file exists in the deployment.

### Build Failures

**Problem**: Deployment workflow fails during build

**Solutions**:
1. Check the Actions logs for specific errors
2. Run `npm run build:gh-pages` locally to test
3. Ensure all tests pass with `npm test -- --run`
4. Verify dependencies are up to date

### Wrong Base Href

**Problem**: Assets not loading (404s in browser console)

**Solution**: 
1. Update the base href in `package.json`:
   ```json
   "build:gh-pages": "ng build --base-href /why-pengo/"
   ```
2. Push the change to trigger a new deployment

## Local Testing

To test the production build locally:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Serve the build (you'll need a local server)
npx http-server docs/browser -o
```

Note: When testing locally, routing may not work exactly as on GitHub Pages due to the base href.

## Manual Deployment

If you need to deploy manually without the workflow:

```bash
# 1. Build the app
npm run build:gh-pages

# 2. Add .nojekyll
touch docs/.nojekyll

# 3. Copy 404.html
cp docs/browser/index.html docs/browser/404.html

# 4. Commit and push to gh-pages branch
git add docs/
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix docs/browser origin gh-pages
```

## Deployment Checklist

Before your first deployment:

- [ ] Repository pushed to GitHub
- [ ] GitHub Pages enabled in Settings → Pages
- [ ] Base href in `package.json` matches repo name
- [ ] README updated with correct username
- [ ] All tests passing (`npm test -- --run`)
- [ ] Code pushed to `main` branch
- [ ] Deployment workflow completed successfully
- [ ] Site accessible at GitHub Pages URL

## Updating the Deployed App

Every time you push to `main`, the app will be automatically rebuilt and deployed. The process is:

1. **Develop** → Make your changes locally
2. **Test** → `npm test -- --run`
3. **Commit** → `git commit -m "Your message"`
4. **Push** → `git push origin main`
5. **Wait** → GitHub Actions builds and deploys (1-2 minutes)
6. **Verify** → Check your GitHub Pages URL

## Environment Considerations

### Production vs Development

- **Development**: `npm start` → `http://localhost:4200`
- **Production (GitHub Pages)**: `npm run build:gh-pages` → GitHub Pages URL

The production build is optimized, minified, and includes the correct base href.

### Base Href Explained

GitHub Pages serves your site at `username.github.io/repository-name/`, not at the root. The `--base-href` flag tells Angular to:

- Load assets from `/repository-name/assets/...`
- Handle routing relative to `/repository-name/`

Without this, your app would try to load resources from the wrong path.

## Advanced Configuration

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to `docs/browser/` with your domain
2. Update the workflow to preserve the CNAME file
3. Configure DNS records for your domain
4. Update GitHub Pages settings

### Deployment to Other Branches

To deploy from a different branch, update `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches: [your-branch-name]
```

## Security

The workflow uses:
- `GITHUB_TOKEN` (automatically provided)
- Minimal required permissions
- Secure third-party action (`peaceiris/actions-gh-pages@v3`)

No secrets need to be configured.

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Angular Deployment Guide](https://angular.dev/tools/cli/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

