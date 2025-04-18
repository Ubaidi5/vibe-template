# Email Template Framework

A React-like framework for creating email templates with a focus on compatibility and simplicity.

## Overview

This framework provides a component-based approach to creating email templates, similar to React but without the overhead. It's designed to be simple, focusing on generating static HTML for emails rather than dynamic web applications.

## Component Architecture

The framework is built on a hierarchy of components:

- **Email**: The root container for email templates
- **Row**: Horizontal container (implemented as HTML tables for email compatibility)
- **Column**: Vertical sections within rows
- **Text**: Formatted text content
- **Image**: Email-safe images

## Key Features

- **Component-Based**: Create reusable, composable components
- **Email-Safe**: Focuses on HTML that works across email clients
- **Responsive**: Support for different layouts at different screen sizes
- **Simple API**: Intuitive props similar to React components
- **JSX Support**: Write templates using JSX syntax
- **Development Environment**: Hot reloading and email client compatibility testing
- **Email Client Compatibility**: Checks compatibility with popular email clients

## Current Implementation

The current implementation includes:

1. Basic component classes that render to HTML
2. Support for responsive layouts using data attributes
3. Email-compatible HTML generation
4. JSX compiler for writing templates in JSX
5. Development server with hot reloading
6. Email client compatibility checking
7. Command-line interface for building and previewing templates

## Development Environment

The framework includes a powerful development environment:

```bash
# Start the development server with hot reloading
npm run dev
```

The development environment provides:

- **Hot Reloading**: See changes instantly as you edit templates
- **Device Preview**: Test how emails look on different devices (desktop, tablet, mobile)
- **Template Selection**: Switch between different email templates
- **Email Client Compatibility**: Check templates for compatibility issues
- **Detailed Reports**: See information about email client support and recommendations

## Usage with JSX

```jsx
// templates/welcome.jsx
const WelcomeTemplate = (props) => {
  const { userName = "User", userAvatar } = props;

  return (
    <Email
      title="Welcome to Our Service"
      previewText={`Hi ${userName}, welcome to our service!`}
    >
      <Row>
        <Column>
          <Text size="24px" weight="bold" align="center">
            Welcome, {userName}!
          </Text>
        </Column>
      </Row>

      {/* Conditional rendering works too */}
      {userAvatar && (
        <Row style={{ marginTop: "20px" }}>
          <Column>
            <Image
              src={userAvatar}
              alt={`${userName}'s avatar`}
              width="150"
              height="150"
            />
          </Column>
        </Row>
      )}
    </Email>
  );
};

export default WelcomeTemplate;
```

## Command-line Interface

The framework includes a CLI for building and previewing templates:

```bash
# Build a template
npm run build:template welcome

# Preview a template with sample data
npm run preview welcome

# Render a template with custom data
npm run render welcome

# Start the development server
npm run dev
```

## JavaScript API Example

If you prefer not to use JSX, you can use the JavaScript API directly:

```javascript
const { Email, Row, Column, Text, Image } = require("./src/components");

function createWelcomeEmail(props = {}) {
  const { userName = "User" } = props;

  // Create the root email component
  const email = new Email({
    title: "Welcome to Our Service",
    previewText: `Hi ${userName}, welcome to our service!`,
  });

  // Add a row with a text component
  const row = new Row();
  const column = new Column();
  const text = new Text({ size: "24px" });

  text.addChild(`Welcome, ${userName}!`);
  column.addChild(text);
  row.addChild(column);
  email.addChild(row);

  // Return the rendered HTML
  return email.render();
}
```

## Testing

To test the current implementation:

```
npm test         # Test the JS API
npm run test:jsx # Test the JSX compiler
```

## Next Steps

1. **Media Queries**: Implement responsive design compilation
2. **Additional Components**: Add more specialized components
3. **Export Options**: Add more export options (ZIP, inline CSS, etc.)

## License

MIT
