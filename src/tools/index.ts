import type { Tool } from "./types.js";
import { getUserInfo } from "./get-user-info.js";
import { getCertificateInfo } from "./get-certificate-info.js";
import { getDocument } from "./get-document.js";
import { getDocumentStats } from "./get-document-stats.js";
import { listDocuments } from "./list-documents.js";
import { getNumerationSummary } from "./get-numeration-summary.js";
import { getLastFolio } from "./get-last-folio.js";

export const allTools: Tool[] = [
  getUserInfo,
  getCertificateInfo,
  listDocuments,
  getDocument,
  getDocumentStats,
  getNumerationSummary,
  getLastFolio,
];

export const toolMap = new Map<string, Tool>(
  allTools.map((t) => [t.definition.name, t])
);
