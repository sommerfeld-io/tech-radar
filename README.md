# Tech Radar

[file-issues]: https://github.com/sommerfeld-io/tech-radar/issues
[project-board]: https://github.com/orgs/sommerfeld-io/projects/1/views/1

This repository contains the technology radar for the [Sommerfeld.io](https://github.com/sommerfeld-io) GitHub organization. It provides an overview of technologies, tools, frameworks, and practices we use, assess, or have on our radar for future consideration.

- [Where to file issues][file-issues]
- [Project Board for Issues and Pull Requests][project-board]

## 🎯 Viewing the Tech Radar

The tech radar is a static visualization that displays all technologies used across the sommerfeld.io organization. To view it:

### Option 1: View Online (GitHub Pages)
Open the radar directly from the repository: [View Tech Radar](radar/public/index.html)

### Option 2: View Locally
```bash
# Clone the repository
git clone https://github.com/sommerfeld-io/tech-radar.git
cd tech-radar

# Build the radar
npm install
npm run build:radar

# Open in browser
open radar/public/index.html
```

### Using Task
```bash
# Build and open the radar
task radar:open

# Or just build
task radar:build
```

## 📊 Tech Radar Structure

The radar organizes technologies into:

### Rings (Adoption Level)
- **Adopt**: Technologies we have high confidence in and use in production
- **Trial**: Technologies worth pursuing, being used successfully in some projects
- **Assess**: Technologies worth exploring to understand their potential
- **Hold**: Technologies to proceed with caution or phase out

### Quadrants (Categories)
- **Languages**: Programming languages and markup languages
- **Tools**: Development tools, build tools, and utilities
- **Platforms**: Infrastructure, services, and platforms
- **Techniques**: Methods, patterns, and practices

## ➕ Adding a Technology

To add a new technology to the radar:

1. Create a new YAML file in `radar/data/` (e.g., `my-technology.yml`)
2. Use this template:

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

3. Build the radar: `npm run build:radar` or `task radar:build`
4. Open `radar/public/index.html` to view your changes

See [radar/README.md](radar/README.md) for more details.

## Contact

Feel free to contact me via <sebastian@sommerfeld.io> or [raise an issue in this repository][file-issues].
