<div align="center">
  <h1>Responsive EmailBuilder.js</h1>
</div>

> This is a forked version of [usewaypoint/email-builder-js](https://github.com/usewaypoint/email-builder-js). The original project provides a free and open-source email template builder for developers.

## Introduction
The original EmailBuilder.js is a powerful free tool for creating email templates. But it is not provide responsive components. This forked version provides responsive components for EmailBuilder.js.

## Enhancements
- Turborepo Integration
- Customizable Breakpoints
- Enhanced Responsive Components
- Unit Test

### Turborepo Integration
The original project does not use a workspace to manage multiple packages, so I have set up the project with Turborepo to improve the development experience. This setup enables better dependency management, faster builds through intelligent caching, and a more organized project structure for managing multiple packages and components

### Customizable Breakpoints
I have added a breakpoint configuration that allows developers to define screen size thresholds. These breakpoints is used for the responsive components, and can be customized in 'responsive.ts' file inside the 'shared' package.

### Enhanced Responsive Components
Some components have been enhanced to handle responsive. These components now automatically adjusts its layout, size and other properties based on the viewer's screen size. This ensures your emails look great across all devices, from desktop computers to mobile phones.

List of enhanced components:
- Block Avatar
- Block Heading
- Block Text
- Block Spacer
- Block Columns Container

#### Responsive Approach
To create responsive components, I use CSS @media queries, allowing different styles to be applied based on the viewer’s screen size. My approach to responsive design is to define styles for desktop sizes based on user input, and then the system automatically calculates styles for tablet and phone sizes.

### Unit Test
I have added unit test for each responsive components. In the test cases, I have verify the component's styles are applied correctly.

## Installation
This monorepo is set up with Turborepo, so you can running these commands in the root directory:

#### Install dependencies
```bash
npm install
```
To install dependencies for each package, you can run:
```bash
npm install {new package} -w=package 
```
example:
```bash
npm install @emotion/jest -w=@usewaypoint/block-columns-container
```

#### Run Dev Editor
```bash
npm run dev
```

#### Build Packages
```bash
npm run build
```

#### Run Editor from Build Result
```bash
npm run preview
```

#### Run Unit Test
```bash
npm run test
```
