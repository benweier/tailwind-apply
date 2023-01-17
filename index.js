const fs = require('node:fs')
const path = require('node:path')
const glob = require('glob')
const postcss = require('postcss')
const postcssJs = require('postcss-js')
const plugin = require('tailwindcss/plugin')

const addSourcesFromPath = (dir, cb) => {
  const files = glob.sync(dir)

  files.forEach((file) => {
    const styles = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })
    const root = postcss.parse(styles)
    const jss = postcssJs.objectify(root)

    cb(jss)
  })
}

module.exports = plugin.withOptions(
  ({ styles = path.join(process.cwd(), 'styles'), pattern = '**/*.{css,sass,scss,less}' } = {}) => {
    const base = path.join(styles, 'base', pattern)
    const components = path.join(styles, 'components', pattern)
    const utilities = path.join(styles, 'utilities', pattern)
    const variants = path.join(styles, 'variants', pattern)

    return ({ addBase, addComponents, addUtilities, addVariant }) => {
      try {
        addSourcesFromPath(base, addBase)
        addSourcesFromPath(components, addComponents)
        addSourcesFromPath(utilities, addUtilities)
        addSourcesFromPath(variants, addVariant)
      } catch (err) {
        //
      }
    }
  },
)
