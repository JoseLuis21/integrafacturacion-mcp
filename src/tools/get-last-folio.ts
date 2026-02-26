import { ApiClient } from "../api-client.js";
import type { Tool } from "./types.js";

export const getLastFolio: Tool = {
  definition: {
    name: "get_last_folio",
    description:
      "Obtiene el último folio usado para un tipo de DTE específico. " +
      "Útil para saber cuál fue el último número de folio emitido. " +
      "Requiere el código SII del tipo de documento.",
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
      },
      required: ["code_sii"],
    },
  },
  execute: async (api: ApiClient, args: Record<string, unknown>) => {
    const codeSii = args.code_sii as string;
    return api.get("/api/v1/numerations/last-used-number", { code_sii: codeSii });
  },
};
