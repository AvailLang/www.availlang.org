## The Avail Programming Language Website

This web application presents the Avail programming language to the public.

## Required Configurations: Analytics and Mailing

Before deploying the website, be sure to add the Avail Google Analytics
property id in a `.env` file and in `public/index.html`:

`REACT_APP_GOOGLE_ANALYTICS_ID=...`

In your Google Analytics account, the property id is available under:

`Settings > Account > Property > Property Settings > Tracking Id`

## Deployment

This application requires nodeJS and NPM to build.
Run `npm install` to install dependencies.
Run `npm run build` to build the production files in the `build` directory.

## Development

This application requires nodeJS and NPM.
Run `npm install` to install dependencies.
Run `npm run start` to start the development server.

## Editing Text Content

Text content is maintained in language-specific files in the 
`src/internationalization` directory.

Currently, only English is supported. Edit text or add new strings
in `src/internationalization/en.ts` and maintain the `WebsiteStrings`
interface in `src/internationalization/strings.ts`.

To support new languages, create a new file in the same directory,
then implement `WebsiteStrings` for that new language and add it to the
translation map in `strings.ts`. This will require adding a support for
language selection/ detection and updating the `App` state and local 
storage to use the selected language.

The text within code examples is not currently part of the translations.

## Adding Code Examples

Add or edit code examples by using the `CodeExample` component directly,
or adding to the array of examples in `src/examples/examples.ts`. Note that
only examples flagged as `featured` will automatically display on the homepage.
Others are not currently displayed anywhere. In the future, the site might 
support another view of more examples than display on the homepage.

When styling spans of code, it is recommended to use one of the `codeStyle`
properties from `src/components/CodeBlock.tsx`. It includes color styling
for the curated list of code colors or functions that return a different
color depending on the theme.
