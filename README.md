# React Forms

Key features in the application include:

- Portals to display forms in modals
- State Management
- Validation with Yup schema
- Unit tests
- Both forms collect the same data:
  - name (validate for first uppercased letter)
  - age (number, no negative values)
  - email (validate for email)
  - 2 passwords (password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character)
  - gender (radio buttons)
  - accept Terms and Conditions agreement (checkbox)
  - input control to upload picture (validate size and extension, allow png jpeg, saved in redux store as base64)
  - autocomplete control to select country (all countries stored in the Redux store)

## Features

- ⚡ [Library for web](https://react.dev/): Built with React 19.
- 🎯 [Build tool](https://vite.dev/): Vite makes web development simple again.
- 💪 [Strongly typed](https://www.typescriptlang.org/): Uses TypeScript.
- 🎊 [CSS Framework](https://picocss.com/): Minimal CSS Framework for semantic HTML.
- 🔥 [Vite-native](https://vitest.dev/): A Vite-native testing framework. It's fast!.
- 🐻 [Zustand](https://zustand-demo.pmnd.rs/): Bear necessities for state management in React
- 📝 [React Hook Form](https://react-hook-form.com/) Performant, flexible and extensible forms with easy-to-use validation.

## Getting Started

### Steps

#### 1. Clone [repository](https://github.com/Sepulator/react-2025q3-nom)

```bash copy
  git clone https://github.com/Sepulator/react-2025q3-nom
```

#### 2. Switch to `forms` branch

```bash copy
  git switch forms
```

#### 3. Open project directory and install dependencies

```bash copy
  npm install
```

#### 4. Start the development server

```bash copy
  npm run dev
```

This command starts the dev server locally `http://localhost:5173/`.

### Available scripts

#### Build for production

```bash copy
  npm run build
```

---

#### Start Vite dev server in the current directory

```bash copy
  npm run dev
```

---

#### Locally preview the production build

```bash copy
  npm run preview
```

---

#### Run ESLint to fix errors

```bash copy
  npm run lint
```

---

#### Run unit test

```bash copy
  npm run test
```

---

#### Test coverage

```bash copy
  npm run test:coverage
```

---

#### Run code format with Prettier

```bash copy
  npm run format:fix
```

---

#### Run husky to prepare git hooks

```bash copy
  npm run prepare
```

---
