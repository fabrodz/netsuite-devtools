# Contributing

Thanks for your interest in NetSuite DevTools! This is a small hobby project, so contributions of any size are welcome — typo fixes, bug reports, or new features.

## Reporting issues

Open an [issue](https://github.com/fabrodz/netsuite-devtools/issues) and include:

- What you were trying to do.
- What you expected to happen.
- What actually happened (error messages, screenshots, the snippet you ran).
- Browser version and NetSuite environment (if relevant).

## Submitting changes

1. Fork the repo and create a branch off `main`.
2. Make your change. Keep the diff focused — one logical change per PR.
3. Run the linter and formatter before pushing:
   ```bash
   npm run lint
   npm run format
   ```
4. Test the extension by loading `src/` as an unpacked extension in Chrome (see [README](README.md#installation)) and exercising the affected behavior on a NetSuite page.
5. Open a pull request and describe what you changed and why.

## Code style

- The project uses [Prettier](https://prettier.io/) for formatting and [ESLint](https://eslint.org/) for linting; the configuration in this repo is the source of truth.
- Vanilla JS only — no build step, no framework, no TypeScript. The extension is intentionally tiny.
- Third-party libraries live in `src/libs/` and are vendored (committed). If you add a new dependency, include a note in the PR describing the version and source.

## Scope

This extension targets the SuiteScript developer experience inside NetSuite. Out of scope:

- Anything that requires running outside of `*.netsuite.com`.
- Heavyweight UI frameworks or build pipelines.

If you're not sure whether something fits, open an issue first and we can discuss.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
