# Ashley Yoon - Portfolio Website

A clean, minimalistic portfolio website showcasing graphic design work with a focus on branding, packaging, and UX design.

## Features

- Clean, minimalistic design with Franklin Gothic typography
- Responsive layout (mobile, tablet, desktop)
- Filterable project gallery with dropdown menu
- Lightbox modal for viewing project details
- Sticky navigation with mobile menu
- Optimized for performance and accessibility

## Quick Start

1. Add your project images to the `images/projects/` folder
2. Update the image paths in `work.html`
3. Customize content in all HTML files
4. Update contact email in `about.html`
5. Open `index.html` in a browser to view locally

## Adding Project Images

### Step 1: Prepare Your Images

For best results, prepare images with these specifications:
- **Format:** JPG or PNG
- **Size:** 1200px wide (max)
- **Aspect ratio:** 4:3 (recommended for consistency)
- **File size:** Under 200KB (compress images for web)

### Step 2: Add Images to Folder

Place your project images in the `images/projects/` folder with these names:
- `odds-ends.jpg`
- `bloomorphosis.jpg`
- `snackstar.jpg`
- `gala-invite.jpg`
- `wine-not.jpg`
- `nauts-knots.jpg`

### Step 3: Image Recommendations

Tool recommendations for image optimization:
- [TinyPNG](https://tinypng.com/) - Compress images
- [Squoosh](https://squoosh.app/) - Convert to WebP format
- Use consistent aspect ratios for a cohesive gallery

## Customizing Content

### Update Project Information

In `work.html`, each project card has these customizable attributes:

```html
<article class="project-card"
    data-category="branding"  <!-- Change category: branding, packaging, or ux -->
    data-title="Project Name"  <!-- Change project title -->
    data-description="Description for lightbox"  <!-- Change description -->
    data-image="images/projects/your-image.jpg">  <!-- Change image path -->
```

Update:
1. `data-category` to match the dropdown categories
2. `data-title` for the project name
3. `data-description` for the lightbox description
4. `data-image` to point to your image file
5. Project title, description, category, and year in the visible content

### Update About Page

In `about.html`:
1. Edit the bio paragraphs in the "About Me" section
2. Update skills lists under "Skills & Expertise"
3. Replace `your.email@example.com` with your real email

### Update Home Page

In `index.html`:
1. Customize the subtitle under your name
2. Edit the introduction paragraph
3. Modify the "Design with Purpose" section content

## Adding More Projects

To add a new project to the gallery:

1. Add the project image to `images/projects/`
2. Copy an existing project card in `work.html`
3. Update all the data attributes and content
4. If adding a new category, add it to the dropdown:

```html
<option value="new-category">New Category</option>
```

## Customizing Design

### Colors

Edit colors in `css/variables.css`:

```css
:root {
    --color-primary: #1a1a1a;      /* Main text color */
    --color-secondary: #666666;    /* Secondary text */
    --color-background: #ffffff;   /* Background */
    --color-light-gray: #f5f5f5;   /* Subtle backgrounds */
}
```

### Typography

The site uses Franklin Gothic font family with fallbacks. To change:

```css
--font-primary: "Your Font", "Fallback Font", sans-serif;
```

### Spacing

Adjust spacing scale in `css/variables.css`:

```css
:root {
    --spacing-xs: 0.5rem;   /* 8px */
    --spacing-sm: 1rem;     /* 16px */
    --spacing-md: 2rem;     /* 32px */
    --spacing-lg: 3rem;     /* 48px */
    --spacing-xl: 4rem;     /* 64px */
    --spacing-xxl: 6rem;    /* 96px */
}
```

## Deploying to GitHub Pages

1. Commit all your changes:
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   ```

2. Push to GitHub:
   ```bash
   git push origin main
   ```

3. Enable GitHub Pages:
   - Go to your repository Settings
   - Navigate to Pages (left sidebar)
   - Under "Source", select branch: `main`, folder: `/ (root)`
   - Click Save

4. Your site will be live at: `https://ashleyyoon.github.io/portfolio/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## File Structure

```
portfolio/
├── index.html              # Home page
├── about.html              # About page
├── work.html               # Portfolio gallery
├── css/
│   ├── reset.css          # CSS reset
│   ├── variables.css      # Design system variables
│   ├── typography.css     # Font styles
│   ├── layout.css         # Layout system
│   ├── components.css     # UI components
│   └── responsive.css     # Responsive breakpoints
├── js/
│   ├── navigation.js      # Navigation functionality
│   ├── gallery.js         # Gallery filter & lightbox
│   └── utils.js           # Utility functions
├── images/
│   ├── profile/           # Profile photo (optional)
│   └── projects/          # Project images
└── README.md              # This file
```

## Adding a Profile Photo (Optional)

1. Add your photo to `images/profile/` (e.g., `profile.jpg`)
2. In `about.html`, add this before the first paragraph:

```html
<div style="text-align: center; margin-bottom: var(--spacing-lg);">
    <img src="images/profile/profile.jpg"
         alt="Ashley Yoon"
         style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover;">
</div>
```

## Troubleshooting

### Images not loading
- Check file paths are correct
- Ensure images are in `images/projects/` folder
- Verify image filenames match exactly (case-sensitive)

### Filter not working
- Open browser console (F12) to check for JavaScript errors
- Ensure `gallery.js` is loaded in `work.html`

### Mobile menu not opening
- Check that `navigation.js` is loaded on all pages
- Verify menu toggle button is present in navigation

## Support

For issues or questions about this portfolio:
- Check the browser console for errors (F12)
- Verify all CSS and JS files are loading
- Ensure file paths are correct

## License

This portfolio website is for personal use. Feel free to customize it for your own portfolio.

---

Built with HTML, CSS, and vanilla JavaScript. No frameworks required.
