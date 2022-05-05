# history

```sh
# create project
npx create-next-app@latest --typescript

# create directory
mkdir components
mkdir public/images
touch pages/_document.tsx
```

```tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-TW" data-theme="cupcake">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

# tailwindcss

```sh
yarn add tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.js
content: [
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
],
```

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## daisyui

```sh
yarn add daisyui
```

```js
// tailwind.config.js
module.exports = {
  //...
  plugins: [require('daisyui')],
}
```

## imports

```ts
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { useRouter } from 'next/router'
```

## css

```sh
# Adding Component-Level CSS
touch components/Example/Example.module.css
```

```tsx
<style jsx>{`
  ...
`}</style>
```
