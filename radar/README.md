# Tech Radar

This directory contains the internal technology radar for the sommerfeld.io organization.

## Structure

```
radar/
├── data/           # YAML files defining technologies
├── public/         # Generated static radar files
│   ├── index.html  # Radar visualization
│   ├── radar-data.json     # Generated from YAML
│   └── radar-details.json  # Generated from YAML
├── build.js        # Build script to generate JSON from YAML
└── README.md       # This file
```

## Adding a Technology

To add a new technology to the radar:

1. Create a new YAML file in `radar/data/` (e.g., `my-technology.yml`)
2. Use the following template:

```yaml
---
name: "Technology Name"
quadrant: "Languages|Tools|Platforms|Techniques"
ring: "Adopt|Trial|Assess|Hold"
description: |
  Your markdown description here.
  
  **Key Benefits:**
  - Benefit 1
  - Benefit 2
  
  **Usage:**
  - How we use it
```

3. Build the radar: `npm run build:radar`
4. Open `radar/public/index.html` in your browser

## Rings

- **Adopt**: Technologies we have high confidence in and use in production
- **Trial**: Technologies worth pursuing, being used successfully in some projects
- **Assess**: Technologies worth exploring to understand their potential
- **Hold**: Technologies to proceed with caution or phase out

## Quadrants

- **Languages**: Programming languages and markup languages
- **Tools**: Development tools, build tools, and utilities
- **Platforms**: Infrastructure, services, and platforms
- **Techniques**: Methods, patterns, and practices

## Building the Radar

```bash
# Install dependencies first (if not already done)
npm install

# Build the radar data
npm run build:radar

# Open the radar in your browser
open radar/public/index.html
```

## Viewing the Radar

Simply open `radar/public/index.html` in any modern web browser. The radar is completely static and works offline once built.

## Integration with Taskfile

The radar build can be integrated into your existing workflow:

```bash
# Using task (if integrated)
task radar:build

# Or directly with npm
npm run build:radar
```

## Hosting

The `radar/public` directory can be hosted on GitHub Pages or any static file server. All necessary assets are self-contained in the HTML file.
