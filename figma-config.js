// Figma Configuration
export const FIGMA_CONFIG = {
  ACCESS_TOKEN: process.env.FIGMA_ACCESS_TOKEN || 'your_figma_token_here',
  FILE_ID: process.env.FIGMA_FILE_ID || 'your_file_id_here',
  NODES: {
    HERO: '304-3503',
    EVENTS: '27-564'
  }
};

// Figma API URLs
export const FIGMA_API = {
  BASE_URL: 'https://api.figma.com/v1',
  FILE_URL: `https://api.figma.com/v1/files/${FIGMA_CONFIG.FILE_ID}`,
  IMAGES_URL: `https://api.figma.com/v1/images/${FIGMA_CONFIG.FILE_ID}`,
  STYLES_URL: `https://api.figma.com/v1/files/${FIGMA_CONFIG.FILE_ID}/styles`,
  COMPONENTS_URL: `https://api.figma.com/v1/files/${FIGMA_CONFIG.FILE_ID}/components`
};
