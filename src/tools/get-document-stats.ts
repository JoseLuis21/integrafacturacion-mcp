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
        code_sii: {
          type: "string",
          description: "Filtrar por tipo DTE (opcional)",
          enum: ["33", "34", "39", "41", "46", "52", "56", "61"],
        },
        status: {
          type: "string",
          description: "Filtrar por estado (opcional)",
          enum: ["accepted", "rejected", "pending", "with_errors"],
        },
        from_date: {
          type: "string",
          description: "Fecha desde (YYYY-MM-DD). Opcional.",
        },
        to_date: {
          type: "string",
          description: "Fecha hasta (YYYY-MM-DD). Opcional.",
        },
      },
      required: [],
    },
  },
  execute: async (api: ApiClient, args: Record<string, unknown>) => {
    const params: Record<string, string> = {};
    if (args.code_sii) params.code_sii = args.code_sii as string;
    if (args.status) params.status = args.status as string;
    if (args.from_date) params.from_date = args.from_date as string;
    if (args.to_date) params.to_date = args.to_date as string;
    return api.get("/api/v1/documents/stats", params);
  },
};
