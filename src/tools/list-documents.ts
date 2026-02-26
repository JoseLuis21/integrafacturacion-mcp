import { ApiClient } from "../api-client.js";
import type { Tool } from "./types.js";

export const listDocuments: Tool = {
  definition: {
    name: "list_documents",
    description:
      "Lista documentos tributarios emitidos con filtros opcionales. " +
      "Permite filtrar por tipo DTE (33=Factura, 34=Factura Exenta, 39=Boleta, " +
      "41=Boleta Exenta, 46=Factura Compra, 52=Guía Despacho, 56=Nota Débito, " +
      "61=Nota Crédito), estado y rango de fechas. " +
      "Retorna lista paginada con folio, tipo, monto, estado y fecha de emisión.",
    inputSchema: {
      type: "object" as const,
      properties: {
        code_sii: {
          type: "string",
          description:
            "Código SII del tipo de DTE: 33=Factura, 34=Factura Exenta, " +
            "39=Boleta, 41=Boleta Exenta, 46=Factura Compra, 52=Guía Despacho, " +
            "56=Nota Débito, 61=Nota Crédito",
          enum: ["33", "34", "39", "41", "46", "52", "56", "61"],
        },
        status: {
          type: "string",
          description: "Estado del documento",
          enum: ["accepted", "rejected", "pending", "with_errors"],
        },
        from_date: {
          type: "string",
          description: "Fecha desde (YYYY-MM-DD)",
        },
        to_date: {
          type: "string",
          description: "Fecha hasta (YYYY-MM-DD)",
        },
        page: {
          type: "number",
          description: "Página (default 1)",
        },
        limit: {
          type: "number",
          description: "Resultados por página (default 20, max 100)",
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
    if (args.page) params.page = String(args.page);
    if (args.limit) params.limit = String(args.limit);
    return api.get("/api/v1/documents", params);
  },
};
