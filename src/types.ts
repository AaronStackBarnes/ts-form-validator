export interface ValidationResult<T = any> {
  valid: boolean;
  value?: T;
  error?: string;
}
