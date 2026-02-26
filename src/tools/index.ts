import type { Tool } from "./types.js";
import { getUserInfo } from "./get-user-info.js";
import { getCertificateInfo } from "./get-certificate-info.js";
import { listBusinesses } from "./list-businesses.js";
import { getBusinessDetail } from "./get-business-detail.js";
import { listDocuments } from "./list-documents.js";
import { getDocument } from "./get-document.js";
import { getDocumentStats } from "./get-document-stats.js";
import { getNumerationSummary } from "./get-numeration-summary.js";
import { getLastFolio } from "./get-last-folio.js";
import { getDteBalance } from "./get-dte-balance.js";
import { listPurchases } from "./list-purchases.js";

export const allTools: Tool[] = [
  getUserInfo,
  getCertificateInfo,
  listBusinesses,
  getBusinessDetail,
  listDocuments,
  getDocument,
  getDocumentStats,
  getNumerationSummary,
  getLastFolio,
  getDteBalance,
  listPurchases,
];

export const toolMap = new Map<string, Tool>(
  allTools.map((t) => [t.definition.name, t])
);
