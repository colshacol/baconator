const fs = require("fs")
const watch = require("chokidar")

const oldSourceMapText = "//# sourceMappingURL=/application.js.map"
const sourceMapText =
  "//# sourceMappingURL=https://cdn.shopify.com/s/files/1/0435/7819/6133/t/4/assets/app.js.map"

const watcher = watch.watch("../assets/app.js")

const state = {
  timeout: null,
}

watcher.on("change", (path) => {
  if (!state.timeout) {
    const code = fs.readFileSync("../assets/app.js", "utf-8")
    const newCode = code + `\n${sourceMapText}`
    fs.writeFileSync("../assets/application.js", newCode)

    state.timeout = setTimeout(() => {
      clearTimeout(state.timeout)
    }, 2000)
  }
})
