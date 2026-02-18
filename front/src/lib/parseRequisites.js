export function parseRequisites(requisites) {
  if (!requisites) return [];
  if (Array.isArray(requisites)) return requisites.filter(Boolean);

  const str = String(requisites).trim();
  if (!str) return [];

  try {
    const parsed = JSON.parse(str);
    if (Array.isArray(parsed)) return parsed.filter(Boolean);
  } catch (e) {
    // fallback
  }

  // fallback: extrai códigos (ex: MAT01353, INF01202, FIS01181)
  const matches = str.match(/[A-Z]{3}\d{5}/g);
  return matches ? Array.from(new Set(matches)) : [];
}
