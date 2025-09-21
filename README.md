# Kalakaar Konnect

## Overview

Kalakaar Konnect is a digital platform designed to bridge the gap between traditional artisans and modern customers. The platform serves as a comprehensive marketplace that empowers skilled craftspeople to showcase their work, build sustainable businesses, and preserve traditional art forms for future generations.

## Mission Statement

At Kalakaar Konnect, we believe in the power of traditional craftsmanship and the stories behind every handmade creation. Our platform connects talented artisans with customers who appreciate authentic, handcrafted products, ensuring that every purchase supports an artisan's livelihood and keeps ancient crafts alive.

## Features

### For Artisans
- **Digital Shopfront Creation**: AI-powered shop builder using Google Gemini API
- **Profile Management**: Comprehensive artisan profiles with craft specializations and experience levels
- **Product Showcase**: Multi-image product galleries with detailed descriptions and pricing
- **Story Integration**: Personal craft journey narratives to connect with customers
- **Geographic Integration**: Location-based services for local discovery

### For Patrons (Customers)
- **Artisan Discovery**: Search and filter artisans by craft type, location, and experience
- **Interactive Maps**: Google Maps integration for finding nearby artisans
- **Direct Connection**: Platform for connecting with and supporting local craftspeople
- **Cultural Preservation**: Access to authentic, traditional handmade products

### Supported Craft Categories
- Zardozi Embroidery
- Meenakari Jewelry
- Terracotta Pottery
- Miniature Painting
- Additional craft forms (expandable)

## Technology Stack

### Frontend
- **HTML5**: Semantic markup for web pages
- **CSS3**: Modern styling with responsive design
- **JavaScript (ES6+)**: Interactive functionality and API integration
- **React**: Component-based UI development

### APIs and Services
- **Google Gemini API**: AI-powered content generation for shop creation
- **Google Maps API**: Location services and geographic integration
- **File Upload**: Image handling for product galleries

### Design Framework
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme Support**: Multiple visual themes
- **Modern UI/UX**: Contemporary design patterns

## Project Structure

```
kalakaar-konnect/
├── home.html              # Landing page
├── home.css               # Landing page styles
├── About.html             # About us page
├── about.css              # About page styles
├── biindex.html           # Patron search interface
├── bipage.css             # Patron search styles
├── biscript.js            # Maps integration script
├── sidetails.html         # Artisan registration form
├── sistyle.css            # Artisan form styles
├── sigemini.js            # AI integration for shop creation
├── siscript.js            # Form handling utilities
└── index.js               # React component implementation
```

## Installation and Setup

### Prerequisites
- Modern web browser with JavaScript enabled
- Google Maps API key
- Google Gemini API key

### Configuration Steps

1. **Clone or download the project files**
   ```
   Download all HTML, CSS, and JavaScript files to your local directory
   ```

2. **API Key Setup**
   
   **Google Maps API:**
   - Replace `YOUR_API_KEY` in `biindex.html` with your Google Maps API key
   - Current placeholder: `AIzaSyBaN5t2AKf2GYMf6dOsfpsc5j2u0FKTqG4`

   **Google Gemini API:**
   - Replace the API key in `sigemini.js` with your Google Gemini API key
   - Current placeholder: `AIzaSyDluRUQZOW45anRJ1i1BDd88IeP2HLtbqc`

3. **File Structure**
   - Ensure all files are in the same directory
   - Maintain the exact file names as referenced in the HTML documents

4. **Launch Application**
   - Open `home.html` in a web browser
   - Navigate through the application using the interface

## User Journey

### Artisan Workflow
1. Access the platform via the main landing page
2. Select "Artisan" option from the hero section
3. Complete the comprehensive registration form including:
   - Shop details and location information
   - Primary craft specialization and experience level
   - Personal craft story and background
   - Product information with images and pricing
4. Submit form to generate AI-powered digital shopfront
5. Review and launch personalized online presence

### Patron Workflow
1. Select "Patron" option from the landing page
2. Enter search criteria for desired crafts or location
3. Use interactive map to discover nearby artisans
4. Browse artisan profiles and product offerings
5. Connect directly with craftspeople for purchases or collaborations

## Features in Development

- User authentication and account management
- Payment gateway integration
- Order management system
- Review and rating system
- Advanced search and filtering capabilities
- Mobile application development

## API Integration Details

### Google Gemini AI Integration
The platform utilizes Google's Gemini API to automatically generate professional shop layouts for artisans based on their provided information. This AI-driven approach ensures each artisan receives a unique, aesthetically pleasing digital presence without requiring technical expertise.

### Google Maps Integration
Location services provide both artisans and patrons with geographic context, enabling local discovery and community building within the craft ecosystem.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing Guidelines

Contributions to improve the platform are welcome. Areas for enhancement include:
- Additional craft category support
- Enhanced AI prompt engineering
- Improved responsive design
- Performance optimization
- Accessibility improvements

## Support and Documentation

For technical support or feature requests, please refer to the platform documentation or contact the development team. The codebase includes comprehensive comments and follows modern web development best practices.

## Future Roadmap

- Integration with e-commerce platforms
- Multi-language support
- Advanced analytics dashboard for artisans
- Community features and forums
- Craft tutorial and educational content
- Partnership with cultural institutions

## License and Usage

This platform is designed to support traditional artisans and preserve cultural heritage through technology. Please ensure responsible use that aligns with the mission of supporting craftspeople and their communities.
