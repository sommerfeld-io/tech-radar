#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DATA_FILE = path.join(__dirname, 'radar.yml');
const OUTPUT_FILE = path.join(__dirname, 'public', 'radar-data.json');

// Read the main radar data file
function readRadarData() {
  const content = fs.readFileSync(DATA_FILE, 'utf8');
  return yaml.load(content);
}

// Transform to the format expected by the radar visualization
function transformToRadarFormat(radarData) {
  // Create quadrant and ring mappings
  const quadrantMap = {};
  radarData.quadrants.forEach((q, i) => {
    quadrantMap[q.name] = i;
  });

  const ringMap = {};
  radarData.rings.forEach((r, i) => {
    ringMap[r.name] = i;
  });

  // Transform technologies
  const entries = radarData.technologies.map((tech) => {
    return {
      label: tech.name,
      quadrant: quadrantMap[tech.quadrant] !== undefined ? quadrantMap[tech.quadrant] : 0,
      ring: ringMap[tech.ring] !== undefined ? ringMap[tech.ring] : 0,
      link: `#${tech.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`
    };
  });

  return {
    title: radarData.title,
    version: radarData.version,
    description: radarData.description,
    copyright: radarData.copyright,
    githubUrl: radarData.githubUrl,
    quadrants: radarData.quadrants,
    rings: radarData.rings,
    entries
  };
}

// Main execution
try {
  console.log('Building tech radar data...');
  const radarData = readRadarData();
  console.log(`Found ${radarData.technologies.length} technologies`);

  const radarOutput = transformToRadarFormat(radarData);

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(radarOutput, null, 2));
  console.log(`Tech radar data written to ${OUTPUT_FILE}`);

} catch (error) {
  console.error('Error building radar data:', error);
  process.exit(1);
}
