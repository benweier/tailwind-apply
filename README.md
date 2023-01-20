# `tailwind-apply`

`tailwind-apply` is a simple combination of plugins for TailwindCSS and PostCSS. It is intended to provide a basic mechanism and structure for you to easily "apply-your-own-theme" for TailwindCSS.

It does this by extending TailwindCSS's config the same way as `@tailwindcss/typography` or `@tailwindcss/forms`, with one critical difference - _you can author custom classes in CSS/SCSS/Sass/Less **and even use `@apply`**_!

You could always [extract classes with `@apply`](https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply) but this doesn't integrate directly with the TailwindCSS theme, and you soon run into issues using imports and `@layer` directives due to the nature of the JIT engine.

This plugin is _**not**_ intended to replace component partials or use of TailwindCSS classes. The same [premature abstraction](https://tailwindcss.com/docs/reusing-styles#avoiding-premature-abstraction) caveats apply 😎

## Getting Started

`require` the PostCSS plugin and point it to the folder containing your custom styles. This instructs PostCSS to treat the files in the `styles` folder as dependencies and rebuild your CSS on any changes.

```js
// postcss.config.js

module.exports = {
  plugins: [
    require('tailwind-apply/postcss'), // MUST come before the `tailwindcss` plugin
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
```

`require` the TailwindCSS plugin and point it to the folder containing your custom styles. This instructs TailwindCSS to extends its `theme` with the files in the `styles` folder.

```js
// tailwind.config.js

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('tailwind-apply')],
}
```

### Options

`styles`

Default: `./styles`

Set the root folder where your custom styles are located.

`pattern`

Default: `**/*.{css,scss,sass,less}`

Set the glob pattern of the files in the `styles` folder.

#### Example

```js
// postcss.config.js

module.exports = {
  plugins: [
    require('tailwind-apply/postcss')({
      styles: './src/theme', // Your styles are located in the `src/theme` folder
      pattern: '**/*.sass', // Your styles are authored in Sass only
    }),
  ],
}
```

```js
// tailwind.config.js

module.exports = {
  plugins: [
    require('tailwind-apply')({
      styles: './src/theme', // Your styles are located in the `src/theme` folder
      pattern: '**/*.sass', // Your styles are authored in Sass only
    }),
  ],
}
```
