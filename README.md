# ts-form-validator

Lightweight TypeScript form validation library with zero runtime dependencies.

## Installation

```bash
npm install ts-form-validator
```

## Usage

```typescript
import { validateEmail, validateString, validateNumber } from 'ts-form-validator';

const emailResult = validateEmail('user@example.com');
if (!emailResult.valid) {
  console.error(emailResult.error);
}

const nameResult = validateString(input, { minLength: 2, maxLength: 50 });
const ageResult = validateNumber(input, { min: 0, max: 150, integer: true });
```

## API

### `validateEmail(email: string): ValidationResult`
Validates an email address per RFC 5321/5322.

### `validateString(input, options?): ValidationResult`
Validates a string field with optional length and pattern constraints.

### `validateNumber(input, options?): ValidationResult`
Validates and parses a numeric value with optional bounds checking.

## Contributing

Pull requests are welcome. Please ensure all tests pass and coverage remains above 80%.

## License

MIT
