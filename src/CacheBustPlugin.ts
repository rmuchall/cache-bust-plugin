import webpack from "webpack";
import Compiler = webpack.Compiler;
import Compilation = webpack.Compilation;
import RawSource = webpack.sources.RawSource;
import {readFileSync} from "fs";
import path from "path";

export class CacheBustPlugin {
    apply(compiler: Compiler): void {
        // const Log = compiler.getInfrastructureLogger("cache-bust-plugin");

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
                    for (const chunk of Array.from(compilation.chunks)) {
                        for (const file of Array.from(chunk.files)) {
                            // TODO: Should really use contentHash here
                            htmlTemplate = htmlTemplate.replace(file, `${file}?hash=${chunk.hash}`);
                        }
                    }

                    compilation.emitAsset("index.html", new RawSource(htmlTemplate));
                }
            );
        });
    }
}
