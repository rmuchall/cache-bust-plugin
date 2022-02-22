![GitHub](https://img.shields.io/github/license/rmuchall/cache-bust-plugin)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/cache-bust-plugin)
![npm](https://img.shields.io/npm/v/cache-bust-plugin)

## What is cache-bust-plugin?
cache-bust-plugin is a tiny Webpack plugin for generating bundle hashes. It's a useful alternative to [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) for when you only require cache-busting.

## Usage
```
import {CacheBustPlugin} from "cache-bust-plugin";

module.exports {
    // ... Webpack config
    plugins: [
        new CacheBustPlugin({
            // ... cache-bust-plugin options
        })
    ]
}
```
If the writeToIndexHtml option is used then cache-bust-plugin searches for bundle file names in index.html (located in the root directory of your project) and appends bundle hashes using a query string. <br />
```
index.html (before cache-bust-plugin) =>
<script type="text/javascript" src="/app.js"></script>
index.html (after cache-bust-plugin) =>
<script type="text/javascript" src="/app.js?hash=68b1a4d74cf4ef2b516f492bef010d8e"></script>
```
If the writeToJson option is used then cache-bust-plugin will write the bundle hashes to JSON formatted text file. <br />
```
version.json =>
{
  "app.css": "faa879842aef4070b5563ccdc0016cf8",
  "app.js": "faa879842aef4070b5563ccdc0016cf8",
  "vendor.js": "e5487614083955d6896b53ac06edaffb"
}
```

## Options
The following options are available: <br />

| Option           | Description                                                              | 
|------------------|--------------------------------------------------------------------------|
| writeToIndexHtml | Add bundle hashes to index.html as a query string using text replacement |
| writeToJson      | Write bundle hashes to JSON formatted text file                          |
| jsonFileName     | Used with writeToJson option (defaults to version.json)                  |
