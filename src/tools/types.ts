import type { ApiClient } from "../api-client.js";

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required: string[];
  };
}

export interface Tool {
  definition: ToolDefinition;
  execute: (api: ApiClient, args: Record<string, unknown>) => Promise<unknown>;
}
