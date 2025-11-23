/**
 * @version 0.0.1
 */
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";
import * as tstl from "typescript-to-lua";

function isNodeModule(id: string): boolean {
  return !id.startsWith(".") && !id.startsWith("/") && !id.includes(":");
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

    const PATH_PACKAGE_JSON = require.resolve(`${moduleIdentifier}/package.json`);
    const CFGS_PACKAGE_JSON = JSON.parse(readFileSync(PATH_PACKAGE_JSON).toString());
    const PATH_MAIN_MODULE = require.resolve(`${moduleIdentifier}/${CFGS_PACKAGE_JSON.main}`);
    const PATH_DIST_MODULE = `${options.outDir}/${moduleIdentifier}/dist`

    execSync(`npx gly-cli build ${PATH_MAIN_MODULE} --outdir ${PATH_DIST_MODULE} --bundler`, {
      cwd: join(PATH_PACKAGE_JSON, '..')
    })
   
    return `${PATH_DIST_MODULE}/game.lua`;
  },
};

export default plugin;
