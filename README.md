# Yaak Conditional Selector Plugin

A Yaak plugin that allows you to conditionally select between values based on various conditions. This is the Yaak equivalent of the [insomnia-plugin-conditional-selector](https://github.com/BarrySunderland/insomnia-plugin-conditional-selector).

## Features

- **Conditional Selection**: Choose between two values based on a condition
- **Equality Checks**: Compare values for equality
- **String Contains**: Check if a string contains a substring
- **Regex Matching**: Match patterns using regular expressions
- **Environment Variable Support**: Use environment variables in conditions and values
- **Comparison Operators**: Support for `==`, `!=`, `>`, `<`, `>=`, `<=`

## Installation

### From Yaak Settings

1. Open Yaak
2. Go to **Settings** → **Plugins**
3. Search for **Conditional Selector**
4. Click **Install**

## Usage

### Basic Conditional

Select between two values based on a boolean condition:

```
${[ conditional('true', 'production-url', 'dev-url') ]}
```

**Arguments:**
- `condition`: Boolean value or expression (`true`, `false`, or comparison)
- `valueIfTrue`: Value returned when condition is true
- `valueIfFalse`: Value returned when condition is false

**Examples:**

```
// With environment variable
${[ conditional('{{use_production}}', 'https://api.prod.com', 'https://api.dev.com') ]}

// With comparison
${[ conditional('{{port}} > 8000', 'high-port', 'low-port') ]}

// Nested with other template functions
${[ conditional('{{env_name}} == prod', '{{prod_token}}', '{{dev_token}}') ]}
```

### Equality Check

Compare two values for equality:

```
${[ conditional.equals('{{environment}}', 'production', 'prod-api-key', 'dev-api-key') ]}
```

**Arguments:**
- `value1`: First value to compare
- `value2`: Second value to compare
- `valueIfTrue`: Value returned when values are equal
- `valueIfFalse`: Value returned when values are not equal

**Examples:**

```
// Check environment
${[ conditional.equals('{{env}}', 'staging', 'https://staging.api.com', 'https://dev.api.com') ]}

// Check numeric values
${[ conditional.equals('{{version}}', '2', 'v2-endpoint', 'v1-endpoint') ]}

// Check boolean flags
${[ conditional.equals('{{debug}}', 'true', 'verbose', 'quiet') ]}
```

### Contains Check

Check if a string contains a substring:

```
${[ conditional.contains('{{user_role}}', 'admin', 'admin-token', 'user-token') ]}
```

**Arguments:**
- `text`: Text to search in
- `substring`: Substring to search for
- `valueIfTrue`: Value returned when substring is found
- `valueIfFalse`: Value returned when substring is not found

**Examples:**

```
// Check role permissions
${[ conditional.contains('{{roles}}', 'admin', '/admin/endpoint', '/user/endpoint') ]}

// Check feature flags
${[ conditional.contains('{{features}}', 'beta', 'beta-api-key', 'stable-api-key') ]}

// Check URL patterns
${[ conditional.contains('{{base_url}}', 'localhost', 'dev-settings', 'prod-settings') ]}
```

### Regex Match

Match a value against a regular expression pattern:

```
${[ conditional.regex('{{email}}', '.*@company\\.com$', 'internal', 'external') ]}
```

**Arguments:**
- `text`: Text to match against
- `pattern`: Regular expression pattern (without delimiters)
- `valueIfTrue`: Value returned when pattern matches
- `valueIfFalse`: Value returned when pattern does not match

**Examples:**

```
// Validate email domain
${[ conditional.regex('{{email}}', '.*@company\\.com$', 'internal-api', 'external-api') ]}

// Check semantic versioning
${[ conditional.regex('{{version}}', '^[0-9]+\\.[0-9]+\\.[0-9]+$', 'valid', 'invalid') ]}

// Match IP addresses
${[ conditional.regex('{{ip}}', '^192\\.168\\.', 'local-network', 'external-network') ]}

// Check environment naming
${[ conditional.regex('{{env}}', '^(prod|production)$', 'production-mode', 'development-mode') ]}
```

## Advanced Examples

### Multiple Conditions with Nesting

You can nest conditional selectors for complex logic:

```
// Select API version based on multiple conditions
${[ conditional.equals(
  '{{region}}',
  'US',
  conditional.equals('{{env}}', 'prod', 'us-prod-v2', 'us-dev-v2'),
  conditional.equals('{{env}}', 'prod', 'eu-prod-v1', 'eu-dev-v1')
) ]}
```

### Authentication Strategies

```
// Choose auth method based on environment
${[ conditional.contains(
  '{{auth_type}}',
  'oauth',
  'Bearer {{oauth_token}}',
  'Basic {{basic_auth}}'
) ]}
```

### Dynamic Headers

```
// Content-Type based on API version
${[ conditional('{{api_version}} >= 2', 'application/vnd.api+json', 'application/json') ]}
```

### Environment-Specific Timeouts

```
// Different timeout for production
${[ conditional.equals('{{env}}', 'production', '30000', '5000') ]}
```

### Feature Flags

```
// Enable/disable features
${[ conditional.equals('{{feature_flags}}', 'new-endpoint', '/api/v2/users', '/api/v1/users') ]}
```

## Comparison Operators

The `conditional()` function supports these comparison operators:

- `==` or `===`: Equal to
- `!=` or `!==`: Not equal to
- `>`: Greater than
- `<`: Less than
- `>=`: Greater than or equal to
- `<=`: Less than or equal to

**Examples:**

```
${[ conditional('{{status_code}} >= 200', 'success', 'error') ]}
${[ conditional('{{retry_count}} < 3', 'retry', 'fail') ]}
${[ conditional('{{timeout}} != 0', 'custom', 'default') ]}
```

## Truthy/Falsy Values

For the basic `conditional()` function, the following values are considered falsy:
- `false`
- `0`
- `no`
- Empty string

All other values are considered truthy:
- `true`
- `1`
- `yes`
- Any non-empty string

## Best Practices

1. **Use Environment Variables**: Store conditions and values in environment variables for easy switching between environments
2. **Keep It Simple**: While nesting is supported, try to keep conditions readable
3. **Test Edge Cases**: Always test with different environment configurations
4. **Document Your Conditions**: Add comments in your environment files explaining complex conditions
5. **Use Specific Functions**: Prefer `conditional.equals()` over `conditional()` when checking equality for better clarity

## Troubleshooting

### Condition Not Evaluating Correctly

- Ensure environment variables are properly defined
- Check for extra spaces in condition strings
- Verify comparison operator syntax

### Regex Not Matching

- Remember to escape special characters: `\\.` for `.`
- Test your regex pattern separately before using
- Use `\\` for backslashes in regex patterns

### Values Not Substituting

- Ensure the referenced environment variables exist
- Check that environment is selected in Yaak
- Verify template function syntax: `${[ ... ]}`

## Development

### Building the Plugin

```bash
npm install
npm run build
```

### Development Mode

```bash
npm run dev
```

This will watch for changes and automatically rebuild the plugin.

### Testing

Create test requests in Yaak with different conditions to verify functionality.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Credits

Inspired by [insomnia-plugin-conditional-selector](https://github.com/BarrySunderland/insomnia-plugin-conditional-selector) by Barry Sunderland.