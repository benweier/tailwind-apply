const path = require('node:path')
const glob = require('glob')

/** @type {import('postcss').PluginCreator} */
module.exports = ({ styles = path.join(process.cwd(), 'styles'), pattern = '**/*.{css,sass,scss,less,js}' } = {}) => {
  return {
    postcssPlugin: 'tailwind-apply',
    plugins: [
      (root, result) => {
        const files = glob.sync(path.join(styles, pattern), { absolute: true })

        files.forEach((file) => {
          result.messages.push({
            type: 'dependency',
            plugin: 'tailwind-apply',
            file,
            parent: result.opts.from,
          })
        })
      },
    ],
  }
}

module.exports.postcss = true
