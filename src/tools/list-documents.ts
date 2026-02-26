import { ApiClient } from "../api-client.js";
import type { Tool } from "./types.js";

export const listDocuments: Tool = {
  definition: {
    name: "list_documents",
    description:
      "Lista documentos tributarios emitidos con filtros opcionales. " +
      "Permite filtrar por tipo DTE (33=Factura, 34=Factura Exenta, 39=Boleta, " +
      "41=Boleta Exenta, 46=Factura Compra, 52=Guía Despacho, 56=Nota Débito, " +
      "61=Nota Crédito), estado SII y rango de fechas. " +
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
        status_sii: {
          type: "string",
          description: "Estado en el SII",
          enum: ["accepted", "rejected", "pending", "with_errors"],
        },
        date_from: {
          type: "string",
          description: "Fecha desde (YYYY-MM-DD)",
        },
        date_to: {
          type: "string",
          description: "Fecha hasta (YYYY-MM-DD)",
        },
        page: {
          type: "number",
          description: "Página (default 1)",
        },
        page_size: {
          type: "number",
          description: "Resultados por página (default 10, max 50)",
        },
      },
      required: [],
    },
  },
  execute: async (api: ApiClient, args: Record<string, unknown>) => {
    const params: Record<string, string> = {};
    if (args.code_sii) params.code_sii = args.code_sii as string;
    if (args.status_sii) params.status_sii = args.status_sii as string;
    if (args.date_from) params.date_from = args.date_from as string;
    if (args.date_to) params.date_to = args.date_to as string;
    if (args.page) params.page = String(args.page);
    if (args.page_size) params.page_size = String(args.page_size);
    return api.get("/api/v1/documents", params);
  },
};
