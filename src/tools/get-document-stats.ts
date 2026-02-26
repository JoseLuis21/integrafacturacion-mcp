import { ApiClient } from "../api-client.js";
import type { Tool } from "./types.js";

export const getDocumentStats: Tool = {
  definition: {
    name: "get_document_stats",
    description:
      "Estadísticas agregadas de documentos tributarios: total emitidos, monto total facturado, " +
      "desglose por tipo DTE (facturas, boletas, notas de crédito, etc.), documentos con error. " +
      "Usar cuando preguntan totales, resúmenes, cuánto han facturado o cuántos documentos emitieron.",
    inputSchema: {
      type: "object" as const,
      properties: {
        date_from: {
          type: "string",
          description: "Fecha desde (YYYY-MM-DD). Opcional.",
        },
        date_to: {
          type: "string",
          description: "Fecha hasta (YYYY-MM-DD). Opcional.",
        },
      },
      required: [],
    },
  },
  execute: async (api: ApiClient, args: Record<string, unknown>) => {
    const params: Record<string, string> = {};
    if (args.date_from) params.date_from = args.date_from as string;
    if (args.date_to) params.date_to = args.date_to as string;
    return api.get("/api/v1/documents/stats", params);
  },
};
