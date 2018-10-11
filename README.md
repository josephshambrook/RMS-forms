# RMS Components Styleguide

This styleguide is intended to provide examples of key components, for use in RMS forms. The components are originally provided by [Bootstrap](https://getbootstrap.com/), which has then been customised slightly with UI tweaks and custom colours.

The `rms.css` file inside `dist/css` contains the compiled Bootstrap CSS + RMS customisations, and needs to be included in projects using these components.

Every component here is compatible with Bootstrap's customisation capabilities, such as sizing and colours. This styleguide does not go through all of the possible examples, as Bootstrap details them way better. To see them all, [view Bootstrap's full documentation](https://getbootstrap.com/), or click the Bootstrap link below each component's title.

> Note: Some of the examples are inside containers with a fixed width, to prevent them from spanning unusually wide.

### Development

If you'd like to edit the Sass or JS, you can follow these steps to set up your environment.

1. Open a command line and `cd` to the directory.
2. Run `npm i` (requires NodeJS), or `yarn` (requires Yarn), to install dependencies

- To build the Sass files, run `npm run sass:build` or `yarn sass:build`
- To watch the Sass files for new changes and build automatically, run `npm run sass:dev` or `yarn sass:dev`
- To build the JS files, run `npm run js:build` or `yarn js:build`

### Examples

`/index.html` contains the main styleguide.
`/color-components.html` contains examples of components that are coloured, for testing the theme.
`/forms` contains templates of HTML to build new files from.
