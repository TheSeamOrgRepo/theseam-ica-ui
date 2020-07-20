const { series, parallel, watch, src, task } = require('gulp')
const log = require('fancy-log')
const del = require('del')
const { exec } = require('shelljs')

let assetsWatcher
let stylesWatcher

const clean = async () => {
  await del(['dist/**'])
  log('Cleaned \'dist\'')
}

const _copyAssets = () => {
  log('Copy Assets2')
  return src('projects/ica-ui/src/assets/**')
    .pipe(dest('dist/ica-ui/assets'))
    .pipe(() => {
      if (stylesWatcher) {
        stylesWatcher.end()
      }
    })
}

const copyAssets = async () => {
  log('Copy Assets')
  return _copyAssets
}

const copyAssetsWatch = async () => {
  log('Copy Assets Watch')
  stylesWatcher = watch('dist/ica-ui/assets/**', { ignoreInitial: false }, _copyAssets)
}

const _copyStyles = () => {
  log('Copy Styles2')
  return src('projects/ica-ui/src/styles/**')
      .pipe(dest('dist/ica-ui/styles'))
}

const copyStyles = () => {
  log('Copy Styles')
  return _copyStyles
}

const copyStylesWatch = () => {
  log('Copy Styles Watch')
  return watch('dist/ica-ui/styles/**', { ignoreInitial: false }, _copyAssets)
}

const ngServe = async () => {
  exec('npm run ica-ui:build:watch', (code, stdout, stderr) => {
    log('Exit code:', code)
    log('Program output:', stdout)
    log('Program stderr:', stderr)
  })
}

const defaultTask = async () => {
  log('defaultTask')
  return copyAssets()
}

const dev = series(clean, ngServe)

exports.dev = dev
exports.clean = clean
exports.ngServe = ngServe
exports.copyAssets = copyAssets
exports.copyStyles = copyStyles
exports.default = defaultTask
