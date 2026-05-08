# RSWA Website - Deployment Guide

## Quick Start

### Development
```bash
npm install
npm run dev
```
Access at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## What's New in This Version

### Homepage (6 Major Sections)
1. **Hero Section** - Slider with CTA buttons and quick stats
2. **Mission & Impact** - Organization mission, values, and impact metrics
3. **Services** - 4 key programs with descriptions
4. **Team** - Leadership showcase with contact info
5. **Donate** - Prominent fundraising section with multiple options
6. **Testimonials** - Success stories with star ratings

### Dashboard Features
- **Responsive Sidebar** - Toggle navigation (64px/256px)
- **User Management** - Add/edit/delete donors, volunteers, admins
- **Content Management** - Manage news, stories, blog posts, events
- **Enhanced Statistics** - Professional dashboard with charts

### Design System
- **Professional Color Palette**: Emerald (#10b981), Blue (#3b82f6)
- **Smooth Animations**: Scroll reveals, hover effects, fade-ins
- **Responsive Design**: Mobile-first approach
- **shadcn/ui Components**: Professional, accessible UI

## File Changes Summary

### New Files Created
```
src/
├── Pages/Home/
│   ├── Home.jsx
│   ├── HeroSection.jsx
│   ├── MissionSection.jsx
│   ├── ServicesSection.jsx
│   ├── TeamSection.jsx
│   ├── DonateSection.jsx
│   └── TestimonialsSection.jsx
├── Pages/Dashboard/
│   ├── DashboardUserManagement.jsx
│   └── DashboardContent.jsx
├── components/ui/
│   ├── button.jsx
│   ├── card.jsx
│   ├── avatar.jsx
│   ├── badge.jsx
│   ├── separator.jsx
│   ├── table.jsx
│   ├── dialog.jsx
│   ├── input.jsx
│   └── label.jsx
├── hooks/
│   └── useScrollReveal.jsx
├── styles/
│   └── animations.css
├── lib/
│   └── utils.ts
└── tsconfig.json (new)
```

### Modified Files
```
src/
├── App.jsx (simplified to use new Home component)
├── index.css (added design tokens and animations)
├── main.jsx (added animation imports + new dashboard routes)
├── Pages/Dashboard/DashboardLayout/DashboardLayout.jsx (redesigned with shadcn)
vite.config.js (added path alias for @/)
tailwind.config.js (extended with colors, animations, plugins)
```

## Deployment to Vercel

### Prerequisites
- GitHub repository connected
- Vercel account

### Steps
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Complete RSWA website redesign with shadcn/ui"
   git push origin main
   ```

2. **Deploy via Vercel**
   - Go to vercel.com
   - Import project from GitHub
   - Framework: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click Deploy

3. **Environment Variables**
   - Add Firebase credentials (if needed)
   - No additional env vars required for this phase

4. **Domain Configuration**
   - Point your domain (rswa.site) to Vercel
   - SSL automatically enabled

## Testing Checklist

### Homepage
- [ ] All 6 sections visible and styled correctly
- [ ] Animations work smoothly
- [ ] Buttons navigate correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Team member cards display properly
- [ ] Testimonials show with stars

### Dashboard
- [ ] Sidebar toggles properly
- [ ] Navigation items highlight correctly
- [ ] User Management page loads
- [ ] Can add/edit/delete users
- [ ] Content Management page loads
- [ ] Can create/edit/delete content
- [ ] Tables display with proper styling

### Performance
- [ ] Lighthouse score > 85
- [ ] Images lazy load
- [ ] Animations don't block interactions
- [ ] No console errors

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Change port in vite.config.js
# Or use:
npm run dev -- --port 3000
```

### Path Alias Not Working
- Ensure vite.config.js has resolve.alias configured
- Restart dev server after changes

### Animations Not Working
- Check that src/styles/animations.css is imported in main.jsx
- Verify Tailwind config includes animations
- Check browser console for errors

## Customization Tips

### Change Colors
Edit design tokens in `src/index.css`:
```css
:root {
  --primary: YOUR_HEX_COLOR;
  --secondary: YOUR_HEX_COLOR;
}
```

### Add More Dashboard Pages
1. Create new component in `src/Pages/Dashboard/`
2. Add route in `src/main.jsx`
3. Add navigation item in `DashboardLayout.jsx`

### Modify Homepage Sections
Edit individual section files in `src/Pages/Home/`:
- Update text content directly
- Modify card data in component state
- Adjust colors using Tailwind classes

### Add New Animations
Add to `src/styles/animations.css` and use class names on elements

## Support & Maintenance

### Monthly Tasks
- Update testimonials with new success stories
- Review and update team member information
- Monitor donation statistics
- Update blog/news section

### Regular Backups
- Backup Firebase data weekly
- Store database exports securely
- Version control all code changes

## Version History
- **v2.0** - Complete redesign with shadcn/ui, 6 homepage sections, enhanced dashboard
- **v1.0** - Original website

## Contact
For technical support or questions about the website, contact the development team.
