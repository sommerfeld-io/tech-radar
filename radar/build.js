#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DATA_DIR = path.join(__dirname, 'data');
const OUTPUT_FILE = path.join(__dirname, 'public', 'radar-data.json');

// Read all YAML files from the data directory
function readTechnologies() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
  const technologies = [];

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(content);
    
    if (data && data.name && data.quadrant && data.ring) {
      technologies.push({
        name: data.name,
        quadrant: data.quadrant,
        ring: data.ring,
        description: data.description || '',
        isNew: data.isNew || false
      });
    } else {
      console.warn(`Warning: ${file} is missing required fields (name, quadrant, ring)`);
    }
  });

  return technologies;
}

// Transform to the format expected by the radar visualization
function transformToRadarFormat(technologies) {
  const entries = technologies.map((tech, index) => ({
    label: tech.name,
    quadrant: mapQuadrant(tech.quadrant),
    ring: mapRing(tech.ring),
    moved: 0,
    link: `#${tech.name.toLowerCase().replace(/\s+/g, '-')}`,
    description: tech.description
  }));

  return { entries };
}

function mapQuadrant(quadrant) {
  const mapping = {
    'Languages': 0,
    'Tools': 1,
    'Platforms': 2,
    'Techniques': 3
  };
  return mapping[quadrant] !== undefined ? mapping[quadrant] : 0;
}

function mapRing(ring) {
  const mapping = {
    'Adopt': 0,
    'Trial': 1,
    'Assess': 2,
    'Hold': 3
  };
  return mapping[ring] !== undefined ? mapping[ring] : 0;
}

// Main execution
try {
  console.log('Building tech radar data...');
  const technologies = readTechnologies();
  console.log(`Found ${technologies.length} technologies`);
  
  const radarData = transformToRadarFormat(technologies);
  
  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(radarData, null, 2));
  console.log(`Tech radar data written to ${OUTPUT_FILE}`);
  
  // Also write individual technology details for detail pages
  const detailsFile = path.join(__dirname, 'public', 'radar-details.json');
  const details = {};
  technologies.forEach(tech => {
    const key = tech.name.toLowerCase().replace(/\s+/g, '-');
    details[key] = {
      name: tech.name,
      quadrant: tech.quadrant,
      ring: tech.ring,
      description: tech.description
    };
  });
  fs.writeFileSync(detailsFile, JSON.stringify(details, null, 2));
  console.log(`Tech radar details written to ${detailsFile}`);
  
} catch (error) {
  console.error('Error building radar data:', error);
  process.exit(1);
}
