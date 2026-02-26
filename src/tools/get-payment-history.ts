import { ApiClient } from "../api-client.js";
import type { Tool } from "./types.js";

export const getPaymentHistory: Tool = {
  definition: {
    name: "get_payment_history",
    description:
      "Obtiene el historial de pagos del cliente. " +
      "Retorna monto, moneda, método de pago, estado y fecha de cada transacción. " +
      "Usar cuando el cliente pregunta por sus pagos o facturas de servicio.",
    inputSchema: {
      type: "object" as const,
      properties: {
        status: {
          type: "string",
          description: "Filtrar por estado del pago (ej: COMPLETED)",
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
    if (args.status) params.status = args.status as string;
    if (args.from_date) params.from_date = args.from_date as string;
    if (args.to_date) params.to_date = args.to_date as string;
    if (args.page) params.page = String(args.page);
    if (args.limit) params.limit = String(args.limit);
    return api.get("/api/v1/billing/payments", params);
  },
};
