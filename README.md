# `@manicjs/tailwind`

Official Manic plugin for Tailwind CSS integration.

## Documentation

- Website: [manicjs.tech](https://www.manicjs.tech/)
- Plugin docs: [manicjs.tech/docs/framework/plugins/tailwind](https://www.manicjs.tech/docs/framework/plugins/tailwind)

## Install

```bash
bun add @manicjs/tailwind
```

## Usage

```ts
import { defineConfig } from "manicjs/config";
import { tailwind } from "@manicjs/tailwind";

export default defineConfig({
  plugins: [tailwind()],
});
```

## License

GPL-3.0
