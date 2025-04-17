# Email Template Framework - Requirements Analysis

## Core Concept

A React-like framework specifically designed for creating email templates with considerations for email client limitations.

## Key Requirements

1. **Component-Based Architecture**

   - Minimal core components: View, Text, Image
   - No hooks (unlike React) as they aren't needed for email templates

2. **View Component**

   - Primary layout component (alternative to div with flex)
   - Should support responsive styling with props like `sm`, `md`, and `lg`
   - Needs to be compatible with email clients' limited CSS support

3. **Templating Features**

   - JavaScript in HTML (similar to JSX)
   - Conditional rendering capabilities
   - Email-safe styling approach

4. **Simplicity**
   - Minimal learning curve
   - Limited set of components focused on email needs

## Research Questions

1. **Email Client Compatibility**

   - Which email clients do we need to support?
   - Answer: We are going to support all major email clients. But starts with most popular like gmail and outlook
   - What are the specific CSS limitations across popular clients?
   - Answer: we will use only those css which are supported by email clients.
   - What HTML structure works best across clients?

2. **Implementation Approach**

   - Should we use a compilation step (like JSX → HTML)?
   - Answer: Yes we are going to use compilation step. Once template is created we will compile it and use it.
   - Server-side rendering vs. client-side?
   - Answer: No need for server side rendering
   - How to handle responsive design in email clients?
   - Answer: There is a framework called maizzle it allow us to use taiwind css in code and compile it to normal css during build. And for view component I want it to use as Row and Col as in Ant design. you can reference it. and if we need to use Row and Col then we drop the View component and use Row and Col.

3. **Reference Frameworks**

   - MJML, React Email, or other existing email frameworks to learn from
   - What works/doesn't work in existing solutions?

4. **Developer Experience**
   - Command-line tools needed?
   - Answer: Not sure about it right now
   - Preview capabilities?
   - Answer: Yes preview capabilities is really necessary. We use two modes development and production. In dev mode we use hot reload to see changes realtime.
   - Testing across email clients?
   - Answer: No need to test email right now. We are gonna focus more on creating email and then after creating build we will test is manually

## Next Steps

1. Determine target email clients for compatibility
2. Decide on the technical architecture (compiler, runtime, etc.)
3. Design the API for core components
4. Create prototype of the View component
5. Develop the template syntax for JavaScript-in-HTML
