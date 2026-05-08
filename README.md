<img src="https://raw.githubusercontent.com/Rahuletto/manic/main/demo/assets/wordmark.svg" alt="Manic" width="300" />

[![npm version](https://img.shields.io/npm/v/%40manicjs%2Ftailwind?logo=npm)](https://www.npmjs.com/package/@manicjs/tailwind)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun)](https://bun.sh)
[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue)](https://opensource.org/licenses/GPL-3.0)

Official Manic plugin for Tailwind CSS integration.

---

Manic is a high-performance React framework built exclusively for Bun.

It ships with a custom build pipeline, first-class plugin architecture, and production-ready DX for local development, deployment, and AI-native workflows.

## Why Manic

- Bun-first runtime and tooling
- Fast transforms and minification powered by OXC
- File-based routing with production-ready deployment adapters
- Plugin system built for framework and AI-native workflows

## Documentation

- Website: [manicjs.tech](https://www.manicjs.tech/)
- Docs: [manicjs.tech/docs](https://www.manicjs.tech/docs)
- Package docs: [https://www.manicjs.tech/docs/framework/plugins/tailwind](https://www.manicjs.tech/docs/framework/plugins/tailwind)

## Install

```bash
bun add @manicjs/tailwind
```

## Usage

```ts
import { defineConfig } from 'manicjs/config';
import { tailwind } from '@manicjs/tailwind';

export default defineConfig({
  plugins: [tailwind()],
});
```

## License

GPL-3.0
