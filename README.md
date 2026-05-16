# NetSuite DevTools

A Chrome DevTools extension that adds a **SuiteScript Playground** panel for running SuiteScript snippets against any NetSuite account you are signed into.

![NetSuite DevTools panel](https://github.com/user-attachments/assets/490349bb-c8c5-4258-9c28-8ee84a0333b9)

## Features

- **DevTools panel** — adds a dedicated _NetSuite DevTools_ tab in Chrome DevTools, available on any `*.netsuite.com` page.
- **SuiteScript Playground** — write and execute SuiteScript 2.x snippets in-page; the `N/*` modules are pre-exposed on `window` so you can call `record.load(...)`, `search.create(...)`, etc. directly.
- **Quick snippets** — one-click buttons to insert common patterns (current record, search, load record, send email).
- **Rich result viewer** — `console.log` output and the return value of the snippet are rendered with an interactive JSON viewer.

## Status

This is a personal, hobby project and is **not actively maintained**. Issues and PRs are welcome but may not be reviewed quickly. See [CONTRIBUTING.md](CONTRIBUTING.md) if you'd like to help.

## Installation

The extension is not yet published on the Chrome Web Store. To use it, install it as an unpacked extension:

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the `src/` directory.
5. Open any page on `*.netsuite.com`, open DevTools (F12), and switch to the **NetSuite DevTools** tab.

## Usage

1. Open DevTools on a NetSuite page and select the **NetSuite DevTools** panel.
2. Type a SuiteScript snippet in the editor — for example:
   ```js
   const rec = record.load({ type: "salesorder", id: 123 });
   return rec.getValue({ fieldId: "tranid" });
   ```
3. Click **Run**. Logs and the return value are shown below the editor.

The `N/*` modules are bound to `window` on panel load, so common modules like `record`, `search`, `currentRecord`, `email`, and `runtime` are available without an explicit `require`. For modules that are not auto-exposed, use `require(['N/<module>'], (mod) => { ... })`.

## Project structure

```
src/
├── manifest.json        # Chrome MV3 manifest
├── service_worker.js    # Background worker (no-op placeholder)
├── devtools.js          # Registers the DevTools panel
├── devtools.html
├── panel/               # The DevTools panel UI
│   ├── panel.html
│   ├── panel.css
│   └── panel.js
├── libs/                # Vendored third-party libraries
│   ├── codemirror/      # Editor
│   └── jsonviewer/      # Result viewer
└── img/                 # Extension icons
```

## Development

```bash
npm install           # install lint/format tooling
npm run lint          # run eslint over src/
npm run format        # run prettier
```

The extension itself has no build step — `src/` is loaded directly as an unpacked extension.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) © Fabian Rodriguez
