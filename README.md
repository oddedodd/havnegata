# Havnegata - Nisjebutikker i Namsos sentrum

A modern website showcasing the unique niche shops and offers in Havnegata, the charming shopping district in Namsos city center. Built with Astro and Sanity CMS for easy content management.

## About Havnegata

Havnegata is a vibrant shopping street in Namsos, Norway, known for its collection of niche boutiques and specialty stores. This website serves as a digital showcase for the local businesses, featuring their unique offerings, special deals, and the overall shopping experience.

## Features

- **Shop Showcase**: Beautiful presentation of each boutique with custom branding colors and imagery
- **Special Offers**: Dynamic offer slider highlighting current deals and promotions
- **Responsive Design**: Modern, mobile-friendly interface with Tailwind CSS
- **Content Management**: Easy-to-use Sanity Studio for shop owners to update their information
- **Image Optimization**: Optimized images with Sanity's image handling
- **Rich Content**: Support for detailed shop descriptions, image galleries, and links

## Tech Stack

- **Frontend**: Astro with React components
- **Styling**: Tailwind CSS
- **CMS**: Sanity Studio
- **Deployment**: Vercel-ready configuration
- **Image Handling**: Sanity Image URLs with optimization
- **Content**: Portable Text for rich content editing

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd astro-app && npm install
   cd ../studio && npm install
   ```

### Development

1. Start the development servers:
   ```bash
   npm run dev
   ```

2. Access the applications:
   - Website: [http://localhost:4321](http://localhost:4321)
   - Sanity Studio: [http://localhost:3333](http://localhost:3333)

### Content Management

The Sanity Studio allows shop owners to:
- Add and edit shop information
- Upload shop images and logos
- Create special offers and promotions
- Manage shop descriptions and contact information
- Customize branding colors for each shop

### Building for Production

```bash
npm run build
```

## Project Structure

```
havnegata/
├── astro-app/          # Main website (Astro frontend)
│   ├── src/
│   │   ├── components/ # React and Astro components
│   │   ├── pages/      # Website pages
│   │   └── utils/      # Sanity utilities
│   └── assets/         # Static assets
└── studio/             # Sanity Studio (CMS)
    └── src/schemaTypes/ # Content schemas
```

## Content Types

- **Companies/Shops**: Individual boutique information with branding
- **Tilbud/Offers**: Special deals and promotions from shops
- **Posts**: General content and announcements

## Deployment

The project is configured for easy deployment on Vercel with the Astro app serving as the main website and the Sanity Studio deployed separately for content management.

## Contributing

This project is designed for the Havnegata shopping district. For questions about content management or technical support, please contact the project maintainers.
