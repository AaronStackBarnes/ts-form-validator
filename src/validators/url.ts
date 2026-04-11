/**
 * URL and URI validation utilities
 */
import { normalizeURL, sanitizeInput } from 'ts-form-helpers';

export interface ValidationResult {
  valid: boolean;
  value?: string;
  error?: string;
}

export interface UrlValidationOptions {
  protocols?: string[];
  requireProtocol?: boolean;
  allowLocalhost?: boolean;
  allowPrivateIp?: boolean;
}

const PRIVATE_IP_RANGES = [
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^127\./,
  /^::1$/,
  /^fc00:/i,
];

export function validateUrl(input: string, opts: UrlValidationOptions = {}): ValidationResult {
  const {
    protocols = ['http', 'https'],
    requireProtocol = true,
    allowLocalhost = false,
    allowPrivateIp = false,
  } = opts;

  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'URL must be a non-empty string' };
  }

  const trimmed = sanitizeInput(input.trim());
  const normalized = requireProtocol ? trimmed : normalizeURL(trimmed);

  if (trimmed.length > 2083) {
    return { valid: false, error: 'URL exceeds maximum length of 2083 characters' };
  }

  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }

  const protocol = url.protocol.replace(':', '');
  if (!protocols.includes(protocol)) {
    return { valid: false, error: `Protocol must be one of: ${protocols.join(', ')}` };
  }

  const hostname = url.hostname.toLowerCase();

  if (!allowLocalhost && (hostname === 'localhost' || hostname === '127.0.0.1')) {
    return { valid: false, error: 'Localhost URLs are not permitted' };
  }

  if (!allowPrivateIp && PRIVATE_IP_RANGES.some(r => r.test(hostname))) {
    return { valid: false, error: 'Private IP addresses are not permitted' };
  }

  return { valid: true, value: url.toString() };
}

export function extractQueryParams(url: string): Record<string, string> {
  try {
    const parsed = new URL(url);
    const params: Record<string, string> = {};
    parsed.searchParams.forEach((v, k) => { params[k] = v; });
    return params;
  } catch {
    return {};
  }
}

export function buildUrl(base: string, params: Record<string, string>): string {
  const url = new URL(base);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}
