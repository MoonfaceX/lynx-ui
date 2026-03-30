# EdenX Website

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get Started

Start the dev server:
Make sure you're inside `website` folder

```bash
pnpm dev
```

Build the document site for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm serve
```

For more information, see the [EdenX Doc documentation](https://edenx.bytedance.net/doc-tools).

## Change component docs

All the component docs are imported from its original package. For example, the doc of `ActionSheet` is in `packages/lynx-ui-action-sheet/docs`.
Every component docs has two sources:

1. Introduction. This part is in packages/{packageName}/docs/Introduction.md. ONLY this doc should be updated manually.
2. APIReference. This part is generated automatically from packages/{packageName}/types.

If you would like to change anything inside Introduction.mdx or types definition, the docs in website can be updated automatically by running:

```bash
pnpm run genDoc
```

After that the changes can be reviewed on local website.

## Add Component Overview

1. Add caseData in website/src/components/showCases. The caseData should has structure like this:

```tsx
export interface showCaseData {
  title: string // the name of component/components
  img: string // path to website/public/assets
  caseDescription: string[] // detailed description
}
```

2. Add the caseSection in docs/en/components/components/index.mdx and docs/zh/components/components/index.mdx

## Use docs in main website repo

1. Publish the website on luban

- .npmignore the docs folder
- run `pnpm publish:upload` on luban CI

2. Add the docs in main website repo

- modify the package.json of main website repo

```bash
"@lynx-js/lynx-ui-doc": "1.0.x"
```

- run `pnpm install`
- run `pnpm dev`

3. Some important files

- src: will be copied to the root of main website repo
- theme: will be copied to the root of main website repo, and `HomeLayout` will be used as the layout
- docs: will be copied to the root of main website repo
- shareDocs: will be copied to the root of main website repo
- tailwind.config.js: prefix use 'sh-', other custom configurations need to be synchronized manually

4. About link navigation

- use `useLinkNavigate` hook to navigate to the correct page, match `en/lynx-ui` in main website , and `en/` in lynx-ui website
- the path should be like this: `Guides/Introduction` or `Components/Components/`

## Update example in Go playground

- Add dependency 'apps/examples/scripts/tmp/**/*' in 'pnpm-workspace.ymal'
- Find 'tosAccess' key on scm and replace it in 'apps/examples/scripts/packExamples.js'
- Run 'updateGoExamples' script in the root repo
