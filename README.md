# simple-image-resize

Simple utility to resize images in the browser.

Takes a `File`, reads it using a `FileReader`, resizes it via a `Canvas` and returns the result as `Blob`. The resulting image will have the same mime type as the original.

## Usage

```js
import { resizeImage } from 'simple-image-resize';

const blob = await resizeImage(file, {
  maxWidth: 800,
  maxHeight: 600,
  quality: 0.5,
});
```

# License

MIT
