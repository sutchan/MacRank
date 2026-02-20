// vite-env.d.ts v0.3.37

/**
 * Provides type definitions for Vite's `import.meta.env`.
 * This ensures TypeScript understands the environment variables injected by Vite.
 */
interface ImportMetaEnv {
  readonly [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare namespace process {
  const env: {
    [key: string]: string | undefined;
  };
}

export {};
