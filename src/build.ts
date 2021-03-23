import Bundler from 'parcel-bundler';
import Path from 'path';

import * as fs from 'fs-extra';

const bundlerOptions: Bundler.ParcelOptions = {
  outDir: "dist",
  sourceMaps: false,
  watch: false,
  minify: true,
}

const onStart = (entryPoints: string[]) => {
  // entryPoints.forEach(console.log);
}

const onError = (err: Error) => {
  console.error(err);
}

const onEnd = () => {
  console.log('bundle finish');
}

const onBundled = (bundle: Bundler.ParcelBundle) => {
  console.log(`bundled ${bundle.name}<${bundle.type}>`);

}


(async () => {
  try {

    const distExists = await fs.pathExists('./dist');
    if (distExists) {
      console.log('cleaning dist...')
      fs.remove('./dist');
    }

    const options = new Bundler('./public/options.html', bundlerOptions);
    options.on('buildStart', onStart);
    options.on('buildError', onError);
    options.on('buildEnd', onEnd);
    options.on('bundled', onBundled);
    await options.bundle();

    const popup = new Bundler('./public/popup.html', bundlerOptions);
    popup.on('buildStart', onStart);
    popup.on('buildError', onError);
    popup.on('buildEnd', onEnd);
    popup.on('bundled', onBundled);
    await popup.bundle();

    const background = new Bundler('./src/Background.ts', {...bundlerOptions, outFile: 'background.js'});
    background.on('buildStart', onStart);
    background.on('buildError', onError);
    background.on('buildEnd', onEnd);
    background.on('bundled', onBundled);
    await background.bundle();


    console.log('copying manifest...');
    await fs.copyFile('./src/manifest.json', './dist/manifest.json');
    console.log('copying icons...');
    await fs.copy('./public/icons', './dist/icons/');

  } catch (error) {
    console.error(error);
  }
})();

