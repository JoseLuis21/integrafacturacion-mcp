import { ApiClient } from "../api-client.js";
import type { Tool } from "./types.js";

export const getUserInfo: Tool = {
  definition: {
    name: "get_user_info",
    description:
      "Obtiene información del usuario autenticado: nombre, email, estado de la cuenta. " +
      "Usar cuando el cliente pregunta por sus datos personales o de su cuenta.",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  execute: async (api: ApiClient) => {
    return api.get("/api/v1/users/me");
  },
};
