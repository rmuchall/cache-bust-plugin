import webpack from "webpack";
import Compiler = webpack.Compiler;
import Compilation = webpack.Compilation;
import RawSource = webpack.sources.RawSource;
import {readFileSync} from "fs";
import path from "path";
import {CacheBustOptions} from "./CacheBustOptions";

export class CacheBustPlugin {
    options: CacheBustOptions = {
        writeToIndexHtml: true,
        writeToJson: true,
        jsonFileName: "version.json"
    };

    constructor(options?: CacheBustOptions) {
        if (options) {
            this.options = Object.assign(this.options, options);
        }
    }

    apply(compiler: Compiler): void {
        // const Log = compiler.getInfrastructureLogger("cache-bust-plugin");
        // Log.info messages are displayed to user by default
        // Log.info(`file = ${file}`);

        // Hook: thisCompilation
        compiler.hooks.thisCompilation.tap("cache-bust-plugin", (compilation: Compilation) => {
            // Hook: processAssets
            compilation.hooks.processAssets.tap(
                {
                    name: "cache-bust-plugin",
                    stage: Compilation.PROCESS_ASSETS_STAGE_REPORT,
                },
                (assets) => {
                    let htmlTemplate = readFileSync(path.resolve(process.cwd(), "./index.html"), "utf8");
                    const fileHashes: Record<string, any> = {};
                    for (const chunk of Array.from(compilation.chunks)) {
                        for (const file of Array.from(chunk.files)) {
                            // TODO: Should really use contentHash here
                            if (this.options.writeToIndexHtml) {
                                htmlTemplate = htmlTemplate.replace(file, `${file}?hash=${chunk.hash}`);
                            }

                            if (this.options.writeToJson) {
                                fileHashes[file] = chunk.hash;
                            }
                        }
                    }

                    compilation.emitAsset("index.html", new RawSource(htmlTemplate));
                    if (this.options.writeToJson) {
                        compilation.emitAsset(this.options.jsonFileName!, new RawSource(JSON.stringify(fileHashes, null, 2)));
                    }
                }
            );
        });
    }
}
