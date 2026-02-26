import { ApiClient } from "../api-client.js";
import type { Tool } from "./types.js";

export const listPurchases: Tool = {
  definition: {
    name: "list_purchases",
    description:
      "Lista las facturas de compra recibidas de proveedores (libro de compras). " +
      "Retorna RUT emisor, razón social, monto, tipo DTE y fecha. " +
      "Usar cuando el cliente pregunta por sus compras o facturas recibidas.",
    inputSchema: {
      type: "object" as const,
      properties: {
        tipo_dte: {
          type: "string",
          description: "Filtrar por tipo de DTE recibido",
          enum: ["33", "34", "39", "41", "46", "52", "56", "61"],
        },
        accion_doc: {
          type: "string",
          description: "Filtrar por acción del documento (opcional)",
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
    if (args.tipo_dte) params.tipo_dte = args.tipo_dte as string;
    if (args.accion_doc) params.accion_doc = args.accion_doc as string;
    if (args.from_date) params.from_date = args.from_date as string;
    if (args.to_date) params.to_date = args.to_date as string;
    if (args.page) params.page = String(args.page);
    if (args.limit) params.limit = String(args.limit);
    return api.get("/api/v1/purchases", params);
  },
};
