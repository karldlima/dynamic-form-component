This repository contains the source code for a personal project: a dynamic form component that generates a form with validation based on an array of form input configurations. It is built using React + TypeScript,
bootstrapped with Vite[SWC]. It uses Material UI component library, react-hook-form for the form toolchain and zod for form validation.

## Getting Started

First, run the development server (using pnpm or your choice of package manager):

```bash
pnpm i
pnpm run dev
```

Then follow the displayed instructions to display the local app on your browser.

### Git

We use conventional commits. For more information you can check out the [Conventional Commit Homepage](https://www.conventionalcommits.org/en/v1.0.0/).

We follow a development branch naming convention: `<work type>/<issue-number>-<short-description>`

1. Start clasifying by work type. Examples: bugfix, feature, rebase, hotfix, docs, release, refactor.
2. Use dashes - to separate words.
3. Include related issue number (if any).
4. Describe the topic using two or three words.

### Styling

This repository uses Emotion, closely basing a styleguide from mui and customizing as needed.
