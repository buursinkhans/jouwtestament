// Minimal Google Sheets client for lead storage (phase 1, docs/10). No dependencies:
// a service account signs a JWT (RS256) with node:crypto and exchanges it for an access token.
// Env: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID, GOOGLE_SHEET_TAB (default "Leads").
import { createSign } from 'node:crypto';

export interface SheetConfig {
  email: string;
  privateKey: string;
  sheetId: string;
  tab: string;
}

export function sheetConfigFromEnv(env: Record<string, string | undefined>): SheetConfig | null {
  const email = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const sheetId = env.GOOGLE_SHEET_ID;
  if (!email || !privateKey || !sheetId) return null;
  return { email, privateKey, sheetId, tab: env.GOOGLE_SHEET_TAB || 'Leads' };
}

const base64url = (input: string | Buffer) => Buffer.from(input).toString('base64url');

async function getAccessToken(config: SheetConfig): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({
      iss: config.email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  );
  const signature = createSign('RSA-SHA256').update(`${header}.${claims}`).sign(config.privateKey, 'base64url');

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${signature}`,
    }),
  });
  if (!response.ok) throw new Error(`google_token_${response.status}`);
  return ((await response.json()) as { access_token: string }).access_token;
}

const sheetsUrl = (config: SheetConfig, range: string, suffix = '') =>
  `https://sheets.googleapis.com/v4/spreadsheets/${config.sheetId}/values/${encodeURIComponent(range)}${suffix}`;

/**
 * Appends a row (RAW, so values are never evaluated as formulas) and returns its row number.
 * Then writes `id(rowNumber)` into column A of that row, which keeps ids unique without a counter.
 */
export async function appendRowWithId(
  config: SheetConfig,
  row: string[],
  id: (rowNumber: number) => string
): Promise<string> {
  const token = await getAccessToken(config);
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const append = await fetch(
    sheetsUrl(config, `${config.tab}!A:A`, ':append?valueInputOption=RAW&insertDataOption=INSERT_ROWS'),
    { method: 'POST', headers, body: JSON.stringify({ values: [row] }) }
  );
  if (!append.ok) throw new Error(`google_append_${append.status}`);
  const updatedRange: string = ((await append.json()) as { updates: { updatedRange: string } }).updates.updatedRange;
  const rowNumber = Number(/!A(\d+)/.exec(updatedRange)?.[1]);
  if (!rowNumber) throw new Error('google_append_no_row');

  const leadId = id(rowNumber);
  const update = await fetch(sheetsUrl(config, `${config.tab}!A${rowNumber}`, '?valueInputOption=RAW'), {
    method: 'PUT',
    headers,
    body: JSON.stringify({ values: [[leadId]] }),
  });
  if (!update.ok) throw new Error(`google_update_${update.status}`);
  return leadId;
}
