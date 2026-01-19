/**
 * @version 0.0.3
 */
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";
import { createHash } from "crypto";
import * as tstl from "typescript-to-lua";

function tryResolve(src: string) {
    try {
        return require.resolve(src)
    }
    catch (_) {
        return undefined
    }
}

function isNodeModule(id: string) {
  return !id.startsWith(".") && !id.startsWith("/") && !id.includes(":");
}

function getModuleName(id: string) {
  id = id.trim().replace(/\/+/g, "/");

  if (id.startsWith("@")) {
    const match = id.match(/^@[\w_-]+\/[\w_-]+/);
    return match ? match[0] : id;
  }

  const match = id.match(/^[\w_-]+/);
  return match ? match[0] : id;
}

function luaBuilder(rootdir: string, src: string, outdir: string) {
  execSync(`npx gly-cli build ${src} --outdir ${outdir} --bundler`, {
    cwd: join(rootdir, '..'),
    encoding: 'utf-8'
  })

  return `${outdir}/game.lua`
}

const plugin: tstl.Plugin = {
  moduleResolution(
    moduleIdentifier: string,
    requiringFile: string,
    options: tstl.CompilerOptions,
    emitHost: tstl.EmitHost,
  ) {
    if (!isNodeModule(moduleIdentifier)) {
      return moduleIdentifier;
    }

    const MODULE_NAME = getModuleName(moduleIdentifier);
    const PATH_PACKAGE_JSON = tryResolve(`${MODULE_NAME}/package.json`);

    if (PATH_PACKAGE_JSON && MODULE_NAME === moduleIdentifier) {
      const CFGS_PACKAGE_JSON = JSON.parse(readFileSync(PATH_PACKAGE_JSON).toString());
      const PATH_MAIN_MODULE = require.resolve(`${moduleIdentifier}/${CFGS_PACKAGE_JSON.main}`);
      const PATH_DIST_MODULE = `${options.outDir}/${moduleIdentifier}/dist`;
      return luaBuilder(PATH_PACKAGE_JSON, PATH_MAIN_MODULE, PATH_DIST_MODULE);
    }

    if (PATH_PACKAGE_JSON && emitHost.fileExists(`node_modules/${moduleIdentifier}.lua`)) {
      const FRAGMENT = moduleIdentifier.slice(MODULE_NAME.length + 1);
      const IDENTIFIER = createHash("md5").update(moduleIdentifier).digest("hex").slice(0, 7);
      const PATH_DIST_MODULE = `${MODULE_NAME}-${IDENTIFIER}/${FRAGMENT}`;
      return luaBuilder(PATH_PACKAGE_JSON, `${FRAGMENT}.lua`, `${options.outDir}/${PATH_DIST_MODULE}`);
    }

    return undefined;
  },
};

export default plugin;
