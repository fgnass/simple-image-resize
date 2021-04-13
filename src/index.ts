const defaultConfig = {
  quality: 0.5,
  maxWidth: 800,
  maxHeight: 600,
};

type Config = typeof defaultConfig;
type Options = Partial<Config>;

export function resizeImage(file: File, options: Options) {
  return new Promise<Blob>((resolve, reject) => {
    let img = document.createElement('img');
    let reader = new FileReader();
    let config = Object.assign({}, defaultConfig, options);

    reader.onload = function(e) {
      img.src = e.target!.result as string;
      img.onload = () => {
        scaleImage(img, file.type, config).then(resolve, reject);
      };
    };

    try {
      reader.readAsDataURL(file);
    } catch (err) {
      reject(err);
    }
  });
}

function scaleImage(img: HTMLImageElement, mimeType: string, config: Config) {
  return new Promise<Blob>((resolve, reject) => {
    let { width, height } = getScaledSize(config, img);
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');
    ctx!.drawImage(img, 0, 0, width, height);
    canvas.toBlob(
      blob => {
        if (!blob) reject();
        else resolve(blob);
      },
      mimeType,
      config.quality
    );
  });
}

function getScaledSize(config: Config, img: HTMLImageElement) {
  let ratio = img.width / img.height;
  let width = Math.max(
    Math.min(img.width, config.maxWidth, ratio * config.maxHeight),
    1
  );
  return { width, height: width / ratio };
}
