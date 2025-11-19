# Tech Radar

This directory contains the internal technology radar for the sommerfeld.io organization.

## Structure

```
radar/
├── radar.yml       # Single YAML file with all radar data
├── public/         # Generated static radar files
│   ├── index.html  # Radar visualization
│   └── radar-data.json  # Generated from YAML
├── build.js        # Build script to generate JSON from YAML
└── README.md       # This file
```

## Data File Format

The `radar.yml` file contains all radar configuration and data:

```yaml
---
title: "Sommerfeld.io Tech Radar"
version: "1.0.0"
description: |
  Description of the radar and its purpose.

quadrants:
  - name: "Languages"
    color: "#8e7cc3"
  - name: "Tools"
    color: "#6fa8dc"
  - name: "Platforms"
    color: "#93c47d"
  - name: "Techniques"
    color: "#f6b26b"

rings:
  - name: "Adopt"
    description: "Technologies we use with confidence"
    color: "#93c47d"
  - name: "Trial"
    description: "Technologies worth pursuing"
    color: "#ffd966"
  - name: "Assess"
    description: "Technologies worth exploring"
    color: "#f9cb9c"
  - name: "Hold"
    description: "Technologies to proceed with caution"
    color: "#ea9999"

technologies:
  - name: "Docker"
    quadrant: "Platforms"
    ring: "Adopt"
  - name: "Python"
    quadrant: "Languages"
    ring: "Trial"
```

## Adding a Technology

To add a new technology to the radar:

1. Edit `radar/radar.yml`
2. Add a new entry to the `technologies` list:

```yaml
  - name: "Technology Name"
    quadrant: "Languages|Tools|Platforms|Techniques"
    ring: "Adopt|Trial|Assess|Hold"
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

# Serve the radar locally (starts server on http://localhost:8080)
npm run serve:radar
```

## Viewing the Radar

### Option 1: Local Web Server (Recommended)

```bash
# Start the local server
npm run serve:radar

# Or using task
task radar:run
```

Then open http://localhost:8080 in your browser.

### Option 2: Direct File Access

Simply open `radar/public/index.html` in any modern web browser. The radar is completely static and works offline once built.

## Integration with Taskfile

The radar build can be integrated into your existing workflow:

```bash
# Build the radar
task radar:build

# Build and serve the radar
task radar:run

# Or directly with npm
npm run build:radar
npm run serve:radar
```

## Hosting

The `radar/public` directory can be hosted on GitHub Pages or any static file server. All necessary assets are self-contained in the HTML file.
