export { validateEmail, normalizeEmail, extractDomain, EmailValidationResult } from './validators/email';
export { validateString, sanitizeString, slugify, StringValidationResult, StringValidationOptions } from './validators/string';
export { validateNumber, clamp, NumberValidationResult, NumberValidationOptions } from './validators/number';
export { validateUrl, extractQueryParams, buildUrl, UrlValidationResult, UrlValidationOptions } from './validators/url';
export { validateDate, formatDate, daysBetween, isWeekend, addDays, DateValidationResult, DateValidationOptions } from './validators/date';
export { validatePhone, formatPhoneUS, PhoneValidationResult, PhoneValidationOptions } from './validators/phone';

// Export the generic type name for backward compatibility,
// though it will cause collisions if imported from multiple modules.
export type { ValidationResult } from './validators/string';
