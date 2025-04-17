# Email Template Framework - Project Architecture

## Overview

Based on your requirements and the research into existing solutions like React Email and Ant Design's layout components, we'll create a React-like framework specifically for email templates. This framework will focus on compatibility with email clients while providing a developer-friendly API.

## Core Components

### 1. Row and Column Components (instead of View)

As discussed, we'll use Row and Column components similar to Ant Design's layout system:

- **Row**: Container for horizontal sections

  - Props: `align`, `justify`, `gutter`
  - Will be implemented using HTML tables for email compatibility

- **Column**: Vertical sections within rows
  - Props: `span`, `sm`, `md`, `lg` for responsive design
  - Will support different widths at different breakpoints

### 2. Text Component

- A wrapper for text content with consistent styling
- Props: `size`, `color`, `align`, `weight`

### 3. Image Component

- Email-safe image implementation
- Props: `src`, `alt`, `width`, `height`, `linkTo`

## Compilation Process

1. **Development Mode**:

   - JSX-like syntax for templates
   - Hot reloading for real-time preview
   - Browser testing environment

2. **Build Process**:
   - JSX → HTML compilation
   - CSS inlining for email compatibility
   - Responsive design transformation
   - Similar to how Maizzle compiles Tailwind CSS to inline styles

## Project Structure

```
email-template-framework/
├── src/
│   ├── components/
│   │   ├── Row.js
│   │   ├── Column.js
│   │   ├── Text.js
│   │   ├── Image.js
│   │   └── index.js
│   ├── compiler/
│   │   ├── parse.js
│   │   ├── transform.js
│   │   └── generate.js
│   └── dev/
│       ├── server.js
│       └── preview.js
├── examples/
│   ├── simple.jsx
│   └── responsive.jsx
└── package.json
```

## Implementation Approach

1. **Core Components**: Implement using HTML tables and minimal CSS that works across email clients
2. **Compiler**: Create a build tool that transforms JSX into email-compatible HTML
3. **Development Environment**: Create a dev server for previewing emails during development

## Conditional Rendering

We'll support JSX-like conditional rendering:

```jsx
<Row>
  <Column>{condition && <Text>This will render conditionally</Text>}</Column>
</Row>
```

## Next Steps

1. **Create basic component structure**: Implement Row and Column components
2. **Build a simple compiler**: Create a function to transform JSX to HTML
3. **Set up development environment**: Create a preview server
4. **Implement responsive design**: Add support for breakpoints
5. **Documentation**: Create usage examples and API documentation

This architecture provides a foundation for building a minimal but powerful email template framework that focuses on ease of use and compatibility with email clients.
