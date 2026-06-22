import type { ManicPlugin } from 'manicjs/config';
import { existsSync, writeFileSync, mkdirSync, watch } from 'node:fs';
import { join } from 'node:path';

function resolveCssInput(cwd: string): string {
  let cssInputPath = 'app/global.css';
  if (!existsSync(join(cwd, cssInputPath))) {
    cssInputPath = 'app/main.css';
  }
  if (!existsSync(join(cwd, cssInputPath))) {
    const tempPath = join(cwd, '.manic', 'tailwind-fallback.css');
    mkdirSync(join(cwd, '.manic'), { recursive: true });
    writeFileSync(tempPath, "@import 'tailwindcss';");
    cssInputPath = '.manic/tailwind-fallback.css';
  }
  return cssInputPath;
}

function readCss(outPath: string): Promise<string> {
  return Bun.file(outPath)
    .text()
    .then(content => content || '')
    .catch(() => '');
}

async function compileOnce(cwd: string, cssInputPath: string): Promise<string> {
  const proc = Bun.spawn(
    ['bunx', '--bun', '@tailwindcss/cli', '-i', cssInputPath, '--silent'],
    { cwd }
  );
  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  if ((await proc.exited) === 0) return stdout;
  console.error('[Tailwind Plugin Error]', stderr);
  return `/* Tailwind compilation failed: ${stderr} */`;
}

export function tailwind(): ManicPlugin {
  return {
    name: '@manicjs/tailwind',
    bunfig: `[serve.static]\nplugins = ["bun-plugin-tailwind"]`,
    configureServer(ctx) {
      const cssInputPath = resolveCssInput(ctx.cwd);
      const outDir = join(ctx.cwd, '.manic', 'dev');
      mkdirSync(outDir, { recursive: true });
      const outPath = join(outDir, 'tailwind.css');

      let cachedCss = '';

      const initialCompile = compileOnce(ctx.cwd, cssInputPath).then(
        initial => {
          cachedCss = initial;
          writeFileSync(outPath, initial);

          Bun.spawn(
            [
              'bunx',
              '--bun',
              '@tailwindcss/cli',
              '-i',
              cssInputPath,
              '-o',
              outPath,
              '--watch',
            ],
            { cwd: ctx.cwd }
          );

          try {
            watch(outPath, () => {
              readCss(outPath).then(updated => {
                if (updated) cachedCss = updated;
              });
            });
          } catch {}
        }
      );

      const handler = async () => {
        await initialCompile;
        return new Response(cachedCss, {
          headers: { 'Content-Type': 'text/css' },
        });
      };

      ctx.addRoute('/tailwindcss', handler);
      ctx.addRoute('/tailwindcss.css', handler);
    },
    build(_ctx) {
      // In production mode, Bun's build (with bun-plugin-tailwind) resolves href="tailwindcss"
      // to the actual compiled main-[hash].css, so we don't need any HTML injections.
    },
  };
}
