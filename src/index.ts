#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ApiClient } from "./api-client.js";
import { allTools, toolMap } from "./tools/index.js";

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

if (!API_BASE_URL) {
  console.error("ERROR: API_BASE_URL environment variable is required");
  process.exit(1);
}

if (!API_KEY) {
  console.error("ERROR: API_KEY environment variable is required");
  process.exit(1);
}

const api = new ApiClient(API_BASE_URL, API_KEY);

const server = new McpServer({
  name: "@integrafacturacion/mcp",
  version: "1.0.0",
});

// Register all tools
for (const tool of allTools) {
  const { name, description, inputSchema } = tool.definition;

  server.tool(
    name,
    description,
    inputSchema.properties,
    async (args: Record<string, unknown>) => {
      try {
        const handler = toolMap.get(name);
        if (!handler) {
          return {
            content: [{ type: "text" as const, text: `Tool "${name}" not found` }],
            isError: true,
          };
        }

        const result = await handler.execute(api, args);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [{ type: "text" as const, text: `Error: ${message}` }],
          isError: true,
        };
      }
    }
  );
}

// Start server with stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
