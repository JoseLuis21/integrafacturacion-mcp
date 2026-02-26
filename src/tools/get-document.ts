import { ApiClient } from "../api-client.js";
import type { Tool } from "./types.js";

export const getDocument: Tool = {
  definition: {
    name: "get_document",
    description:
      "Obtiene el detalle completo de un documento tributario electrónico (DTE) por su ID. " +
      "Retorna tipo, folio, emisor, receptor, montos, estado SII e historial de estados. " +
      "Usar cuando el cliente pregunta por un documento específico.",
    inputSchema: {
      type: "object" as const,
      properties: {
        document_id: {
          type: "string",
          description: "ID del documento a consultar",
        },
      },
      required: ["document_id"],
    },
  },
  execute: async (api: ApiClient, args: Record<string, unknown>) => {
    const id = args.document_id as string;
    return api.get(`/api/v1/documents/${id}`);
  },
};
