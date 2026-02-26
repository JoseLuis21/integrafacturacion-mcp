import { ApiClient } from "../api-client.js";
import type { Tool } from "./types.js";

export const getNumerationSummary: Tool = {
  definition: {
    name: "get_numeration_summary",
    description:
      "Resumen de folios (CAF) disponibles por tipo de DTE. " +
      "Muestra cuántos folios quedan, rangos activos, agotados y vencidos. " +
      "Usar cuando el cliente pregunta cuántos folios le quedan, si tiene folios " +
      "disponibles para boletas/facturas, o si necesita solicitar más al SII.",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  execute: async (api: ApiClient) => {
    return api.get("/api/v1/numerations/summary");
  },
};
