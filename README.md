# User Profile App

This is a small single-page React application that allows users to fill form and view a user profile.

## Running the Project

### Start development server:

```bash
pnpm install
pnpm run dev
```

## Live Demo

Check out the [Live Demo](https://userprofile.it-orlo.eu/)

## Stack and Tooling Decisions, Assumptions and Comments To Implementation

### 1. PNPM

I decided to use pnpm as the package manager because of faster installs and efficient disk usage – avoids duplicating dependencies.

**Alternatives**:

- npm – Built-in, but slower
- yarn – Popular, but pnpm is leaner and faster

### 2. Vite

I chose Vite as the build tool due lightweight setup and fast development experience and also because I wanted to learn and explore modern alternatives to traditional bundlers like Webpack.

**Alternatives**:

- Create React App (CRA): more mature but slower and less customizable.
- Webpack: Powerful and highly customizable but requires more configuration.

---

### 3. React Hook Form + Yup Validation

The form is built using React Hook Form because it is lightweight and intuitive. Validation is handled by Yup. Also I have the most experience with this setup

**Alternatives**:

- Formik
- React Final Form
- Zod (alternative to Yup for schema validation)

**Validation Assumptions**:

Since the only requirement was to add validation, I made the following assumptions:

- Required fields: firstName, lastName, email, phone, and birthday.
- Optional fields: about and avatar.
- Email: Validated for proper format using Yup’s built-in .email() method.
- Phone: Assumed to be in international format. I used the yup-phone-lite library to validate phone numbers against international standards.
- Birthday: Checked to ensure the date is not in the future using Yup’s .max(new Date()).
- About: Limited to a maximum of 500 characters.
- Avatar: Must be a .jpeg or .png image with a maximum file size of 2MB.

---

### 4. State Management via React Context

User profile data are stored using React Context, which is suitable for smaller apps.

**Alternatives**:

Global state management libraries like:

- Redux Toolkit
- Zustand
- MobX

---

### 5. Image Handling and Optimization

The user can upload an avatar image. On the frontend:

- The image is resized and compressed before being converted to Base64 using a utility that combines FileReader and Canvas APIs.
- Images are conditionally resized based on responsive breakpoints.

**In a real-world production setup**:

- Image optimization would be handled on the server or via a CDN.
- For SSR frameworks I would use dedicated components like `next/image` in Next.js or `gatsby-plugin-image` in Gatsby.js for optimal performance and automatic responsive behavior.
- For static assetss Webpack/Vite plugins could be used (`vite-plugin-imagemin`, `image-webpack-loader`)

---

### 6. Data Persistence

Currently, the user profile is persisted in the browser using `sessionStorage`. The storage logic is encapsulated in `user-profile.service.ts` using three async-like functions:

- `saveUserProfile`
- `getUserProfile`
- `clearUserProfile`

Although `sessionStorage` is synchronous, wrapping these in promises allows for easy replacement with API calls in the future without changing how they’re consumed across the app.

---
