import { FIGMA_CONFIG, FIGMA_API } from './figma-config.js';

class FigmaFetcher {
  constructor() {
    this.accessToken = FIGMA_CONFIG.ACCESS_TOKEN;
    this.fileId = FIGMA_CONFIG.FILE_ID;
  }

  async fetchFigmaData(endpoint, params = {}) {
    const url = new URL(endpoint, FIGMA_API.BASE_URL);
    
    // Add query parameters
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });

    try {
      const response = await fetch(url.toString(), {
        headers: {
          'X-Figma-Token': this.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Figma fetch error:', error);
      throw error;
    }
  }

  async getFileData() {
    console.log('Fetching Figma file data...');
    return await this.fetchFigmaData(`/files/${this.fileId}`);
  }

  async getNodeData(nodeId) {
    console.log(`Fetching node data for: ${nodeId}`);
    return await this.fetchFigmaData(`/files/${this.fileId}/nodes`, {
      ids: nodeId
    });
  }

  async getImages(nodeIds, format = 'png') {
    console.log(`Exporting images for nodes: ${nodeIds.join(', ')}`);
    return await this.fetchFigmaData(`/images/${this.fileId}`, {
      ids: nodeIds.join(','),
      format: format,
      scale: 2
    });
  }

  async getStyles() {
    console.log('Fetching Figma styles...');
    return await this.fetchFigmaData(`/files/${this.fileId}/styles`);
  }

  async getComponents() {
    console.log('Fetching Figma components...');
    return await this.fetchFigmaData(`/files/${this.fileId}/components`);
  }

  // Helper method to extract design tokens from Figma data
  extractDesignTokens(figmaData) {
    const tokens = {
      colors: {},
      typography: {},
      spacing: {},
      effects: {}
    };

    // Extract colors from styles
    if (figmaData.styles) {
      Object.values(figmaData.styles).forEach(style => {
        if (style.styleType === 'FILL') {
          tokens.colors[style.name] = style.description || '';
        }
      });
    }

    // Extract from document nodes
    const extractFromNode = (node) => {
      if (node.fills) {
        node.fills.forEach(fill => {
          if (fill.type === 'SOLID' && fill.color) {
            const colorName = node.name || 'unnamed';
            tokens.colors[colorName] = this.rgbToHex(fill.color);
          }
        });
      }

      if (node.style) {
        if (node.style.fontFamily) {
          tokens.typography[`${node.name}_font`] = node.style.fontFamily;
        }
        if (node.style.fontSize) {
          tokens.typography[`${node.name}_size`] = `${node.style.fontSize}px`;
        }
      }

      if (node.children) {
        node.children.forEach(child => extractFromNode(child));
      }
    };

    if (figmaData.document) {
      extractFromNode(figmaData.document);
    }

    return tokens;
  }

  rgbToHex(rgb) {
    const r = Math.round(rgb.r * 255);
    const g = Math.round(rgb.g * 255);
    const b = Math.round(rgb.b * 255);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}

export default FigmaFetcher;

