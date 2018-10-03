import CSSAsset = require("parcel-bundler/src/assets/CSSAsset")
import PurgeCSS = require("purgecss")

export = class PurgedCSSAsset extends CSSAsset {
  options: any

  async load() {
    const source = Promise.resolve(super.load())

    if (process.env.NODE_ENV !== "production") {
      return source
    }

    const extensions = ["html", "js", "jsx", "vue", "svelte", "twig"]
    const content = extensions.map(ext => `${this.options.rootDir}/**/*.${ext}`)

    const purger = new PurgeCSS({
      content,
      css: [{ extension: "css", raw: await source }]
    })
    const [result] = purger.purge()
    return result.css
  }
}
