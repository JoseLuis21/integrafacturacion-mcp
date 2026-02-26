import { ApiClient } from "../api-client.js";
import type { Tool } from "./types.js";

export const getCertificateInfo: Tool = {
  definition: {
    name: "get_certificate_info",
    description:
      "Obtiene información del certificado digital de la empresa: titular, RUT, " +
      "fecha de vencimiento y estado. Usar cuando el cliente pregunta por su certificado " +
      "o si está por vencer. NO retorna el certificado en sí por seguridad.",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  execute: async (api: ApiClient) => {
    return api.get("/api/v1/business/certificate-info");
  },
};
