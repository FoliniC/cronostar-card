# 📦 Installation Guide & HACS Publishing

## 🚀 Quick Installation for Users

### Via HACS (Recommended)

1. Open HACS in Home Assistant
2. Click "Frontend"
3. Click the "+" button (Explore & Download Repositories)
4. Search for "Temperature Scheduler Card"
5. Click "Download"
6. Restart Home Assistant
7. Add resource to Lovelace (should be automatic, if not see manual step below)

### Manual Installation

1. Download `cronostar-card.js` from [releases](https://github.com/CFolini/cronostar-card/releases)
2. Copy to `/config/www/cronostar-card.js`
3. Add resource to Lovelace:
   - Go to **Settings → Dashboards → Resources**
   - Click "+" Add Resource
   - URL: `/local/cronostar-card.js`
   - Resource type: **JavaScript Module**
4. Reload browser (Ctrl+Shift+R)

---

## 👨‍💻 Development Setup

### Prerequisites

- Node.js 16+ and npm
- Git
- Home Assistant instance for testing

### Clone and Setup

```bash
# Clone repository
git clone https://github.com/CFolini/cronostar-card.git
cd cronostar-card

# Install dependencies
npm install

# Build
npm run build

# Watch mode (auto-rebuild on changes)
npm run watch
```

### Project Structure

```
cronostar-card/
├── src/                    # Source files (modular)
│   ├── main.js            # Entry point
│   ├── cronostar-card.js  # Main component
│   ├── config.js          # Configuration
│   ├── styles.js          # CSS styles
│   ├── utils.js           # Utilities
│   ├── state-manager.js   # State management
│   ├── profile-manager.js # Profile save/load
│   ├── selection-manager.js # Selection logic
│   ├── chart-manager.js   # Chart.js integration
│   ├── keyboard-handler.js # Keyboard input
│   └── pointer-handler.js # Touch/pointer events
│
├── dist/                  # Compiled output
│   └── cronostar-card.js
│
├── scripts/               # Home Assistant scripts
│   └── temperature_profiles.yaml
│
├── examples/              # Example configurations
│   ├── full-setup.yaml
│   └── lovelace-card-config.yaml
│
└── docs/                  # Documentation
```

### Building for Production

```bash
# Build minified version
npm run build

# Output: dist/cronostar-card.js
```

### Testing Locally

1. Build the card: `npm run build`
2. Copy `dist/cronostar-card.js` to `/config/www/`
3. Add `?v=2.18` to resource URL to bust cache
4. Reload browser

---

## 📢 Publishing to HACS

### Initial Setup

1. **Create GitHub Repository**

```bash
git init
git add .
git commit -m "Initial commit - Temperature Scheduler Card v2.18"
git branch -M main
git remote add origin https://github.com/CFolini/cronostar-card.git
git push -u origin main
```

2. **Add Required Files**

Ensure these files exist in root:
- ✅ `hacs.json`
- ✅ `README.md`
- ✅ `info.md`
- ✅ `LICENSE`
- ✅ `dist/cronostar-card.js`

3. **Create First Release**

```bash
# Tag release
git tag -a v2.18.0 -m "Release v2.18.0 - Fix shift values, responsive chart"
git push origin v2.18.0
```

4. **Create GitHub Release**

- Go to repository on GitHub
- Click "Releases" → "Create a new release"
- Select tag: `v2.18.0`
- Title: `v2.18.0 - Fix shift values bug`
- Description: Copy from CHANGELOG.md
- Attach `dist/cronostar-card.js` as asset
- Publish release

### Submit to HACS Default

1. Fork [hacs/default](https://github.com/hacs/default)

2. Add your repository to `plugin` file:

```json
{
  "name": "Temperature Scheduler Card",
  "render_readme": true,
  "domain": "cronostar-card"
}
```

3. Create Pull Request with title:
   ```
   Add Temperature Scheduler Card
   ```

4. Wait for HACS team review (usually 1-7 days)

### HACS Validation Checklist

Before submitting, ensure:

- ✅ Repository is public
- ✅ `hacs.json` is valid
- ✅ README.md has screenshots and documentation
- ✅ LICENSE file exists (MIT recommended)
- ✅ At least one release with tag
- ✅ Release includes compiled JS file
- ✅ No console errors in browser
- ✅ Works in latest Home Assistant version
- ✅ Repository has proper topics: `home-assistant`, `hacs`, `lovelace`

---

## 🔄 Release Workflow

### Create New Release

1. **Update Version**

```bash
# Update version in files
# - package.json
# - src/config.js (VERSION constant)
# - hacs.json (if major changes)

# Commit changes
git add .
git commit -m "Bump version to 2.19.0"
```

2. **Build**

```bash
npm run build
```

3. **Tag and Push**

```bash
git tag -a v2.19.0 -m "Release v2.19.0 - New features"
git push origin main
git push origin v2.19.0
```

4. **Create GitHub Release**

- Include changelog
- Attach `dist/cronostar-card.js`
- Mention breaking changes if any

### Automated Release (GitHub Actions)

Create `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: dist/cronostar-card.js
          generate_release_notes: true
```

---

## 🧪 Testing Checklist

Before each release:

### Functional Tests

- [ ] Card loads without errors
- [ ] Chart displays correctly
- [ ] Drag points works
- [ ] Multi-selection works (Shift + drag)
- [ ] Keyboard controls work (arrows)
- [ ] Profile switching works
- [ ] Auto-save works
- [ ] Reset changes works
- [ ] Responsive (desktop, tablet, mobile)
- [ ] No value shift after profile load

### Browser Compatibility

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Home Assistant Versions

- [ ] 2024.1+
- [ ] Latest stable
- [ ] Latest beta (if available)

---

## 📝 Contributing

### Code Style

- Use ES6+ features
- Follow existing code structure
- Add JSDoc comments for functions
- Keep modules focused (single responsibility)

### Pull Request Process

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request with description

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

Example:
```
fix(chart): resolve value shift on profile load

- Fixed array indexing in load script (repeat.index - 1)
- Added 600ms wait for state propagation
- Enhanced logging for debugging

Closes #42
```

---

## 🔧 Troubleshooting Development

### Build Errors

**Error: Cannot find module 'lit-element'**
```bash
npm install
```

**Error: Rollup failed**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Runtime Errors

**Card not loading**
1. Check browser console for errors
2. Verify resource URL in Lovelace
3. Clear browser cache (Ctrl+Shift+R)
4. Check file permissions (chmod 644)

**Chart not displaying**
1. Verify Chart.js is loaded
2. Check dragdata plugin path
3. Look for console errors about missing libraries

---

## 📞 Support

- 🐛 [Report Bug](https://github.com/CFolini/cronostar-card/issues)
- 💡 [Request Feature](https://github.com/CFolini/cronostar-card/issues)
- 💬 [Discussions](https://github.com/CFolini/cronostar-card/discussions)
- 📖 [Documentation](https://github.com/CFolini/cronostar-card/wiki)

---

**Ready to publish? Follow the steps above and your card will be available in HACS!** 🎉