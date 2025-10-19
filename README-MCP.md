# Figma MCP Server Setup

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install @modelcontextprotocol/sdk
```

### 2. Get Figma Access Token
1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Scroll down to "Personal access tokens"
3. Click "Create new token"
4. Give it a name (e.g., "MCP Server")
5. Copy the token

### 3. Get Figma File ID
From your Figma file URL:
```
https://www.figma.com/file/FILE_ID_HERE/File-Name
```
Copy the `FILE_ID_HERE` part.

### 4. Configure Environment
```bash
# Copy the example file
cp env.example .env

# Edit .env and add your tokens
FIGMA_ACCESS_TOKEN=your_token_here
FIGMA_FILE_ID=your_file_id_here
```

### 5. Test the Server
```bash
node mcp-server.js
```

## 🛠️ Available Tools

### `get_figma_file`
Get complete Figma file data including all pages, frames, and components.

### `get_figma_images`
Export images from specific nodes in your Figma file.

### `get_figma_styles`
Extract design tokens, colors, typography, and spacing from your Figma file.

### `get_figma_components`
Get information about all components in your Figma file.

## 📝 Usage Examples

### Get File Data
```javascript
// This will be called automatically by the MCP client
get_figma_file({
  fileId: "your_file_id",
  accessToken: "your_token"
})
```

### Export Hero Section Image
```javascript
get_figma_images({
  fileId: "your_file_id",
  accessToken: "your_token",
  nodeIds: ["hero_node_id"],
  format: "png"
})
```

## 🔧 Troubleshooting

### Common Issues:
1. **Invalid Token**: Make sure your Figma token is correct and has proper permissions
2. **File Not Found**: Verify the file ID is correct and the file is accessible
3. **Node Not Found**: Ensure the node IDs exist in your Figma file

### Debug Mode:
```bash
DEBUG=* node mcp-server.js
```

## 📚 Next Steps

Once the MCP server is running, you can:
1. Connect it to your Cursor IDE
2. Use it to automatically extract design data from Figma
3. Generate React components based on your Figma designs
4. Sync design tokens and styles

## 🔗 Useful Links
- [Figma API Documentation](https://www.figma.com/developers/api)
- [MCP Documentation](https://modelcontextprotocol.io/)
- [Figma Personal Access Tokens](https://www.figma.com/developers/api#access-tokens)

