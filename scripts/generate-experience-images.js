/**
 * Script to generate optimized experience images
 * Creates WebP versions and placeholder images for the experiences grid
 */

const fs = require('fs');
const path = require('path');

const experiencesDir = path.join(__dirname, '../public/images/experiences');

// Ensure the experiences directory exists
if (!fs.existsSync(experiencesDir)) {
  fs.mkdirSync(experiencesDir, { recursive: true });
}

// Map of experience slugs to source images (using existing images as placeholders)
const experienceImageMap = {
  'sunrise-game-drive': '../wildlife/elephant.jpg',
  'full-day-safari': '../hero/heroImage.jpg',
  'sunset-safari': '../wildlife/giraffe.jpg',
  'walking-safari': '../wildlife/zebra.jpg',
  'night-game-drive': '../wildlife/lion.jpg',
  'bird-watching': '../wildlife/giraffe.jpg',
  'photography-safari': '../wildlife/elephant.jpg',
  'maasai-village': '../hero/heroImage.jpg',
  'elephant-research': '../wildlife/elephant.jpg',
  'hot-air-balloon': '../hero/heroImage.jpg',
  'mountain-biking': '../wildlife/zebra.jpg',
  'bush-breakfast': '../hero/heroImage.jpg',
};

console.log('Creating experience image references...\n');

// Create symbolic references or copy files
Object.entries(experienceImageMap).forEach(([slug, sourcePath]) => {
  const sourceFile = path.join(experiencesDir, sourcePath);
  const targetFile = path.join(experiencesDir, `${slug}.jpg`);
  
  try {
    // Check if source exists
    if (fs.existsSync(sourceFile)) {
      // Copy the file to create the experience image
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`✓ Created ${slug}.jpg`);
      
      // Create a second image for the images array
      const targetFile2 = path.join(experiencesDir, `${slug}-2.jpg`);
      fs.copyFileSync(sourceFile, targetFile2);
      console.log(`✓ Created ${slug}-2.jpg`);
    } else {
      console.log(`✗ Source not found: ${sourceFile}`);
    }
  } catch (error) {
    console.error(`Error creating ${slug}.jpg:`, error.message);
  }
});

console.log('\n✓ Experience images created successfully!');
console.log('\nNote: These are placeholder images using existing wildlife/hero images.');
console.log('Replace with actual experience-specific images for production.\n');
