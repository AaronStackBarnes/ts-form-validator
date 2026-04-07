export { validateEmail, normalizeEmail, extractDomain } from './validators/email';
export type { ValidationResult as EmailValidationResult } from './validators/email';

export { validateString, sanitizeString, slugify } from './validators/string';
export type { ValidationResult as StringValidationResult, StringValidationOptions } from './validators/string';

export { validateNumber, clamp } from './validators/number';
export type { ValidationResult as NumberValidationResult, NumberValidationOptions } from './validators/number';
