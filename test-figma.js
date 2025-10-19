import FigmaFetcher from './figma-fetcher.js';
import { FIGMA_CONFIG } from './figma-config.js';

async function testFigmaConnection() {
  console.log('🚀 Testing Figma Connection...\n');
  
  const fetcher = new FigmaFetcher();
  
  try {
    // Test 1: Get file data
    console.log('📁 Fetching file data...');
    const fileData = await fetcher.getFileData();
    console.log('✅ File data retrieved successfully!');
    console.log(`📄 File name: ${fileData.name}`);
    console.log(`📅 Last modified: ${fileData.lastModified}`);
    console.log(`👤 Modified by: ${fileData.modifiedBy?.handle || 'Unknown'}\n`);

    // Test 2: Get specific nodes (Hero and Events)
    console.log('🎯 Fetching Hero section...');
    const heroData = await fetcher.getNodeData(FIGMA_CONFIG.NODES.HERO);
    console.log('✅ Hero section retrieved!');
    
    console.log('📅 Fetching Events section...');
    const eventsData = await fetcher.getNodeData(FIGMA_CONFIG.NODES.EVENTS);
    console.log('✅ Events section retrieved!\n');

    // Test 3: Get styles
    console.log('🎨 Fetching design styles...');
    const styles = await fetcher.getStyles();
    console.log('✅ Styles retrieved!');
    console.log(`🎨 Found ${Object.keys(styles.meta?.styles || {}).length} styles\n`);

    // Test 4: Get components
    console.log('🧩 Fetching components...');
    const components = await fetcher.getComponents();
    console.log('✅ Components retrieved!');
    console.log(`🧩 Found ${Object.keys(components.meta?.components || {}).length} components\n`);

    // Test 5: Extract design tokens
    console.log('🔧 Extracting design tokens...');
    const tokens = fetcher.extractDesignTokens(fileData);
    console.log('✅ Design tokens extracted!');
    console.log('🎨 Colors:', Object.keys(tokens.colors).length);
    console.log('📝 Typography:', Object.keys(tokens.typography).length);
    console.log('📏 Spacing:', Object.keys(tokens.spacing).length);
    console.log('✨ Effects:', Object.keys(tokens.effects).length);

    // Save results to files
    console.log('\n💾 Saving results...');
    
    // Save file data
    await import('fs').then(fs => {
      fs.writeFileSync('figma-file-data.json', JSON.stringify(fileData, null, 2));
      fs.writeFileSync('figma-hero-data.json', JSON.stringify(heroData, null, 2));
      fs.writeFileSync('figma-events-data.json', JSON.stringify(eventsData, null, 2));
      fs.writeFileSync('figma-styles.json', JSON.stringify(styles, null, 2));
      fs.writeFileSync('figma-components.json', JSON.stringify(components, null, 2));
      fs.writeFileSync('figma-tokens.json', JSON.stringify(tokens, null, 2));
    });

    console.log('✅ All data saved to JSON files!');
    console.log('\n🎉 Figma connection test completed successfully!');
    
    return {
      fileData,
      heroData,
      eventsData,
      styles,
      components,
      tokens
    };

  } catch (error) {
    console.error('❌ Error testing Figma connection:', error.message);
    throw error;
  }
}

// Run the test
testFigmaConnection()
  .then(() => {
    console.log('\n🚀 Ready to implement Figma designs!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  });
