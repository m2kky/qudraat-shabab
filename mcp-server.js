#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

class FigmaMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'figma-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_figma_file',
            description: 'Get Figma file data by file ID',
            inputSchema: {
              type: 'object',
              properties: {
                fileId: {
                  type: 'string',
                  description: 'Figma file ID (from URL)',
                },
                accessToken: {
                  type: 'string',
                  description: 'Figma personal access token',
                },
              },
              required: ['fileId', 'accessToken'],
            },
          },
          {
            name: 'get_figma_images',
            description: 'Export images from Figma file',
            inputSchema: {
              type: 'object',
              properties: {
                fileId: {
                  type: 'string',
                  description: 'Figma file ID',
                },
                accessToken: {
                  type: 'string',
                  description: 'Figma personal access token',
                },
                nodeIds: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Array of node IDs to export',
                },
                format: {
                  type: 'string',
                  enum: ['jpg', 'png', 'svg', 'pdf'],
                  default: 'png',
                  description: 'Export format',
                },
              },
              required: ['fileId', 'accessToken', 'nodeIds'],
            },
          },
          {
            name: 'get_figma_styles',
            description: 'Get design tokens and styles from Figma file',
            inputSchema: {
              type: 'object',
              properties: {
                fileId: {
                  type: 'string',
                  description: 'Figma file ID',
                },
                accessToken: {
                  type: 'string',
                  description: 'Figma personal access token',
                },
              },
              required: ['fileId', 'accessToken'],
            },
          },
          {
            name: 'get_figma_components',
            description: 'Get component information from Figma file',
            inputSchema: {
              type: 'object',
              properties: {
                fileId: {
                  type: 'string',
                  description: 'Figma file ID',
                },
                accessToken: {
                  type: 'string',
                  description: 'Figma personal access token',
                },
              },
              required: ['fileId', 'accessToken'],
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_figma_file':
            return await this.getFigmaFile(args.fileId, args.accessToken);
          
          case 'get_figma_images':
            return await this.getFigmaImages(
              args.fileId, 
              args.accessToken, 
              args.nodeIds, 
              args.format || 'png'
            );
          
          case 'get_figma_styles':
            return await this.getFigmaStyles(args.fileId, args.accessToken);
          
          case 'get_figma_components':
            return await this.getFigmaComponents(args.fileId, args.accessToken);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async getFigmaFile(fileId, accessToken) {
    const response = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
      headers: {
        'X-Figma-Token': accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      content: [
        {
          type: 'text',
          text: `Figma File Data:\n\n${JSON.stringify(data, null, 2)}`,
        },
      ],
    };
  }

  async getFigmaImages(fileId, accessToken, nodeIds, format) {
    const nodeIdsParam = nodeIds.join(',');
    const response = await fetch(
      `https://api.figma.com/v1/images/${fileId}?ids=${nodeIdsParam}&format=${format}`,
      {
        headers: {
          'X-Figma-Token': accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      content: [
        {
          type: 'text',
          text: `Figma Images Export:\n\n${JSON.stringify(data, null, 2)}`,
        },
      ],
    };
  }

  async getFigmaStyles(fileId, accessToken) {
    const response = await fetch(`https://api.figma.com/v1/files/${fileId}/styles`, {
      headers: {
        'X-Figma-Token': accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      content: [
        {
          type: 'text',
          text: `Figma Styles:\n\n${JSON.stringify(data, null, 2)}`,
        },
      ],
    };
  }

  async getFigmaComponents(fileId, accessToken) {
    const response = await fetch(`https://api.figma.com/v1/files/${fileId}/components`, {
      headers: {
        'X-Figma-Token': accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      content: [
        {
          type: 'text',
          text: `Figma Components:\n\n${JSON.stringify(data, null, 2)}`,
        },
      ],
    };
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Figma MCP server running on stdio');
  }
}

const server = new FigmaMCPServer();
server.run().catch(console.error);
