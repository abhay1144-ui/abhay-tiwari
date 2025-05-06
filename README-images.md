# Images Implementation Guide for Mental Health Exercises Website

This guide explains how images have been implemented in the Mental Health Exercises website and provides instructions for replacing placeholder images with real ones.

## Current Implementation

The website has been set up with online placeholder images using placeholder.com. These placeholders ensure that:

1. The website layout functions correctly
2. You can see exactly where images will appear 
3. You can visualize the image dimensions and proportions

## Image Requirements

The following images are needed for the website:

### Logo Files
- `logo.png` - Main logo (120×120px)
- `logo-white.png` - White version for footer (120×120px)
- `favicon.png` - Browser tab icon (32×32px)

### Content Images
- `hero-meditation.jpg` - Hero section image (800×400px)
- Four benefit icons (80×80px each):
  - `stress-reduction.png`
  - `improved-focus.png`
  - `better-sleep.png`
  - `emotional-regulation.png`
- `progress-tracking.jpg` - Progress section image (500×300px)
- Three testimonial avatars (80×80px each):
  - `avatar-1.jpg`
  - `avatar-2.jpg`
  - `avatar-3.jpg`

## How to Replace Placeholders

You have three options for implementing real images:

### Option 1: Replace URLs in HTML

The current HTML uses URLs from placeholder.com. Simply find each image tag in `index.html` and replace the `src` attribute with the path to your real image.

Example:
```html
<!-- From -->
<img src="https://via.placeholder.com/120x120/5f6bbb/ffffff?text=MH+Logo" alt="Mental Health Exercises Logo" class="logo">

<!-- To -->
<img src="images/logo.png" alt="Mental Health Exercises Logo" class="logo">
```

### Option 2: Create Local Image Files

1. Place your properly sized and named image files in the `images/` directory
2. The HTML will automatically use these images if you switch to local paths

### Option 3: Generate Simple Placeholders

We've included a tool to help you create simple placeholder images:

1. Open `images/create-placeholders.html` in your browser
2. Take screenshots of each placeholder element
3. Crop to the correct dimensions
4. Save with the correct filename in the `images/` directory

## Image Sourcing Recommendations

- **Logo**: Create a custom logo using a tool like Canva or hire a designer
- **Hero Image**: Use high-quality photos from stock photo sites like Unsplash or Pexels
- **Icons**: Find consistent icon sets from resources like Flaticon or The Noun Project
- **Avatars**: Use diverse professional headshots or generated avatars

## Best Practices

1. **Optimize all images** for web to keep page load times fast
2. **Maintain consistent styling** across all icons and images
3. **Use appropriate alt text** for accessibility (already implemented)
4. **Ensure proper licensing** for any images you use

## Need Help?

The `images/README.md` file contains more detailed information about recommended image resources and implementation tips. 