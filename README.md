# Exaura Website

A modern, responsive landing page for Exaura - Your Journey to Freedom from Smoking. Built with pure HTML, CSS, and JavaScript to promote your quit smoking app.

## 🚀 Features

- **Modern Design**: Clean, contemporary design with Exaura's teal branding and smooth animations
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **App Store Integration**: Direct links to iOS App Store and Google Play Store
- **Interactive Elements**: Smooth scrolling, hover effects, and dynamic animations
- **Performance Optimized**: Fast loading with optimized assets and code
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Cross-browser Compatible**: Works on all modern browsers
- **Multi-language Support**: Automatic German/English detection with manual switching
- **JSON-based Translations**: Separate translation files for easy maintenance
- **GDPR Compliant**: Cookie banner and privacy policy for European users

## 📱 Sections

- **Hero Section**: Eye-catching landing with animated phone mockup and app store download buttons
- **Features**: Showcase of quit smoking app features including gamification, tracking, and support
- **About**: App information with success statistics and progress bars
- **Contact**: Contact form with validation and support information
- **Footer**: Comprehensive footer with app store links and support resources

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for better SEO and accessibility
- **CSS3**: Modern CSS with Flexbox, Grid, and custom properties
- **JavaScript (ES6+)**: Interactive features and smooth animations
- **Font Awesome**: Icons for enhanced visual appeal
- **Google Fonts**: Inter font family for modern typography

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone https://github.com/exaura/exaura-website.git
   cd exaura-website
   
   # Or simply navigate to the project directory
   cd "/Users/florianaboutara/Downloads/Exaura Website"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   
   This will start a live server at `http://localhost:3000`

### Alternative Setup (No Node.js)

If you don't have Node.js installed, you can simply:

1. Open `index.html` directly in your web browser
2. Or use any local server like Python's built-in server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

## 📝 Available Scripts

```bash
# Start development server with live reload
npm start

# Start development server with file watching
npm run dev

# Build production version
npm run build

# Optimize HTML for production
npm run optimize

# Lint HTML and CSS
npm run lint

# Run tests (placeholder)
npm test
```

## 🎨 Customization

### Colors

The website uses CSS custom properties for easy theming. Main colors are defined in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #06b6d4;
    --accent-color: #f59e0b;
    /* ... more variables */
}
```

### Content

- **Company Information**: Update the hero section, about section, and contact details
- **Features**: Modify the features grid in both HTML and CSS
- **Contact Form**: The form currently shows a success message - integrate with your backend
- **Social Links**: Update footer social media links

### Images

To add images:
1. Create an `images/` folder
2. Add your images
3. Update the HTML to reference your images
4. Consider adding lazy loading for better performance

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 767px and below
- **Small Mobile**: 480px and below

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Android Chrome (latest)

## ⚡ Performance Features

- **Optimized CSS**: Minified and organized for fast loading
- **Efficient JavaScript**: Debounced scroll events and optimized animations
- **Lazy Loading**: Ready for image lazy loading implementation
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Minimal Dependencies**: Only essential external resources

## 🔧 Development

### File Structure

```
exaura-website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── package.json        # Project configuration
├── locales/            # Language files
│   ├── en.json         # English translations
│   └── de.json         # German translations
├── privacy.html        # English Privacy Policy
├── privacy-de.html     # German Privacy Policy
└── README.md           # This file
```

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Add any JavaScript interactions in `script.js`
4. Update navigation if needed

### Translation System

The website uses a JSON-based translation system similar to your app:

1. **Translation Files**: Located in `locales/` directory
   - `en.json` - English translations
   - `de.json` - German translations

2. **Adding Translations**:
   ```html
   <!-- Add data-translate attribute to any element -->
   <h1 data-translate="hero.title">Default Text</h1>
   ```

3. **Translation Keys**: Use dot notation for nested objects
   ```json
   {
     "hero": {
       "title": "Your Title Here"
     }
   }
   ```

4. **Language Detection**: Automatic detection based on:
   - Browser language settings
   - User's timezone (German-speaking countries)
   - Saved user preference

5. **Manual Switching**: Users can toggle languages via the globe icon in navigation

### Animation Guidelines

- Use `transform` and `opacity` for smooth animations
- Prefer CSS animations over JavaScript when possible
- Use `requestAnimationFrame` for complex animations
- Implement intersection observers for scroll-triggered animations

## 🚀 Deployment

### Static Hosting (Recommended)

The website is ready for static hosting on:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Push to a repository and enable Pages
- **AWS S3**: Upload files to an S3 bucket with static hosting

### Production Build

```bash
npm run build
```

This will create optimized versions of your files.

## 📧 Contact Form

The contact form currently shows a success message. To make it functional:

1. **Backend Integration**: Replace the form submission handler in `script.js`
2. **Email Service**: Use services like EmailJS, Formspree, or Netlify Forms
3. **Validation**: The form includes client-side validation

Example with EmailJS:
```javascript
// Replace the form submission in script.js
emailjs.send('service_id', 'template_id', {
    name: name,
    email: email,
    message: message
});
```

## 🔍 SEO Optimization

The website includes:
- Semantic HTML structure
- Meta descriptions and titles
- Proper heading hierarchy
- Alt text placeholders for images
- Fast loading times

To further optimize:
- Add structured data (JSON-LD)
- Implement Open Graph tags
- Add a sitemap.xml
- Optimize images with WebP format

## 🛡️ Security

- No external JavaScript libraries (except Font Awesome and Google Fonts)
- Form validation and sanitization
- No sensitive data exposed in client-side code
- HTTPS ready

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- Email: hello@exaura.com
- Phone: +1 (555) 123-4567
- Website: https://exaura.com

---

**Built with ❤️ for Exaura**

*Transform Your Digital Experience*
