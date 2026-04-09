export {
  validateEmail,
  normalizeEmail,
  extractDomain,
  EmailValidationResult
} from './validators/email';

export {
  validateString,
  sanitizeString,
  slugify,
  StringValidationOptions,
  StringValidationResult
} from './validators/string';

export {
  validateNumber,
  clamp,
  NumberValidationOptions,
  NumberValidationResult
} from './validators/number';

export {
  validateUrl,
  extractQueryParams,
  buildUrl,
  UrlValidationOptions,
  UrlValidationResult
} from './validators/url';

export {
  validateDate,
  formatDate,
  daysBetween,
  isWeekend,
  addDays,
  DateValidationOptions,
  DateValidationResult
} from './validators/date';

export {
  validatePhone,
  formatPhoneUS,
  PhoneValidationOptions,
  PhoneValidationResult
} from './validators/phone';
